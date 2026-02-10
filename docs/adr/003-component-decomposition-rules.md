# ADR-003: Component Size and Decomposition Rules

**Status:** Accepted

**Tags:** `[frontend, components, clean-code]`

**Date:** 2026-02-07 | **Updated:** 2026-02-09

---

## Context

Componentes React tendem a crescer descontroladamente quando não há regras claras:
- Arquivos de 500+ linhas são comuns sem disciplina
- Lógica misturada com apresentação dificulta testes
- Mudanças em um componente quebram outros por acoplamento

## Decision

### Regra de Tamanho

**Limite máximo:** 150-200 linhas por componente.

Quando ultrapassar, **REFATORAR IMEDIATAMENTE** usando estratégias abaixo.

### Estratégia de Decomposição

#### 1. **Extract Logic → Custom Hooks**

Mova estado e lógica para `hooks/`:

```typescript
// hooks/useContentForm.ts
export const useContentForm = () => {
  const [formData, setFormData] = useState({});
  const mutation = useCreateContentMutation();
  return { formData, setFormData, handleSubmit };
};
```

#### 2. **Extract Styles → Styled Files**

Mova CSS-in-JS para `styles/` dentro de cada subpasta temática (ADR-004).

#### 3. **Extract Components → Subpastas Temáticas**

Agrupe componentes relacionados em **subpastas temáticas** dentro de `views/`:

```
views/admin/
├── content-form/          # Subpasta temática
│   ├── ContentFormPage.tsx
│   ├── ContentEditor.tsx
│   ├── ContentFormFields.tsx
│   └── styles/
└── content-list/          # Subpasta temática
    ├── ContentListPage.tsx
    ├── ContentListDataGrid.tsx
    └── styles/
```

**PROIBIDO:** Pasta genérica `components/`:

```
❌ views/admin/components/ContentEditor.tsx  # Genérico
✅ views/admin/content-form/ContentEditor.tsx # Temático
```

**Regra:** Agrupar por **tema/funcionalidade**, não por tipo técnico.

### Single Responsibility Principle

**Pai (Orquestrador):**
- Gerencia estado global
- Chama hooks de API (React Query)
- Define layout
- Passa dados via props

**Filho (Apresentação):**
- Recebe dados via props
- Renderiza UI
- Emite callbacks (`onSubmit`, `onClick`)
- Estado local mínimo

## Consequences

### Positive

- **Legibilidade:** Componentes pequenos são fáceis de entender
- **Testabilidade:** Componentes isolados são fáceis de testar
- **Reutilização:** Componentes focados podem ser reutilizados
- **Manutenibilidade:** Mudanças localizadas não afetam outros componentes

### Negative

- **Mais arquivos:** Crescimento no número de arquivos (trade-off aceito)
- **Disciplina:** Requer vigilância constante para não deixar crescer

### Neutral

- Linha 150-200 é uma **guideline**, não lei absoluta (use bom senso)
- Componentes com JSX extenso mas simples podem ultrapassar se não houver lógica complexa
