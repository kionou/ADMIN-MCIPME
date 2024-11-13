<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Ajouter Produits" pageTitle="Paramétrages" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           
           
             
     <div>
   
   <div class="account-pages ">
     <BContainer>
       <BRow >
         <BCol >
           <BCard no-body class="" style=" box-shadow:none !important;
            border: 1px solid #c9d1d9 !important;">
             <div class="bg-primary-subtle">
               <BRow>
                 <BCol cols="12 text-center">
                   <div class="modalheader p-4">
                     <h5 class="text-primary">Ajouter un produit</h5>
                     
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
                  <div  style="font-size: 18px;" @click="AddformData" class="btn btn-sm btn-info"><i class="mdi mdi-plus-box-outline"></i></div>
                </li>
               </div>
               <div class="p-2">
                 <BForm class="form-horizontal">
                    <BRow  v-for="(product, index) in products" :key="product.id" class="align-items-center p-2 border border-secondary rounded-2 mb-3" >
                        
                        <BCol md="11">
                            <span class="nombre">
                            {{index + 1}}
                        </span>
                        <BRow >
                     <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom Produit</label>
                     <MazInput v-model="product.NomProduit"  no-radius type="text"  color="info" placeholder="mcimpe" />
                      <!-- <small v-if="v$.NomProduit.$error">{{v$.NomProduit.$errors[0].$message}}</small>  -->
                    <small v-if="errors[index] && errors[index].NomProduit">{{ errors[index].NomProduit }}</small>
                      <small v-if="resultError['NomProduit']"> {{ resultError["NomProduit"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Description</label>
                     <MazInput v-model="product.Description"  no-radius type="text"  color="info" placeholder="exemple" />
                      <!-- <small v-if="v$.Description.$error">{{v$.Description.$errors[0].$message}}</small>  -->
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="4">
                   <label for="userpassword">Image Produit</label>
                     <div class="mb-3 position-relative">
                        <div class="input-groupe">
                          <input type="file" name="file"   @change="handleFileChange(product, $event)"  accept="image/*" />
                        </div>
                     </div>
                     <small v-if="resultError['ImageProduit']"> {{ resultError["ImageProduit"] }} </small>
                  </BCol>
                         </BRow>

                   <BRow>
                  
                    <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Categorie Produit</label>
                       <MazSelect label="Sélectionner la Sous Categorie" v-model="product.CategorieProduit" color="info" no-radius :options="CategorieOptions"  search />
                      <!-- <small v-if="v$.CategorieProduit.$error">{{v$.CategorieProduit.$errors[0].$message}}</small>  -->
                      <small v-if="resultError['CategorieProduit']"> {{ resultError["CategorieProduit"] }} </small>
                    <small v-if="errors[index] && errors[index].CategorieProduit">{{ errors[index].CategorieProduit }}</small>

                     </div>
                  </BCol>
                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Forme Produit</label>
                       <MazSelect label="Sélectionner la Forme" v-model="product.FormeProduit" color="info" no-radius :options="FormesOptions"  search />
                      <!-- <small v-if="v$.FormeProduit.$error">{{v$.FormeProduit.$errors[0].$message}}</small>  -->
                      <small v-if="resultError['FormeProduit']"> {{ resultError["FormeProduit"] }} </small>
                    <small v-if="errors[index] && errors[index].FormeProduit">{{ errors[index].FormeProduit }}</small>

                     </div>
                  </BCol>
                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Unite Produit</label>
                       <MazSelect label="Sélectionner l'Unite" v-model="product.UniteProduit" color="info" no-radius :options="UnitesOptions"  search />
                      <!-- <small v-if="v$.UniteProduit.$error">{{v$.UniteProduit.$errors[0].$message}}</small>  -->
                      <small v-if="resultError['UniteProduit']"> {{ resultError["UniteProduit"] }} </small>
                    <small v-if="errors[index] && errors[index].UniteProduit">{{ errors[index].UniteProduit }}</small>

                     </div>
                  </BCol>
                   </BRow>
                  
                        </BCol>
                            <BCol md="1">
                            <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete" class="ml-4 list-unstyled">
                             <div @click="deleteRow(index)" data-bs-toggle="modal" class="btn btn-sm btn-danger"><i class="mdi mdi-delete-outline"></i></div>
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
         </BCardBody> 
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
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import {successmsg} from "@/lib/modal.js"


export default {
   components: {
   Layout,
   PageHeader,
   Loading ,
   Pag, 
 },
 data() {
   return { 
    
       loading:false,
       v$: useVuelidate(),
       resultError: {},
     v$: useVuelidate(),
       error:'',
       selectedFile:'',
       direction:[],
       CategorieOptions:[],
       FormesOptions:[],
       UnitesOptions:[],
       
      
       products: [{ NomProduit: ''  , Description:'', UniteProduit:'', CategorieProduit:'', FormeProduit:'', ImageProduit:null, IsActive:true, }],
     error: '',
     errors:[],
     AddPartenaire:false
   }
 },
 validations: {
     code: {
     require,
     lgmin: lgmin(2),
     
   },
   nom: {
     require,
     lgmin: lgmin(2),
     
   },
   url: {
     require,
   },
   selectedFile: {
   
     
   },
   description: {
    
     
   },
   direction: {
    
     require
   },
   type: {
    
     
   },
  
    
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   
 },
async mounted() {
   console.log("uusers",this.loggedInUser);
   await this.fetchDirections()
   await this.fetchCategorie()
   await this.fetchFormes()
   await this.fetchUnites()
 },

  methods: {
    AddformData() {
    this.products.push({ NomProduit: ''  , Description:'', UniteProduit:'', CategorieProduit:'', FormeProduit:'', ImageProduit:null, IsActive:true, });
  },

  deleteRow(index) {
    console.log(index);
    if(index !== 0){
      this.products.splice(index, 1);
    }
},
   successmsg:successmsg,
   handleFileChange(product ,event) {
  console.log("File input change");
  const file = event.target.files[0];
  console.log("Selected file:", file);
  // Stockez l'image sélectionnée dans selectedImages à l'index approprié
  // product.Image = file;
  this.submitFile(file ,product)

},
async submitFile(file ,product){
  const formData = new FormData();
formData.append('Photo',file);


try {
const response = await axios.post('/produits/upload' , formData, {
     headers: { Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data'
    }});
  console.log('Réponse du téléversement :', response);
  if (response.data.status === "success") { 
        this.selectedFile = response.data.data.url
        product.ImageProduit =  this.selectedFile
       

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
   async fetchCategorie() {
  try {
            const response = await axios.get('/sous-produits', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
             
  
          });
             console.log(response.data.data);
             this.CategorieOptions = response.data.data.map(sousprefecture => ({
                label: sousprefecture.NomCategorieProduit,
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
   async fetchDirections() { // Renommez la méthode pour refléter qu'elle récupère les options de pays
     try {
       await this.$store.dispatch('fetchDirections');
       const options = JSON.parse(JSON.stringify(this.$store.getters['getdirections'])); // Accéder aux options des pays via le getter
       console.log('Options des Prefecture:', options);
        this.directionOptions = options.map(sousprefecture => ({
       label: sousprefecture.CodeDirection,
       value: sousprefecture.CodeDirection,
      
     }));
       
       // Affecter les options à votre propriété sortedCountryOptions
     } catch (error) {
       console.error('Erreur lors de la récupération des options des prefecture :', error);
     }
   },

   async submitForm() {
this.errors = [];
this.products.forEach((product, index) => {
const errors = {};
if (!product.NomProduit) {
  errors.NomProduit = 'Ce champ est obligatoire!';
  }
  if (!product.UniteProduit) {
  errors.UniteProduit = 'Ce champ est obligatoire!';
  }
  if (!product.CategorieProduit) {
  errors.CategorieProduit = 'Ce champ est obligatoire!';
  }
  if (!product.FormeProduit) {
  errors.FormeProduit = 'Ce champ est obligatoire!';
  }
 
  
this.errors[index] = errors;
});
// Vérifiez s'il y a des erreurs
if (this.errors.some((errors) => errors.NomProduit || errors.UniteProduit || errors.CategorieProduit || errors.FormeProduit  )) {
return; // Ne poursuivez pas la soumission si des erreurs sont présentes
} else {
       this.loading = true;
       console.log('this.products', this.products);
         
      //  let prod = {
      //       NomProduit: product.NomProduit,
      //       Description: product.Description,
      //       CategorieProduit: product.CategorieProduit,
      //       UniteProduit: product.UniteProduit,
      //       FormeProduit: product.FormeProduit,
      //       Image: base64Image, 
      //       IsActive: true,
      //   };

        

          const dataToSend = {
             products: this.products
        };
          console.log('Data to send:', dataToSend);
            this.submitApi(dataToSend);

  }     
  },
  async submitApi(produits){


try {
const response = await axios.post('/produits' , produits, {
     headers: { Authorization: `Bearer ${this.loggedInUser.token}`,
            // 'Content-Type': 'multipart/form-data'
    }});
  console.log('Réponse du téléversement :', response);
  if (response.data.status === "success") { 
         this.loading = false
         this.successmsg("Création des  produits",'Vos  produits ont été crées avec succès !')
          this.$router.push("/produits");
       

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
<style lang="css" scoped>

.carde {
 
 width: 280px;
 height: 370px;
 background: var(--bg-color);
 border: 2px solid var(--color-primary);
 box-shadow: 4px 4px var(--color-primary);
 border-radius: 5px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 padding: 20px;
 align-items: center;
 justify-content: center;
   margin-right: 20px;
   margin-bottom: 20px;

}

.carde:last-child {
 justify-content: flex-end;
}

.carde-img {
  /* border: 1px solid red; */
  width: 120px;
  height: 120px;
}

.carde-img img {

 width: 100%;
 height: 100%;

}



.carde-title {
 font-size: 14px;
 font-weight: 500;
 text-align: center;
 color: #323232;
 

}

.carde-subtitle {
 font-size: 14px;
 font-weight: 400;
 color: #323232;
}

.carde-divider {
 width: 100%;
 border: 1px solid var(--color-primary);
 border-radius: 50px;
}

.carde-footer {
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
}

.carde-price {
 font-size: 20px;
 font-weight: 500;
 color: var(--font-color);
}

.carde-price span {
 font-size: 20px;
 font-weight: 500;
 color: var(--font-color-sub);
}

.card-btn {
 height: 35px;
 background: var(--bg-color);
 border: 2px solid var(--main-color);
 border-radius: 5px;
 padding: 0 15px;
 transition: all 0.3s;
}

.card-btn svg {
 width: 100%;
 height: 100%;
 fill: var(--main-color);
 transition: all 0.3s;
}



.card-btn:hover {
 border: 2px solid var(--main-focus);
}

.card-btn:hover svg {
 fill: var(--main-focus);
}

.card-btn:active {
 transform: translateY(3px);
}
.carde .carde-subtitle .texte-content {

font-weight: bold;
font-size: 13px;
margin-bottom: 10px !important;

}
i{

   font-size: 18px;

}
.nombre{

    color:#fff;
    background-color:var(--color-primary);
    border-radius:50%;
    padding: 2px 10px;
    font-size: 16px;
    position: absolute;
    top: 0px;
    right: -61px;
    z-index: 10; 
}
   
</style>