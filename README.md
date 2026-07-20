# 📊 Controle de Gastos

### Desafio Técnico — .NET + React

Uma aplicação Full Stack para gerenciamento de receitas e despesas pessoais.

O sistema permite cadastrar pessoas, registrar transações financeiras e visualizar relatórios consolidados, respeitando regras de negócio, como a restrição de cadastro de receitas para menores de idade.

---

## 📑 Índice

- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🔎 Visão Geral](#-visão-geral)
- [🧾 Regras de Negócio](#-regras-de-negócio)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Como Executar](#️-como-executar-o-projeto)
- [🧪 Exemplos de Uso](#-exemplos-de-uso)
- [📷 Demonstração](#-demonstração)
- [💡 Melhorias Futuras](#-melhorias-futuras)
- [🏗️ Arquitetura da Aplicação](#️-arquitetura-da-aplicação)
- [👨‍💻 Autor](#-autor)

## 🚀 Tecnologias Utilizadas

### Backend

- .NET 10
- ASP.NET Core
- Entity Framework Core
- SQLite
- Swagger / OpenAPI

### Frontend

- React
- TypeScript
- Vite
- CSS

---

## 🔎 Visão Geral

- Cadastro de pessoas
- Listagem de pessoas
- Exclusão de pessoas
- Cadastro de receitas e despesas
- Listagem de transações
- Relatório financeiro geral
- Relatório individual por pessoa
- Interface desenvolvida em React
- API documentada com Swagger

---

## 🧾 Regras de Negócio

- ✅ Uma pessoa pode possuir diversas transações.
- ✅ Ao excluir uma pessoa, todas as suas transações são removidas automaticamente.
- ✅ Pessoas menores de 18 anos podem cadastrar apenas despesas.
- ✅ Pessoas maiores de idade podem cadastrar receitas e despesas.
- ✅ O relatório apresenta os totais gerais da aplicação.
- ✅ O relatório permite consultar individualmente o saldo de cada pessoa.

---

## 📁 Estrutura do Projeto

```text
controle-gastos

├── backend
│   ├── Controllers
│   ├── Data
│   ├── Dtos
│   ├── Mappers
│   ├── Models
│   ├── Repositories
│   ├── Services
│   └── Program.cs
│
└── frontend
    └── controle-gastos-frontend
        ├── components
        ├── pages
        ├── services
        ├── styles
        ├── types
        ├── utils
        └── App.tsx
```

---

# ⚙️ Como Executar o Projeto

## Pré-requisitos

Certifique-se de possuir instalado em sua máquina:

- .NET SDK 10
- Node.js
- npm
- Git

---

## 1️⃣ Clonar o repositório

```bash
git clone git@github.com:edielson-assis/controle-de-gastos.git
```

---

## 2️⃣ Entrar na pasta do projeto

```bash
cd controle-de-gastos
```

---

## 3️⃣ Executar o Backend

Restaure as dependências:

```bash
dotnet restore
```

Execute a aplicação:

```bash
dotnet run
```

A API estará disponível em:

```
http://localhost:5000
```

Documentação Swagger:

```
http://localhost:5000/swagger/index.html
```

---

## 4️⃣ Executar o Frontend

Abra um novo terminal.

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Entre na pasta controle-gastos-frontend:

```bash
cd controle-gastos-frontend
```

Execute a aplicação:

```bash
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

---

# 🧪 Exemplos de Uso

## 🔹 Cadastrar Pessoa

### Requisição

```http
POST /persons
```

```json
{
  "name": "João Silva",
  "age": 25
}
```

### Resposta

```json
{
  "id": 1,
  "name": "João Silva",
  "age": 25
}
```

---

## 🔹 Excluir Pessoa

### Requisição

```http
DELETE /persons/1
```

### Resposta

```http
204 No Content
```

> **Observação:** Ao excluir uma pessoa, todas as transações associadas a ela também são removidas automaticamente do sistema.

---

## 🔹 Cadastrar Receita

### Requisição

```http
POST /transactions
```

```json
{
  "description": "Salário",
  "amount": 3500,
  "type": "Income",
  "personId": 1
}
```

### Resposta

```json
{
  "id": 1,
  "description": "Salário",
  "amount": 3500,
  "type": "Income",
  "personId": 1
}
```

---

## 🔹 Cadastrar Despesa

### Requisição

```http
POST /transactions
```

```json
{
  "description": "Supermercado",
  "amount": 450,
  "type": "Expense",
  "personId": 1
}
```

### Resposta

```json
{
  "id": 2,
  "description": "Supermercado",
  "amount": 450,
  "type": "Expense",
  "personId": 1
}
```

---

## 🔹 Consultar Relatório Geral

### Requisição

```http
GET /report
```

### Resposta

```json
{
  "persons": [
    {
      "personId": 1,
      "name": "João",
      "totalIncome": 3000,
      "totalExpense": 800,
      "balance": 2200
    },
    {
      "personId": 2,
      "name": "Maria",
      "totalIncome": 2000,
      "totalExpense": 1500,
      "balance": 500
    }
  ],
  "summary": {
    "totalIncome": 5000,
    "totalExpense": 2300,
    "balance": 2700
  }
}
```

---

# 📷 Demonstração

> Tela de cadastros:

<img width="1288" height="561" alt="image" src="https://github.com/user-attachments/assets/6c3e83a1-2044-4485-8780-d776a51bc270" />
<br><br>

> Listagem de pessoas:

<img width="1236" height="429" alt="image" src="https://github.com/user-attachments/assets/763b2996-dbd9-4ab8-a599-25211778c55f" />
<br><br>

> Listagem de transações:

<img width="1217" height="395" alt="image" src="https://github.com/user-attachments/assets/9e394ba0-362a-4746-8a15-e23aea298804" />
<br><br>

> Relatórios:

<img width="1221" height="643" alt="image" src="https://github.com/user-attachments/assets/cfd285c8-8762-4c3e-87c8-e490c8ebacc8" />



# 💡 Melhorias Futuras

- Toast para notificações
- Responsividade para dispositivos móveis
- Componentes reutilizáveis para Input e Select
- Tema escuro
- Testes automatizados
- Deploy da aplicação

---

# 🏗️ Arquitetura da Aplicação

```text
                Frontend (React)

                        │

                 Requisições HTTP

                        │

        ASP.NET Core Web API (.NET 10)

                        │

              Entity Framework Core

                        │

                    SQLite
```

---

# 👨‍💻 Autor

**Edielson Assis**

🔗 **LinkedIn:** https://www.linkedin.com/in/edielson-assis

---

> Projeto desenvolvido seguindo princípios de arquitetura em camadas, separação de responsabilidades, reutilização de componentes e boas práticas de desenvolvimento Full Stack.
>
> **"Código limpo é como uma história bem contada — fácil de ler, difícil de esquecer."**
