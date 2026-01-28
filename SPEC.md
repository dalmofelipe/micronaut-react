# SPEC - Sistema de Empréstimos de Biblioteca

Sistema focado em **regras de negócio complexas de empréstimos de livros**, desenvolvido para aprendizado e consolidação de conhecimentos fullstack com Micronaut e React.

**Objetivo Principal:** Implementar lógica avançada de empréstimos com fila de espera, renovações, multas automáticas, validações customizadas e notificações.

**Temática:** Nerd, acadêmica, tecnologia - focado em livros de ficção científica, fantasia, quadrinhos, mangás, biografias técnicas, etc.

---

## 🎯 Escopo e Foco

Este é um projeto de **aprendizado prático** com foco em:
- ✅ Regras de negócio complexas de empréstimos
- ✅ Validações customizadas (ISBN)
- ✅ Jobs agendados e eventos assíncronos
- ✅ Controle de disponibilidade transacional
- ✅ Sistema de fila de espera FIFO
- ✅ Cálculo automático de multas
- ✅ Histórico completo de empréstimos
- ✅ Estatísticas com queries agregadas e gráficos

**Não inclui:**
- ❌ Sistema de autenticação (acesso livre)
- ❌ Perfis de usuário complexos
- ❌ Envio real de emails (apenas logs)
- ❌ Filtros temporais em relatórios

---

## 📋 Roadmap de Implementação

### **Fase 1 - Fundação Backend** ⏳
- CRUD completo de `Book` (com validação ISBN-10/ISBN-13)
- CRUD básico de `User`
- Migrations com Flyway
- DTOs e mapeamentos

### **Fase 2 - Landing Page Pública** ✅ **CONCLUÍDA**
- ✅ Página de busca de livros (`/`)
- ✅ Filtros: título, autor, gênero, disponibilidade (desabilitados até Fase 1)
- ✅ Paginação (10 itens/página)
- ✅ Visualização de detalhes do livro
- ✅ Indicador de disponibilidade em tempo real
- ✅ Persistência dual (localStorage + query params)
- ✅ Debounce de busca (300ms)
- ✅ Layout responsivo (sidebar desktop / drawer mobile)
- ✅ Estados de loading, empty e error

### **Fase 3 - Sistema de Empréstimos Básico (Backend)**
- Entidade `Loan` (Empréstimo)
- Regras básicas: prazo 14 dias, máximo 3 por usuário
- Controle de disponibilidade (`quantidadeDisponivel`)
- Endpoints: criar empréstimo, devolver livro
- Validações de negócio

### **Fase 4 - Dashboard Administrativo (Frontend)**
- Área admin em `/admin`
- CRUD de livros com formulários
- CRUD de usuários
- Listagem de empréstimos ativos
- Registro de novos empréstimos
- Registro de devoluções

### **Fase 5 - Renovações (Backend + Frontend)**
- Sistema de renovação de empréstimos
- Máximo 2 renovações de 7 dias cada
- Bloqueio de renovação se: usuário com atraso OU livro com fila
- UI para solicitar renovação

### **Fase 6 - Fila de Espera (Backend + Frontend)**
- Entidade `WaitingQueue`
- FIFO puro (primeiro a solicitar, primeiro a ser notificado)
- Registro automático quando livro indisponível
- Notificação (log) para próximo da fila na devolução
- UI para visualizar posição na fila

### **Fase 7 - Multas e Jobs Automáticos (Backend)**
- Cálculo automático de multas (R$ 2,00/dia)
- Job agendado (cron diário):
  - Atualizar status (ATIVO → ATRASADO)
  - Calcular multas acumuladas
  - Gerar notificações em log
- Bloqueio de empréstimos com multa > R$ 20,00
- Endpoint para pagamento de multas

### **Fase 8 - Histórico e Estatísticas (Backend + Frontend)**
- Preservar histórico completo de empréstimos
- Página de estatísticas no dashboard:
  - Top 10 livros mais emprestados
  - Usuários com mais empréstimos
  - Usuários com atrasos/multas
  - Total de multas acumuladas
  - Taxa de renovação
  - Tempo médio de empréstimo
  - Livros com maior fila
