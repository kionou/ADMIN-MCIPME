<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center justify-content-between">
             <BCardTitle class="mb-0 ">Liste des Categories produits</BCardTitle>

            

             <div class="flex-shrink-0 d-flex">
                <BCol xxl="4" lg="9" class=" me-3">
               <MazInput v-model="searchQuery"   no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
             </BCol>
               <div @click="AddUser = true" class="btn btn-primary">Ajouter</div>
               
             </div>
           </div>
         </BCardBody>

         <BCardBody v-if="paginatedItems.length === 0" class="noresul">
           <div >
         <span> Vous n'avez pas encore de personnel, vous pouvez également en ajouter un !! </span>
          </div>
         </BCardBody>
        
         
         
         <BCardBody v-else>
           <div class="table-responsive" >
             <BTableSimple class="align-middle table-nowrap table-hover">
               <BThead class="table-light" style="">
                 <BTr>
                   <BTh scope="col" ></BTh>
                   <BTh scope="col">Code</BTh>
                   <BTh scope="col">Nom</BTh>
                   <BTh scope="col">Action</BTh>
                 </BTr>
               </BThead>
               <BTbody>
                 <BTr v-for="region in paginatedItems" :key="region.id">
                   <BTd>
                    
                     
                   </BTd>
                   <BTd>
                    
                    {{ region.CodePrefecture }}
                   </BTd>
                   <BTd>{{ region.NomPrefecture }}</BTd>
                   <BTd>
                     <ul class="list-unstyled hstack gap-1 mb-0">
                      
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <div  @click="UpdateUser(region.id)" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></div>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <div @click="confirmDelete(region.CodePrefecture)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
                       </li>
                      
                     </ul>
                   </BTd>
                 </BTr>
               </BTbody>
             </BTableSimple>
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


   <BModal v-model="AddUser" hide-footer centered header-class="border-0" title-class="font-18" >
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
                     <h5 class="text-primary">Ajouter une Categorie</h5>
                     
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
                       <label for="userpassword">code</label>
                     <MazInput v-model="step1.code"  no-radius type="text" name="code"  color="info" placeholder="0001" />
                      <small v-if="v$.step1.code.$error">{{v$.step1.code.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodePrefecture']"> {{ resultError["CodePrefecture"] }} </small>

                     </div>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom</label>
                     <MazInput v-model="step1.nom"  no-radius type="text" name="nom"   color="info" placeholder="exemple" />
                      <small v-if="v$.step1.nom.$error">{{v$.step1.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['NomPrefecture']"> {{ resultError["NomPrefecture"] }} </small>

                     </div>
                  </BCol>
                   </BRow>

                   
                   <BRow class="mb-0">
                     <BCol cols="12" class="text-end">
                       <div class="boutton">
                       <button class="" @click="HamdleAddUser()">Valider</button>
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
                     <h5 class="text-primary">Modifier une Categorie</h5>
                     
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
                       <label for="userpassword">code</label>
                     <MazInput v-model="step2.code"  no-radius type="text" name="code"  color="info" placeholder="0001" />
                      <small v-if="v$.step2.code.$error">{{v$.step2.code.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodePrefecture']"> {{ resultError["CodePrefecture"] }} </small>

                     </div>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom</label>
                     <MazInput v-model="step2.nom"  no-radius type="text" name="nom"   color="info" placeholder="exemple" />
                      <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['NomPrefecture']"> {{ resultError["NomPrefecture"] }} </small>

                     </div>
                  </BCol>
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

import Pag from '@/components/others/pagination.vue'
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import {successmsg} from "@/lib/modal.js"
import Swal from 'sweetalert2'

export default {
   components: {
  
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
     prefectureOptions:[],
     SelectPrefecture:[],
     currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
      resultError: {},
     v$: useVuelidate(),
       error:'',
     step1:{
            code:'',
            nom:'',
           
  
          },

            step2:{
             code:'',
            nom:'',
           
           
       },
   }
 },
 validations: {
   step1:{
     code: {
     require
     
   },
   nom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
  
   },
   step2:{
     code: {
     require
     
   },
   nom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
  
           
       },
     

   
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   totalPages() {
   return Math.ceil(this.prefectureOptions.length / this.itemsPerPage);
   },
   paginatedItems() {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.prefectureOptions.slice(startIndex, endIndex);
   },
 },
async mounted() {
   console.log("uusers",this.loggedInUser);
   await this.fetchPrefectureOptions()
  await this.fetchRegionOptions()
 },
 methods: {
   validatePasswordsMatch() {
    return this.step1.password === this.step1.confirm_password;
   },
   successmsg:successmsg,
   async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])
         
        ); // Accéder aux options des pays via le getter
        console.log(options);
        this.regionOptions = options;
        this.SelectPrefecture = this.regionOptions.map(prefecture => ({
        label: prefecture.NomRegion,
        value: prefecture.CodeRegion,
        code:  prefecture.CodeRegion
      })); // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async fetchPrefectureOptions() { // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch('fetchPrefectureOptions');
        const options = JSON.parse(JSON.stringify(this.$store.getters['getprefectureOptions'])); // Accéder aux options des pays via le getter
        console.log('Options des Prefecture:', options);
         this.prefectureOptions = options; 
        
        // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error('Erreur lors de la récupération des options des prefecture :', error);
      }
    },
   async HamdleAddUser(){
     this.error = '',
     this.resultError= '',
    this.v$.step1.$touch()
    if (this.v$.$errors.length == 0 ) {
       this.loading = true
         let DataUser = {
           CodePrefecture:this.step1.code,
           NomPrefecture:this.step1.nom,
           CodeRegion:this.step1.region
         }
         console.log("eeeee",DataUser);
         try {
        
         const response = await axios.post('/prefectures' , DataUser, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
   
   
           });
         console.log('response.login', response.data); 
         if (response.data.status === "success") { 
           this.AddUser = false
           this.loading = false
           this.successmsg("Création de prefecture",'Votre prefecture a été crée avec succès !')
          await this.fetchPrefectureOptions()

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
       confirmButtonText: 'Oui, supprimez-le!',
       cancelButtonText: 'Non, annulez!',
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
           const response = await axios.delete(`/prefectures/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           console.log('Réponse de suppression:', response);
           if (response.data.status === 'success') {
             this.loading = false
            this.successmsg('Supprimé!', 'Votre prefecture a été supprimée.')
           await this.fetchPrefectureOptions()
   
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
       async UpdateUser(id) {
         this.UpdateUser1 = true;
         this.loading = true;

         try {
             // Recherchez l'objet correspondant dans le tableau regionOptions en fonction de l'ID
             const user = this.prefectureOptions.find(user => user.id === id);

             if (user) {
                 // Utilisez les informations récupérées de l'objet user
                 console.log('Informations de l\'utilisateur:', user);

            this.step2.code = user.CodePrefecture,
            this.step2.nom = user.NomPrefecture,
            this.step2.region = user.CodeRegion,
            this.ToId = user.CodePrefecture
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
   
           CodeRegion:this.step2.region,
           NomPrefecture:this.step2.nom,
           CodePrefecture:this.step2.code,
           StatutPrefecture:1
             }
     console.log('dataCath',dataCath);
   
        try {
          const response = await axios.put(`prefectures/${this.ToId}`,dataCath, {
            headers: {
             
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            await this.fetchPrefectureOptions()
            this.UpdateUser1 = false
           this.loading = false
           this.successmsg("Modification de",'Votre region a été modifiée avec succès !')
            
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
         return  this.prefectureOptions.slice(startIndex, endIndex);
       },

       async formatValidationErrors(errors) {
     const formattedErrors = {};

     for (const field in errors) {
       const errorMessages = errors[field]; // Liste complète des messages d'erreur
       console.log(" errorMessages", errorMessages, typeof errorMessages);

       const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       console.log(" concatenatedError", concatenatedError, typeof concatenatedError);

       formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
     }

     this.resultError = formattedErrors; // Stockez les erreurs dans un objet

     // Maintenant, this.resultError est un objet où les clés sont les noms des champs
     console.log("resultError", this.resultError);
   },

   NameRegion(id){
    const selectedRegion = this.regionOptions.find(region => region.CodeRegion === id);    
            console.log('selectedRegion',selectedRegion);
            if (selectedRegion) {
            return  selectedRegion.NomRegion;         
            } else {
                console.error('Région non trouvée dans les options.');
            }
   }
 },
}
</script>
<style lang="" scoped>
   
</style>