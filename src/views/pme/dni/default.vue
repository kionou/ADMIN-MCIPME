<template >
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Unité Industrielle" pageTitle="Tableau de bord" :statistic="statistic" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center">
             <BCardTitle class="mb-0 flex-grow-1">Liste des Unités industrielles</BCardTitle>

             <div class="flex-shrink-0 d-flex">
               <div @click="$router.push({ path: '/industrielle/ajouter' })"  class="btn btn-primary me-1">Ajouter</div>
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
          <p class="texte-content carde-content">Date creation : <span>{{ pme.AnneeCreation }}</span></p>
          <div class="texte">
            <p class="texte-content" v-if="pme">Code DNI : <span>{{ pme.CodeMpme }}</span></p>
          <p class="texte-content">Region: <span>{{ NameRegion(pme.Region) }}</span></p>
          <p class="texte-content text-truncate">Secteur Activité : <span>{{ NameActivite(pme.PrincipalSecteurActivite) }}</span></p>
          <p class="texte-content">Superficie Occupée : <span>{{ pme.SuperficieOccupee || 0 }} ha</span></p>
          <p class="texte-content text-truncate">Email : <span>{{ pme.AdresseEmail }}</span></p>
          <p class="texte-content">Contact : <span> {{ pme.NumeroWhatsApp }}</span></p>
          <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
            <ul class="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <router-link :to="{ name: 'detail-industrielle', params: { id: pme.CodeMpme }}" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-eye-circle-outline"></i></router-link>
                       </li>
                       
                     
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <router-link  :to="{ name: 'industrielle-update', params: { id: pme.CodeMpme }}"  class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></router-link>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <div @click="confirmDelete(pme.CodeMpme)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
                       </li>
                      
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                        <BDropdown toggle-class="btn btn-sm btn-soft-primary" menu-class="dropdown-menu-end"
                              variant="white" right>
                              <template #button-content>
                                <i class="mdi mdi-dots-vertical"></i>
                              </template>
                              <BDropdownItem  @click="OpenLogo(pme.CodeMpme ,pme.profile)">Ajouter un logo</BDropdownItem>
                            </BDropdown>
                       </li>
                     </ul>

          </div>
      </div>
      <div class="date-box">
       <img v-if="pme.profile === null" src="@/assets/img/guinea.png" alt="">
       <img v-else :src="pme.profile" alt="">
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
   <BModal v-model="AddLogo" hide-footer centered header-class="border-0" title-class="font-18" >
     <div>
   
   <div class="account-pages " style="width:100%;">
     <BContainer>
       <BRow >
         <BCol >
           <BCard no-body class="overflow-hidden" style=" box-shadow:none !important;
            border: 1px solid #c9d1d9 !important;">
             <div class="bg-primary-subtle">
               <BRow>
                 <BCol cols="12 text-center">
                   <div class="modalheader p-4">
                     <h5 class="text-primary">Ajouter un logo</h5>
                     
                   </div>
                 </BCol>
                 
               </BRow>
             </div>
             <BCardBody class="pt-0">
               <div>
                 <router-link to="#">
                   <div class="avatar-md profile-user-wid ">
                 <span class="avatar-title rounded-circle" style="position: relative; z-index: 33;">
                   <img src="@/assets/img/armoirie.png"  style="width: 75%; height: 75%; z-index: 33;"/>
                 </span>
               </div>
                 </router-link>
               </div>
               <div class="p-2">
                 <BForm class="form-horizontal">
                  
                  <div id="uploadArea" class="upload-area">
            <!-- Header -->
            {{ error }}
            
          

            <!-- Drop Zoon -->
            <div id="dropZoon" class="upload-area__drop-zoon drop-zoon">
              <div class="profile-pic">
                <label class="-label" for="file">
                  <span class="glyphicon glyphicon-camera"></span>
                  <span>Change Image</span>
                </label>
                <input id="file" type="file" @change="loadFile" />

                <img v-if="photo === null"  src="@/assets/img/flags.png" id="output" width="200" />
                <img v-else :src="photo" id="output" width="200" />
              </div>
            </div>
            <!-- End Drop Zoon -->
          </div>
                  
                 </BForm>
               </div>
             </BCardBody>
           </BCard>
           
         </BCol>
       </BRow>
     </BContainer>
   </div>
 </div>
   </BModal>


   

 </Layout>
