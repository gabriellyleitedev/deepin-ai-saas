import { useEffect, useState } from "react";

export default function DotGridBackground() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed -top-3 inset-x-0 bottom-0 bg-black pointer-events-none ">

            {/* 1. LAYER FIXA (Pontinhos sutis visíveis no fundo) */}
            <div
                className="absolute inset-0 opacity-[0.70]"
                style={{
                    backgroundImage: `radial-gradient(rgba(168, 85, 247, 0.6) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                }}
            />

            {/* 2. LAYER INTERATIVA (Acende no Mouse) */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage: `radial-gradient(rgba(168, 85, 247, 0.9) 1.5px, transparent 1.5px)`, // Pontos mais vivos
                    backgroundSize: '30px 30px',
                    WebkitMaskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                    maskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                }}
            />

            {/* 3. LUZ DO MOUSE (Lanterna) */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.1), transparent 70%)`
                }}
            />

            {/* 4. GROUNDING GLOW (A "Sombra de Luz" debaixo do globo) */}
            <div
                className="absolute right-[10%] bottom-[20%] w-[500px] h-[150px] rounded-[100%] z-0 blur-[80px]"
                style={{
                    background: 'radial-gradient(50% 50% at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 100%)',
                    transform: 'rotate(-5deg)'
                }}
            />

            {/* 5. BACKLIGHT (O rastro que faz o globo saltar da tela) */}
            <div
                className="absolute right-[15%] top-[25%] w-[400px] h-[400px] rounded-full z-0 blur-[100px] opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}