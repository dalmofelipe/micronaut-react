# Architectural Decision Records (ADRs)

Este diretório contém as decisões arquiteturais do projeto Micronaut + React.

## Índice

### Frontend

- [ADR-001](001-feature-based-architecture.md) - Arquitetura baseada em Features (Ramon Prata Model) `[UPDATED 2026-02-09]`
- [ADR-002](002-manager-vs-repository-pattern.md) - Pattern Manager vs Repository na camada de dados `[UPDATED 2026-02-09]`
- [ADR-003](003-component-decomposition-rules.md) - Regras de tamanho e decomposição de componentes `[UPDATED 2026-02-09]`
- [ADR-004](004-zero-sx-props-policy.md) - Política de evitar props `sx` do MUI
- [ADR-005](005-typescript-naming-conventions.md) - Convenções de nomenclatura TypeScript `[UPDATED 2026-02-09]`
- [ADR-006](006-subfeature-context-separation.md) - Separação de contextos em sub-features `[UPDATED 2026-02-09]`
- [ADR-016](016-barrel-exports-policy.md) - Política de Barrel Exports (index.ts obrigatório) `[NEW 2026-02-09]`

### Backend

- [ADR-007](007-clean-architecture-hexagonal.md) - Clean Architecture com Hexagonal Ports & Adapters
- [ADR-008](008-domain-vs-persistence-entities.md) - Separação entre Domain Entities e Persistence Entities
- [ADR-009](009-use-case-pattern.md) - Pattern Use Case para lógica de negócio
- [ADR-010](010-solid-principles-enforcement.md) - Enforcement dos princípios SOLID
- [ADR-011](011-clean-code-function-rules.md) - Regras Clean Code para funções
- [ADR-012](012-exception-handling-strategy.md) - Estratégia de tratamento de exceções em camadas
- [ADR-013](013-test-pyramid-strategy.md) - Estratégia de testes (Pirâmide de Testes) `[UPDATED 2026-02-09]`

### Cross-cutting

- [ADR-014](014-naming-conventions-alignment.md) - Alinhamento de convenções de nomenclatura entre stacks
- [ADR-015](015-mcp-usage-policy.md) - Política de uso de Model Context Protocols (MCPs)

## Formato

Todos os ADRs seguem o formato de Michael Nygard:

- **Status:** Estado atual da decisão
- **Tags:** Categorias para indexação
- **Context:** Problema que motiva a decisão
- **Decision:** A decisão tomada
- **Consequences:** Impactos positivos, negativos e neutros

## Como usar

1. Leia os ADRs relevantes antes de implementar novas features
2. ADRs são editáveis - atualize quando a decisão evoluir
3. Para decisões novas, copie [000-template.md](000-template.md) e preencha
