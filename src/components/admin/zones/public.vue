<template >
  <div>
   <Loading v-if="loading" style="z-index: 99999;"></Loading>
  
  <BRow>
    <BCol lg="12">
      <BCard no-body>
        <BCardBody class="border-bottom">
          <div class="d-flex align-items-center justify-content-between">
            <BCardTitle class="mb-0 ">Liste des zones industrielles Publiques</BCardTitle>


            <div class="flex-shrink-0 d-flex">
               <BCol xxl="9" xl="9" lg="9" md="9" sm="9" class="me-1">
              <MazInput v-model="searchQuery"   no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
            </BCol>
              <div @click="$router.push({ path: '/zone-industrielle/ajouter' })" class="btn btn-primary">Ajouter</div>
              
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

       <div class="" style="width: 370px; border:1px solid #dedfe1; margin:0 10px 10px 0" v-for="zone in paginatedItems" :key="zone.id">
         <BRow class="align-items-center">
           <BCol xl="5">
             <div class="text-center p-2 border-end">
               <div class="avatar-sm mx-auto mb-3 mt-1" style="border:1px solid #dedfe1; width: 4rem; height: 4rem;  border-radius: 50%;">
                 <span class="avatar-title rounded-circle   font-size-16">
                   <img src="@/assets/img/local.png" alt="" class="w-100 h-100 rounded-circle">
                 </span>
               </div>
               <h5 class="text-truncate pb-1">
                   <ul class="list-unstyled hstack gap-1 mb-0 justify-content-center">
                     <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                        <Blink href="#" @click="ViewDetail(zone.id)" class="btn btn-sm btn-primary"><i class="mdi mdi-eye-circle-outline"></i></Blink>
                      </li>
                     <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                       <router-link :to="{ name: 'update-zone-industrielle', params: { id: zone.id }}" class="btn btn-sm btn-info"><i class="mdi mdi-pencil-outline"></i></router-link>
                     </li>
                     <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                       <Blink href="#" @click="confirmDelete(zone.id)" data-bs-toggle="modal" class="btn btn-sm btn-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                     </li>
                    
                   </ul>
               </h5>
             </div>
           </BCol>

           <BCol xl="7">
             <div class="p-2 text-center text-xl-start">
               <BRow>
                 <BCol cols="12">
                   <div>
                     <p class="text-muted mb-2 text-truncate">Nom </p>
                     <h5>{{zone.IntituleZone}}</h5>
                   </div>
                 </BCol>
                 
               </BRow>
               <BRow>
                   <BCol cols="12">
                   <div>
                     <p class="text-muted mb-2 text-truncate">Superficie Total</p>
                     <h5>{{zone.SuperficieTotal}} ha</h5>
                   </div>
                 </BCol>
               </BRow>
             </div>
           </BCol>
         </BRow>
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


  <BModal v-model="AddUser" hide-footer centered header-class="border-0" title-class="font-18" size="lg">
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
                    <h5 class="text-primary">Detail de la Zone Industrielle</h5>
                    
                  </div>
                </BCol>
                
              </BRow>
            </div>
            <BCardBody class="pt-0">
              <div>
                <router-link to="#">
                  <div class="avatar-md profile-user-wid ">
                <span class="avatar-title rounded-circle" style="position: relative; z-index: 33;">
                  <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%; z-index: 33;"/>
                </span>
              </div>
                </router-link>
              </div>
              <div class="p-2">
               <div class="row ttb">
                               <div class=" card col-xl-6 col-lg-6 col-md-6 py-2 ttb1">
                                   <div class=" bg-white rounded-lg  ">
                                      
                                       <div class="">
                                           <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
                                              
                                               <div class="border-t border-gray-200">
                                                   <dl>
                                                       <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Code zone</dt>
                                                           <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ zone.CodeZone }} </dd>
                                                       </div>
                                                       <div
                                                           class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Nom zone</dt>
                                                           <dd
                                                               class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ zone.IntituleZone }}</dd>
                                                       </div>

                                                       <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Type de zone</dt>
                                                           <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ zone.TypeZone }} </dd>
                                                       </div>
                                                       <div
                                                           class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500"> Superficie Total</dt>
                                                           <dd
                                                               class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ zone.SuperficieTotal }} ha</dd>
                                                       </div>
                                                     
                               

                                                       
                                                   </dl>
                                               </div>
                                           </div>

                                       </div>

                                   </div>

                                  
                               </div>

                               <div class=" card col-xl-6 col-lg-6 col-md-6 py-2 ttb1">
                                   <div class=" bg-white rounded-lg  ">
                                      
                                       <div class="">
                                           <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
                                              
                                               <div class="border-t border-gray-200">
                                                   <dl>
                                                       <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500"> Region</dt>
                                                           <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="zone.quartier ">{{zone.quartier.sous_prefecture.prefecture.region.NomRegion }}</dd>
                                                       </div>
                                                       <div
                                                           class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Prefecture</dt>
                                                           <dd
                                                               class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="zone.quartier">{{zone.quartier.sous_prefecture.prefecture.NomPrefecture }}</dd>
                                                       </div>

                                                       <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500"> Sous Prefecture</dt>
                                                           <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="zone.quartier">{{zone.quartier.sous_prefecture.NomSousPrefecture }}</dd>
                                                       </div>
                                                       <div
                                                           class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Quartier </dt>
                                                           <dd
                                                               class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="zone.quartier ">{{zone.quartier.NomQuartier }}</dd>
                                                       </div>
                                                       <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                           <dt class="text-sm font-medium text-gray-500">Couleur</dt>
                                                           <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> 
                                                             <input type="color" name="color" id="" :value="zone.Couleur">
                                                             </dd>
                                                       </div>
                                                      

                                                       
                                                   </dl>
                                               </div>
                                           </div>

                                       </div>

                                   </div>

                                   
                               </div>
                           </div>
              
              </div>
            </BCardBody>
          </BCard>
          
        </BCol>
      </BRow>
    </BContainer>
  </div>
