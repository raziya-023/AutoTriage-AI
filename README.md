# AutoTriage AI 🤖🎫

An intelligent, event-driven customer support ticketing system. 
This full-stack application allows users to submit support tickets, which are then automatically analyzed, prioritized, and assigned to the correct staff member using an AI Agent running in the background.

## ✨ Key Features

* **AI-Powered Triage:** Integrates with **Groq (Llama 3.1)** to automatically read tickets, generate a summary, determine priority (Low/Medium/High), and list required technical skills.
* **Event-Driven Background Jobs:** Uses **Inngest** to process AI requests asynchronously, ensuring the frontend remains lightning-fast for the user.
* **Smart Auto-Assignment:** The system automatically scans the database for a Moderator with the exact skills the AI recommended, and assigns the ticket to them.
* **Role-Based Access Control (RBAC):** Secure JWT authentication with three distinct roles (`User`, `Moderator`, `Admin`).
* **Admin Dashboard:** Admins can view all tickets, manage users, and assign specific skills to moderators.
* **Email Notifications:** Simulates sending welcome and assignment emails using **Mailtrap**.

## 🛠️ Tech Stack

**Frontend:**
* React.js + Vite
* React Router DOM
* Tailwind CSS + DaisyUI

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) & Bcrypt

**AI & Tooling:**
* **Groq SDK** (Llama-3.1-8b-instant model)
* **Inngest** (Event-driven background jobs)
* **Mailtrap** (Email testing)

---

## 🚀 How It Works (The Architecture)

1. A User creates a new support ticket on the React frontend.
2. The Express backend saves the ticket to MongoDB as `TODO` and fires a `ticket/created` event to Inngest.
3. Express immediately responds to the user (No loading screens!).
4. In the background, **Inngest** picks up the event and sends the ticket data to **Groq AI**.
5. The AI returns a strict JSON object containing the priority, helpful notes, and required skills.
6. Inngest updates the database with the AI's notes, changes the status to `IN_PROGRESS`, and auto-assigns a Moderator.

---

## 💻 Local Setup & Installation

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB (local or Atlas)
- Groq API key
- Mailtrap account (for email)

---

### 1. Clone the Repository
```bash
git clone https://github.com/raziya-023/AutoTriage-AI
cd AutoTriage-AI
```

---

### 2. Backend Setup
```bash
cd AI-Agent-Backend
npm install
```

Create a `.env` file in the `AI-Agent-Backend` folder:
```env
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Inngest Local Dev Keys
INNGEST_EVENT_KEY=local
INNGEST_SIGNING_KEY=local

# Groq AI
GROQ_API_KEY=your_groq_api_key

# Mailtrap
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password
```

---

### 3. Frontend Setup

Open a new terminal window:
```bash
cd AI-Agent-Frontend
npm install
```

Create a `.env` file in the `AI-Agent-Frontend` folder:
```env
VITE_SERVER_URL=http://localhost:3000/api
```

---

### 4. Running the Application

This project uses an event-driven architecture and requires **3 terminal windows** running simultaneously.

**Terminal 1 — Start the Inngest Background Server:**
```bash
cd AI-Agent-Backend
npx inngest-cli@latest dev
```

**Terminal 2 — Start the Express Backend:**
```bash
cd AI-Agent-Backend
npm run dev
```

**Terminal 3 — Start the React Frontend:**
```bash
cd AI-Agent-Frontend
npm run dev
```

Open your browser and navigate to **http://localhost:5173**

---

### 👑 Admin Setup (First Time Only)

By default, all new signups are standard users. To access the Admin Panel:

1. Sign up for an account on the frontend.
2. Open your MongoDB database (via Compass or Atlas).
3. Find your user document in the `users` collection.
4. Change the `role` field from `"user"` to `"admin"`.
5. Log out and log back in on the frontend to reveal the **Admin Dashboard**.

