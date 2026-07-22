import React, { useState, useEffect } from 'react';

export function DeepinAIEngine() {
    const [isFrontPurple, setIsFrontPurple] = useState(true);
    
    // Estado para armazenar os dados da fila inteligente
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAlertIndex, setSelectedAlertIndex] = useState(0);

    // Fetch da análise ao montar o componente
    useEffect(() => {
        fetchSmartQueueAnalysis();
    }, []);

    /**
     * Buscar análise da fila inteligente do backend
     */
    const fetchSmartQueueAnalysis = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtém o companyId (você pode pegar do contexto/store)
            // Por enquanto, usando um valor de exemplo
            const companyId = localStorage.getItem('companyId') || 'company-123';

            // ✅ Usar URL do backend (do .env)
            const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${backendUrl}/api/smart-queue/${companyId}`);

            if (!response.ok) {
                // Se falhar, tentar ler o erro
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro ${response.status}`);
                } else {
                    // Se não for JSON, provavelmente é um erro do servidor (HTML)
                    throw new Error(
                        `Erro ${response.status}: Verifique se o backend está rodando em ${backendUrl}`
                    );
                }
            }

            const data = await response.json();
            setAlerts(data.alerts || []);
        } catch (err) {
            setError(err.message);
            console.error('Erro ao buscar fila inteligente:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Forçar uma análise manual (quando usuário clica "Atualizar")
     */
    const handleRefreshAnalysis = async () => {
        try {
            setLoading(true);
            const companyId = localStorage.getItem('companyId') || 'company-123';
            
            // ✅ Usar URL do backend (do .env)
            const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

            const response = await fetch(`${backendUrl}/api/smart-queue/analyze/${companyId}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Erro ${response.status}`);
                } else {
                    throw new Error(
                        `Erro ${response.status}: Verifique se o backend está rodando em ${backendUrl}`
                    );
                }
            }

            const data = await response.json();
            setAlerts(data.alerts || []);
            setSelectedAlertIndex(0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Estado de carregamento
    if (loading) {
        return (
            <div className="w-full bg-white/60 text-white p-6 h-86 flex flex-col justify-between font-sans select-none shadow-2xl relative overflow-hidden rounded-[22px] border border-white/5">
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Carregando análise...</p>
                </div>
            </div>
        );
    }

    // Estado de erro
    if (error) {
        return (
            <div className="w-full bg-white/60 text-white p-6 h-86 flex flex-col justify-between font-sans select-none shadow-2xl relative overflow-hidden rounded-[22px] border border-white/5">
                <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">Erro: {error}</p>
                </div>
            </div>
        );
    }

    // Se não tem alertas
    if (alerts.length === 0) {
        return (
            <div className="w-full bg-white/60 text-white p-6 h-86 flex flex-col justify-between font-sans select-none shadow-2xl relative overflow-hidden rounded-[22px] border border-white/5">
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Nenhuma análise disponível</p>
                </div>
            </div>
        );
    }

    // Pegar o alerta atual
    const currentAlert = alerts[selectedAlertIndex];

    return (
        <div className="w-full bg-white/60 text-white p-6 h-86 flex flex-col justify-between font-sans select-none shadow-2xl relative overflow-hidden rounded-[22px] border border-white/5">

            {/* SVG CLIP PATH (mantém o mesmo do original) */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <clipPath id="apple-wallet-clip" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0 
                        L 1,0 
                        L 1,0.54
                     C 1,0.68 0.98,0.70 0.94,0.70 
                        L 0.77,0.70 
                        C 0.73,0.70 0.71,0.73 0.71,0.79 
                        L 0.71,0.86 
                     C 0.71,0.97 0.68,1 0.64,1 
                     L 0,1 
                     Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* CABEÇALHO */}
            <div className="flex justify-between items-start mb-2 z-30">
                <div>
                    <h2 className="text-2xl font-base tracking-tight text-black">Fila Inteligente!</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Verifique suas últimas automações.</p>
                </div>

                <button
                    onClick={() => setIsFrontPurple(!isFrontPurple)}
                    className="text-[11px] bg-[#16171D] hover:bg-[#22232B] border border-white/8 text-gray-300 font-medium px-4 py-1.5 rounded-full transition-all active:scale-95"
                    title="Alternar visualização"
                >
                    Alternar →
                </button>
            </div>

            {/* CONTAINER DOS CARTÕES */}
            <div className="relative flex-1 flex flex-col justify-end h-60 mt-4 w-full">

                {/* CARTÃO DE TRÁS - MÉTRICAS DO SISTEMA */}
                <div
                    className={`absolute top-0 left-0 right-0 h-38.75 bg-black rounded-3xl p-5 text-black flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isFrontPurple ? 'scale-[0.96] translateY(0px) opacity-100' : 'scale-100 translateY(30px) z-20'
                        }`}
                    style={{ zIndex: isFrontPurple ? 10 : 30 }}
                >
                    <div className="flex justify-between items-center w-full">
                        <span className="text-[12px] font-base tracking-wider text-white opacity-60">Status do Sistema | Taxa de Conversão</span>
                        <span className="w-2 h-2 bg-[#a3e635] rounded-full animate-pulse" />
                    </div>
                    <div>
                        <span className="text-2xl font-medium text-white tracking-tight">84.2%</span>
                    </div>
                    <div className="text-[11px] font-medium text-white/70">
                        Meta API está estável
                    </div>
                </div>

                {/* CARTÃO DA FRENTE - ALERTA ATUAL */}
                <div
                    className={`absolute left-2 right-0 bottom-0 h-43.75 w-95 bg-[#a3e635] text-black transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-5 pb-6 ${isFrontPurple ? 'scale-100 z-20' : 'scale-[0.96] -translate-y-11.25 opacity-100 z-10'
                        }`}
                    style={{
                        borderRadius: isFrontPurple ? '24px 24px 0px 24px' : '24px',
                        clipPath: isFrontPurple ? 'url(#apple-wallet-clip)' : 'none',
                    }}
                >
                    {/* Topo do Card */}
                    <div className="flex justify-between items-start w-full">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider bg-black/10 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                                {currentAlert.type.replace(/_/g, ' ')}
                            </span>
                        </div>
                        <span className="text-[11px] text-black/60 font-medium">
                            {new Date(currentAlert.analyzedAt).toLocaleDateString('pt-BR', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>

                    {/* Dados */}
                    <div className="my-1">
                        <span className="text-[12px] tracking-wider text-black/60 block font-medium">{currentAlert.title}</span>
                        <span className="text-3xl font-medium tracking-tight">{currentAlert.primaryMetric}</span>
                    </div>

                    {/* Rodapé Interno */}
                    <div className="w-[50%]">
                        <span className="text-[11px] text-black/80 font-medium block truncate">{currentAlert.description}</span>
                    </div>
                </div>

                {/* BOTÃO - ADD CARD ou PRÓXIMO ALERTA */}
                <div
                    className={`absolute bottom-1 right-1 z-30 transition-all duration-500 ${isFrontPurple ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                        }`}
                    style={{
                        marginRight: '2px',
                        marginBottom: '2px'
                    }}
                >
                    <button
                        onClick={() => {
                            // Se tem mais alertas, mostra o próximo
                            if (selectedAlertIndex < alerts.length - 1) {
                                setSelectedAlertIndex(selectedAlertIndex + 1);
                            } else {
                                // Se é o último, volta ao primeiro
                                setSelectedAlertIndex(0);
                            }
                        }}
                        className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white font-semibold text-[11px] px-3 h-9.5 rounded-full flex items-center gap-1.5 border border-white/4 shadow-xl transition-transform active:scale-95"
                        title={`Alerta ${selectedAlertIndex + 1} de ${alerts.length}`}
                    >
                        <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs">
                            {alerts.length > 1 ? '→' : '+'}
                        </span>
                        {alerts.length > 1 ? `${selectedAlertIndex + 1}/${alerts.length}` : 'Add Card'}
                    </button>
                </div>

            </div>

        </div>
    );
}

export default DeepinAIEngine;