</div>
  </BModal> 

  <BModal v-model="UpdateUser1" hide-footer centered header-class="border-0" title-class="font-18" >
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
                    <h5 class="text-primary">Modifier  Zone Industrielle</h5>
                    
                  </div>
                </BCol>
                
              </BRow>
            </div>
            <BCardBody class="pt-0">
              <div>
                <router-link to="#">
                  <div class="avatar-md profile-user-wid ">
                <span class="avatar-title rounded-circle" style="position: relative; z-index: 33;">
                  <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%; z-index: 33;"/>
                </span>
              </div>
                </router-link>
              </div>
              <div class="p-2">
                <BForm class="form-horizontal">
                  <BRow>
                    <BCol md="12">
                    <div class="mb-3 position-relative">
                      <label for="userpassword">Nom</label>
                    <MazInput v-model="step2.nom"  no-radius type="text" name="nom"  color="info" placeholder="001" />
                     <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> 
                     <small v-if="resultError['CodeRegion']"> {{ resultError["CodeRegion"] }} </small>

                    </div>
                 </BCol>

                
                  </BRow>
                  <BCol md="12">
                    <div class="mb-3 position-relative">
                      <label for="userpassword">Superficie</label>
                    <MazInput v-model="step2.superficie"  no-radius type="text" name="superficie"   color="info" placeholder="Conakry" />
                     <small v-if="v$.step2.superficie.$error">{{v$.step2.superficie.$errors[0].$message}}</small> 
                     <small v-if="resultError['NomRegion']"> {{ resultError["NomRegion"] }} </small>

                    </div>
                 </BCol>
                  <BRow>
                   
                  </BRow>

                  <BRow class="mb-0">
                    <BCol cols="12" class="text-end">
                      <div class="boutton">
                      <button class="" @click="submitUpdate()">Modifier</button>
                     </div>
                    </BCol>
                  </BRow>
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
  </div>
   
  


</template>
<script>

import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import PageHeader from "@/components/page-header.vue";
import Pag from '@/components/others/pagination.vue'
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import {successmsg} from "@/lib/modal.js"
import Swal from 'sweetalert2'

