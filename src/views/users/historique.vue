<template >
  <Layout>
   <Loading v-if="loading" style="z-index: 99999;"></Loading>
 <PageHeader title="Historiques" pageTitle="Tableau de bord" />
 <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center justify-content-between">
             <BCardTitle class="mb-0 ">Liste des historiques</BCardTitle>

             <div class="flex-shrink-0 d-flex">
                <BCol xxl="4" lg="9" class=" me-3">
               <MazInput v-model="searchQuery"   no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
             </BCol>
               <!-- <div @click="AddUser = true" class="btn btn-primary">Ajouter</div> -->
               
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
                 
                   <BTh scope="col">Id</BTh>
                   <BTh scope="col">Actions</BTh>
                   <BTh scope="col">Descriptions</BTh>
                   <BTh scope="col">Effectue par</BTh>
                   <BTh scope="col">Date et heure</BTh>
                 </BTr>
               </BThead>
               <BTbody>
                 <BTr v-for="region in paginatedItems" :key="region.id">
                  
                   <BTd>{{ region.historics_id }}</BTd>
                   <BTd> {{ region.Action }} </BTd>
                   <BTd>{{ region.Description }}</BTd>
                   <BTd>{{ region.user.Prenoms  }} {{ region.user.Nom  }}</BTd>
                   <BTd>{{ formatCreatedAt(region.created_at) }}</BTd>

                  
                   <!-- <BTd>
                     <ul class="list-unstyled hstack gap-1 mb-0">
                      
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <a  :href="region.LienDocument" download class="btn btn-sm btn-soft-primary"><i class="mdi mdi-download-outline"></i></a>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#" @click="confirmDelete(region.id)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                       </li>
                       
                     </ul>
                   </BTd> -->
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
 

</Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import PageHeader from "@/components/page-header.vue";
import Pag from '@/components/others/pagination.vue'
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import {successmsg} from "@/lib/modal.js"
import Swal from 'sweetalert2'
import moment from 'moment';

export default {
 components: {
 Layout,
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
   IndicateursOptions:[],
   currentPage: 1,
   itemsPerPage: 10,
   totalPageArray: [],
    resultError: {},
   v$: useVuelidate(),
     error:'',
   step1:{
         
          code:'',
          description:'',

        },

          step2:{
          
          code:'',
          description:'',
         
     },
 }
},
validations: {
 step1:{
  code: {
   require
   
 },
 description: {
   require,
   lgmin: lgmin(2),
   
 },
 

 },
 step2:{
  code: {
   require
   
 },
 description: {
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
 return Math.ceil(this.IndicateursOptions.length / this.itemsPerPage);
 },
 paginatedItems() {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.IndicateursOptions.slice(startIndex, endIndex);
 },
},
async mounted() {
 console.log("uusers",this.loggedInUser);
await this.fetchIndicateursOptions()
},
methods: {
 
 successmsg:successmsg,
 async fetchIndicateursOptions() {
  try {
            const response = await axios.get('/historics', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
              params:{user:null}
  
          });
             console.log(response.data.data);
              this.IndicateursOptions = response.data.data.data;
             this.loading = false;
          
          } catch (error) {
            console.error('errorqqqqq',error);
          
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          }
  },
  formatCreatedAt(createdAt) {
    return moment(createdAt).format('DD/MM/YY HH:mm:ss');
    },
 async HamdleAddUser(){
   this.error = '',
   this.resultError= '',
  this.v$.step1.$touch()
  if (this.v$.$errors.length == 0 ) {
     this.loading = true
       let DataUser = {
        CodeIndicateur:this.step1.code,
        Description:this.step1.description,
        Direction:this.loggedInUser.direction
       }
       console.log("eeeee",DataUser);
       try {
      
       const response = await axios.post('/indicateurs' , DataUser, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
           },
 
 
         });
       console.log('response.login', response.data); 
       if (response.data.status === "success") { 
         this.AddUser = false
         this.loading = false
         this.successmsg("Création d'indicateur",'Votre indicateur a été crée avec succès !')
         await this.fetchIndicateursOptions()

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
         const response = await axios.delete(`/indicateurs/${id}`, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
             
 
           },
 
 
         });
         console.log('Réponse de suppression:', response);
         if (response.data.status === 'success') {
           this.loading = false
          this.successmsg('Supprimé!', 'Votre indicateur a été supprimé.')
          await this.fetchIndicateursOptions()
 
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
     async UpdateUser(id) {
       this.UpdateUser1 = true;
       this.loading = true;

       try {
           // Recherchez l'objet correspondant dans le tableau regionOptions en fonction de l'ID
           const user = this.IndicateursOptions.find(user => user.id === id);

           if (user) {
               // Utilisez les informations récupérées de l'objet user
               console.log('Informations de l\'utilisateur:', user);

          this.step2.code = user.CodeIndicateur,
          this.step2.description = user.Description,
          this.ToId = id
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
 
              CodeIndicateur:this.step2.code,
              Description:this.step2.description,
              Direction:this.loggedInUser.direction,
              id:this.ToId
           }
           console.log('dataCath',dataCath);
 
      try {
        const response = await axios.post(`indicateurs/${this.ToId}/update`,dataCath, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          await this.fetchIndicateursOptions()
          this.UpdateUser1 = false
         this.loading = false
         this.successmsg("Modification d'indicateur",'Votre indicateur a été modifiée avec succès !')
         
          
        } 
      } catch (error) {
        console.error("Erreur lors du téléversement :", error);
       
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
     else{
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
       return  this.IndicateursOptions.slice(startIndex, endIndex);
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