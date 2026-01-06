# FinTech AI: Aplicativo IA Para NeoBancos 🚀

FinTech AI es una aplicación móvil desarrollada con React Native que busca revolucionar la atención al cliente en el sector financiero. Utiliza Inteligencia Artificial para gestionar consultas, automatizar la creación de tickets de soporte y permitir un escalamiento fluido a asesores humanos.

## 📱 Características Principales

-Autenticación Segura: Registro e inicio de sesión mediante Firebase Auth.

-Asesor Virtual con IA: Chatbot integrado con modelos de lenguaje (LLM) que entiende lenguaje natural para resolver dudas financieras.

-Gestión de Casos Automatizada: La IA detecta cuando un problema requiere soporte técnico y crea automáticamente un ticket en la base de datos.

-Monitoreo en Tiempo Real: Seguimiento del estado y prioridad (Alta/Media/Baja) de los casos desde la aplicación.

-Perfil Financiero: Visualización de planes de datos, facturas y métricas de consumo del usuario.

## 🛠️ Stack Tecnológico

-Frontend: React Native + Expo Go

-Backend as a Service (BaaS): Firebase (Auth & Cloud Firestore)

-IA Engine: Google Gemini API (o el LLM que hayas integrado)

-Estilos: NativeWind / React Native Paper (opcional, según lo que usaras)

## 📂 Estructura del Proyecto

├── assets/           # Imágenes y recursos estáticos

├── src/

│   ├── components/   # Componentes reutilizables (Botones, Cards, etc.)

│   ├── screens/      # Pantallas (Login, Home, Chat, Casos, Perfil)

│   ├── config/       # Configuración de Firebase y API Keys

│   ├── hooks/        # Lógica personalizada y llamadas a la base de datos

│   └── navigation/   # Configuración de React Navigation (Tabs & Stack)

├── App.js            # Punto de entrada de la aplicación

└── app.json          # Configuración de Expo

## 🚀 Instalación y Uso

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clonar el repositorio:

 git clone https://github.com/Camilo13MS/FinTechAI

2. Instalar dependencias:

 npm install

3. Configurar variables de entorno: Crea un archivo de configuración en src/config/ con tus credenciales de Firebase y la API Key de la IA.

4. Iniciar el proyecto:

 npx expo start

5. Simulación: Escanea el código QR con la app de Expo Go en tu dispositivo físico o usa un emulador de Android/iOS.