- Gráficos simples (barras/pizza) com Recharts
- Queries agregadas com JPA

---

## 🏗️ Arquitetura do Sistema

### **Áreas do Sistema**

#### **1. Área Pública - Landing Page (`/`)**
- Acessível a qualquer visitante
- Busca de livros com filtros
- Visualização de detalhes
- Indicador de disponibilidade
- Design minimalista e responsivo
- **Sem funcionalidades de empréstimo**

#### **2. Área Administrativa - Dashboard (`/admin`)**
- Acesso livre (sem autenticação)
- Gerenciamento completo de livros
- Gerenciamento de usuários
- Registro e gestão de empréstimos
- Controle de filas de espera
- Visualização de estatísticas
- Gestão de multas

---

## 📊 Entidades e Modelos

### **Book (Livro)**
```java
- id: Long
- title: String (obrigatório, max 255)
- author: String (obrigatório, max 150)
- isbn: String (validação ISBN-10/ISBN-13 customizada)
- genre: GenreEnum (obrigatório)
- totalQuantity: Integer (obrigatório, min 1)
- availableQuantity: Integer (calculado, >= 0)
- summary: String (opcional, max 1000)
- imageUrl: String (URL externa, opcional)
- active: Boolean (soft delete, default true)
```

**GenreEnum:**
`SCIENCE_FICTION`, `FANTASY`, `COMICS`, `MANGA`, `HORROR`, `ROMANCE`, `BIOGRAPHY`, `TECHNICAL`, `OTHER`

### **User (Usuário)**
```java
- id: Long
- name: String (obrigatório, max 150)
- email: String (obrigatório, único, validação email)
- phone: String (obrigatório, formato brasileiro)
- active: Boolean (soft delete, default true)
- accumulatedFines: BigDecimal (default 0.00)
```

### **Loan (Empréstimo)**
```java
- id: Long
- user: User (many-to-one)
- book: Book (many-to-one)
- loanDate: LocalDate (obrigatório)
- expectedReturnDate: LocalDate (calculado: +14 dias)
- actualReturnDate: LocalDate (nullable)
- renewalCount: Integer (default 0, max 2)
- fineAmount: BigDecimal (default 0.00)
- status: LoanStatusEnum (obrigatório)
```

**LoanStatusEnum:**
`ACTIVE`, `OVERDUE`, `RETURNED`

### **WaitingQueue (Fila de Espera)**
```java
- id: Long
- user: User (many-to-one)
- book: Book (many-to-one)
- position: Integer (auto-calculado FIFO)
- requestDate: LocalDateTime (obrigatório)
- status: QueueStatusEnum (obrigatório)
```

**QueueStatusEnum:**
`WAITING`, `NOTIFIED`, `CANCELED`, `COMPLETED`

---

## 📐 Regras de Negócio - Empréstimos

### **Criação de Empréstimo**
1. ✅ Usuário deve estar ativo
2. ✅ Livro deve estar ativo
3. ✅ Usuário não pode ter mais de 3 empréstimos ativos
4. ✅ Usuário não pode ter multas > R$ 20,00
5. ✅ Livro deve ter `availableQuantity > 0`
6. ✅ Ao emprestar: `availableQuantity--`
7. ✅ Prazo padrão: 14 dias
8. ✅ Se livro indisponível: adicionar à fila de espera

### **Renovação de Empréstimo**
1. ✅ Máximo 2 renovações por empréstimo
2. ✅ Cada renovação adiciona 7 dias
3. ✅ **Bloqueio:** usuário com qualquer empréstimo atrasado não pode renovar nenhum
4. ✅ **Bloqueio:** livro com fila de espera não pode ser renovado
5. ✅ Atualiza `expectedReturnDate` e incrementa `renewalCount`

### **Devolução de Livro**
1. ✅ Marca `actualReturnDate = hoje`
2. ✅ Atualiza `status = RETURNED`
3. ✅ `availableQuantity++`
4. ✅ Se houver fila: notifica próximo usuário (log)
5. ✅ Multas aplicadas permanecem até pagamento

