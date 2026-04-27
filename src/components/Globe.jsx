import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Globe() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = 500;
        const centerX = size / 2;
        const centerY = size / 2;
        const radius = 180;
        let rotation = 0;
        let animationFrameId;

        const drawGlobe = () => {

            // Limpa o canvas para o próximo frame (Garante a transparência)
            ctx.clearRect(0, 0, size, size);

            // Brilho interno do globo
            const gradient = ctx.createRadialGradient(
                centerX - 40,
                centerY - 40,
                0,
                centerX,
                centerY,
                radius
            );
            gradient.addColorStop(0, "rgba(139, 92, 246, 0.15)");
            gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.08)");
            gradient.addColorStop(1, "rgba(109, 40, 217, 0.02)");

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.strokeStyle = "rgba(167, 139, 250, 0.5)";
            ctx.lineWidth = 1.5;

            // Desenha as linhas verticais (Longitudes)
            for (let i = 0; i < 12; i++) {
                const angle = ((i * 30 + rotation) * Math.PI) / 180;
                const visible = Math.cos(angle);

                if (visible > -0.3) {
                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate(angle);
                    ctx.scale(Math.max(0.2, visible), 1);

                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI * 2);
                    ctx.globalAlpha = 0.2 + Math.max(0, visible) * 0.4;
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // Desenha as linhas horizontais (Latitudes)
            for (let lat = -60; lat <= 60; lat += 30) {
                const y = (Math.sin((lat * Math.PI) / 180) * radius);
                const currentRadius = Math.cos((lat * Math.PI) / 180) * radius;

                ctx.beginPath();
                ctx.ellipse(centerX, centerY + y, currentRadius, radius * 0.15, 0, 0, Math.PI * 2);
                ctx.globalAlpha = 0.25;
                ctx.stroke();
            }

            // Desenha os pontos luminosos
            ctx.globalAlpha = 1;
            for (let lat = -75; lat <= 75; lat += 20) {
                for (let lng = 0; lng < 360; lng += 20) {
                    const phi = (lat * Math.PI) / 180;
                    const theta = ((lng + rotation) * Math.PI) / 180;

                    const x = radius * Math.cos(phi) * Math.sin(theta);
                    const z = radius * Math.cos(phi) * Math.cos(theta);
                    const y = radius * Math.sin(phi);

                    if (z > -radius * 0.3) {
                        const scale = (z + radius) / (2 * radius);
                        const alpha = Math.max(0, (z + radius * 0.3) / (radius * 1.3));
                        const dotSize = 1.5 + scale * 1.5;

                        const dotGradient = ctx.createRadialGradient(
                            centerX + x, centerY - y, 0,
                            centerX + x, centerY - y, dotSize * 2
                        );
                        dotGradient.addColorStop(0, `rgba(196, 181, 253, ${alpha * 0.9})`);
                        dotGradient.addColorStop(1, `rgba(139, 92, 246, ${alpha * 0.3})`);

                        ctx.beginPath();
                        ctx.arc(centerX + x, centerY - y, dotSize, 0, Math.PI * 2);
                        ctx.fillStyle = dotGradient;
                        ctx.fill();
                    }
                }
            }

            // Borda externa
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(133, 97, 241, 0.83)";
            ctx.lineWidth = 2;
            ctx.globalAlpha = 1;
            ctx.stroke();

            rotation += 0.3; // Velocidade da rotação
            animationFrameId = requestAnimationFrame(drawGlobe);
        };

        drawGlobe();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
        >
            {/* Esse é o brilho de fundo */}
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-[100px] scale-75"></div>

            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="relative z-10"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
            />
        </motion.div>
    );
}