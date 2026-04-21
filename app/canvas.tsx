
"use client";
import "@excalidraw/excalidraw/index.css";
import LLM from "./LLM/llm";
import Drawing from "./drawing/drawing";

export default function Canvas() {
    return (
        <>
            <div >
                <div >
                    <Drawing url={"api/diagram"} />
                </div>

                <div >

                    <LLM />
                </div>
            </div>
        </>
    );
}