### **Cálculo de Multas**
1. ✅ Multa: R$ 2,00 por dia de atraso
2. ✅ Atraso = `hoje - expectedReturnDate` (se positivo)
3. ✅ Multa acumulada no empréstimo e no usuário
4. ✅ Job diário atualiza multas automaticamente
5. ✅ Bloqueio de novos empréstimos se `accumulatedFines > R$ 20,00`

### **Fila de Espera**
1. ✅ FIFO puro: primeiro a solicitar, primeiro notificado
2. ✅ Posição calculada automaticamente na inserção
3. ✅ Notificação (log) ao devolver livro para próximo da fila
4. ✅ Status `WAITING → NOTIFIED → COMPLETED`
5. ✅ Usuário pode cancelar posição na fila

### **Histórico Completo**
1. ✅ Empréstimos devolvidos permanecem no banco
2. ✅ Status `RETURNED` com `actualReturnDate` preenchida
3. ✅ Multas pagas zeradas em `User.accumulatedFines`
4. ✅ Auditoria completa para relatórios

---

## 🔔 Sistema de Notificações (Logs)

**Implementação:** Logs estruturados em JSON (sem envio real de email)

### **Tipos de Notificações**

1. **Lembrete de Devolução**
   - Disparado 2 dias antes do vencimento
   - Log: `{ type: "REMINDER", user, book, daysLeft: 2 }`

2. **Aviso de Atraso**
   - Disparado diariamente após vencimento
   - Log: `{ type: "OVERDUE", user, book, daysOverdue, fine }`

3. **Disponibilidade na Fila**
   - Disparado ao devolver livro com fila
   - Log: `{ type: "AVAILABLE", user, book, queuePosition }`

4. **Confirmações**
   - Empréstimo criado
   - Renovação realizada
   - Devolução registrada
   - Log: `{ type: "CONFIRMATION", action, user, book }`

---

## ⏰ Jobs Agendados

**Job Diário (cron: `0 0 * * *` - meia-noite)**

### Responsabilidades:
1. **Atualizar Status de Empréstimos**
   - `ACTIVE → OVERDUE` se `hoje > expectedReturnDate`

2. **Calcular Multas**
   - Para todos empréstimos atrasados
   - Atualizar `Loan.fineAmount` e `User.accumulatedFines`

3. **Gerar Notificações**
   - Lembretes (2 dias antes)
   - Avisos de atraso
   - Processamento de fila

4. **Atualizar Posições da Fila**
   - Recalcular posições após cancelamentos

---

## 📈 Estatísticas e Relatórios

**Página:** `/admin/statistics`

### **Métricas Exibidas (Dados Totais)**

1. **Top 10 Livros Mais Emprestados**
   - Query: `COUNT(loans) GROUP BY book ORDER BY count DESC LIMIT 10`
   - Visualização: Gráfico de barras

2. **Usuários com Mais Empréstimos Ativos**
   - Query: `COUNT(loans WHERE status = ATIVO) GROUP BY user`
   - Visualização: Tabela ordenada

3. **Usuários com Atrasos/Multas**
   - Query: `SELECT user, COUNT(*), SUM(fineAmount) WHERE status = OVERDUE`
   - Visualização: Tabela com totais

4. **Total de Multas Acumuladas**
   - Query: `SUM(User.accumulatedFines)`
   - Visualização: Card numérico

5. **Taxa de Renovação**
   - Query: `COUNT(renewalCount > 0) / COUNT(all loans) * 100`
   - Visualização: Gráfico de pizza

6. **Tempo Médio de Empréstimo**
   - Query: `AVG(actualReturnDate - loanDate) WHERE RETURNED`
   - Visualização: Card numérico (dias)

7. **Livros com Maior Fila de Espera**
   - Query: `COUNT(queue WHERE WAITING) GROUP BY book ORDER BY count DESC`
   - Visualização: Gráfico de barras

---

## 🎨 Features de UX/UI (Frontend)

