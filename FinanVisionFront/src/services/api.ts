export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5024";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  
  const token = localStorage.getItem("finanvision_token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Even if status is not ok, we try to parse the envelope
    const data: ApiResponse<T> = await response.json().catch(() => null);
    
    if (!response.ok) {
      if (data && data.message) {
        throw new Error(data.message);
      }
      if (response.status === 401) {
        localStorage.removeItem("finanvision_token");
        window.location.href = "/login";
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    if (data && data.success === false) {
      throw new Error(data.message || "Erro desconhecido.");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão.");
    }
    throw error;
  }
}

export const api = {
  get: <T = any>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T = any>(endpoint: string, body?: any) => request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T = any>(endpoint: string, body?: any) => request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T = any>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
