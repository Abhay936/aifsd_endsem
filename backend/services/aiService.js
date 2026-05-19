const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL,
});

exports.analyzeComplaint = async (title, description, category) => {
    try {
        const prompt = `
        Analyze the following complaint and provide:
        1. Priority (Low, Medium, High)
        2. Department (e.g., Water Department, Sanitation Department, Electricity Department, IT, HR, Maintenance, etc.)
        3. Summary (A brief 1-2 sentence summary of the issue)
        4. Response (A professional, polite, and reassuring auto-response message for the user acknowledging the issue and giving a basic expectation)

        Complaint Title: ${title}
        Complaint Description: ${description}
        Category: ${category}

        Respond ONLY with a valid JSON object in this exact format:
        {
            "priority": "High",
            "department": "Water Department",
            "summary": "...",
            "response": "..."
        }
        `;

        // Use a fast and cost-effective model on OpenRouter, like google/gemini-flash-1.5 or openai/gpt-3.5-turbo
        // According to user's OpenRouter API key, we can use a free/cheap model. Let's use meta-llama/llama-3-8b-instruct:free or google/gemini-pro-1.5
        // Using "google/gemini-2.5-flash" as it's the requested model for this project or similar
        const response = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash", 
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const resultText = response.choices[0].message.content;
        return JSON.parse(resultText);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        // Fallback if AI fails
        return {
            priority: "Medium",
            department: "General Support",
            summary: description.substring(0, 100) + "...",
            response: "Thank you for your complaint. Our team will review it shortly."
        };
    }
};
