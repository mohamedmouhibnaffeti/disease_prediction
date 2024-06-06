export const flask_backend_route = "http://127.0.0.1:5000"
// utils/baseUrl.js

export function getBaseUrl() {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    } else {
      return "";
    }
  }
  
export const next_backend_route = "http://localhost:3030/api"