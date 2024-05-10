import { env } from "@/env";

export const api = Object.assign(
  {},
  {
    get: async (url: string, body?: any) => fetchData(url, body, "GET"),
    post: async (url: string, body?: any) => fetchData(url, body, "POST"),
    put: async (url: string, body?: any) => fetchData(url, body, "PUT"),
    patch: async (url: string, body?: any) => fetchData(url, body, "PATCH"),
    delete: async (url: string, body?: any) => fetchData(url, body, "DELETE"),
  }
);

async function fetchData(url: string, body: any, method: string) {
  try {
    const response = await fetch(`${env.API_URL}/${url}`, {
      method,
      body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
