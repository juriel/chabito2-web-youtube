import "../components/chabi-header.js";
import "../components/chabi-footer.js";
import "../components/chabi-hero.js";
import "../components/chabi-feature-card.js";

const features = [
  { icon: "🤖", title: "Multi-LLM", description: "Conecta OpenAI, Anthropic Claude, Gemini, Groq, xAI o cualquier endpoint OpenAI-compatible vía OpenRouter." },
  { icon: "📱", title: "Multi-sesión", description: "Gestiona múltiples cuentas de WhatsApp simultáneamente desde una sola instancia." },
  { icon: "⚡", title: "QR en segundos", description: "Vincula tu WhatsApp escaneando un QR desde la interfaz web. Sin configuraciones complejas." },
  { icon: "🔒", title: "Privado y local", description: "Corre en tu servidor. Tus conversaciones nunca salen de tu infraestructura." },
  { icon: "🧠", title: "Memoria por conversación", description: "Cada chat tiene su propio historial y agente con contexto persistente en disco." },
  { icon: "🛠️", title: "API REST + WebSocket", description: "Integra Chabi en cualquier sistema con endpoints HTTP y WebSocket documentados." },
];

const featuresGrid = document.getElementById("features-grid");
features.forEach((feature) => {
  const el = document.createElement("chabi-feature-card");
  el.icon = feature.icon;
  el.title = feature.title;
  el.description = feature.description;
  featuresGrid.appendChild(el);
});
