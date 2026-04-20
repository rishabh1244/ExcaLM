import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { gen_prompt } from "./prompt";
export async function POST(request) {
    const { USER_CONCEPT ,LLM } = await request.json();
    console.log ("using model :" , LLM); 
    console.log("recived ", USER_CONCEPT);

    const prompt = gen_prompt(USER_CONCEPT);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify({
                "model": LLM,
                "messages": [
                    { "role": "user", "content": prompt }
                ]
        })
    });
    const filePath = path.join(process.cwd(), 'app', 'data', 'diagram.json')

    const data = await response.json();

    let raw ;
    try{
        raw = data.choices[0].message.content;
    }
    catch{
        console.log ("Model is paid")        ;
    }

    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();

    const diagram = JSON.parse(cleaned); // now it's a real object
    console.log(diagram.type);
    fs.writeFileSync(filePath, JSON.stringify(diagram, null, 2), 'utf-8') // ✅ write the diagram
    console.log("diagram written");
    return NextResponse.json({ diagram });
}


