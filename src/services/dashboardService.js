/**
 * dashboardService.js
 * 
 * Serviço que faz chamadas HTTP para a API do dashboard
 * Centraliza toda a lógica de comunicação com o backend
 */

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getDashboardOverview = async () => {
  try {
    const response = await fetch(`${API}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    // API retorna o objeto completo do dashboard. Normaliza para facilitar o consumo.
    return data;
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    throw error;
  }
};
