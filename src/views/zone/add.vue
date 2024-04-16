<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Zones Industrielles" pageTitle="Tableau de bord" />
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
                     <h5 class="text-primary">Ajouter une zone industrielle</h5>
                     
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
                     <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Code zone</label>
                     <MazInput v-model="code"  no-radius type="text"  color="info" placeholder="001" />
                      <small v-if="v$.code.$error">{{v$.code.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodeZone']"> {{ resultError["CodeZone"] }} </small>
                     </div>
                  </BCol>

                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom zone</label>
                     <MazInput v-model="nom"  no-radius type="text"  color="info" placeholder="exemple" />
                      <small v-if="v$.nom.$error">{{v$.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['IntituleZone']"> {{ resultError["IntituleZone"] }} </small>
                     </div>
                  </BCol>
                  <BCol md="4">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Type de zone</label>
                       <MazSelect label="Sélectionner le type de zone" v-model="TypeZone" no-radius  color="info" :options="choix" search />
                      <small v-if="v$.TypeZone.$error">{{v$.TypeZone.$errors[0].$message}}</small> 
                      <small v-if="resultError['TypeZone']"> {{ resultError["TypeZone"] }} </small>
                     </div>
                  </BCol>
                   </BRow>
                   <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  
                  <label for="userpassword">Region <span class="text-danger">*</span></label>
                  <MazSelect label="Sélectionner la région" v-model="region" no-radius  color="info" :options="regionOptions"
                    :class="{ 'error-border': resultError['Region'] }"
                    @input="resultError['Region'] = false"
                    v-slot="{ option }"
                     search
                   
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionClick(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.region.$error">{{
                  v$.region.$errors[0].$message
                }}</small>
                <small v-if="resultError['Region']"> {{ resultError["Region"] }} </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="Sousprefecture"
                    >Prefecture <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner la préfecture"
                    v-model="prefecture"
                     no-radius  color="info"
                    :options="prefectureOptions"
                    v-slot="{ option }"
                    search
                    :disabled="isPrefectureDisabled"

                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionPrefecture(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.prefecture.$error">{{
                                    v$.prefecture.$errors[0].$message }}</small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="Commune">Commune <span class="text-danger">*</span></label>
                  <MazSelect
                  label="Sélectionner la commune"
                    v-model="commune"
                     no-radius  color="info"
                    :options="sous_prefectureOptions"
                    @click="handleChange"
                    :class="{ 'error-border': resultError['Commune'] }"
                    @input="resultError['Commune'] = false"
                    v-slot="{ option }"
                    search
                    :disabled="isCommuneDisabled"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionCommune(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>

                  <!-- <input type="text" name="Commune" id="Commune" placeholder="" v-model="commune"> -->
                </div>
                <small v-if="v$.commune.$error">{{
                  v$.commune.$errors[0].$message
                }}</small>
                <small v-if="resultError['Commune']">
                  {{ resultError["Commune"] }}
                </small>
              </div>
                        </div>
                        <div class="row mb-3 mt-3 content-group">
                            <div class="col">
                            <div class="input-groupe">
                            <label for="Quartier"
                                >Quartier <span class="text-danger">*</span></label
                            >
                            <MazSelect
                            label="Sélectionner le quartier"
                                v-model="CodeQuartier"
                                no-radius  color="info"
                                :options="QuartierOptions"

                                :class="{ 'error-border': resultError['CodeQuartier'] }"
                                @input="resultError['CodeQuartier'] = false"
                                search
                                :disabled="isQuartierDisabled"
                            
                            />
                            </div>
                            <small v-if="v$.CodeQuartier.$error">{{
                            v$.CodeQuartier.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['CodeQuartier']">
                            {{ resultError["CodeQuartier"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="SuperficieTotal"
                                >Superficie Total </label
                            >
                           
                            <MazInput v-model="SuperficieTotal"  no-radius type="number"  color="info" placeholder="440.5" />
                            </div>
                            <small v-if="v$.SuperficieTotal.$error">{{
                            v$.SuperficieTotal.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['SuperficieTotal']">
                            {{ resultError["SuperficieTotal"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="Shape" >Shape File <span class="text-danger">*</span></label >
                            <div class="mb-3 position-relative">
                       <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                       accept=".zip"
                       @change="handleFileChange" />
                     <label for="file">
                       <i class="dripicons-cloud-download"></i>
                            Joindre une pièce
                     </label>
                     </div>
                     <small v-if="resultError['Shape']"> {{ resultError["Shape"] }} </small>
                            </div>
                           
                        </div>
                       
                        </div>

                  

                  

                   <BRow>
                   <BCol md="2">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Couleur</label>
                       <MazInput  v-model="Couleur"  no-radius color="info" type="color" />
                      <small v-if="v$.Couleur.$error">{{v$.Couleur.$errors[0].$message}}</small> 
                      <small v-if="resultError['Couleur']"> {{ resultError["Couleur"] }} </small>
                     </div>
                  </BCol>
                     <BCol md="10">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Observations </label>
                       <div class="form-ckeditor">
                       <ckeditor v-model="Observation" :editor="editor"></ckeditor>

                     </div>
                     </div>
                     <small v-if="resultError['Observation']"> {{ resultError["Observation"] }} </small>
                  </BCol>
                   </BRow>
                   <BRow class="mb-0">
                     <BCol cols="12" class="text-end">
                       <div class="boutton">
                       <button class="" @click="SubmitZone()">Valider</button>
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
import { number } from 'maz-ui'

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
       TypeZone:'',
       region:'',
       prefecture:'',
       commune:'',
       CodeQuartier:'',
       SuperficieTotal:'',
       selectedFile:'',
       Couleur:'',
       Observation:'',
        regionOptions: [],
      prefectureOptions: [],
      sous_prefectureOptions: [],
      QuartierOptions: [],
      choix: [
        { label: "PUBLIQUE", value: "PUBLIQUE" },
        { label: "PRIVEE", value: "PRIVEE" },
      ],
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
   TypeZone: {
     require,
   },
   region: {
     require,
   },
   prefecture: {
     require,
   },
   commune: {
     require,
   },
   CodeQuartier: {
     require,
   },
   SuperficieTotal: {
     require,
   },
   selectedFile: {
     require,
     
   },
   Couleur: {
    require
     
   },
   Observation: {
    
   },
   
  
    
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   isPrefectureDisabled() {
      return !this.region;
    },
    isCommuneDisabled() {
      return !this.prefecture;
    }, 
    isQuartierDisabled() {
      return !this.commune;
    },
    // numberFormatted(){
    //     return number(this.SuperficieTotal, 'en-US')
    // },
   
 },
async mounted() {
   console.log("uusers",this.loggedInUser);
        await this.fetchRegionOptions(),
        await this.fetchPrefectureOptions(),
        await this.fetchSousPrefectureOptions(),
        await this.fetchQuartierOptions()
 },

  methods: {
   successmsg:successmsg,
   handleFileChange(event) {
     console.log("File input change");
     const file = event.target.files[0];
     console.log("Selected file:", file);
     this.selectedFile = file;
   },
   async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions"])
        ); // Accéder aux options des pays via le getter
        this.regionOptions = options; // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async fetchPrefectureOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchPrefectureOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getprefectureOptions"])
        ); // Accéder aux options des pays via le getter
         this.prefectureOptions = options.map((country) => ({
        label:country. NomPrefecture,
        value: country.CodePrefecture,
      }));;
        // Affecter les options à votre propriété sortedCountryOptions

      
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des prefecture :",
          error.message
        );
      }
    },

    async fetchSousPrefectureOptions() {
  try {
    await this.$store.dispatch("fetchSous_PrefectureOptions");
    const options = JSON.parse(JSON.stringify(this.$store.getters["getSousprefectureOptions"]));
    this.sous_prefectureOptions = options.map((country) => ({
        label:country. NomSousPrefecture,
        value: country.CodeSousPrefecture,
      }));
     

    
   
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des options des sous-préfectures :",
      error.message
    );
  }
},

    async fetchQuartierOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchQuartierOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getQuartierOptions"])
       
        ); // Accéder aux options des pays via le getter
     console.log('Sous-préfecture :', options);

        this.QuartierOptions = options.map((country) => ({
        label:country. NomQuartier,
        value: country.CodeQuartier,
      }));; // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des prefecture :",
          error.message
        );
      }
    },
    async fetchLocalite(code, localite) {
      try {
        const response = await axios.get("/localites/children-by-code", {
          params: { code: code, type_localite: localite },
        });
        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des options des response :", error);
      }
    },

    async handleOptionClick(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "REGION");
        console.log("Données de localité :", localiteData.prefectures);
        const options = localiteData.prefectures.map((prefecture) => ({
          label: prefecture.NomPrefecture,
          value: prefecture.CodePrefecture,
          code: prefecture.CodeRegion,
        }));
        console.log("Données de localitézzz :",options );

        this.prefectureOptions1 = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },

    async handleOptionPrefecture(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "PREFECTURE");
        const userId = this.loggedInUser.id;
        option.identifiant = userId
        this.option = option
        console.log('prefecture',this.option);
        console.log("Données de localité :", localiteData.sous_prefectures);
        const options = localiteData.sous_prefectures.map((sous_prefecture) => ({
          label: sous_prefecture.NomSousPrefecture,
          value: sous_prefecture.CodeSousPrefecture,
          code: sous_prefecture.CodePrefecture,
        }));
         this.sous_prefectureOptions = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },

    async handleOptionCommune(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "COMMUNE");
        console.log("Données de localité :", localiteData.quartiers);
        const options = localiteData.quartiers.map((quartier) => ({
          label: quartier.NomQuartier,
          value: quartier.CodeQuartier,
          code: quartier.CodeSousPrefecture,
        }));
         this.QuartierOptions = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },
  
   async SubmitZone() {
     this.v$.$touch();
     console.log("bonjour");

     if (this.v$.$errors.length == 0) {
       console.log("bonjour");
        this.loading = true;
       const formData = new FormData();
       formData.append("IntituleZone", this.nom);
       formData.append("SuperficieTotal", this.SuperficieTotal);
       formData.append("TypeZone", this.TypeZone);
       formData.append("Shape", this.selectedFile);
       formData.append("CodeZone", this.code);
       formData.append("Observation", this.Observation);
       formData.append( "CodeQuartier",this.CodeQuartier )
       formData.append( "Couleur",this.Couleur )
        
       console.log(formData);
       console.log(
         this.nom,this.SuperficieTotal,this.TypeZone,
         this.Observation, this.Couleur ,
         this.selectedFile, this.code , this.CodeQuartier
       );

       try {
         const response = await axios.post("/zone-industrielles", formData, {
           headers: {
             "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${this.loggedInUser.token}`,
           },
         });
         console.log("Réponse du téléversement :", response);
         if (response.data.status === "success") {
           this.loading = false
           this.successmsg("Création de la zone industrielle",'Votre zone industrielle a été crée avec succès !')
           this.$router.push({ path: '/zone-industrielle' })
           
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