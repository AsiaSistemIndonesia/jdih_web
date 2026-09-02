import axios from 'axios';

// Function to safely get a cookie value on the client side
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export const createApiClient = (servicePrefix: string) => {
  const api = axios.create({
    baseURL: (process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api') + servicePrefix,
  });
  

  // Intercept every request to inject the Authorization header
  api.interceptors.request.use((config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Optional: Intercept responses to handle 401/403 globally
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response?.status === 401) {
  //       // Handle unauthorized (e.g., clear cookie and redirect)
  //       if (typeof document !== 'undefined') {
  //         document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //         window.location.href = '/auth';
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return api;
};
