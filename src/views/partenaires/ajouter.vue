<template >
     <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <PageHeader title="Partenaires" pageTitle="Tableau de bord" />
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            
            
              
      <div>
    
    <div class="account-pages ">
      <BContainer>
        <BRow >
          <BCol >
            <BCard no-body class="overflow-hidden" style=" box-shadow:none !important;
             border: 1px solid #c9d1d9 !important;">
              <div class="bg-primary-subtle">
                <BRow>
                  <BCol cols="12 text-center">
                    <div class="modalheader p-4">
                      <h5 class="text-primary">Ajouter un partenaire</h5>
                      
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
                        <label for="userpassword">Code partenaire</label>
                      <MazInput v-model="code"  no-radius type="text"  color="info" placeholder="mcimpe" />
                       <small v-if="v$.code.$error">{{v$.code.$errors[0].$message}}</small> 
                       <small v-if="resultError['CodePartenaire']"> {{ resultError["CodePartenaire"] }} </small>
                      </div>
                   </BCol>

                   <BCol md="6">
                      <div class="mb-3 position-relative">
                        <label for="userpassword">Nom partenaire</label>
                      <MazInput v-model="nom"  no-radius type="text"  color="info" placeholder="exemple" />
                       <small v-if="v$.nom.$error">{{v$.nom.$errors[0].$message}}</small> 
                       <small v-if="resultError['NomPartenaire']"> {{ resultError["NomPartenaire"] }} </small>
                      </div>
                   </BCol>
                    </BRow>

                    <BRow>
                      <BCol md="6">
                      <div class="mb-3 position-relative">
                        <label for="userpassword">Site web</label>
                      <MazInput v-model="url"  no-radius type="url"  color="info" placeholder="www.exemple.com" />
                       <small v-if="v$.url.$error">{{v$.url.$errors[0].$message}}</small> 
                       <small v-if="resultError['SiteWeb']"> {{ resultError["SiteWeb"] }} </small>
                      </div>
                   </BCol>

                   <BCol md="6">
                    <label for="userpassword">Logo partenaire</label>
                      <div class="mb-3 position-relative">
                        <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                        accept="image/*"
                        @change="handleFileChange" />
                      <label for="file">
                        <i class="dripicons-cloud-download"></i>
                      Joindre une pièce
                      </label>
                      </div>
                      <small v-if="resultError['image']"> {{ resultError["image"] }} </small>
                   </BCol>
                    </BRow>

                    <BRow>
                      <BCol md="12">
                      <div class="mb-3 position-relative">
                        <label for="userpassword">Directions</label>
                        <MazSelect label="Sélectionner la direction" v-model="direction" color="info" :options="directionOptions" multiple search />
                       <small v-if="v$.direction.$error">{{v$.direction.$errors[0].$message}}</small> 
                       <small v-if="resultError['Direction']"> {{ resultError["Direction"] }} </small>
                      </div>
                   </BCol>

                   <!-- <BCol md="6">
                      <div class="mb-3 position-relative">
                        <label for="userpassword">Type de partenaire</label>
                        <MazSelect label="Sélectionner le type de partenaire" v-model="type" color="info" :options="sousCategoriesData" search />
                       <small v-if="v$.type.$error">{{v$.type.$errors[0].$message}}</small> 
                       <small v-if="resultError['NomPartenaire']"> {{ resultError["NomPartenaire"] }} </small>
                      </div>
                   </BCol> -->
                    </BRow>

                    <BRow>
                      <BCol md="12">
                      <div class="mb-3 position-relative">
                        <label for="userpassword">Description </label>
                        <div class="form-ckeditor">
                        <ckeditor v-model="description" :editor="editor"></ckeditor>

                      </div>
                      </div>
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>
                   </BCol>
                    </BRow>
                    <BRow class="mb-0">
                      <BCol cols="12" class="text-end">
                        <div class="boutton">
                        <button class="" @click="SubmitPartenaire()">Valider</button>
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
 import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    components: {
    Layout,
    PageHeader,
    Loading ,
    Pag, ckeditor: CKEditor.component
  },
  data() {
    return { 
     
        loading:false,
        v$: useVuelidate(),
        resultError: {},
      v$: useVuelidate(),
        error:'',
        code:'',
        nom:'',
        url:'',
        selectedFile:'',
        description:'',
        direction:[],
        type:'',
        directionOptions:[],
       editor: ClassicEditor,
      
       

      plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "save table contextmenu directionality emoticons template paste textcolor",
      ],
      toolbar:
        "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
      options: {
        height: 300,
        style_formats: [
          { title: "Bold text", inline: "b" },
          { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          { title: "Example 1", inline: "span", classes: "example1" },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          { title: "Table row 1", selector: "tr", classes: "tablerow1" },
        ],
      },
      AddPartenaire:false
    }
  },
  validations: {
      code: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    nom: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    url: {
      require,
    },
    selectedFile: {
      require,
      
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
  },
 
   methods: {
    successmsg:successmsg,
    handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected file:", file);
      this.selectedFile = file;
    },
    async fetchDirections() { // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch('fetchDirections');
        const options = JSON.parse(JSON.stringify(this.$store.getters['getdirections'])); // Accéder aux options des pays via le getter
        console.log('Options des Prefecture:', options);
         this.directionOptions = options.map(sousprefecture => ({
        label: sousprefecture.CodeDirection,
        value: sousprefecture.CodeDirection,
       
      }));;; 
        
        // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error('Erreur lors de la récupération des options des prefecture :', error);
      }
    },
    async SubmitPartenaire() {
      this.v$.$touch();
      console.log("bonjour");

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
         this.loading = true;
        const formData = new FormData();
        formData.append("NomPartenaire", this.nom);
        formData.append("Description", this.description);
        formData.append("image", this.selectedFile);
        formData.append("StatutPartenaire", 1);
        formData.append("CodePartenaire", this.code);
        formData.append("SiteWeb", this.url);
        formData.append( "Directions[]",this.direction )
         
        console.log(formData);
        console.log(
          this.nom,this.direction,
          this.description, 
          this.selectedFile, this.code , this.url
        );

        try {
          const response = await axios.post("/nouveau-partenaire", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.loading = false
            this.successmsg("Création d'un partenaire",'Votre partenaire a été crée avec succès !')
            this.$router.push({ path: '/partenaires' })
            
          } 
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);
          
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
        else {
          this.loading = false
      this.formatValidationErrors(error.response.data.errors);
    }
        }
      } else {
        console.log("cest pas bon ", this.v$.$errors);
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
    
</style>