// Frontend/src/api/axiosConfig.js
import axios from 'axios';

// 1. Creamos una instancia de Axios con la URL base de nuestra API.
// Así no tendremos que escribir 'http://localhost:4000' cada vez.
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// 2. Creamos el interceptor. Esta función se ejecuta ANTES de cada petición.
api.interceptors.request.use(
  (config) => {
    // Leemos la información del usuario desde localStorage.
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Si el usuario está logueado (si userInfo y su token existen)...
    if (userInfo && userInfo.token) {
      // ...añadimos un 'header' de autorización a la petición.
      // Este es el formato estándar: 'Bearer TOKEN'.
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config; // Devolvemos la configuración modificada para que la petición continúe.
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;