import { useEffect, useState } from 'react';

export function useAudioAnalyser(audioRef: React.RefObject<HTMLAudioElement>) {
    const [bassLevel, setBassLevel] = useState(0);

    useEffect(() => {
        if (!audioRef.current) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const context = new AudioContextClass();
        const analyser = context.createAnalyser();
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 256;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10 / 255;
            setBassLevel(bass);
            requestAnimationFrame(tick);
        };

        tick();

        return () => {
            source.disconnect();
            analyser.disconnect();
        };
    }, [audioRef]);

    return { bassLevel };
}
