# ADR-015: Model Context Protocol (MCP) Usage Policy

**Status:** Accepted

**Tags:** `[cross-cutting, mcp, ai-tools, documentation]`

**Date:** 2026-02-07

---

## Context

Durante desenvolvimento, frequentemente precisamos:
- Consultar documentação de bibliotecas/frameworks
- Verificar sintaxe correta de APIs
- Testar componentes visualmente
- Buscar exemplos de código atualizados

Problemas sem MCPs:
- Documentação desatualizada (ググる Stack Overflow antigos)
- "Chutar" sintaxe de APIs (gera bugs)
- Não testar visualmente (apenas rodar dev server manualmente)
- Conhecimento estático da IA (pode estar desatualizado)

## Decision

Usar **Model Context Protocols (MCPs)** como fonte primária de documentação e validação.

### MCPs Disponíveis

#### 1. **Upstash Context7** (`upstash/context7`)

**Uso:** Documentação atualizada de **qualquer** biblioteca/framework

**Quando usar:**
- Dúvidas sobre APIs de bibliotecas (React Query, Zustand, Micronaut, etc.)
- Verificar sintaxe correta ou melhores práticas
- Buscar exemplos de código atualizados

**Exemplo:**
```typescript
// Antes: Chutar sintaxe React Query
const { data } = useQuery(['books'], getBooks); // Pode estar errado

// Com MCP: Consultar docs atualizadas
// MCP retorna: useQuery({ queryKey: ['books'], queryFn: getBooks })
const { data } = useQuery({ queryKey: ['books'], queryFn: getBooks });
```

**Comandos:**
- Consultar biblioteca: "Check React Query v5 syntax for mutations"
- Verificar API: "What are the props for MUI DataGrid?"

#### 2. **MUI MCP** (`mui-mcp`)

**Uso:** Documentação completa do Material-UI

**Quando usar:**
- Implementar componentes MUI complexos
- Verificar props disponíveis de componentes
- Consultar padrões de theming/customização
- Checar versões específicas (v5, v6, v7)

**Exemplo:**
```typescript
// Antes: Tentar lembrar props do DataGrid
<DataGrid rows={data} columns={cols} />

// Com MCP: Verificar todas as props disponíveis
<DataGrid 
  rows={data} 
  columns={cols}
  pagination
  paginationMode="server"
  onPaginationModelChange={handlePageChange}
/>
```

#### 3. **Chrome DevTools MCP** (`chromedevtools/chrome-devtools-mcp`)

**Uso:** Automação de browser e debug visual

**Quando usar:**
- Testar componentes visualmente sem rodar manualmente
- Capturar screenshots de estados específicos
- Verificar responsividade em diferentes tamanhos
- Debug de problemas de UI/layout

**Ferramentas disponíveis:**
- `take_snapshot` - Captura estado acessível da página (a11y tree)
- `take_screenshot` - Captura visual (PNG/JPEG)
- `navigate_page` - Navegar URLs
- `click`, `fill`, `hover` - Interações automatizadas

**Exemplo de uso:**
```bash
# Testar componente BookCard responsivo
1. navigate_page("http://localhost:5173/books")
2. take_screenshot({ uid: "book-card-1" })
3. resize_page({ width: 375, height: 667 }) # Mobile
4. take_screenshot({ uid: "book-card-1" })
```

### Regra de Ouro

**SEMPRE use MCPs quando:**
- Precisar de informação atualizada sobre biblioteca/framework
- Não tiver certeza da sintaxe correta
- Quiser validar visualmente um componente
- Precisar de exemplos de código confiáveis

**NUNCA:**
- "Chute" sintaxe sem consultar docs via MCP
- Assuma que conhecimento da IA está atualizado
- Deixe de testar visualmente quando MCP está disponível

### Workflow Recomendado

1. **Dúvida sobre API:** Consultar Upstash Context7 ou MUI MCP
2. **Implementar código:** Usar sintaxe retornada pelo MCP
3. **Validar visualmente:** Usar Chrome DevTools MCP (se UI)
4. **Iterar:** Ajustar baseado em feedback visual

## Consequences

### Positive

- **Documentação sempre atualizada:** MCPs consultam docs oficiais
- **Menos bugs:** Sintaxe correta desde o início
- **Validação visual automatizada:** Screenshots sem rodar manualmente
- **Produtividade:** Menos context switching (não precisa abrir browser/docs)

### Negative

- **Dependência de MCPs:** Se MCP estiver offline, workflow afetado
- **Latência:** Consultas MCP podem adicionar segundos

### Neutral

- MCPs complementam, não substituem, conhecimento do desenvolvedor
- Use bom senso: para sintaxe básica conhecida, não precisa consultar MCP
- Chrome DevTools MCP não substitui testes unitários/integração
