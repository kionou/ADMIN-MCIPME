// axiosConfig.js
import axios from 'axios';
import qs from 'qs';



// Créez une instance d'Axios avec la configuration souhaitée
// https://cors-proxy.fringe.zone/
// https://bd-mcipme.org/bd-services/public
const axiosInstance = axios.create({
  baseURL: 'https://cors-proxy.fringe.zone/https://bd-mcipme.org/bd-services/public/api',
  headers: {
    // 'Content-Type': 'application/json', 
    // 'Content-Type': 'multipart/form-data',
    // Type de contenu des requêtes
    // Vous pouvez ajouter d'autres en-têtes ici si nécessaire
  },
 
});



// Intercepteur de réponse (facultatif)
axiosInstance.interceptors.response.use(
  (response) => {
    // Vous pouvez effectuer des traitements supplémentaires sur la réponse ici
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exportez l'instance configurée d'Axios
export default axiosInstance;
