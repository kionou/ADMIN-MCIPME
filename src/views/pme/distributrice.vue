<template >
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Entreprises Distributrices" pageTitle="Tableau de bord" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center">
             <BCardTitle class="mb-0 flex-grow-1">Liste des Entreprises distributrices</BCardTitle>

             <div class="flex-shrink-0 d-flex">
               <div @click="$router.push({ path: '/add-unite' })"  class="btn btn-primary me-1">Ajouter</div>
               <BCol xxl="4" lg="6">
               <MazInput v-model="searchQuery"  no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
             </BCol>
             </div>
           </div>
         </BCardBody>
        
         <BCardBody v-if="paginatedItems.length === 0" class="noresul">
            <div >
          <span> Vous n'avez pas encore de pme, vous pouvez également en ajouter un !! </span>
           </div>
          </BCardBody>
          <BCardBody v-else>
            <BRow class="justify-content-center">
      <div class="parent" v-for="pme in paginatedItems" :key="pme.id">
       <div class="carde" >
      <div class="content-box">
          <span class="carde-title">{{ pme.NomMpme }}</span>
          <!-- <p class="carde-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          </p> -->
          <p class="texte-content carde-content">Date creation: <span>{{ pme.AnneeCreation }}</span></p>
          <div class="texte">
          <p class="texte-content">Region: <span>{{ NameRegion(pme.Region) }}</span></p>
          <p class="texte-content">Ville: <span>{{ pme.Ville }}</span></p>
          <p class="texte-content">Secteur Activité: <span>{{ pme.PrincipalSecteurActivite }}</span></p>
          <p class="texte-content">Taille: <span>{{ pme.SigleMpme }}</span></p>
          <p class="texte-content">Email: <span>{{ pme.AdresseEmail }}</span></p>
          <p class="texte-content">Contact: <span> {{ pme.NumeroWhatsApp }}</span></p>
          <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
            <ul class="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <router-link :to="{ name: 'detail-distributrice', params: { id: pme.CodeMpme }}" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-eye-circle-outline"></i></router-link>
                       </li>
                       
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <Blink href="#" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#jobDelete" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                       </li>
                      
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                        <BDropdown toggle-class="btn btn-sm btn-soft-primary" menu-class="dropdown-menu-end"
                              variant="white" right>
                              <template #button-content>
                                <i class="mdi mdi-dots-vertical"></i>
                              </template>
                              <BDropdownItem href="#">Open</BDropdownItem>
                              <BDropdownItem href="#">Edit</BDropdownItem>
                              <BDropdownItem href="#">Rename</BDropdownItem>
                              <BDropdownDivider />
                              <BDropdownItem href="#">Remove</BDropdownItem>
                            </BDropdown>
                       </li>
                     </ul>

          </div>
      </div>
      <div class="date-box">
         <img src="../../assets/img/guinea.png" alt="">
      </div>
  </div>
</div>
     </div>   
    </BRow>
          </BCardBody>
        
          <BRow>
              <BCol lg="12">
                <div class="container_pagination">
                  <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
                </div>
              </BCol>
            </BRow>
       </BCard>
     </BCol>
   </BRow>


   

 </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
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
 data() {
   return { 
      
    loading:true,
    pmeOptions:[],
    currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
     regionOptions:[]
   }
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   totalPages() {
   return Math.ceil(this.pmeOptions.length / this.itemsPerPage);
   },
   paginatedItems() {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.pmeOptions.slice(startIndex, endIndex);
   },
 },
async  mounted() {
  console.log("uusers",this.loggedInUser);
   await this.fetchPmes()
   await this.fetchRegionOptions()
 },
 methods: {
  async fetchPmes() {
            try {
              const response = await axios.get('/mcipme', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
               console.log(response.data.data);
               const filteredUsers = response.data.data.filter(user => user.ParentPme !== null);
                 console.log(filteredUsers); 
                this.pmeOptions = filteredUsers;
               this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
            }
          },
          async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])
         
        ); // Accéder aux options des pays via le getter
        console.log(options);
        this.regionOptions = options;
        // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
          NameRegion(id){
            try {
            
       
           const selectedRegion = this.regionOptions.find(region => region.CodeRegion === id);    
            console.log('selectedRegion',selectedRegion);
            if (selectedRegion) {
            return  selectedRegion.NomRegion;         
            } else {
                console.error('Région non trouvée dans les options.');
            }
            } catch (error) {
              console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
            }
        
   }
 },
}
</script>
<style lang="css" scoped>

.parent {
  width: 340px;
  padding: 20px;
  perspective: 1000px;
}

.carde {
  padding-top: 50px;
 
  border: 3px solid #eff2f7;
  transform-style: preserve-3d;
  background: linear-gradient(135deg,#0000 18.75%,#f3f3f3 0 31.25%,#0000 0),
      repeating-linear-gradient(45deg,#f3f3f3 -6.25% 6.25%,#ffffff 0 18.75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 0;
  background-color: #f0f0f0;
  width: 100%;
 
  transition: all 0.5s ease-in-out;
}

.carde .texte {

margin-top: 10px;
}

.carde .texte-content {
color: #f0f0f0 !important;
font-weight: bold;
font-size: 13px;
margin-bottom: 10px !important;

}

/* .carde:hover {
  background-position: -100px 100px, -100px 100px;
  transform: rotate3d(0.5, 1, 0, 30deg);
} */

.content-box {
  background: var(--color-primary);
  /* border-radius: 10px 100px 10px 10px; */
  transition: all 0.5s ease-in-out;
  padding: 35px 25px 10px 25px;
  transform-style: preserve-3d;
}

.content-box .carde-title {
  display: inline-block;
    font-size: 16px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    position: absolute;
    top: -33px;
    right: 24px;
}

.content-box .carde-title:hover {
  transform: translate3d(0px, 0px, 60px);
}

.content-box .carde-content {
    
    font-weight: 700;
    color: #f2f2f2;
    position: absolute;
    right: 33px;
    top: 11px;
}

.content-box .carde-content:hover {
  transform: translate3d(0px, 0px, 60px);
}

.content-box .see-more {
  cursor: pointer;
   
    display: flex;
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    color: var(--color-primary);
    background: white;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 20px);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    
}
.content-box .see-more i {
  font-size: 20px;
}
.content-box .see-more:hover {
  transform: translate3d(0px, 0px, 60px);
}

.date-box {
  position: absolute;
  top: -24px;
  left: 13px;
  height: 60px;
  width: 60px;
  border: 1px solid #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
}

.date-box img {
 width: 100%;
 height: 100%;
}

   
</style>