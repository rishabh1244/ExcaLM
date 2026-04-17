
"use client";
import "@excalidraw/excalidraw/index.css";
import LLM from "./LLM/llm";
import styles from "./page.module.css"
import Drawing from "./drawing/drawing";

export default function Canvas() {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.anim}>

                <Drawing url={"api/diagram"} />
                </div>
                <div className={styles.llm}>

                    <LLM />
                </div>
            </div>
        </>
    );
}


