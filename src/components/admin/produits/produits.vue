<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
 
 <BRow>
   <BCol lg="12">
     <BCard no-body>
       <BCardBody class="border-bottom">
         <div class="d-flex align-items-center justify-content-between">
           <BCardTitle class="mb-0 ">Liste des Produits</BCardTitle>

          

           <div class="flex-shrink-0 d-flex">
              <BCol xxl="4" lg="9" class=" me-3">
             <MazInput v-model="searchQuery"   no-radius type="email"  color="info" size="sm" placeholder="Recherchez ..." />
           </BCol>
             <div @click="$router.push({ path: '/produits/ajouter' })" class="btn btn-primary">Ajouter</div>
             
           </div>
         </div>
       </BCardBody>

       <BCardBody v-if="paginatedItems.length === 0" class="noresul">
         <div >
       <span> Vous n'avez pas encore de personnel, vous pouvez également en ajouter un !! </span>
        </div>
       </BCardBody>
      
       <BCardBody v-else>
            <div class="table-responsive">
              <BTableSimple class="align-middle mb-0 table-nowrap">
                <BThead class="table-light">
                  <BTr>
                    <BTh>Image</BTh>
                    <BTh>Nom</BTh>
                    <BTh>Categorie</BTh>
                    <BTh>Forme</BTh>
                    <BTh >Unite</BTh>
                    <BTh >Actions</BTh>
                  </BTr>
                </BThead>
                <BTbody>
                  <BTr v-for="product in paginatedItems" :key="product.id" class="product">
                    <BTd>
                      <div v-if="product.ImageProduit === null">
                      <img  src="@/assets/img/produits.jpg" alt="product-img" title="product-img" class="avatar-sm"  @click="singleImage = true" />
                     <vue-easy-lightbox :visible="singleImage" :imgs="imgs1" @hide="singleImage = false"></vue-easy-lightbox>
                      </div>
                      <div v-else >
                        <img :src="product.ImageProduit" alt="product-img" title="product-img" class="avatar-sm" @click="singleImage = true" />
                        <vue-easy-lightbox :visible="singleImage" :imgs="[product.ImageProduit]" @hide="singleImage = false"></vue-easy-lightbox>
                      </div>
                    </BTd>
                    <BTd>
                      <h5 class="font-size-14 text-truncate">
                        <span class="text-dark">{{ product.NomProduit }}</span>
                      </h5>
                      <!-- <p class="mb-0">
                        Color:
                        <span class="fw-medium">{{ product.Description }}</span>
                      </p> -->
                    </BTd>
                    <BTd><span class="product-price" v-if="product.categorie">{{ product.categorie.NomCategorieProduit }}</span></BTd>
                    <BTd><span class="product-price" v-if="product.forme">{{ product.forme.Nom }}</span></BTd>
                    <BTd><span class="product-line-price" v-if="product.unite">{{ product.unite.Nom }}({{ product.unite.Symbol }})</span></BTd>
                    <BTd>
                      <ul class="list-unstyled hstack gap-1 mb-0">
                    
                    <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                      <div  @click="UpdateUser(product.id)" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></div>
                    </li>
                    <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                      <div @click="confirmDelete(product.id)" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></div>
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



 <BModal v-model="UpdateUser1" hide-footer centered header-class="border-0" title-class="font-18"  size="lg" >
   <div>
 
 <div class="account-pages " style="width:100%;">
   <BContainer>
     <BRow >
       <BCol >
         <BCard no-body class="" style=" box-shadow:none !important;
          border: 1px solid #c9d1d9 !important;">
           <div class="bg-primary-subtle">
             <BRow>
               <BCol cols="12 text-center">
                 <div class="modalheader p-4">
                   <h5 class="text-primary">Modifier un produit </h5>
                   
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
                 
                <BRow >
                     <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom Produit</label>
                     <MazInput v-model="step2.NomProduit"  no-radius type="text"  color="info" placeholder="mcimpe" />
                      <small v-if="v$.step2.NomProduit.$error">{{v$.step2.NomProduit.$errors[0].$message}}</small> 
                      <small v-if="resultError['NomProduit']"> {{ resultError["NomProduit"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Description</label>
                     <MazInput v-model="step2.Description"  no-radius type="text"  color="info" placeholder="exemple" />
                      <small v-if="v$.step2.Description.$error">{{v$.step2.Description.$errors[0].$message}}</small> 
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="4">
                   <label for="userpassword">Image Produit</label>
                     <div class="mb-3 position-relative">
                        <div class="input-groupe">
                          <input type="file" name="file"   @change="handleFileChange($event)"  accept="image/*" />
                        </div>
                     </div>
                     <small v-if="resultError['Image']"> {{ resultError["Image"] }} </small>
                  </BCol>
                </BRow>
                <BRow>
                  
                  <BCol md="4">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Categorie Produit</label>
                     <MazSelect label="Sélectionner la Sous Categorie" v-model="step2.CategorieProduit" color="info" no-radius :options="CategorieOptions"  search />
                    <small v-if="v$.step2.CategorieProduit.$error">{{v$.step2.CategorieProduit.$errors[0].$message}}</small> 
                    <small v-if="resultError['CategorieProduit']"> {{ resultError["CategorieProduit"] }} </small>
                  <!-- <small v-if="errors[index] && errors[index].CategorieProduit">{{ errors[index].CategorieProduit }}</small> -->

                   </div>
                </BCol>
                <BCol md="4">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Forme Produit</label>
                     <MazSelect label="Sélectionner la Forme" v-model="step2.FormeProduit" color="info" no-radius :options="FormesOptions"  search />
                    <small v-if="v$.step2.FormeProduit.$error">{{v$.step2.FormeProduit.$errors[0].$message}}</small> 
                    <small v-if="resultError['FormeProduit']"> {{ resultError["FormeProduit"] }} </small>
                  <!-- <small v-if="errors[index] && errors[index].FormeProduit">{{ errors[index].FormeProduit }}</small> -->

                   </div>
                </BCol>
                <BCol md="4">
                   <div class="mb-3 position-relative">
                     <label for="userpassword">Unite Produit</label>
                     <MazSelect label="Sélectionner l'Unite" v-model="step2.UniteProduit" color="info" no-radius :options="UnitesOptions"  search />
                    <small v-if="v$.step2.UniteProduit.$error">{{v$.step2.UniteProduit.$errors[0].$message}}</small> 
                    <small v-if="resultError['UniteProduit']"> {{ resultError["UniteProduit"] }} </small>
                  <!-- <small v-if="errors[index] && errors[index].UniteProduit">{{ errors[index].UniteProduit }}</small> -->

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
import VueEasyLightbox from "vue-easy-lightbox";
import img1 from '@/assets/img/guinea.png'

export default {
 components: {

 Loading ,
 Pag,
 MazPhoneNumberInput,
 VueEasyLightbox
},
data() {
 return {
   loading:true,
   AddUser:false,
   UpdateUser1:false,
   singleImage: false,
   ToId:'',
   ProduitOptions:[],
   currentPage: 1,
   itemsPerPage: 8,
   totalPageArray: [],
   CategorieOptions:[],
       FormesOptions:[],
       UnitesOptions:[],
       ImageBD:'',
       selectedFile:'',
       selectedFile1:null,
    resultError: {},
    IsActive:'',
   v$: useVuelidate(),
   formes: [{ Nom: ''  , Description:'', IsActive:true, }],
   error: '',
    errors:[],
    imgs1: [ 'https://images.unsplash.com/photo-1555431189-0fabf2667795?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', ],
   step1:{ nom:'', },

          step2:{
         
            NomProduit:'',
            Description:'',
            Image:'',
            CategorieProduit:'',
            FormeProduit:'',
            UniteProduit:'',
         
         
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
   
  NomProduit: {
   require,
   lgmin: lgmin(2),
  
 },
 Description: {
   lgmin: lgmin(1),
   lgmax: lgmax(1000),
 },
 Image: {
   
 },
 CategorieProduit: {
  require
 },
 FormeProduit: {
  require
 },
 UniteProduit: {
  require
 },

         
     },
   

 
},
computed:{
 loggedInUser() {
   return this.$store.getters['auth/myAuthenticatedUser'];
 },
 totalPages() {
 return Math.ceil(this.ProduitOptions.length / this.itemsPerPage);
 },
 paginatedItems() {
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;
   return this.ProduitOptions.slice(startIndex, endIndex);
 },
},
async mounted() {
 console.log("uusers",this.loggedInUser);
 await this.fetchProduits()
 await this.fetchCategorie()
   await this.fetchFormes()
   await this.fetchUnites()
},
methods: {

 successmsg:successmsg,
 async fetchProduits() {
  try {
            const response = await axios.get('/produits', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             
  
          });
             console.log(response.data.data);
             this.ProduitOptions = response.data.data;
             this.loading = false;
          
          } catch (error) {
            console.error('errorqqqqq',error);
          
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          }
},
async fetchCategorie() {
  try {
            const response = await axios.get('/sous-produits', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             });
             console.log(response.data.data);
             this.CategorieOptions = response.data.data.map(sousprefecture => ({
                label: sousprefecture.NomCategorieProduit,
                value: sousprefecture.id,  }));
                 this.loading = false;
          
          } catch (error) {
            console.error('errorqqqqq',error);
          
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          }
},
async fetchFormes() {
  try {
            const response = await axios.get('/formes', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             
  
          });
             console.log(response.data.data);
             this.FormesOptions = response.data.data.map(sousprefecture => ({
                label: sousprefecture. Nom,
                value: sousprefecture.id,
      
          }));
             this.loading = false;
          
          } catch (error) {
            console.error('errorqqqqq',error);
          
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          }
},
async fetchUnites() {
  try {
            const response = await axios.get('/unites', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             
  
          });
             console.log(response.data.data);
             this.UnitesOptions = response.data.data.map(sousprefecture => ({
                label: sousprefecture. Nom,
                value: sousprefecture.id,
      
          }));
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
     this.DeleteUser(id);
   }
},
async DeleteUser(id) {
        this.loading = true
       
       try {
         // Faites une requête pour supprimer l'élément avec l'ID itemId
         const response = await axios.delete(`/produits/${id}`, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
             
 
           },
 
 
         });
         console.log('Réponse de suppression:', response);
         if (response.data.status === 'success') {
          await this.fetchProduits()
           this.loading = false
          this.successmsg('Supprimé!', 'Votre  produit  a été supprimé.')
 
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
           const user = this.ProduitOptions.find(user => user.id === id);

           if (user) {
               // Utilisez les informations récupérées de l'objet user
               console.log('Informations de l\'utilisateur:', user);
                    this.step2.NomProduit = user.NomProduit,
                    this.step2.Description = user.Description,
                    this.step2.CategorieProduit = user.categorie.id,
                    this.step2.UniteProduit = user.unite.id,
                    this.step2.FormeProduit = user.forme.id,
                    this.ToId = user.id,
                    this.IsActive = user.IsActive,
                    this.ImageBD = user.ImageProduit
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
       console.log('this.selectedFile1',this.selectedFile1)
       if(this.selectedFile1 === null){
      console.log("bonjour nulll");
      const dataCath = {
              products:[
                {
                  
                  NomProduit:this.step2.NomProduit,
                   Description:this.step2.Description,
                   CategorieProduit:this.step2.CategorieProduit,
                   UniteProduit:this.step2.UniteProduit,
                   FormeProduit:this.step2.FormeProduit,
                   ImageProduit:  this.ImageBD ,
                   IsActive:this.IsActive,
                   id:this.ToId
                }
              ]
              
           }
          console.log('dataCath',dataCath);
        this.SubmitUpdateProduct(dataCath)  

       }else{
      console.log("bonjour ok");

      const dataCath = {
              products:[
                {
                  
                  NomProduit:this.step2.NomProduit,
                   Description:this.step2.Description,
                   CategorieProduit:this.step2.CategorieProduit,
                   UniteProduit:this.step2.UniteProduit,
                   FormeProduit:this.step2.FormeProduit,
                   ImageProduit:  this.selectedFile,
                   IsActive:this.IsActive,
                   id:this.ToId
                }
              ]
              
           }
          console.log('dataCath',dataCath);
        this.SubmitUpdateProduct(dataCath)  

       }
      
 
    
    } else {
      console.log("cest pas bon ", this.v$.$errors);
    }
   },
async   SubmitUpdateProduct(dataCath){
    try {
        const response = await axios.post(`/produits/update`,dataCath, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          await this.fetchProduits()
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
   },
   handleFileChange(event) {
  console.log("File input change");
  const file = event.target.files[0];
  console.log("Selected file:", file);
  // Stockez l'image sélectionnée dans selectedImages à l'index approprié
  this.selectedFile1 = file
   this.submitFile(file)

},
async submitFile(file ){
  const formData = new FormData();
formData.append('Photo',file);
formData.append('id',this.ToId);


try {
const response = await axios.post('/produits/upload' , formData, {
     headers: { Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
    }});
  console.log('Réponse du téléversement :', response);
  if (response.data.status === "success") { 
        this.selectedFile = response.data.data.url
        
       

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
       return  this.ProduitOptions.slice(startIndex, endIndex);
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