import "../components/chabi-header.js";
import "../components/chabi-footer.js";
import "../components/chabi-sidebar.js";
import "../components/chabi-breadcrumb.js";
import "../components/chabi-code-block.js";

document.querySelector("chabi-sidebar").data = [
  { title: "Getting started", items: [{ id: "arquitectura", label: "Arquitectura" }, { id: "estructura", label: "Estructura de archivos" }] },
  { title: "Core concepts", items: [{ id: "api-rest", label: "API REST" }, { id: "websocket", label: "WebSocket" }, { id: "variables", label: "Variables de entorno" }] },
  { title: "Advanced guides", items: [{ id: "clases", label: "Clases principales" }, { id: "persistencia", label: "Capa de persistencia" }, { id: "estados", label: "Estados de conexión" }] },
];

document.querySelector("chabi-breadcrumb").items = [
  { label: "Inicio", href: "index.html" },
  { label: "Documentación", href: "docs.html" },
  { label: "Referencia técnica" },
];

const codeBlocks = {
  "api-create": [{ filename: "curl", code: "curl -X POST http://localhost:3000/api/sessions/ventas-bot\ncurl http://localhost:3000/api/sessions" }],
  "api-qr": [{ filename: "qr", code: "curl http://localhost:3000/api/sessions/ventas-bot/qr\ncurl http://localhost:3000/api/sessions/ventas-bot/qr/png --output qr.png" }],
  "api-status": [{ filename: "status", code: "curl http://localhost:3000/api/sessions/ventas-bot/status" }],
  "api-send": [{ filename: "send", code: `curl -X POST http://localhost:3000/api/sessions/ventas-bot/send \\
  -H "Content-Type: application/json" \\
  -d '{"to":"573001112233","message":"Hola desde Chabi"}'` }],
  "persist-text": [{ filename: "TextStore.js", code: "# Historial persistido por conversación\nconversation-001.txt\nuser: Hola\nassistant: Hola, ¿en qué te ayudo?" }],
  "persist-json": [{ filename: "JsonStore.js", code: `{
  "session": "ventas-bot",
  "status": "open",
  "lastSync": "2025-05-12T20:00:00Z"
}` }],
};

Object.entries(codeBlocks).forEach(([id, snippets]) => {
  const el = document.getElementById(id);
  if (el) el.data = snippets;
});
