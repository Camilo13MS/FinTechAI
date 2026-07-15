import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
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
      text: "Hola 👋 Soy tu asesor virtual. ¿En qué puedo ayudarte?",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

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
            contents: [
              {
                parts: [{ text: message }],
              },
            ],
          }),
        }
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
    message: string
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
Eres un CLASIFICADOR AUTOMÁTICO.
No eres un asistente.
No ayudas.
No explicas.
No aconsejas.
No saludas.

Tu respuesta DEBE ser ÚNICAMENTE un JSON válido.
Si escribes texto adicional, la respuesta es incorrecta.

Analiza el mensaje y responde EXACTAMENTE con este formato:

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
        }
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
    priority: string
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

    const analysis = await detectComplaint(userText);

    if (analysis.isComplaint) {
      await createCase(
        userText,
        analysis.category || "otro",
        analysis.priority || "media"
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "📋 Tu caso ha sido registrado.\nUn asesor humano lo revisará pronto.",
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
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
