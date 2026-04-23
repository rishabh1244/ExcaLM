import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { gen_prompt } from "./prompt";
import { createClient } from "@/app/auth/supabase/server";

export async function POST(request) {
    const { USER_CONCEPT, LLM } = await request.json();

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
   
    console.log(user);

    if (!user || error) {
        return NextResponse.json({error : 'Unauthorized'}, {status : 401});
    }
    
    console.log("using model :", LLM);
    console.log("recived ", USER_CONCEPT);

    const prompt = gen_prompt(USER_CONCEPT);
 
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    let raw;
    try {
        raw = data.choices[0].message.content;
    }
    catch {
        console.log("Model is paid");
    }

    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();

    const diagram = JSON.parse(cleaned); 
    console.log(diagram.type);
    fs.writeFileSync(filePath, JSON.stringify(diagram, null, 2), 'utf-8') 
    console.log("diagram written");
    return NextResponse.json({ diagram });
    
}


