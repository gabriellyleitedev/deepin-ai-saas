/**
 * dashboardService.js
 * 
 * Serviço que faz chamadas HTTP para a API do dashboard
 * Centraliza toda a lógica de comunicação com o backend
 */

const API_URL = 'http://localhost:3000/api/dashboard';

export const getDashboardOverview = async () => {
  try {
    const response = await fetch(`${API_URL}/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: adicionar token JWT aqui depois
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // retorna só a parte "data" do JSON
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    throw error;
  }
};
