<template >
  <Layout>
   <Loading v-if="loading" style="z-index: 99999;"></Loading>
 <BRow>
   <BCol lg="12">
     <BCard no-body>
       <BCardBody class="border-bottom">
         <div class="d-flex align-items-center justify-content-between">
           <BCardTitle class="mb-0 ">Liste de {{demande.label}}</BCardTitle>

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
              
                 
                 <BTh scope="col" v-if="demande.icon !== 1">Type Demande</BTh>
                 <BTh scope="col">Nom Prenom</BTh>
                 <BTh scope="col">Contact</BTh>
                 <BTh scope="col">№ Carte Biometrique</BTh>
                 <BTh scope="col">Produit Alimentaire </BTh>
                 <BTh scope="col">Statut</BTh>
                 <BTh scope="col">Fichiers</BTh>
               </BTr>
             </BThead>
             <BTbody>
               <BTr v-for="region in paginatedItems" :key="region.id">
                 <BTd v-if="demande.icon !== 1 && region.type_demande">{{ region.type_demande.LibelleTypeDemandes }}</BTd>
                 <BTd>{{ region.Nom }}  {{ region.Prenoms }}</BTd>
                 <BTd> <h5 class="font-size-14 text-truncate">
                      <span class="text-dark">{{ region.Telephone }}</span>
                    </h5>
                    <p class="mb-0">
                      
                      <span class="fw-medium">{{ region.Email }}</span>
                    </p>
                    </BTd>
                    <BTd>{{ region.NumeroCarteBiometric }} </BTd>
                 <BTd>{{ region.ProduitAlimentaire }}</BTd>
                 
                
                
                 <BTd>
                   <ul class="list-unstyled hstack gap-1 mb-0">
                    
                     <li data-bs-toggle="tooltip" v-if="region.traitements.length === 0  " data-bs-placement="top" aria-label="Edit">
                       <Blink href="#"  @click="confirmDelete(region.id)"  class="btn btn-sm btn-soft-info"> Annote</Blink>
                     </li>

                     <li data-bs-toggle="tooltip"  v-else-if="region.traitements[0].Statut === 'EN COURS'" data-bs-placement="top" aria-label="Edit">
                      <Blink href="#" @click="UpdateUser(region.id)" class="btn btn-sm btn-soft-info">EN COURS..</Blink>

                     </li>
                     <li data-bs-toggle="tooltip"  v-else-if="region.traitements[0].Statut === 'ACCEPTER'" data-bs-placement="top" aria-label="View">
                       <Blink href="#"    class="btn btn-sm btn-soft-primary"> ACCEPTER</Blink>
                     </li>

                     <li data-bs-toggle="tooltip"  v-else-if="region.traitements[0].Statut === 'REJETER'" data-bs-placement="top" aria-label="Delete">
                       <Blink href="#"    class="btn btn-sm btn-soft-danger"> REJETER</Blink>
                     </li>
                      
                     
                   
                    
                   </ul>
                 </BTd>
                 <BTd>
                   <ul class="list-unstyled hstack gap-1 mb-0">
                    
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                      <BDropdown toggle-class="btn btn-sm btn-soft-primary" 
                            variant="white" dropright top>
                            <template #button-content>
                              <i class="mdi mdi-dots-vertical"></i>
                            </template>
                            <BDropdownItem  :href="region.FileRccm" download > <i class="mdi mdi-download-outline"></i> Rccm</BDropdownItem>
                            <BDropdownItem :href="region.LettreManuscrite" download > <i class="mdi mdi-download-outline"></i> Lettre</BDropdownItem>
                            <BDropdownItem :href="region.Certificat" download><i class="mdi mdi-download-outline"></i> Certificat</BDropdownItem>
                            <BDropdownItem v-if="region.FileCarteBiometric === null" :href="region.FileCarteBiometric" download ><i class="mdi mdi-download-outline"></i>  Biometrique </BDropdownItem>
                            
                            
                          </BDropdown>
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


 <!-- <BModal v-model="AddUser" hide-footer centered header-class="border-0" title-class="font-18" >
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
                   <h5 class="text-primary">Ajouter une Region</h5>
                   
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
                     <label for="userpassword">Code Region</label>
                   <MazInput v-model="step1.code"  no-radius type="text" name="code"  color="info" placeholder="001" />
                    <small v-if="v$.step1.code.$error">{{v$.step1.code.$errors[0].$message}}</small> 
                    <small v-if="resultError['CodeRegion']"> {{ resultError["CodeRegion"] }} </small>

                   </div>
                </BCol>
              </BRow>
              <BRow>
                <BCol md="12">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Nom Region</label>
                   <MazInput v-model="step1.nom"  no-radius type="text" name="nom"   color="info" placeholder="exemple" />
                    <small v-if="v$.step1.nom.$error">{{v$.step1.nom.$errors[0].$message}}</small> 
                    <small v-if="resultError['CodeRegion']"> {{ resultError["CodeRegion"] }} </small>

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
 </BModal> -->

 <BModal v-model="UpdateUser1" hide-footer centered header-class="border-0" title-class="font-18" size="lg" >
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
                   <h5 class="text-primary">Observations lors de l'enquête.</h5>
                   
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
                     <label for="userpassword">Après l'enquête, acceptez-vous la demande ?</label>
                     <MazSelect label="Sélectionner une reponse"  v-model="Statut" no-radius  color="info" :options="choix" search />
                    <small v-if="v$.Statut.$error">{{v$.Statut.$errors[0].$message}}</small> 
                    <small v-if="resultError['Statut']"> {{ resultError["Statut"] }} </small>

                   </div>
                    </BCol>

                    <BCol md="6">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Date d'arrêt</label>
                   <MazInput v-model="DateSignatureArreter"  no-radius type="date" name="date"  color="info" placeholder="001" />
                    <small v-if="v$.DateSignatureArreter.$error">{{v$.DateSignatureArreter.$errors[0].$message}}</small> 
                    <small v-if="resultError['DateSignatureArreter']"> {{ resultError["DateSignatureArreter"] }} </small>

                   </div>
                    </BCol>

                 </BRow>

                 <BRow>
                  <BCol md="12">
                    <label for="userpassword">Fichier d'arrêt.</label>
                      <div class="mb-3 position-relative">
                        <input type="file" name="file" id="file" 
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        @change="handleFileChange" />
                      <!-- <label for="file">
                        <i class="dripicons-cloud-download"></i>
                      Joindre une pièce
                      </label> -->
                      </div>
                      <small v-if="resultError['Arreter']"> {{ resultError["Arreter"] }} </small>
                   </BCol>
                  </BRow>
              
              

                 <BRow>
                 
                    <BCol md="12">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Observations</label>
                   <MazTextarea v-model="Observations"  no-radius type="date" name="code"  color="info" placeholder="Commentaire" />
                  
    
                    <small v-if="v$.Observations.$error">{{v$.Observations.$errors[0].$message}}</small> 
                    <small v-if="resultError['Observations']"> {{ resultError["Observations"] }} </small>

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
 

