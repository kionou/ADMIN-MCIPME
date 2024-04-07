<template >
  
     <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <PageHeader title="Partenaires" pageTitle="Tableau de bord" />
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            <div class="d-flex align-items-center">
              <BCardTitle class="mb-0 flex-grow-1">Liste des Partenaires</BCardTitle>

              <div class="flex-shrink-0 d-flex">
                <div @click="$router.push({ path: '/partenaires/ajouter' })"  class="btn btn-primary me-1">Ajouter</div>
                <BCol xxl="4" lg="6">
                <MazInput v-model="searchQuery"  no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
              </BCol>
              </div>
            </div>
          </BCardBody>
          <BCardBody v-if="paginatedItems.length === 0" class="noresul">
            <div >
          <span> Vous n'avez pas encore de personnel, vous pouvez également en ajouter un !! </span>
           </div>
          </BCardBody>

        <BCardBody v-else> 
          <div class="py-2 d-flex justify-content-center align-items-center flex-wrap">
            <div class="carde" v-for="partenaire in paginatedItems" :key="partenaire.id">
          <div class="carde-img">
      
            <img v-if="partenaire.logo === null" src="@/assets/img/ninba1.png" alt="">
          
          <img v-else :src="partenaire.logo" alt="">
     
    </div>
    <div class="carde-title">{{ partenaire.NomPartenaire }}</div>
    <div class="carde-subtitle">
      <p class="texte-content">Url: <span>{{ partenaire.SiteWeb }}</span></p>
      <p class="texte-content">Direction: <span>{{ partenaire.Direction }}</span></p>
    </div>
    <hr class="carde-divider">
    <div class="carde-footer">
      <ul class="list-unstyled hstack gap-1 mb-0">
                       
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <div @click="$router.push({ path: `/partenaires/update/${partenaire.CodePartenaire}` })" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></div>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <div @click="confirmDelete(partenaire.CodePartenaire)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
                       </li>
                       <!-- <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <router-link to="/jobs/job-details" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-lock-outline"></i></router-link>
                       </li> -->
                     </ul>
                   </div>
            </div>
           </div>
           <BRow>
              <BCol lg="12">
                <div class="container_pagination">
                  <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
                </div>
              </BCol>
            </BRow>
        </BCardBody>
          
          
        </BCard>
      </BCol>
    </BRow>


 
    

  </Layout>
</template>
<script>
 import Layout from "../../layouts/main.vue";
 import PageHeader from "@/components/page-header.vue";
 import {successmsg} from "@/lib/modal.js"
import Swal from 'sweetalert2'
import Pag from '@/components/others/pagination.vue'
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';


export default {
    components: {
    Layout,
    PageHeader,
    Loading ,
    Pag,
    
  },
 computed: {


totalPages() {
return Math.ceil(this.partenairesOptions.length / this.itemsPerPage);
},
paginatedItems() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.partenairesOptions.slice(startIndex, endIndex);
},
loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
},

data() {
    return {
        control: {
            name: '',

        },
         partenairesOptions:[],
         loading:true,
         data:'',
         currentPage: 1,
         itemsPerPage: 12,
    };
},


async  mounted() {
 await    this.fetchPartenaires()

},


methods: {
  updateCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
    });
  },
  successmsg:successmsg,
  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.partenairesOptions.slice(startIndex, endIndex);
  },
  async fetchPartenaires() {
    try {
              const response = await axios.get('/partenaires', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`, },
                params:{Direction:this.loggedInUser.direction}
    
            });
               console.log(response.data.data);
               this.partenairesOptions = response.data.data.data;
               this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
            }
},
async confirmDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas revenir en arrière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le!',
        cancelButtonText: 'Non, annulez!',
        reverseButtons: true
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        console.log(id);
        this.DeletePartenaire(id);
      }
          },
          async DeletePartenaire(id) {
           this.loading = true
          
          try {
            // Faites une requête pour supprimer l'élément avec l'ID itemId
               const response = await axios.delete(`/partenaires/${id}`, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
    
    
            });
            console.log('Réponse de suppression:', response);
            if (response.data.status === 'success') {
              this.loading = false
             this.successmsg('Supprimé!', 'Votre partenaire a été supprimé.')
            await this.fetchPartenaires()
    
            } else {
              console.log('error', response.data)
              this.loading = false
            }
          } catch (error) {
            console.error('Erreur lors de la suppression:', error);
           
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
            
          }
    
        },


  filterByName() {
this.currentPage = 1;
if (this.control.name !== null) {
   const tt = this.control.name;
  const  searchValue = tt.toLowerCase()
  this.partenairesOptions = [...this.$store.getters['getPartenaires']].filter(partenaire => {
    const codePartenaire = partenaire.CodePartenaire || '';
    const nomPartenaire = partenaire.NomPartenaire || '';
    return codePartenaire.toLowerCase().includes(searchValue) || nomPartenaire.toLowerCase().includes(searchValue);
  });

} else {
this.partenairesOptions = [...this.$store.getters['getPartenaires']];
 
}

},
},

}
</script>
<style lang="css" scoped>

.carde {
  
  width: 280px;
  height: 370px;
  background: var(--bg-color);
  border: 2px solid var(--color-primary);
  box-shadow: 4px 4px var(--color-primary);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  align-items: center;
  justify-content: center;
    margin-right: 20px;
    margin-bottom: 20px;
 
}

.carde:last-child {
  justify-content: flex-end;
}

.carde-img {
   /* border: 1px solid red; */
   width: 120px;
   height: 120px;
}

.carde-img img {

  width: 100%;
  height: 100%;

}



.carde-title {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #323232;
  
 
}

.carde-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #323232;
  width: 100%;
}

.carde-divider {
  width: 100%;
  border: 1px solid var(--color-primary);
  border-radius: 50px;
}

.carde-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.carde-price {
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color);
}

.carde-price span {
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-sub);
}

.card-btn {
  height: 35px;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  border-radius: 5px;
  padding: 0 15px;
  transition: all 0.3s;
}

.card-btn svg {
  width: 100%;
  height: 100%;
  fill: var(--main-color);
  transition: all 0.3s;
}



.card-btn:hover {
  border: 2px solid var(--main-focus);
}

.card-btn:hover svg {
  fill: var(--main-focus);
}

.card-btn:active {
  transform: translateY(3px);
}
.carde .carde-subtitle .texte-content {

font-weight: bold;
font-size: 13px;
margin-bottom: 10px !important;

}
i{

    font-size: 18px;

}
    
</style>