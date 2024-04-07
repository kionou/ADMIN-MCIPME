<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Utilisateurs" pageTitle="Tableau de bord" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center justify-content-between">
             <BCardTitle class="mb-0 ">Liste des Utilisateurs(Entreprises)</BCardTitle>

             <div class="d-flex justify-content-evenly" style="width: 400px;">
               
               
               <div  @click="$router.push({ path: '/personnels' })"  class="btn btn-primary">Personnels</div>
            
               
             </div>

             <div class="flex-shrink-0 d-flex">
                <BCol xxl="4" lg="9" class=" me-3">
               <MazInput v-model="searchQuery"   no-radius type="text"  color="info" size="sm" placeholder="Recherchez ..." />
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
                   <BTh scope="col" style="width: 70px;"></BTh>
                   <BTh scope="col">Noms</BTh>
                   <BTh scope="col">Numéro</BTh>
                   <BTh scope="col">Direction</BTh>
                   <BTh scope="col">Fonction</BTh>
                   <BTh scope="col">Action</BTh>
                 </BTr>
               </BThead>
               <BTbody>
                 <BTr v-for="user in paginatedItems" :key="user.id">
                   <BTd>
                     <div v-if="user.profile === null" class="avatar-xs">

                       <span class="avatar-title rounded-circle">
                         <img src="../../assets/img/guinea.png" alt="" class="w-100 h-100 rounded-circle">
                       </span>
                     </div>
                     <div v-if="user.profile">
                       <img class="rounded-circle avatar-xs" :src="`${user.profile}`" alt />
                     </div>
                   </BTd>
                   <BTd>
                     <h5 class="font-size-14 mb-1">
                       <BLink href="#" class="text-dark">{{ user.Nom }} {{ user.Prenoms }} </BLink>
                     </h5>
                     <p class="text-muted mb-0">{{ user.email }}</p>
                   </BTd>
                   <BTd>{{ user.Whatsapp }}</BTd>
                   <BTd>
                     <div>
                       
                       {{  user.Direction }}
                       
                     </div>
                   </BTd>
                   <BTd >Entreprise</BTd>
                  
                   <BTd>
                     <ul class="list-unstyled hstack gap-1 mb-0">
                      
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <Blink href="#"  @click="UpdateUser(user.id)" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#" @click="confirmDelete(user.id)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <router-link to="/jobs/job-details" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-lock-outline"></i></router-link>
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
                     <h5 class="text-primary">Ajouter un utilisateur</h5>
                     
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
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom</label>
                     <MazInput v-model="step1.nom"  no-radius type="text" name="nom"  color="info" placeholder="mcimpe" />
                      <small v-if="v$.step1.nom.$error">{{v$.step1.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['nom']"> {{ resultError["nom"] }} </small>

                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Prenoms</label>
                     <MazInput v-model="step1.prenom"  no-radius type="text" name="prnom"   color="info" placeholder="exemple" />
                      <small v-if="v$.step1.prenom.$error">{{v$.step1.prenom.$errors[0].$message}}</small> 
                      <small v-if="resultError['Prenoms']"> {{ resultError["Prenoms"] }} </small>

                     </div>
                  </BCol>
                   </BRow>

                   <BRow>
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Adresse Email</label>
                     <MazInput v-model="step1.email"  no-radius type="email"  name="email"  color="info" placeholder="exemple@gmail.com" />
                      <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small> 
                      <small v-if="resultError['email']"> {{ resultError["email"] }} </small>

                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Numéro Téléphone</label>
                         <MazPhoneNumberInput v-model="step1.phoneNumber" name="numero"  show-code-on-list color="info"  no-radius defaultCountryCode="GN"
                          :ignored-countries="['AC']" @update="results = $event" :success="results?.isValid" />
                            <small v-if="v$.step1.phoneNumber.$error">{{ v$.step1.phoneNumber.$errors[0].$message }}</small>
                           <small v-if="resultError['Whatsapp']"> {{ resultError["Whatsapp"] }} </small>

                     </div>
                  </BCol>
                   </BRow>

                   <BRow>
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Mot de passe </label>
                     <MazInput v-model="step1.password"  no-radius type="password"  color="info" placeholder="abc123&@" />
                      <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small> 
                      <small v-if="resultError['password']"> {{ resultError["password"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Confirmer le mot de passe </label>
                     <MazInput v-model="step1.confirm_password"  no-radius type="password"  color="info" placeholder="abc123&@" />
                      <small v-if="v$.step1.confirm_password.$error">{{v$.step1.confirm_password.$errors[0].$message}}</small>
                      <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>
                      <small v-if="resultError['password_confirmation']"> {{ resultError["password_confirmation"] }} </small>
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

   <BModal v-model="UpdateUser1" hide-footer centered header-class="border-0" title-class="font-18" size="lg">
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
                     <h5 class="text-primary">Modifier un utilisateur</h5>
                     
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
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom</label>
                     <MazInput v-model="step2.nom"  no-radius type="text" name="nom"  color="info" placeholder="mcimpe" />
                      <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['nom']"> {{ resultError["nom"] }} </small>

                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Prenoms</label>
                     <MazInput v-model="step2.prenom"  no-radius type="text" name="prnom"   color="info" placeholder="exemple" />
                      <small v-if="v$.step2.prenom.$error">{{v$.step2.prenom.$errors[0].$message}}</small> 
                      <small v-if="resultError['Prenoms']"> {{ resultError["Prenoms"] }} </small>

                     </div>
                  </BCol>
                   </BRow>

                   <BRow>
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Adresse Email</label>
                     <MazInput v-model="step2.email"  no-radius type="email"  name="email"  color="info" placeholder="exemple@gmail.com" />
                      <small v-if="v$.step2.email.$error">{{v$.step2.email.$errors[0].$message}}</small> 
                      <small v-if="resultError['email']"> {{ resultError["email"] }} </small>

                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Numéro Téléphone</label>
                         <MazPhoneNumberInput v-model="step2.phoneNumber" name="numero"  show-code-on-list color="info"  no-radius defaultCountryCode="GN"
                          :ignored-countries="['AC']" @update="results = $event" :success="results?.isValid" />
                            <small v-if="v$.step2.phoneNumber.$error">{{ v$.step2.phoneNumber.$errors[0].$message }}</small>
                           <small v-if="resultError['Whatsapp']"> {{ resultError["Whatsapp"] }} </small>

                     </div>
                  </BCol>
                   </BRow>

                   <!-- <BRow>
                     <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Mot de passe </label>
                     <MazInput v-model="step2.password"  no-radius type="password"  color="info" placeholder="abc123&@" />
                      <small v-if="v$.step2.password.$error">{{v$.step2.password.$errors[0].$message}}</small> 
                      <small v-if="resultError['password']"> {{ resultError["password"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Confirmer le mot de passe </label>
                     <MazInput v-model="step2.confirm_password"  no-radius type="password"  color="info" placeholder="abc123&@" />
                      <small v-if="v$.step2.confirm_password.$error">{{v$.step2.confirm_password.$errors[0].$message}}</small>
                      <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>
                      <small v-if="resultError['password_confirmation']"> {{ resultError["password_confirmation"] }} </small>
                     </div>
                  </BCol>
                   </BRow> -->
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
     UserOptions:[],
     currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
      resultError: {},
     v$: useVuelidate(),
       error:'',
     step1:{
            nom:'',
            prenom:'',
            email: '',
            phoneNumber:'',
            password: '',
            confirm_password:''
            
          },

            step2:{
            nom:'',
            prenom:'',
            email: '',
            phoneNumber:'',
           
       },
   }
 },
 validations: {
   step1:{
     nom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
   prenom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
   email: {
     require,
     ValidEmail
   },
   phoneNumber: {
     require,
     
   },
   password: {
     require,
     lgmin: lgmin(8),
     lgmax: lgmax(20),
     
   },
   confirm_password: {
     require,
     lgmin: lgmin(8),
     lgmax: lgmax(20),
   },
   },
   step2:{
     nom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
   prenom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
   email: {
     require,
     ValidEmail
   },
   phoneNumber: {
     require,
     
   },
  
           
       },
     

   
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   totalPages() {
   return Math.ceil(this.UserOptions.length / this.itemsPerPage);
   },
   paginatedItems() {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.UserOptions.slice(startIndex, endIndex);
   },
 },
async mounted() {
   console.log("uusers",this.loggedInUser);
  await this.fetchUsers()
 },
 methods: {
   validatePasswordsMatch() {
    return this.step1.password === this.step1.confirm_password;
   },
   successmsg:successmsg,
   async fetchUsers() {
           try {
             const response = await axios.get('/users', {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
             },
   
           });
                   console.log(response.data.data);
                 // Filtrer les utilisateurs dont Identifiant est null
                 const filteredUsers = response.data.data.filter(user => user.Identifiant !== null);
                 console.log(filteredUsers); // Affiche la liste des utilisateurs dont Identifiant est null
                 this.UserOptions = filteredUsers;
              this.loading = false;
           
           } catch (error) {
             console.error('errorqqqqq',error);
           
             if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
               await this.$store.dispatch('auth/clearMyAuthenticatedUser');
             this.$router.push("/");  //a revoir
           }
           }
         },
   async HamdleAddUser(){
     this.error = '',
     this.resultError= '',
    this.v$.step1.$touch()
    if (this.v$.$errors.length == 0 ) {
       this.loading = true
         let DataUser = {
           email:this.step1.email,
           password:this.step1.password,
           password_confirmation:this.step1.confirm_password,
           Nom:this.step1.nom,
           Prenoms:this.step1.prenom,
           Whatsapp:this.step1.phoneNumber,
           CodePartenaire:null,
           region:null ,
           Direction:this.loggedInUser.direction 
         }
         console.log("eeeee",DataUser);
         try {
         const response = await axios.post('/register-new/user' , DataUser);
         console.log('response.login', response.data); 
         if (response.data.status === "success") { 
           this.AddUser = false
           this.loading = false
           this.successmsg("Création d'un personnel",'Votre personnel a été crée avec succès !')
          await this.fetchUsers()

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
           const response = await axios.delete(`/system-user/delete/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           console.log('Réponse de suppression:', response);
           if (response.data.status === 'success') {
             this.loading = false
            this.successmsg('Supprimé!', 'Votre utilisateur a été supprimé.')
           await this.fetchUsers()
   
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
             // Recherchez l'objet correspondant dans le tableau userOptions en fonction de l'ID
             const user = this.UserOptions.find(user => user.id === id);

             if (user) {
                 // Utilisez les informations récupérées de l'objet user
                 console.log('Informations de l\'utilisateur:', user);

            this.step2.email = user.email,
            this.step2.nom = user.Nom,
            this.step2.prenom = user.Prenoms,
            this.step2.phoneNumber = user.Whatsapp,
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
   
           email:this.step2.email,
           Nom:this.step2.nom,
           Prenoms:this.step2.prenom,
           Whatsapp:this.step2.phoneNumber,
           CodePartenaire:null,
           region:null ,
           Direction:this.loggedInUser.direction ,
           user:this.ToId
             }
     console.log('dataCath',dataCath);
   
        try {
          const response = await axios.put(`/system-user/modify`,dataCath, {
            headers: {
             
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
           
            this.UpdateUser1 = false
           this.loading = false
           this.successmsg("Modification du personnel",'Votre personnel a été modifié avec succès !')
           await this.fetchUsers()
            
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
         return  this.UserOptions.slice(startIndex, endIndex);
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