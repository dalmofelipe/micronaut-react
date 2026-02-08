# Copilot Instructions - Padrões de Código

## ⚠️ OBRIGATÓRIO: Consulta aos ADRs

**🚨 ATENÇÃO: É OBRIGATÓRIO consultar e analisar os ADRs relevantes ANTES de qualquer implementação!**

- ✅ Ler ADRs relevantes à tarefa em [docs/adr/README.md](../docs/adr/README.md)
- ✅ Identificar padrões, convenções e constraints que se aplicam
- ✅ Código DEVE seguir ADRs desde a primeira geração
- ✅ Verificar conformidade com ADRs antes de finalizar
- ✅ Refatorar PROATIVAMENTE se necessário

**❌ NÃO gere código que precise ser refatorado depois para seguir ADRs!**

---

## � Architectural Decision Records (ADRs)

As decisões arquiteturais deste projeto estão documentadas em **ADRs** (Architectural Decision Records).

➡️ [**docs/adr/README.md**](../docs/adr/README.md)

Os ADRs cobrem:
- **Frontend:** Feature-Based Architecture, Manager vs Repository, Decomposição de Componentes, TypeScript Conventions, Zero `sx` Props Policy
- **Backend:** Clean Architecture, Use Case Pattern, SOLID Principles, Exception Handling, Testing Strategy
- **Cross-cutting:** Naming Conventions, MCP Usage Policy

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
