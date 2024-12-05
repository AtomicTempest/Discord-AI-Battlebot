const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: "",
    baseURL: "http://localhost:1234/v1"
})

export async function llmChat(systemPrompt: string, userPrompt: string): Promise<string>{

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        model: "local-model",
    });
    return chatCompletion.choices[0].message.content;
}

