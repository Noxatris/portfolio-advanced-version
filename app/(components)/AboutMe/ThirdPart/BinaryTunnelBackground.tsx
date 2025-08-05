"use client";

import { useMemo } from "react";

const generateLine = (length: number) =>
    Array.from({ length }, () =>
        Math.random() > 0.2 ? (Math.random() > 0.5 ? "0" : "1") : " "
    ).join("");

const NUM_LINES = 30;

const asciiDoor = [
  "╔═════════════════════╗",
  "║ ▓▓▓▓  ACCÈS   ▓▓▓▓  ║",
  "║ ▓▓▓▓ INTERDIT ▓▓▓▓  ║",
  "║ ░░░░░░░░░░░░░░░░░░  ║",
  "║ [ SYSTEM LOCKED ]   ║",
  "║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ║",
  "║    CODE: ████░░░░   ║",
  "╚═════════════════════╝",
];

export default function BinaryFlowBackground() {
    const verticalLines = useMemo(
        () => Array.from({ length: NUM_LINES }, () => generateLine(40)),
        []
    );

    const horizontalLines = useMemo(
        () => Array.from({ length: NUM_LINES }, () => generateLine(80)),
        []
    );

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-black text-green-400 font-mono text-sm sm:text-base pointer-events-none">
            {/* Brèche centrale */}
            {/* Brèche ASCII */}
            <div className="absolute inset-0 flex items-center justify-center -z-30 opacity-45 pointer-events-none">
                <pre className="text-red-500 text-[12px] sm:text-[14px] md:text-[16px] leading-4 sm:leading-5 md:leading-6 font-mono text-center backdrop-blur-md bg-black/80 p-4 rounded-lg shadow-[0_0_30px_#ff000044] border border-red-700 animate-pulse">
                    {asciiDoor.join("\n")}
                </pre>
            </div>

            {/* Vertical flow */}
            {verticalLines.map((line, i) => (
                <div
                    key={`v-${i}`}
                    className="absolute whitespace-pre animate-verticalFlow"
                    style={{
                        left: `${(i / NUM_LINES) * 100}%`,
                        top: "-200px",
                        animationDelay: `${(i % 5) * 1.2}s`,
                        animationDuration: `${5 + Math.random() * 4}s`,
                        writingMode: "vertical-rl",
                    }}
                >
                    {line}
                </div>
            ))}

            {/* Horizontal flow */}
            {horizontalLines.map((line, i) => (
                <div
                    key={`h-${i}`}
                    className="absolute whitespace-pre animate-horizontalFlow"
                    style={{
                        top: `${(i / NUM_LINES) * 100}%`,
                        left: "-1000px",
                        animationDelay: `${(i % 5) * 1.3}s`,
                        animationDuration: `${6 + Math.random() * 3}s`,
                    }}
                >
                    {line}
                </div>
            ))}

            <style jsx>{`
        @keyframes verticalFlow {
          0% {
            transform: translateY(-200px);
            opacity: 0.1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0.4;
          }
        }

        @keyframes horizontalFlow {
          0% {
            transform: translateX(-1000px);
            opacity: 0.1;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0.4;
          }
        }

        .animate-verticalFlow {
          animation-name: verticalFlow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-horizontalFlow {
          animation-name: horizontalFlow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}
