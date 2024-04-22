// Dans votre fichier JavaScript (par exemple, axiosConfig.js)
import axios from '@/lib/axiosConfig.js';
import store from "@/store";
const authenticatedUser = store.getters["auth/myAuthenticatedUser"];
console.log("menu", authenticatedUser);

// export async function fetchSousCategorieProduit() {
//     try {
//         const response = await axios.get('/sous-produits', {
//                 headers: { Authorization: `Bearer ${authenticatedUser.token}`,},
//                 params: {
//                   with_products: false,
//                       parent: true
//           }
      
//               });
//                  console.log(response.data);
//                  this.SousCategorieOptions = response.data.data;
//                  this.loading = false;
              
//               } catch (error) {
//                 console.error('errorqqqqq',error);
              
            //     if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            //       await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            //     this.$router.push("/");  //a revoir
            //   }
            //   }
//   }

export async function fetchSousCategorieProduit() {
    const apiUrl = "https://bd-mcipme.org/bd-services/public/api/sous-produits";
    const token = "Votre jeton d'accès ici"; // Remplacez cela par votre véritable jeton d'accès
  
    try {
      // Construction de l'URL avec les paramètres
      const apiUrlWithParams = new URL(apiUrl);
    //    apiUrlWithParams.searchParams.append('parent', true);
       apiUrlWithParams.searchParams.append('with_products', false);
  
      // Configuration de l'en-tête d'autorisation
      const headers = {
        'Authorization': `Bearer ${authenticatedUser.token}`
      };
  
      // Utilisation de fetch avec l'URL complète et les en-têtes
      const response = await fetch(apiUrlWithParams, {
        method: 'GET',
        headers: headers
      });
  
      const data = await response.json();
      console.log('response', data);
      return data.data.data; // Retourne uniquement la partie 'data' de la réponse
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
