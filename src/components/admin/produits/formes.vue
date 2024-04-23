<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
 
 <BRow>
   <BCol lg="12">
     <BCard no-body>
       <BCardBody class="border-bottom">
         <div class="d-flex align-items-center justify-content-between">
           <BCardTitle class="mb-0 ">Liste des Formes de produits</BCardTitle>

          

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
                 <BTh scope="col">Nom</BTh>
                 <BTh scope="col">Description</BTh>
                 <BTh scope="col">Action</BTh>
               </BTr>
             </BThead>
             <BTbody>
               <BTr v-for="region in paginatedItems" :key="region.id">
                 <BTd>
                  
                   
                 </BTd>
               
                 <BTd>{{ region.Nom }}</BTd>
                 <BTd>{{ region.Description }}</BTd>
                
                 <BTd>
                   <ul class="list-unstyled hstack gap-1 mb-0">
                    
                     <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                       <div  @click="UpdateUser(region.id)" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></div>
                     </li>
                     <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                       <div @click="confirmDelete(region.id)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
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
                   <h5 class="text-primary">Ajouter une forme de produit</h5>
                   
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
               <li data-bs-toggle="tooltip" class="list-unstyled" data-bs-placement="top" aria-label="Edit" style="position: absolute;right: 15px;top: 92px;">
                  <div  style="font-size: 18px;" @click="AddformData" class="btn btn-sm btn-soft-info"><i class="mdi mdi-plus-box-outline"></i></div>
                </li>
             </div>
             <div class="p-2">
               <BForm class="form-horizontal">
              
              <BRow v-for="(forme, index) in formes" :key="forme.id">
                <BCol md="6" class="d-flex align-items-center">
                   <div class="mb-3 position-relative w-100">
                     <label for="userpassword">Nom Forme</label>
                   <MazInput v-model="forme.Nom"  no-radius type="text" name="nom"   color="info" placeholder="exemple" />
                    <small v-if="errors[index] && errors[index].Nom">{{ errors[index].Nom }}</small>
                    <small v-if="resultError['Nom']"> {{ resultError["Nom"] }} </small>

                   </div>
                  
                </BCol>
                <BCol md="6" class="d-flex align-items-center">
                   <div class="mb-3 position-relative w-100">
                     <label for="userpassword">Description Forme</label>
                   <MazInput v-model="forme.Description"  no-radius type="text" name="nom"   color="info" placeholder="exemple" />
                    <small v-if="errors[index] && errors[index].Description">{{ errors[index].Description }}</small>
                    <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>

                   </div>
                   <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete" class="ml-4 list-unstyled">
                       <div @click="deleteRow(index)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
                     </li>
                </BCol>
               
              
              </BRow>

                 
                 <BRow class="mb-0">
                   <BCol cols="12" class="text-end">
                     <div class="boutton">
                     <button class="" @click="submitForm()">Valider</button>
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
                   <h5 class="text-primary">Modifier une forme de produit </h5>
                   
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
                     <label for="userpassword">Nom forme</label>
                   <MazInput v-model="step2.Nom"  no-radius type="text" name="Nom"  color="info" placeholder="0001" />
                    <small v-if="v$.step2.Nom.$error">{{v$.step2.Nom.$errors[0].$message}}</small> 
                    <small v-if="resultError['Nom']"> {{ resultError["Nom"] }} </small>

                   </div>
                </BCol>
              </BRow>
              <BRow>
                <BCol md="12">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Description</label>
                   <MazInput v-model="step2.Description"  no-radius type="text" name="Description"   color="info" placeholder="exemple" />
                    <small v-if="v$.step2.Description.$error">{{v$.step2.Description.$errors[0].$message}}</small> 
                    <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>

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
   CategorieOptions:[],
   currentPage: 1,
   itemsPerPage: 8,
   totalPageArray: [],
    resultError: {},
    IsActive:'',
   v$: useVuelidate(),
   formes: [{ Nom: ''  , Description:'', IsActive:true, }],
   error: '',
    errors:[],
   step1:{ nom:'', },

          step2:{
         
            Nom:'',
            Description:'',
         
         
     },
 }
},
validations: {
 step1:{
   
 nom: {
   require,
   lgmin: lgmin(2),
   
 },

 },
 step2:{
   
  Nom: {
   require,
   lgmin: lgmin(2),
   
 },
 Description: {
   lgmin: lgmin(1),
   
 },

         
     },
   

 
},
computed:{
 loggedInUser() {
   return this.$store.getters['auth/myAuthenticatedUser'];
 },
 totalPages() {
 return Math.ceil(this.CategorieOptions.length / this.itemsPerPage);
 },
 paginatedItems() {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.CategorieOptions.slice(startIndex, endIndex);
 },
},
async mounted() {
 console.log("uusers",this.loggedInUser);
 await this.fetchCategorieProduits()


},
methods: {
AddformData() {
    this.formes.push({ Nom: ''  , Description:'', IsActive:true });
  },

  deleteRow(index) {
    console.log(index);
    if(index !== 0){
      this.formes.splice(index, 1);
    }
      
  },
 successmsg:successmsg,

 async fetchCategorieProduits() {
  try {
            const response = await axios.get('/formes', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             
  
          });
             console.log(response.data.data);
             this.CategorieOptions = response.data.data;
             this.loading = false;
          
          } catch (error) {
            console.error('errorqqqqq',error);
          
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          }
},
async submitForm() {
this.errors = [];
this.formes.forEach((forme, index) => {
const errors = {};
if (!forme.Nom) {
  errors.Nom = 'Ce champ est obligatoire!';
  }
 
  
this.errors[index] = errors;
});
// Vérifiez s'il y a des erreurs
if (this.errors.some((errors) => errors.Nom )) {
return; // Ne poursuivez pas la soumission si des erreurs sont présentes
} else {
       this.loading = true
      console.log('bonjour', this.formes);
      this.formes.forEach((forme, index) => {
      console.log( 'this.idOffre',{ 'formes':forme.Nom } );
      let data = {
        formes: this.formes
      }
       this.submitApi(data)
    });
  }     
  },
  async submitApi(formes){


try {
const response = await axios.post('/formes' , formes, {
           headers: { Authorization: `Bearer ${this.loggedInUser.token}`}});
  console.log('Réponse du téléversement :', response);
  if (response.data.status === "success") { 
    await this.fetchCategorieProduits()
         this.AddUser = false
         this.loading = false
         this.successmsg("Création des formes de produits",'Vos formes de produits ont été crées avec succès !')
       

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


},


 async HamdleAddUser(){
   this.error = '',
   this.resultError= '',
  this.v$.step1.$touch()
  if (this.v$.$errors.length == 0 ) {
        console.log(' this.fields', this.fields);
      //  this.loading = true
      //  let DataUser = {
      //   NomCategorieProduit:this.step1.nom, 
      //  }
      //  console.log("eeeee",DataUser);
       try {
      
       const response = await axios.post('/type-produits' , DataUser, {
           headers: { Authorization: `Bearer ${this.loggedInUser.token}`}});
       console.log('response.login', response.data); 
       if (response.data.status === "success") { 
         this.AddUser = false
         this.loading = false
         this.successmsg("Création de categorie produit",'Votre categorie produit a été crée avec succès !')
        await this.fetchCategorieProduits()

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
         const response = await axios.delete(`/formes/${id}`, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
             
 
           },
 
 
         });
         console.log('Réponse de suppression:', response);
         if (response.data.status === 'success') {
         await this.fetchCategorieProduits()
           this.loading = false
          this.successmsg('Supprimé!', 'Votre forme de produit  a été supprimée.')
 
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
           const user = this.CategorieOptions.find(user => user.id === id);

           if (user) {
               // Utilisez les informations récupérées de l'objet user
               console.log('Informations de l\'utilisateur:', user);
                    this.step2.Nom = user.Nom,
                    this.step2.Description = user.Description,
                    this.ToId = user.id,
                    this.IsActive = user.IsActive
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
              formes:[
                {
                  Nom:this.step2.Nom,
                   Description:this.step2.Description,
                   IsActive:this.IsActive,
                   id:this.ToId
                }
              ]
              
           }
          console.log('dataCath',dataCath);
 
      try {
        const response = await axios.post(`/formes/update`,dataCath, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          await this.fetchCategorieProduits()
          this.UpdateUser1 = false
         this.loading = false
         this.successmsg("Modification !",'Votre forme de produit  a été modifiée avec succès !')
          
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
       return  this.CategorieOptions.slice(startIndex, endIndex);
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


},
}
</script>
<style lang="" scoped>
 
</style>