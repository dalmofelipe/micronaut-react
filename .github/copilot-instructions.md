# Copilot Instructions - Padrões de Código

## 📚 Documentação por Área

Para instruções específicas de cada stack, consulte:

- **Frontend (React + TypeScript):** [copilot-instructions-frontend.md](./copilot-instructions-frontend.md)
- **Backend (Micronaut + Java):** [copilot-instructions-backend.md](./copilot-instructions-backend.md)


## 🔌 MCPs Disponíveis

O projeto utiliza **Model Context Protocols (MCPs)** para acesso a ferramentas externas durante o desenvolvimento:

### 1. **Upstash Context7** (`upstash/context7`)
- **Uso:** Consultar documentação atualizada de qualquer biblioteca/framework
- **Quando usar:**
  - Dúvidas sobre APIs de bibliotecas (React Query, Zustand, Micronaut, etc.)
  - Verificar sintaxe correta ou melhores práticas
  - Buscar exemplos de código atualizados

### 2. **MUI MCP** (`mui-mcp`)
- **Uso:** Documentação completa do Material-UI
- **Quando usar:**
  - Implementar componentes MUI complexos
  - Verificar props disponíveis de componentes
  - Consultar padrões de theming/customização
  - Checar versões específicas (v5, v6, v7)

### 3. **Chrome DevTools MCP** (`chromedevtools/chrome-devtools-mcp`)
- **Uso:** Automação de browser e debug visual
- **Quando usar:**
  - Testar componentes visualmente sem rodar manualmente
  - Capturar screenshots de estados específicos
  - Verificar responsividade em diferentes tamanhos
  - Debug de problemas de UI/layout
- **Ferramentas:**
  - `take_snapshot` - captura estado acessível da página
  - `take_screenshot` - captura visual
  - `navigate_page` - navegar URLs
  - `click`, `fill`, `hover` - interações

**Regra:** Use MCPs quando precisar de informação atualizada ou verificação visual. Evite "chutar" sintaxe quando pode consultar docs.
