import { Ionicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatBubble from "../../src/components/ChatBubble";
import { auth, db } from "../../src/services/firebase";
import styles from "../../src/styles/chatbot";

/* =======================
   TYPES
======================= */

type Message = {
  id: number;
  text: string;
  from: "user" | "bot";
};

type ComplaintAnalysis = {
  isComplaint: boolean;
  category?: string;
  priority?: string;
};

/* =======================
   COMPONENT
======================= */

export default function Chatbot() {
  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const uid = auth.currentUser?.uid;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hola 👋 Soy tu asesor financiero virtual. Puedo ayudarte con tu plan, facturación y pagos. ¿En qué te ayudo?",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<Record<string, any> | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!uid) return;
    getUserProfile(uid)
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [uid]);

  /* =======================
     CONTEXTO DEL ASESOR
  ======================= */

  const buildSystemInstruction = () => {
    const nombre = profile?.name ?? "el cliente";
    const plan = profile?.plan ?? "sin plan registrado";
    const dataUsage =
      typeof profile?.dataUsage === "number"
        ? `${Math.round(profile.dataUsage * 100)}%`
        : "sin datos de consumo";

    return `
Eres el asesor financiero virtual del portal de telefonía. Ayudas a ${nombre}
con su cuenta: plan contratado, consumo de datos, facturación y pagos.

CÓMO HABLAS:
- Como una persona real y cercana, no como un bot corporativo. Nada de listas
  con viñetas ni asteriscos para respuestas cortas o emocionales — escribe en
  párrafos cortos, como si le escribieras a alguien por WhatsApp.
- Si el usuario suena frustrado, ansioso o estresado (mayúsculas, urgencia,
  quejas, "necesito ya", etc.), arranca reconociendo cómo se siente en una
  frase breve y genuina antes de resolver algo. No minimices su molestia ni
  uses frases hechas tipo "entiendo tu frustración" repetidas como fórmula.
- Tuteo, español neutro, cálido pero profesional. Cero tecnicismos innecesarios.

Datos reales de la cuenta que estás atendiendo:
- Plan actual: ${plan}
- Consumo de datos: ${dataUsage}

QUÉ HACER CUANDO NO TIENES UN DATO (ej. saldo exacto, un cobro puntual, historial
de pagos — cosas que no están en los "Datos reales" de arriba):
- Sé honesto de inmediato, sin rodeos ni excusas largas.
- En la MISMA respuesta, ofrece conectarlo con un asesor humano ahora mismo
  (no lo mandes a "entra a la app" o "llama a soporte" como si fuera su problema
  resolverlo solo). Algo como: "eso no lo tengo yo a la mano, pero te puedo
  escalar esto ahora mismo con un asesor para que te lo confirme, ¿quieres?"
- No inventes cifras ni des un balance/consumo que no esté en los datos reales.

No des consejos financieros generales fuera del contexto de esta cuenta/plan.
`.trim();
  };

  /* =======================
     GEMINI FUNCTIONS
  ======================= */

  const askGemini = async (message: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY!,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: buildSystemInstruction() }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: message }],
              },
            ],
          }),
        },
      );

      const data = await response.json();

      console.log("🧠 Gemini raw response:", JSON.stringify(data, null, 2));

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        return "🤔 No entendí bien, ¿puedes repetirlo?";
      }

      return text;
    } catch (error) {
      console.log("❌ Error Gemini:", error);
      return "Ups 😕 hubo un error hablando con el servidor";
    }
  };

  const detectComplaint = async (
    message: string,
  ): Promise<ComplaintAnalysis> => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.EXPO_PUBLIC_GEMINI_API_KEY!,
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `
Eres un CLASIFICADOR AUTOMÁTICO para un asesor financiero de telefonía.
No eres un asistente.
No ayudas.
No explicas.
No aconsejas.
No saludas.

Tu respuesta DEBE ser ÚNICAMENTE un JSON válido.
Si escribes texto adicional, la respuesta es incorrecta.

Marca isComplaint=true si el usuario reporta un problema, un cobro indebido,
un pago que no se refleja, un reclamo sobre su factura/plan, o cualquier cosa
que un humano deba revisar. Si solo está preguntando algo informativo sobre
su cuenta (cuánto plan tiene, cuánto consumo lleva), isComplaint=false.

Responde EXACTAMENTE con este formato:

{
  "isComplaint": true o false,
  "category": "facturacion" | "internet" | "senal" | "otro",
  "priority": "baja" | "media" | "alta"
}

Mensaje del usuario:
"${message}"

                  `.trim(),
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();

      console.log("🧠 Gemini complaint raw:", JSON.stringify(data, null, 2));

      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      console.log("🧪 Texto recibido:", rawText);

      // 🔥 Extraer el primer JSON aunque Gemini escriba una biblia
      const match = rawText.match(/\{[\s\S]*\}/);

      if (!match) {
        throw new Error("No se encontró JSON en la respuesta");
      }

      const parsed = JSON.parse(match[0]);

      return {
        isComplaint: Boolean(parsed.isComplaint),
        category: parsed.category ?? "otro",
        priority: parsed.priority ?? "media",
      };
    } catch (error) {
      console.log("❌ detectComplaint falló:", error);
      return { isComplaint: false };
    }
  };

  /* =======================
     FIRESTORE
  ======================= */

  const createCase = async (
    message: string,
    category: string,
    priority: string,
  ) => {
    await addDoc(collection(db, "cases"), {
      userId: uid,
      message,
      category,
      priority,
      status: "abierto",
      handledBy: "bot", // el rol que generó el caso; un admin lo puede reasignar después
      createdAt: serverTimestamp(),
    });
  };

  const getUserProfile = async (uid: string) => {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
  };

  /* =======================
     CHAT LOGIC
  ======================= */

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // Mostrar mensaje del usuario
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: userText,
        from: "user",
      },
    ]);

    setInput("");
    setIsTyping(true);

    // Mueve el scroll hacia abajo al enviar un mensaje
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);

    const analysis = await detectComplaint(userText);

    if (analysis.isComplaint) {
      await createCase(
        userText,
        analysis.category || "otro",
        analysis.priority || "media",
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "📋 Esto ya lo escalé a un asesor humano — quedó registrado como caso y te van a contactar pronto para resolverlo directamente.",
          from: "bot",
        },
      ]);
    } else {
      const reply = await askGemini(userText);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          from: "bot",
        },
      ]);
    }

    setIsTyping(false);
  };

  /* =======================
     UI
  ======================= */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.messages}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} text={msg.text} from={msg.from} />
        ))}

        {isTyping && (
          <ChatBubble text="El asesor está escribiendo..." from="bot" />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          blurOnSubmit={false}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
