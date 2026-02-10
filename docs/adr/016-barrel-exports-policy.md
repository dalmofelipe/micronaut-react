# ADR-016: Barrel Exports Policy

**Status:** Accepted

**Tags:** `[frontend, architecture, imports]`

**Date:** 2026-02-09

---

## Context

Imports diretos de arquivos internos de features criam:
- Acoplamento forte entre features
- Dificuldade em refatorar estrutura interna
- Imports verbosos e frágeis (`../../../features/content/hooks/useContent`)

## Decision

**OBRIGATÓRIO:** Toda feature deve ter `index.ts` na raiz exportando apenas API pública.

### O que Exportar

```typescript
// features/content/index.ts

// ✅ Hooks públicos (usados por outras features/rotas)
export { useContent } from './hooks/useContent';
export { useContentForm } from './hooks/useContentForm';

// ✅ Types públicos (usados externamente)
export type { IContent, IContentFormData } from './types/Content';
export type { TContentStatus } from './types/Content';

// ✅ Pages principais (entry points de rotas)
export { ContentListPage } from './views/admin/content-list/ContentListPage';
export { ContentFormPage } from './views/admin/content-form/ContentFormPage';
export { ContentFeed } from './views/public/ContentFeed';
```

### O que NÃO Exportar

❌ **Sub-componentes internos:** `ContentEditor`, `ContentFormFields`, `EditorToolbar`
❌ **Styled components:** `ContentForm.styled.ts`
❌ **Utils internos:** Funções usadas apenas dentro da feature
❌ **Repository/Manager:** Acessados apenas via hooks

### Consumo

```typescript
// ✅ CORRETO: Importar via barrel export
import { useContent, ContentListPage } from '@/features/content';
import type { IContent } from '@/features/content';

// ❌ ERRADO: Importar caminho interno
import { useContent } from '@/features/content/hooks/useContent';
import { ContentEditor } from '@/features/content/views/admin/content-form/ContentEditor';
```

## Consequences

### Positive

- **Encapsulamento:** Estrutura interna pode ser refatorada sem quebrar imports
- **API clara:** `index.ts` documenta o que é público
- **Imports limpos:** `from '@/features/content'` vs `from '../../../features/content/hooks/useContent'`
- **Tree-shaking:** Bundlers removem código não exportado

### Negative

- **Manutenção:** Precisa atualizar `index.ts` ao adicionar exports públicos
- **Risco de esquecer:** Devs podem importar diretamente se não houver lint

### Neutral

- Features podem ter múltiplos barrel exports (`hooks/index.ts`, `types/index.ts`) mas não é obrigatório
- Exemplo real: `features/content/index.ts`
