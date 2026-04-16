"use client";
import { useState } from "react";
import styles from "./llm.module.css";


export default function LLM() {
    const [prompt, setPrompt] = useState("");
    const [LLM, SelectLLM] = useState("");

    const handleLLM = (e) => {
        console.log(e.target.value);
        SelectLLM(e.target.value);
    }
    const handleSubmit = () => {
        if (!prompt.trim()) return;

        async function sendReq() {

            const output = await fetch('/api/llm', {
                method: "POST",
                body: JSON.stringify({
                    "USER_CONCEPT": prompt,
                    "LLM" : LLM
                })
            })
            const data = await output.json();
            console.log(data);
            window.dispatchEvent(new Event("diagram-updated"));


        }
        sendReq();
        setPrompt("");
    };

    return (
        <div className={styles.sidebox}>
            <div className={styles.input_bar}>
                <textarea
                    placeholder="please enter your prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <button className={styles.submit_button} onClick={handleSubmit}>
                    Send
                </button>

                <select name="LLMS" id="llms" onClick={handleLLM}>
                    <option value="google/gemini-2.0-flash-001">gemini-2.0-flash-001</option>
                    <option value="qwen/qwen3-coder:free">qwen3-coder</option>
                    <option value="nvidia/nemotron-3-super-120b-a12b:free">nemotron</option>
                    <option value="z-ai/glm-4.5-air:free">glm</option>
                </select>

            </div>
        </div>
    );
}