export default {
  components: {
 
  PageHeader,
  Loading ,
  Pag,
  MazPhoneNumberInput,
},
data() {
  return {
    loading:true,
    AddUser:false,
    UpdateUser1:false,
    ToId:'',
    regionOptions:[],
    zoneOptions:[],
    currentPage: 1,
    itemsPerPage: 8,
    totalPageArray: [],
     resultError: {},
     quartier:'',
     zone:'',
    v$: useVuelidate(),
      error:'',
    step1:{
          
           nom:'',
           superficie:'',
 
         },

           step2:{
           
           nom:'',
           superficie:'',
          
      },
  }
},
validations: {
  step1:{
   superficie: {
    require
    
  },
  nom: {
    require,
    lgmin: lgmin(2),
   
  },
 
  },
  step2:{
   superficie: {
    require
    
  },
  nom: {
    require,
    lgmin: lgmin(2),
   
  },
 
          
      },
    

  
},
computed:{
  loggedInUser() {
    return this.$store.getters['auth/myAuthenticatedUser'];
  },
  totalPages() {
  return Math.ceil(this.zoneOptions.length / this.itemsPerPage);
  },
  paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.zoneOptions.slice(startIndex, endIndex);
  },
},
async mounted() {
  console.log("uusers",this.loggedInUser);
 await this.fetchRegionOptions()
 await this.fetchZone()
},
methods: {
  validatePasswordsMatch() {
   return this.step1.password === this.step1.confirm_password;
  },
  successmsg:successmsg,
  async fetchZone() {
    try {
       const response = await axios.get('/zone-industrielles', {
         headers: {
          
           Authorization: `Bearer ${this.loggedInUser.token}`,
         },
       });
       console.log("Réponse du téléversement :", response);
       if (response.data.status === "success") {
        const selectedActualites = response.data.data;
        const filteredUsers = selectedActualites.filter(user => user.TypeZone === 'PUBLIQUE' );
                console.log(filteredUsers); // Affiche la liste des utilisateurs dont Identifiant
       this.zoneOptions = filteredUsers
       console.log(selectedActualites);
      
         this.loading =false
       } 
     } catch (error) {
       console.error("Erreur lors du téléversement :", error);
       if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
               await this.$store.dispatch('auth/clearMyAuthenticatedUser');
             this.$router.push("/");  //a revoir
           }
     }
},

async fetchPrefecture(codePrefecture) {
  try {
      const response = await axios.get(`prefectures/${codePrefecture}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
          },
      });
      console.log("Réponse du téléversement pour la préfecture :", response);
      if (response.data.status === "success") {
          const data = response.data.data;
          const nomPrefecture = data.NomPrefecture;
          const codeRegion = data.CodeRegion;
          const nomRegion = codeRegion ? await this.fetchRegion(codeRegion) : null;
          return { nomPrefecture, nomRegion };
      }
  } catch (error) {
      console.error("Erreur lors du téléversement pour la préfecture :", error);
      if (error.response && error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");
      } else {
          // Gérer d'autres erreurs
      }
      throw error;
  }
},

async fetchSousPrefecture(codeSousPrefecture) {
  try {
      const response = await axios.get(`sous-prefectures/${codeSousPrefecture}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
          },
      });
      console.log("Réponse du téléversement pour la sous-préfecture :", response);
      if (response.data.status === "success") {
          const data = response.data.data;
          const nomSousPrefecture = data.NomSousPrefecture;
          const codePrefecture = data.CodePrefecture;
          const nomPrefecture = await this.fetchPrefecture(codePrefecture);
          return { nomSousPrefecture, nomPrefecture };
      }
  } catch (error) {
      console.error("Erreur lors du téléversement pour la sous-préfecture :", error);
      if (error.response && error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");
      } else {
          // Gérer d'autres erreurs
      }
      throw error;
  }
},

