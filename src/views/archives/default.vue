<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Archives" pageTitle="Tableau de bord" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center">
             <BCardTitle class="mb-0 flex-grow-1">Liste des Archives</BCardTitle>

             <div class="flex-shrink-0 d-flex">
               <div @click="AddUser = true" class="btn btn-primary me-1">Ajouter</div>
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

         <div class="w-100" v-else>
         
              <BCardBody class="pb-0">
                <div>
                  <BRow>
                    <BCol v-for="archive in paginatedItems" :key="archive.id" >
                      <BCard no-body class="shadow-none border " style="width:220px">
                        <BCardBody class="p-3">
                          <div>
                            <div class="avatar-xs me-3 mb-3">
                              <div class="avatar-title bg-transparent rounded">
                                <i class="bx bxs-folder font-size-24 text-warning"></i>
                              </div>
                            </div>
                            <div class="d-flex">
                              <div class="overflow-hidden me-auto">
                                <h5 class="font-size-14 text-truncate mb-1">
                                  <router-link :to="{ name: 'archive-detail', params: { id: archive.id }}" class="text-body">{{  archive.Name}}</router-link>
                                  <!-- <Blink href="/archive/detail" class="text-body">Designdd</Blink> -->
                                </h5>
                                <p class="text-muted text-truncate mb-0">{{  archive.children.length}} fichier(s)</p>
                              </div>
                              <div class="align-self-end ms-2">
                                <ul class="list-unstyled hstack gap-1 mb-0">
                      
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                        <Blink href="#"  @click="UpdateUser(archive.id)" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                      </li>
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                        <Blink href="#" @click="confirmDelete(archive.id)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                      </li>
                     
                    </ul>
                              </div>
                            </div>
                          </div>
                        </BCardBody>
                      </BCard>
                    </BCol>
                   
                   
                  </BRow>
                </div>

                <BRow class="py-3">
             <BCol lg="12">
               <div class="container_pagination">
                 <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
               </div>
             </BCol>
           </BRow>
              </BCardBody>
        
          </div>
        
         
         
        
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
                     <h5 class="text-primary">Ajouter un dossier</h5>
                     
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
                     <MazInput v-model="step1.nom"  no-radius type="text" name="nom"  color="info" placeholder="dossier" />
                      <small v-if="v$.step1.nom.$error">{{v$.step1.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['Name']"> {{ resultError["Name"] }} </small>

                     </div>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Description</label>
                       <MazTextarea v-model="step1.description"  no-radius type="text" name="description"   color="info" placeholder="exemple" />
                      <small v-if="v$.step1.description.$error">{{v$.step1.description.$errors[0].$message}}</small> 
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>

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
                     <h5 class="text-primary">Modifier un dossier</h5>
                     
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
                     <MazInput v-model="step2.nom"  no-radius type="text" name="nom"  color="info" placeholder="dossier" />
                      <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['Name']"> {{ resultError["Name"] }} </small>

                     </div>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Description</label>
                       <MazTextarea v-model="step2.description"  no-radius type="text" name="description"   color="info" placeholder="exemple" />
                      <small v-if="v$.step2.description.$error">{{v$.step2.description.$errors[0].$message}}</small> 
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>

                     </div>
                  </BCol>
                   </BRow>
                  


                   <BRow class="mb-0">
                     <BCol cols="12" class="text-end">
                       <div class="boutton">
                       <button class="" @click="submitUpdate()">Valider</button>
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
     ArchiveOptions:[],
     currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
      resultError: {},
     v$: useVuelidate(),
       error:'',
     step1:{
            nom:'',
            description:'',
           
            
          },

            step2:{
              nom:'',
            description:'',
           
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
   description: {},
  
   },
   step2:{
    nom: {
     require,
     lgmin: lgmin(2),
     lgmax: lgmax(20),
   },
   description: {},
  
           
       },
     

   
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   totalPages() {
   return Math.ceil(this.ArchiveOptions.length / this.itemsPerPage);
   },
   paginatedItems() {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.ArchiveOptions.slice(startIndex, endIndex);
   },
 },
async mounted() {
   console.log("uusers",this.loggedInUser);
   await this.fetchAchive()
 },
 methods: {
  handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected file:", file);
      this.selectedFile = file;
    },
   successmsg:successmsg,
   async fetchAchive() {
           try {
             const response = await axios.get('/archives', {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
             },
             params: {"children":true},
   
           });
              console.log(response.data.data);
              this.ArchiveOptions = response.data.data;
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
       const formData = new FormData();
        formData.append("Name", this.step1.nom);
        formData.append("Description", this.step1.description);
        formData.append("IsFolderFile",0);
        formData.append( "Direction",this.loggedInUser.direction )
       
         
        console.log(formData);
        console.log(
          this.step1.nom,
          this.step1.description, 
         
        );
         try {
         const response = await axios.post('/archives' , formData, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`, 
              },
             });
         console.log('response.login', response.data); 
         if (response.data.status === "success") { 
          await this.fetchAchive()
           this.AddUser = false
           this.loading = false
           this.successmsg("Création d'un dossier",'Votre dossier a été crée avec succès !')

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
           const response = await axios.delete(`/archives/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           console.log('Réponse de suppression:', response);
           if (response.data.status === 'success') {
             this.loading = false
            this.successmsg('Supprimé!', 'Votre dossier a été supprimé.')
           await this.fetchAchive()
   
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
             // Recherchez l'objet correspondant dans le tableau userOptions en fonction de l'ID
             const user = this.ArchiveOptions.find(user => user.id === id);

             if (user) {
                 // Utilisez les informations récupérées de l'objet user
                 console.log('Informations de l\'utilisateur:', user);

            this.step2.nom = user.Name,
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
      
         const formData = new FormData();
        formData.append("Name", this.step2.nom);
        formData.append("Description", this.step2.description);
        formData.append("IsFolderFile",0);
        // formData.append("id",this.ToId);
        formData.append( "Direction",this.loggedInUser.direction )
       
         
        console.log(formData);
        console.log(
          this.step2.nom,
          this.step2.description, 
         
        );
   
        try {
          const response = await axios.post(`archives/${this.ToId}/update`,formData, {
            headers: {
             
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
           
            this.UpdateUser1 = false
           this.loading = false
           this.successmsg("Modification du dossier",'Votre dossier a été modifié avec succès !')
           await this.fetchAchive()
            
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
         return  this.ArchiveOptions.slice(startIndex, endIndex);
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