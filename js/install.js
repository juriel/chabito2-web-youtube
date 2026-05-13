import "../components/chabi-header.js";
import "../components/chabi-footer.js";
import "../components/chabi-hero.js";
import "../components/chabi-step-card.js";
import "../components/chabi-code-block.js";

const blocks = {
  clone: [{ filename: "git", code: "git clone https://github.com/juriel/chabito2.git\ncd chabito2" }],
  dependencies: [{ filename: "npm", code: "# Con npm\nnpm install" }, { filename: "yarn", code: "# Con yarn\nyarn install" }, { filename: "bun", code: "# Con bun (recomendado)\nbun install" }],
  env: [
    { filename: "OpenAI", code: "# OpenAI\nPI_PROVIDER=openai\nPI_MODEL=gpt-4o-mini\nOPENAI_API_KEY=sk-..." },
    { filename: "Claude", code: "# Anthropic Claude\nPI_PROVIDER=anthropic\nPI_MODEL=claude-3-5-sonnet-latest\nANTHROPIC_API_KEY=sk-ant-..." },
    { filename: "Gemini", code: "# Google Gemini\nPI_PROVIDER=gemini\nPI_MODEL=gemini-2.5-flash\nGEMINI_API_KEY=AIza..." },
    { filename: "Groq", code: "# Groq\nPI_PROVIDER=groq\nPI_MODEL=llama-3.3-70b-versatile\nGROQ_API_KEY=gsk_..." },
    { filename: "OpenRouter", code: "# OpenRouter\nPI_PROVIDER=openai\nPI_MODEL=openrouter/anthropic/claude-3.7-sonnet\nOPENAI_BASE_URL=https://openrouter.ai/api/v1\nOPENAI_API_KEY=sk-or-..." },
  ],
  boot: [{ filename: "npm", code: "# Con npm\nnpm run start" }, { filename: "bun", code: "# Con bun (recomendado)\nbun run start:bun" }],
  api: [{ filename: ".env.example", code: "cp .env.example .env" }],
};

Object.entries(blocks).forEach(([id, snippets]) => {
  const el = document.getElementById(`${id}-code`);
  if (el) el.data = snippets;
});
