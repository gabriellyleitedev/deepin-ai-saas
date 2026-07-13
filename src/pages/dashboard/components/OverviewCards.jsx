import React, { useState, useEffect } from 'react';

export default function OverviewCards() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/dashboard")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCards(data.cards);
            });
    }, []);

    console.log(cards);

    return (

        <div className="grid grid-cols-5 gap-4 mt-2 ml-10">

            {/* CARD 1: AGENTES */}
            <div className="relative w-full h-24 font-sans select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.02)] group">
                {/* BACKGROUND CARD COM A CURVA ORGÂNICA INVERSA */}
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 360 96" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" fill="rgba(255, 255, 255, 0.65)" className="backdrop-blur-md" />
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" stroke="rgba(243, 244, 246, 0.6)" strokeWidth="1" />
                    </svg>
                </div>
                {/* BOTÃO CIRCULAR FLUTUANTE */}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#EEEFEF] flex items-center justify-center shadow-[0_8px_16px_-3px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] cursor-pointer hover:bg-gray-200 transition-colors z-20">
                    <svg className="w-3.5 h-3.5 text-black transform transition-transform duration-300 ease-out animate-[bounce_3s_infinite] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
                {/* CONTEÚDO TEXTUAL */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full w-[75%]">
                    <span className="text-[12px] font-medium text-gray-400 tracking-wider">{cards[0]?.title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-base tracking-tight text-[#1C1F22]">{cards[0]?.value}</span>
                        <span className="text-[11px] font-medium text-[#a3e635] bg-black px-2 py-0.5 rounded-full">{cards[0]?.trend}</span>
                    </div>
                </div>
            </div>

            {/* CARD 2: LEADS CAPTADOS */}
            <div className="relative w-full h-24 font-sans select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.02)] group">
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 360 96" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" fill="rgba(255, 255, 255, 0.65)" className="backdrop-blur-md" />
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" stroke="rgba(243, 244, 246, 0.6)" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#EEEFEF] flex items-center justify-center shadow-[0_8px_16px_-3px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] cursor-pointer hover:bg-gray-200 transition-colors z-20">
                    <svg className="w-3.5 h-3.5 text-black transform transition-transform duration-300 ease-out animate-[bounce_3s_infinite] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-between h-full w-[75%]">
                    <span className="text-[12px] font-medium text-gray-400 tracking-wider">{cards[1]?.title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-base tracking-tight text-[#1C1F22]">{cards[1]?.value}</span>
                        <span className="text-[11px] font-medium text-[#a3e635] bg-black px-2 py-0.5 rounded-full">{cards[1]?.trend}</span>
                    </div>
                </div>
            </div>

            {/* CARD 3: EXECUÇÕES */}
            <div className="relative w-full h-24 font-sans select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.02)] group">
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 360 96" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" fill="rgba(255, 255, 255, 0.65)" className="backdrop-blur-md" />
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" stroke="rgba(243, 244, 246, 0.6)" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#EEEFEF] flex items-center justify-center shadow-[0_8px_16px_-3px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] cursor-pointer hover:bg-gray-200 transition-colors z-20">
                    <svg className="w-3.5 h-3.5 text-black transform transition-transform duration-300 ease-out animate-[bounce_3s_infinite] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-between h-full w-[75%]">
                    <span className="text-[12px] font-medium text-gray-400 tracking-wider">{cards[2]?.title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-base tracking-tight text-[#1C1F22]">{cards[2]?.value}</span>
                        <span className="text-[13px] text-gray-400 font-medium">{cards[2]?.trend}</span>
                    </div>
                </div>
            </div>

            {/* CARD 4: ECONOMIA */}
            <div className="relative w-full h-24 font-sans select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.02)] group">
                <div className="absolute inset-0 z-0">
                    <svg className="w-full h-full" viewBox="0 0 360 96" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" fill="rgba(255, 255, 255, 0.65)" className="backdrop-blur-md" />
                        <path d="M 22 0 L 290 0 C 300 0, 304 4, 308 12 C 312 20, 316 28, 326 32 C 332 34, 338 34, 344 34 L 360 34 L 360 74 C 360 86, 350 96, 338 96 L 22 96 C 10 96, 0 86, 0 74 L 0 22 C 0 10, 10 0, 22 0 Z" stroke="rgba(243, 244, 246, 0.6)" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#EEEFEF] flex items-center justify-center shadow-[0_8px_16px_-3px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] cursor-pointer hover:bg-gray-200 transition-colors z-20">
                    <svg className="w-3.5 h-3.5 text-black transform transition-transform duration-300 ease-out animate-[bounce_3s_infinite] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
                <div className="relative z-10 p-5 flex flex-col justify-between h-full w-[75%]">
                    <span className="text-[12px] font-medium text-gray-400 tracking-wider">{cards[3]?.title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-base tracking-tight text-[#1C1F22]">{cards[3]?.value}</span>
                        <span className="text-[13px] text-gray-400 font-medium">{cards[3]?.trend}</span>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-24 font-sans select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.02)] group">

                {/* BACKGROUND CARD COM A CURVA ORGÂNICA INVERSA EXATA DA SUA IMAGEM */}
                <div className="absolute inset-0 z-0">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 360 96"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* O path desenha a base do card fazendo a curva perfeita para baixo contornando o círculo */}
                        <path
                            d="M 22 0 
           L 290 0 
           C 300 0, 304 4, 308 12 
           C 312 20, 316 28, 326 32 
           C 332 34, 338 34, 344 34 
           L 360 34 
           L 360 74 
           C 360 86, 350 96, 338 96 
           L 22 96 
           C 10 96, 0 86, 0 74 
           L 0 22 
           C 0 10, 10 0, 22 0 Z"
                            fill="rgba(255, 255, 255, 0.65)"
                            className="backdrop-blur-md"
                        />
                        {/* Linha de borda milimétrica cinza clara seguindo o mesmo desenho */}
                        <path
                            d="M 22 0 
           L 290 0 
           C 300 0, 304 4, 308 12 
           C 312 20, 316 28, 326 32 
           C 332 34, 338 34, 344 34 
           L 360 34 
           L 360 74 
           C 360 86, 350 96, 338 96 
           L 22 96 
           C 10 96, 0 86, 0 74 
           L 0 22 
           C 0 10, 10 0, 22 0 Z"
                            stroke="rgba(243, 244, 246, 0.6)"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* BOTÃO CIRCULAR NO VÃO DA CURVA COM ANIMAÇÃO NA SETA */}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#EEEFEF] flex items-center justify-center shadow-[0_8px_16px_-3px_rgba(0,0,0,0.20),0_4px_8px_-2px_rgba(0,0,0,0.09)] cursor-pointer hover:bg-gray-200 transition-colors z-20">
                    <svg
                        className="w-3.5 h-3.5 text-black transform transition-transform duration-300 ease-out animate-[bounce_3s_infinite] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>

                {/* CONTEÚDO TEXTUAL DO CARD */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full w-[75%]">
                    <span className="text-[12px] font-medium text-gray-400 tracking-wider">{cards[3]?.title}</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-normal tracking-tight text-[#1C1F22]">{cards[3]?.value}</span>
                        <span className="text-[13px] text-gray-400 font-medium">{cards[3]?.trend}</span>
                    </div>
                </div>
            </div>


        </div>

    )

}