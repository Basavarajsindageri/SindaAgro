const BASE_URL = '/api/v1';

export const getAuthToken = () => localStorage.getItem('sindaagro_token');
export const setAuthToken = (token) => localStorage.setItem('sindaagro_token', token);
export const removeAuthToken = () => localStorage.removeItem('sindaagro_token');

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    let errorMsg = data.message || 'API request failed';
    if (data.data && typeof data.data === 'object' && Object.keys(data.data).length > 0) {
      const fieldErrors = Object.values(data.data).join(', ');
      if (!errorMsg.includes(fieldErrors)) {
        errorMsg = `${errorMsg}: ${fieldErrors}`;
      }
    }
    throw new Error(errorMsg);
  }

  return data;
};

export const api = {
  // Health
  checkHealth: () => fetch('/api/health').then(res => res.json()),

  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  phoneLogin: (payload) => request('/auth/phone-login', { method: 'POST', body: JSON.stringify(payload) }),

  // Farmer
  getFarmerProfile: () => request('/farmers/me'),
  saveFarmerProfile: (payload) => request('/farmers/me', { method: 'POST', body: JSON.stringify(payload) }),

  // Farm Plots
  getFarms: () => request('/farms'),
  createFarm: (payload) => request('/farms', { method: 'POST', body: JSON.stringify(payload) }),
  deleteFarm: (id) => request(`/farms/${id}`, { method: 'DELETE' }),

  // Soil & Testing Service
  submitSoilReport: (payload) => request('/soil', { method: 'POST', body: JSON.stringify(payload) }),
  getLatestSoilReport: (farmId) => request(`/soil/farm/${farmId}/latest`),
  getSoilTesters: (district = '') => request(`/soil/testers${district ? `?district=${district}` : ''}`),
  orderSoilTest: (payload) => request('/soil/orders', { method: 'POST', body: JSON.stringify(payload) }),

  // AI Assistant Chatbot
  chatWithAssistant: (payload) => request('/assistant/chat', { method: 'POST', body: JSON.stringify(payload) }),

  // Recommendations & Master Decision
  getCropRecommendations: (farmId, season = 'KHARIF') => request(`/recommendations/farm/${farmId}?season=${season}`),
  getFarmingPlan: (farmId) => request(`/farming-plans/farm/${farmId}`),
  createFarmingPlan: (payload) => request('/farming-plans', { method: 'POST', body: JSON.stringify(payload) }),
  getMarketAlternatives: (farmId) => request(`/market/alternatives/farm/${farmId}`),
  getWeatherRiskReport: (farmId, cropId = '') => request(`/weather/risk/farm/${farmId}?cropId=${cropId}`),
  getMasterCropDecision: (farmId, season = 'KHARIF') => request(`/decision/farm/${farmId}?season=${season}`),
  getTechnologyRecommendations: (farmId) => request(`/technology/farm/${farmId}`)
};