</Layout>
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
props:['demande'],
data() {
 return {
   loading:true,
   AddUser:false,
   UpdateUser1:false,
   ToId:'',
   demandeOptions:[],
   currentPage: 1,
   itemsPerPage: 8,
   totalPageArray: [],
    resultError: {},
   v$: useVuelidate(),
        Statut:'',
        Arreter:'',
        DateSignatureArreter:'',
        Observations:'',
        selectedFile:'',
     error:'',
     choix: [
      { label: "Oui", value: "ACCEPTER" },
      { label: "Non", value: "REJETER" },
    ],
       

         
 }
},
validations: {
 
 Statut: {
   require,
   lgmin: lgmin(2),

 },
 selectedFile: {

 },
 DateSignatureArreter: {
   require,


 },
 Observations: {
   lgmin: lgmin(2),

 },
   

 
},
computed:{
 loggedInUser() {
   return this.$store.getters['auth/myAuthenticatedUser'];
 },
 totalPages() {
 return Math.ceil(this.demandeOptions.length / this.itemsPerPage);
 },
 paginatedItems() {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.demandeOptions.slice(startIndex, endIndex);
 },
},
async mounted() {
 console.log("uusers",this.loggedInUser);
 await this.fetchDemande1()

console.log("demande",this.demande);

},
methods: {

 successmsg:successmsg,
 async fetchDemande1() {
  try {
    const response = await axios.get('/demande-autorisations', {
      headers: { Authorization: `Bearer ${this.loggedInUser.token}`},
      params:{
        annotate: this.demande.icon,
        type: this.demande.id,
        Direction: this.loggedInUser.direction
      }
    });

    const typeDemandes = response.data.data;

    // Filtrer les données en fonction des paramètres annotate et type
//     const filteredDemandes = typeDemandes.filter(demande => {
//   return this.demande.id === null ? 
//     demande.Annote === this.demande.icon :
//     demande.Annote === this.demande.icon && demande.TypeDemandeId === this.demande.id;
// });

    this.demandeOptions = typeDemandes; // Mettre à jour demandeOptions avec les données filtrées
    console.log('demande filtrée', this.demandeOptions);

    this.loading = false;
  } catch (error) {
    console.error('Error fetching demande:', error);
    if (error.response && (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401)) {
      await this.$store.dispatch('auth/clearMyAuthenticatedUser');
      this.$router.push("/");
    }
  }
},

handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected file:", file);
      this.selectedFile = file;
      console.log('eee',this.selectedFile)
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
         await this.fetchDemande1()

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
  title: 'Êtes-vous sûr de vouloir valider cette demande?',
  text: 'Une fois validée, le traitement commencera et vous ne pourrez pas revenir en arrière!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Oui, valider!',
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
       let data = { autorisation:id}
       try {
         // Faites une requête pour supprimer l'élément avec l'ID itemId
         const response = await axios.post('/demande-autorisations/annoter',data, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
           },
 
 
         });
         console.log('Réponse de suppression:', response);
         if (response.data.status === 'success') {
           this.loading = false
           this.successmsg('Succès!', 'L\'action a été effectuée avec succès.');
          await this.fetchDemande1()
          location.reload();
 
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
       this.ToId = id
    
},

 async  submitUpdate(){
 
   this.v$.$touch();
    console.log("bonjour");
 
    if (this.v$.$errors.length == 0) {
      console.log("bonjour");
         this.loading = true;
        const formData = new FormData();
        formData.append("DemandeId",  this.ToId);
        formData.append("Statut", this.Statut);
        formData.append("Arreter", this.selectedFile);
        formData.append("DateSignatureArreter", this.DateSignatureArreter);
        formData.append("Observations", this.Observations);
         
        console.log(formData);
        console.log(
          this.ToId,this.Statut,
          this.selectedFile, 
          this.DateSignatureArreter, this.Observations 
        );
 
      try {
        const response = await axios.post('demande-autorisations/ajouter-observation',formData, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          await this.fetchDemande1()
          this.UpdateUser1 = false
         this.loading = false
         this.successmsg("Modification de",'Votre region a été modifiée avec succès !')
         
          
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
       return  this.demandeOptions.slice(startIndex, endIndex);
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