### **Componentes Globais**
- ✅ Tema dark/light com toggle (Zustand + Material-UI)
- ✅ Toasts/Snackbars para feedback de ações
- ✅ Loading spinners e skeleton screens
- ✅ Navegação com React Router
- ✅ Layout responsivo (mobile-first)

### **Landing Page (`/`)**
- Hero section simples com busca
- Grid de cards de livros
- Filtros laterais: título, autor, gênero, disponibilidade
- Paginação (10 itens/página)
- Badge de status: `Disponível (X)` | `Indisponível` | `Fila: Y pessoas`
- Modal de detalhes do livro

### **Dashboard Admin (`/admin`)**
- Sidebar com navegação
- Tabelas com ordenação por colunas (Material-UI DataGrid)
- Formulários com validação inline (React Hook Form + Zod)
- Modais de confirmação para ações destrutivas
- Badges de status coloridos (ativo/atrasado/bloqueado)
- Contadores em tempo real

### **Validações Frontend**
- ISBN: formato válido (ISBN-10/ISBN-13)
- Email: formato válido
- Telefone: formato brasileiro (XX) XXXXX-XXXX
- Campos obrigatórios com feedback visual
- Mensagens de erro amigáveis

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **Framework:** Micronaut 4.8.2 (Java 21)
- **ORM:** Micronaut Data JDBC
- **Database:** PostgreSQL (prod) / H2 (dev)
- **Migrations:** Flyway
- **Validação:** Bean Validation + validadores customizados
- **Jobs:** Micronaut Scheduled (`@Scheduled`)
- **Eventos:** Micronaut Events (`@EventListener`)
- **Build:** Maven

### **Frontend**
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Roteamento:** React Router v6
- **Estado Global:** Zustand
- **Data Fetching:** React Query (TanStack Query)
- **UI Library:** Material-UI (MUI)
- **Formulários:** React Hook Form
- **Validação:** Zod
- **Gráficos:** Recharts
- **HTTP Client:** Axios

### **DevOps**
- **Controle de Versão:** Git + GitHub
- **Hospedagem Backend:** Render
- **Hospedagem Frontend:** Vercel
- **CI/CD:** GitHub Actions (futuro)

---

## ✅ Validações Customizadas

### **Backend - Validação de ISBN**
```java
@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = IsbnValidator.class)
public @interface ValidIsbn {
    String message() default "ISBN inválido";
}

// Validador suporta ISBN-10 e ISBN-13
// Algoritmo de checksum implementado
```

### **Frontend - Validação de ISBN (Zod)**
```typescript
const isbnSchema = z.string()
  .regex(/^(97[89])?\d{9}[\dX]$/, "ISBN inválido")
  .refine((isbn) => validateIsbnChecksum(isbn));
```

---

## 🚀 Ordem de Desenvolvimento Sugerida

**Alternando Backend ↔ Frontend para manter motivação:**

1. **Backend:** CRUD Book + User + validação ISBN
2. **Frontend:** Landing page + busca de livros
3. **Backend:** Empréstimos básicos + controle disponibilidade
4. **Frontend:** Dashboard admin + CRUD UI
5. **Backend:** Renovações + validações complexas
6. **Frontend:** UI de renovação + feedback
7. **Backend:** Fila de espera FIFO
8. **Frontend:** Visualização de fila
9. **Backend:** Multas + jobs agendados
10. **Frontend:** Indicadores de multas + bloqueios
11. **Backend:** Queries de estatísticas
12. **Frontend:** Página de estatísticas + gráficos

---

## 📝 Notas para Desenvolvedor

**Dicas para Aprendizado:**
- Implementar testes unitários para cada use case (aprender TDD)
- Documentar decisões técnicas em comentários
- Usar Lombok para reduzir boilerplate
- Implementar migrations Flyway desde o início
- Adicionar logs estruturados para debug

**Padrões a Seguir:**
- Clean Architecture (domain → use cases → adapters)
- DTOs para contratos de API
- Validações no domain e no DTO
- Transações adequadas em operações críticas
- Tratamento de exceções global

---

**Desenvolvido para aprendizado e consolidação de conhecimentos fullstack (Micronaut + React).**