async fetchQuartier(code) {
  try {
      const response = await axios.get(`quartiers/${code}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
          },
      });
      console.log("Réponse du téléversement pour le quartier :", response);
      if (response.data.status === "success") {
          const data = response.data.data;
          console.log('dataquartier',data)
          const nomQuartier = data.NomQuartier;
          const codeSousPrefecture = data.CodeSousPrefecture;
          const codePrefecture = data.CodePrefecture;
          const nomSousPrefecture = await this.fetchSousPrefecture(codeSousPrefecture);
          const nomPrefecture = codePrefecture ? await this.fetchPrefecture(codePrefecture) : null;
          return { nomQuartier, nomSousPrefecture, nomPrefecture };
      }
  } catch (error) {
      console.error("Erreur lors du téléversement pour le quartier :", error);
      if (error.response && error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");
      } else {
          // Gérer d'autres erreurs
      }
      throw error;
  }
},

async fetchRegion(codeRegion) {
  try {
      const response = await axios.get(`regions/${codeRegion}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
          },
      });
      console.log("Réponse du téléversement pour la région :", response);
      if (response.data.status === "success") {
          return response.data.data.NomRegion;
      }
  } catch (error) {
      console.error("Erreur lors du téléversement pour la région :", error);
      if (error.response && error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");
      } else {
          // Gérer d'autres erreurs
      }
      throw error;
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
       this.regionOptions = options; // Affecter les options à votre propriété sortedCountryOptions
       this.loading = false
     } catch (error) {
       console.error(
         "Erreur lors de la récupération des options des pays :",
         error.message
       );
     }
   },
  async HamdleAddUser(){
    this.error = '',
    this.resultError= '',
   this.v$.step1.$touch()
   if (this.v$.$errors.length == 0 ) {
      this.loading = true
        let DataUser = {
          CodeRegion:this.step1.code,
          NomRegion:this.step1.nom,
        }
        console.log("eeeee",DataUser);
        try {
       
        const response = await axios.post('/regions' , DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
  
  
          });
        console.log('response.login', response.data); 
        if (response.data.status === "success") { 
          this.AddUser = false
          this.loading = false
          this.successmsg("Création de region",'Votre region a été crée avec succès !')
          await this.fetchRegionOptions()

        } else {

        }



  } catch (error) {
  console.log('response.login', error); 

  this.loading = false
  if (error.response.data.status === "error") {
  return this.error = error.response.data.message

  } else {
    this.formatValidationErrors(error.response.data.errors);
  }
  }
      }else{
      
      console.log('pas bon', this.v$.$errors);
      
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
          const response = await axios.delete(`/zone-industrielles/${id}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log('Réponse de suppression:', response);
          if (response.data.status === 'success') {
            this.loading = false
           this.successmsg('Supprimé!', 'Votre zone industrielle a été supprimée.')
           await this.fetchZone()
  
          } else {
            console.log('error', response.data)
            this.loading = false
          }
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('user/clearLoggedInUser');
        this.$router.push("/");  //a revoir
      }
          
        }
  
      },
      

      async ViewDetail(id) {
         this.AddUser = true;
         this.loading = true;
         const response = await axios.get(`/zone-industrielles/${id}`,{
         headers: {Authorization: `Bearer ${this.loggedInUser.token}`, },
       });

        try {
          console.log("Réponse du téléversement :", response);
       if (response.data.status === "success") {
         this.loading = false
          const zone = response.data.data
          console.log('Informations de l\'utilisateur:', zone);
          if (zone) {
                 // Utilisez les informations récupérées de l'objet zone
                 console.log('Informations de la zone:', zone);
                 this.zone = zone;
                 this.loading = false;
             } else {
                 console.log('Zone non trouvée avec l\'ID', id);
             }
               this.loading = false;

         
       }  else {
                console.log('Utilisateur non trouvé avec l\'ID', this.id);
            }
            this.loading = false;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du document:', error);
           
            this.loading = false;
        }

},
async UpdateUser(id) {
       this.UpdateUser1 = true;
       this.loading = true;

       try {
           // Recherchez l'objet correspondant dans le tableau regionOptions en fonction de l'ID
           const user = this.zoneOptions.find(user => user.id === id);

           if (user) {
               // Utilisez les informations récupérées de l'objet user
               console.log('Informations de l\'utilisateur:', user);
                    this.step2.nom = user.IntituleZone,
                    this.step2.superficie = user.SuperficieTotal,
                    this.ToId = user.id
           } else {
               console.log('Utilisateur non trouvé avec l\'ID', id);
           }
           this.loading = false;
       } catch (error) {
           console.error('Erreur lors de la mise à jour du document:', error);
          
           this.loading = false;
       }
},

 async  submitUpdate(){
 
   this.v$.step2.$touch();
    console.log("bonjour");
 
    if (this.v$.$errors.length == 0) {
      console.log("bonjour");
       this.loading = true;
    
             const dataCath = {
 
        
          NomCategorieProduit:this.step2.nom,
          CategorieProduitsId:null,
           id:this.ToId
           }
   console.log('dataCath',dataCath);
 
      try {
        const response = await axios.post(`type-produits/${this.ToId}/update`,dataCath, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          await this.fetchCategorieProduits()
          this.UpdateUser1 = false
         this.loading = false
         this.successmsg("Modification de categorie produit",'Votre categorie produit a été modifiée avec succès !')
          
        } 
      } catch (error) {
        console.error("Erreur lors du téléversement :", error);
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
         await this.$store.dispatch('user/clearLoggedInUser');
       this.$router.push("/");  //a revoir
     }else{
       this.formatValidationErrors(error.response.data.errors);
     }
      }
    } else {
      console.log("cest pas bon ", this.v$.$errors);
    }
   },
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
        return  this.zoneOptions.slice(startIndex, endIndex);
      },


  
},
}
</script>
<style lang="" scoped>
  
</style>