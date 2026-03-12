import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const analyzeTicket = async (ticket) => {
    try {
        console.log("🚀 Sending request to Groq AI...");
        
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is missing from .env!");
        }

        // Initialize Groq
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const prompt = `You are a ticket triage agent.
        Analyze the following support ticket and provide a JSON object with:
        - summary: A short 1-2 sentence summary of the issue.
        - priority: One of "low", "medium", or "high".
        - helpfulNotes: A detailed technical explanation that a moderator can use to solve the issue.
        - relatedSkills: An array of relevant skills required to solve it (e.g., ["React", "MongoDB"]).

        Respond ONLY with a valid JSON object. 

        Ticket Title: ${ticket.title}
        Ticket Description: ${ticket.description}`;

        // Ask Groq's Llama 3 model
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant", // Super fast, free model
            response_format: { type: "json_object" },
        });

        const text = chatCompletion.choices[0]?.message?.content || "";
        
        console.log("✅ Received JSON from Groq AI!");
        
        return JSON.parse(text);

    } catch (e) {
        console.error("❌ Failed to communicate with AI:", e.message);
        return null; 
    }
};

export default analyzeTicket;