/**
 * dashboardService.js
 * 
 * Serviço que faz chamadas HTTP para a API do dashboard
 * Centraliza toda a lógica de comunicação com o backend
 */

const envApi = import.meta.env.VITE_API_URL;
const API = envApi || (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin);

export const getDashboardOverview = async () => {
  if (!API) {
    throw new Error('VITE_API_URL is not defined. Configure it in Vercel environment variables to point to the backend URL.');
  }
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
