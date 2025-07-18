import { useEffect, useState } from "react";

export default function AnimatedTextCorrection({
    baseText = "Bonjour je suis ",
    oldWord = "Nox",
    newWord = "Vincent Bourjat",
    typingSpeedBase = 75,
    typingSpeedWord = 150,
    deletingSpeed = 75,
    pauseDuration = 500,
    style = {},
    cursorStyle = {},
}) {
    const [displayedBase, setDisplayedBase] = useState("");
    const [displayedWord, setDisplayedWord] = useState("");
    const [mode, setMode] = useState("typingBase");
    const [index, setIndex] = useState(0);

    // Taper baseText
    useEffect(() => {
        if (mode !== "typingBase") return;

        if (index < baseText.length) {
            const timeout = setTimeout(() => {
                setDisplayedBase((prev) => prev + baseText[index]);
                setIndex(index + 1);
            }, typingSpeedBase);
            return () => clearTimeout(timeout);
        } else {
            setMode("typingOld");
            setIndex(0);
        }
    }, [mode, index, baseText, typingSpeedBase]);

    // Taper oldWord
    useEffect(() => {
        if (mode !== "typingOld") return;

        if (index < oldWord.length) {
            const timeout = setTimeout(() => {
                setDisplayedWord((prev) => prev + oldWord[index]);
                setIndex(index + 1);
            }, typingSpeedWord);
            return () => clearTimeout(timeout);
        } else {
            setMode("pause");
        }
    }, [mode, index, oldWord, typingSpeedWord]);

    // Pause avant effacer
    useEffect(() => {
        if (mode !== "pause") return;

        const timeout = setTimeout(() => {
            setMode("deleting");
            setIndex(oldWord.length);
        }, pauseDuration);
        return () => clearTimeout(timeout);
    }, [mode, pauseDuration, oldWord.length]);

    // Effacer oldWord lettre par lettre
    useEffect(() => {
        if (mode !== "deleting") return;

        if (index > 0) {
            const timeout = setTimeout(() => {
                setDisplayedWord((prev) => prev.slice(0, -1));
                setIndex(index - 1);
            }, deletingSpeed);
            return () => clearTimeout(timeout);
        } else {
            setMode("typingNew");
            setIndex(0);
        }
    }, [mode, index, deletingSpeed]);

    // Taper newWord
    useEffect(() => {
        if (mode !== "typingNew") return;

        if (index < newWord.length) {
            const timeout = setTimeout(() => {
                setDisplayedWord((prev) => prev + newWord[index]);
                setIndex(index + 1);
            }, typingSpeedWord);
            return () => clearTimeout(timeout);
        } else {
            setMode("done");
        }
    }, [mode, index, newWord, typingSpeedWord]);

    return (
        <div style={{ fontFamily: "synemono", fontSize: 48, color: "#C41E3A", ...style }}>
            {displayedBase}
            <span style={{ borderRight: "2px solid black", paddingRight: 2, ...cursorStyle }}>
                {displayedWord}
            </span>
        </div>
    );
}