</template>
<script>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Pag from '@/components/others/pagination.vue'
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import {successmsg} from "@/lib/modal.js"
import Swal from 'sweetalert2'


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
    AddLogo:false,
    IdLogo:'',
    photo:'',
    pmeOptions:[],
    currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
     regionOptions:[],
     UserOptionsPersonnels:'',
     SecteurActiviteOptions: [],
   }
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   statistic() {
    return `Total des Unités Industrielles = ${this.UserOptionsPersonnels} .  `;
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
   await this.fetchSecteurActiviteOptions()
 },
 methods: {
  successmsg:successmsg,
  updateCurrentPage(pageNumber) {
         this.currentPage = pageNumber;
         window.scrollTo({
           top: 0,
           behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
         });
       },
       updatePaginatedItems() {
         const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        
         const endIndex = startIndex + this.itemsPerPage;
         return  this.pmeOptions.slice(startIndex, endIndex);
       },
  async fetchPmes() {
            try {
              const response = await axios.get('/mcipme', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
               console.log(response.data.data);
                this.pmeOptions = response.data.data;
                this.UserOptionsPersonnels = this.pmeOptions.length
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
    async fetchSecteurActiviteOptions() {
      try {
        await this.$store.dispatch("fetchSecteurActiviteOptions" , this.loggedInUser); // Action spécifique aux secteurs d'activité
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getsecteurActiviteOptions"])
        );
        this.SecteurActiviteOptions = options;
        console.log('rrrr',options);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des secteurs d'activité:",
          error.message
        );
      }
    },
    async confirmDelete(id) {
     // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
     const result = await Swal.fire({
       title: 'Êtes-vous sûr?',
       text: 'Vous ne pourrez pas revenir en arrière!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Oui, supprimer!',
       cancelButtonText: 'Non, annuler!',
       reverseButtons: true
     });

     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.DeleteUser(id);
     }
         },
         async DeleteUser(id) {
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/mcipme/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           console.log('Réponse de suppression:', response);
           if (response.data.status === 'success') {
           await this.fetchPmes()

             this.loading = false
            this.successmsg('Supprimé!', 'Votre pme a été supprimé.')
   
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
        
   },
   NameActivite(id){
          try {
          
     console.log( this.SecteurActiviteOptions);
         const selectedRegion = this.SecteurActiviteOptions.find(region => region.value === id );    
          console.log('selectedRegion',selectedRegion);
          if (selectedRegion) {
          return  selectedRegion.label;         
          } else {
              console.error('Région non trouvée dans les options.');
          }
          } catch (error) {
            console.error(
        "Erreur lors de la récupération des options des pays :",
        error.message
      );
          }
      
 },
   OpenLogo(id , photo){
    this.photo = photo
    this.AddLogo = true
    this.IdLogo = id
   },
   async loadFile(event) {
      this.loading = true;
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("code", this.IdLogo);
      formData.append("profile", file);
      formData.append( "Directions",this.direction )
      console.log('logo', this.IdLogo , file)

      try {
        const response = await axios.post("/mcipme/changement-de-profile", formData, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response);

        if (response.data.status === "success") {
          this.fetchPmes();
          this.loading = false;
          this.AddLogo = false;
          this.successmsg('Logo ajouté', 'Logo ajouté avec success.')
        } else {
          console.log("errorrr", response.data);
          this.error = "L'enregistrement a échoué !!!";
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données MPME guinee :", error);
        if (
          (error && error.response.data === "Unauthorized") ||
          error.response.data.status === "error"
        ) {
          console.log("aut", error.response.data.status === "error");
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
        }
         else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
      }
    },
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
    top: -41px;
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
  top: -16px;
  left: 5px;
  height: 60px;
  width: 60px;
  border: 1px solid #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
}

.date-box img {
 width: 100%;
 height: 100%;
}

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 80%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  z-index: 0;
  border-radius: 50%;
  border: 1px solid var(--color-primary);
}

.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 230px;
}

.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;

  margin-bottom: 0;
}

.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  height: 2em;
}

/* Upload Area */
.upload-area {
  width: 100%;
  /* max-width: 25rem; */
  background-color: rgb(255, 255, 255);
  /* border: 2px solid var(--color-secondary); */
  border-radius: 24px;
  /* padding: 2rem 1.875rem 5rem 1.875rem; */
  /* margin: 0.625rem; */
  text-align: center;
}

.upload-area--open {
  /* Slid Down Animation */
  animation: slidDown 500ms ease-in-out;
}

.upload-area__title {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.3125rem;
}

.upload-area__paragraph {
  font-size: 0.9375rem;
  color: rgb(196, 195, 196);
  margin-top: 0;
}

.upload-area__tooltip {
  position: relative;
  color: var(--color-secondary);
  cursor: pointer;
  transition: color 300ms ease-in-out;
}

.upload-area__tooltip:hover {
  color: var(--clr-blue);
}

.upload-area__tooltip-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -125%);
  min-width: max-content;
  background-color: rgb(255, 255, 255);
  color: rgb(63, 134, 255);
  border: 1px solid var(--color-secondary);
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transition: none 300ms ease-in-out;
  transition-property: opacity, visibility;
}

.upload-area__tooltip:hover .upload-area__tooltip-data {
  opacity: 1;
  visibility: visible;
}

/* Drop Zoon */
.upload-area__drop-zoon {
  position: relative;
  height: 11.25rem;
  /* 180px */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed var(--color-secondary);
  border-radius: 15px;
  /* margin-top: 2.1875rem; */
  height:220px;
  transition: border-color 300ms ease-in-out;
}


   
</style>