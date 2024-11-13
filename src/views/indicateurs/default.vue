<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Liste indicateurs" pageTitle="Paramétrages" :statistic="statistic" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center justify-content-between">
             <BCardTitle class="mb-0 ">Liste des indicateurs</BCardTitle>


             <div class="flex-shrink-0 d-flex">
                <BCol xxl="9" xl="9" lg="9" md="9" sm="9" class="me-1" >
               <MazInput v-model="searchQuery"   no-radius type="text"  color="info" size="sm" placeholder="Recherchez ..." />
             </BCol>
               <div @click="AddUser = true" class="btn btn-primary">Ajouter</div>
               
             </div>
           </div>
         </BCardBody>
<!-- 
         <BCardBody v-if="paginatedItems.length === 0" class="noresul">
           <div >
         <span> Vous n'avez pas encore de personnel, vous pouvez également en ajouter un !! </span>
          </div>
         </BCardBody>
        
         
         
         <BCardBody v-else>
            <div class="py-2 d-flex justify-content-center align-items-center flex-wrap">
        
       
                
        <div class="" style="width: 260px; border:1px solid #dedfe1; margin:0 10px 10px 0" v-for="indicateur in paginatedItems" :key="indicateur.id">
          <BCardBody>
            <div class="d-flex">
              <div class="avatar-md me-4" style="border:1px solid #dedfe1; width: 3rem; height: 3rem;  border-radius: 50%;">
                <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                  <img src="@/assets/images/companies/img-1.png" alt height="30" />
                </span>
              </div>

              <div class="flex-grow-1 overflow-hidden">
                <p class="text-muted mb-4">
                  {{ indicateur.Description }}
                </p>
                <div class="avatar-group">
                 
                 
                  
                </div>
              </div>
            </div>
          </BCardBody>
          <div class="px-4 py-3 border-top">
            <ul class="list-inline mb-0 d-flex justify-content-around align-items-center">
              
              <li v-b-tooltip.hover.top class="list-inline-item me-3" >
                code: {{ indicateur.CodeIndicateur }}
              </li>
              <ul class="list-unstyled hstack gap-1 mb-0">
                      
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                        <Blink href="#"  @click="UpdateUser(indicateur.id)" class="btn btn-sm btn-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                      </li>
                      <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                        <Blink href="#" @click="confirmDelete(indicateur.id)" data-bs-toggle="modal" class="btn btn-sm btn-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                      </li>
                      
                    </ul>

            </ul>
          </div>
        </div>
        
       
      
        
        
            </div>
           <BRow>
             <BCol lg="12">
               <div class="container_pagination">
                 <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
               </div>
             </BCol>
           </BRow>
         </BCardBody> -->


         
         <BCardBody v-if="paginatedItems.length === 0" class="noresul">
           <div >
         <span> Vous n'avez pas encore d'indicateur, vous pouvez également en ajouter un !! </span>
          </div>
         </BCardBody>
        
         
         
         <BCardBody v-else>
           <div class="table-responsive" >
             <BTableSimple class="align-middle table-nowrap table-hover">
               <BThead class="table-light" style="">
                 <BTr>
                   <BTh scope="col" ></BTh>
                   <BTh scope="col">Code</BTh>
                   <BTh scope="col">Indicateurs</BTh>
                   <BTh scope="col">Statut</BTh>
                   <BTh scope="col">Action</BTh>
                 </BTr>
               </BThead>
               <BTbody>
                 <BTr v-for="indicateur in paginatedItems" :key="indicateur.id">
                   <BTd> </BTd>
                   <BTd> {{  indicateur.CodeIndicateur }}</BTd>
                   <BTd> {{  indicateur.Description}}</BTd>
                   <BTd> 
                    <span  v-if="indicateur.IsActive === 0" class="badge badge-pill badge-success font-size-11" :class="{ 'badge-danger': `${indicateur.IsActive}` === 'Chargeback'}">Desactiver</span>
                    <span  v-else  class="badge badge-pill badge-success font-size-11" :class="{'badge-warning': `${indicateur.IsActive}` === 'Refund',}">Activer</span>

                   </BTd>
                   <BTd>
                     <ul class="list-unstyled hstack gap-1 mb-0">
                      
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                         <Blink href="#"  @click="UpdateUser(indicateur.id)" class="btn btn-sm btn-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#" @click="confirmDelete(indicateur.id)" data-bs-toggle="modal" class="btn btn-sm btn-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#" @click="Requete(indicateur.id)" data-bs-toggle="modal" class="btn btn-sm btn-success"><i class="mdi mdi-delete-outline"></i></Blink>
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
           <BCard no-body class="" style=" box-shadow:none !important;
            border: 1px solid #c9d1d9 !important;">
             <div class="bg-primary-subtle">
               <BRow>
                 <BCol cols="12 text-center">
                   <div class="modalheader p-4">
                     <h5 class="text-primary">Ajouter un indicateur</h5>
                     
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
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Code</label>
                       <MazInput v-model="step1.code"  no-radius type="text" name="code"   color="info" placeholder="001" />
                      <small v-if="v$.step1.code.$error">{{v$.step1.code.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodeIndicateur']"> {{ resultError["CodeIndicateur"] }} </small>

                     </div>
                  </BCol>
                 
                   </BRow>

                   <BRow >
                    <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom ou Description</label>
                     <MazTextarea v-model="step1.description"  no-radius type="text" name="nom"  color="info" placeholder="exemple" />
                     <small v-if="v$.step1.description.$error">{{v$.step1.description.$errors[0].$message}}</small> 
                      <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>

                     </div>
                  </BCol>
                 
                   </BRow>
                  
                   
                <!-- <BRow>
                  <BCol md="">
                     <div class="mb-3 position-relative">
                       <label for="userpassword"> Est-ce qu'un graphe ?</label>
                       <MazSelect label="Sélectionner" v-model="step1.IsGraphical" no-radius  color="info" :options="choix" search />
                      <small v-if="v$.step1.IsGraphical.$error">{{v$.step1.IsGraphical.$errors[0].$message}}</small> 
                      <small v-if="resultError['IsGraphical']"> {{ resultError["IsGraphical"] }} </small>

                     </div>
                  </BCol>
                  <BCol md="6" v-if="step1.IsGraphical === true">
                     <div class="mb-3 position-relative">
                       <label for="userpassword"> Choisissez un graphe </label>
                       <MazSelect label="Sélectionner" v-model="step1.IsGraphical" no-radius  color="info" :options="choix" search />
                      <small v-if="v$.step1.IsGraphical.$error">{{v$.step1.IsGraphical.$errors[0].$message}}</small> 
                      <small v-if="resultError['IsGraphical']"> {{ resultError["IsGraphical"] }} </small>

                     </div>
                  </BCol>
                  </BRow> -->

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
           <BCard no-body class="" style=" box-shadow:none !important;
            border: 1px solid #c9d1d9 !important;">
             <div class="bg-primary-subtle">
               <BRow>
                 <BCol cols="12 text-center">
                   <div class="modalheader p-4">
                     <h5 class="text-primary">Modifier un indicateur</h5>
                     
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
                       <label for="userpassword">Code</label>
                     <MazInput v-model="step2.code"  no-radius type="text" name="code"   color="info" placeholder="001" />
                      <small v-if="v$.step2.code.$error">{{v$.step2.code.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodeIndicateur']"> {{ resultError["CodeIndicateur"] }} </small>

                     </div>
                  </BCol>
                   </BRow>
                  
                   <!-- <BRow>
                     <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom</label>
                     <MazInput v-model="step2.nom"  no-radius type="text" name="nom"  color="info" placeholder="exemple" />
                      <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> 
                      <small v-if="resultError['CodeRegion']"> {{ resultError["CodeRegion"] }} </small>

                     </div>
                  </BCol>
                </BRow> -->
                <BRow>
                  <BCol md="12">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Nom ou Description</label>
                       <MazTextarea v-model="step2.description"  no-radius type="text" name="description"   color="info" placeholder="exemple" />
                      <small v-if="v$.step2.description.$error">{{v$.step2.description.$errors[0].$message}}</small> 
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

   <BModal v-model="RequeteDynamique1" hide-footer centered header-class="border-0" title-class="font-18"  size="lg">
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
                   <div class="modalheader p-2">
                     <h5 class="text-primary">Ajouter une requete</h5>
                     
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
                 <li data-bs-toggle="tooltip" class="list-unstyled" data-bs-placement="top" aria-label="Edit" style="position: absolute;right: 15px;top: 59px;">
                  <div  style="font-size: 18px;" @click="AddformData" class="btn btn-sm btn-info"><i class="mdi mdi-plus-box-outline"></i></div>
                </li>
               </div>
               <div class="p-2">
                 <BForm class="form-horizontal">
                  <BCol md="12">
                       <div class="mb-3 position-relative">
                         <label for="userpassword">Indicateurs</label>
                          <MazSelect v-model="indicateur"  no-radius type="text"  color="info"   :options="IndicateursOptions1"  search  label="Sélectionner l'indicateur" />
                          <small v-if="errors.indicateur">{{ errors.indicateur }}</small>
                        <small v-if="resultError['indicateur']"> {{ resultError["indicateur"] }} </small>
                       </div>
                    </BCol>
                    <BRow  v-for="(table, index) in tables" :key="table.id" class="align-items-center p-2 border border-secondary rounded-2 mb-3" >
                      
                        <BCol md="11" >
                            <span class="nombre">
                          Fiche  {{index + 1}}
                        </span>
                        <hr style="border:1px solid #435971 !important">
                        <BRow >
                           </BRow>
                        <BRow >
                    

                  <BCol md="6">
                     <div class="mb-3 position-relative">
                       <label for="userpassword">Tables</label>
                     <MazSelect
                     label="Sélectionner la table"
                      v-model="table.table"
                     no-radius  color="info"
                     @input="clearError(index, 'table')"
                       :options="TablesOptions"  search
                    v-slot="{ option }"
                     
                   
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
                    <small v-if="errors.tables && errors.tables[index] && errors.tables[index].table">{{ errors.tables[index].table }}</small> 
                      <small v-if="resultError['table']"> {{ resultError["table"] }} </small>
                     </div>
                  </BCol>
                  <BCol md="6">
              <label for="userpassword">Colonnes</label>
              <div class="mb-3 position-relative">
                <div class="input-groupe">
                  <MazSelect v-model="table.colonne" no-radius type="text" color="info"   :disabled="!table.table" :options="ColonneOptions"  search  label="Sélectionner la colonne" />
                </div>
                <small v-if="errors.tables && errors.tables[index] && errors.tables[index].colonne">{{ errors.tables[index].colonne }}</small>
                <small v-if="resultError['colonne']"> {{ resultError["colonne"] }} </small>
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
                       <button class="" @click="submitTable()">Valider</button>
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
     RequeteDynamique1:false,
     ToId:'',
     IndicateursOptions:[],
     IndicateursOptions1:[],
     currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
      resultError: {},
      UserOptionsPersonnels:"",
      TablesOptions:[],
      ColonneOptions:[],
      indicateur: '',
      tables: [{ table: ''  , colonne:'' }],
     v$: useVuelidate(),
     errors: {
      indicateur: '',
         tables: [] ,
      
      },
       error:'',
       choix: [
        { label: "Oui", value: true },
        { label: "Non", value: false },
      ],
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
   statistic() {
      return `Total des Indicateurs  = ${this.UserOptionsPersonnels} .  `;
    },
   totalPages() {
   return Math.ceil(this.IndicateursOptions.length / this.itemsPerPage);
   },
   isColonneDisabled() {
      return !this.table.table;
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
   clearError(index, field) {
        
        if (this.errors.tables[index]) {
          this.errors.tables[index][field] = null;
        }
      },
   async fetchIndicateursOptions() {
    try {
              const response = await axios.get('/indicateurs', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
               console.log(response.data.data);
                this.IndicateursOptions = response.data.data;
                this.UserOptionsPersonnels =  this.IndicateursOptions.length
                this.IndicateursOptions1 = this.IndicateursOptions.map(prefecture => ({
                  label: prefecture.Description,
                  value: prefecture.CodeIndicateur,
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
          this.loading = false

         }



   } catch (error) {
   console.log('response.login', error); 

   this.loading = false
   if (error.response.data.status === "error") {
   return this.error = error.response.data.message

   } else {
     this.formatValidationErrors(error.response.data.errors);
     this.loading = false

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
       confirmButtonText: 'Oui, supprimer!',
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
       AddformData() {
    this.tables.push({ table: ''  , colonne:'', });
  },

  deleteRow(index) {
    console.log(index);
    if(index !== 0){
      this.tables.splice(index, 1);
    }
},
       async Requete(id) {
        console.log("isd",id)
         this.RequeteDynamique1 = true;
         try {
              const response = await axios.get('/bd-tables', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
               console.log('tables',response.data.data);
                this.TablesOptions = response.data.data.map(el => ({
                  label: el,
                  value: el,
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
async submitTable() {
      console.log("Submitting form");
      try {
        let isValid = this.validateTable();
        if (isValid) {
          // Form is valid, submit the form
          console.log("Form is valid");
        } else {
          // Form is invalid, show error message
          console.log("Le formulaire contient des erreurs");
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.loading = false;
        }
      } catch (error) {
        // Handle errors
        console.error("Une erreur s'est produite :", error);
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
      }
    },
validateTable() {
      let isValid = true;
      this.errors = { indicateur: '', tables: [] };

      // Validate indicateur
      if (!this.indicateur) {
        this.errors.indicateur = 'Indicateur est obligatoire!';
        isValid = false;
      }
      this.tables.forEach((table, index) => {
        const tableErrors = {};
        if (!table.table) {
          tableErrors.table = 'Table est obligatoire!';
          isValid = false;
        }
        if (!table.colonne) {
          tableErrors.colonne = 'Colonne est obligatoire!';
          isValid = false;
        }
        
        // this.$set(this.errors.tables, index, tableErrors);
        this.errors.tables[index] = tableErrors;
      });
      return isValid;
    },
    clearError(index, field) {
      if (this.errors.tables && this.errors.tables[index]) {
        this.$set(this.errors.tables[index], field, null);
      }
    },
    // deleteRow(index) {
    //   this.tables.splice(index, 1);
    //   this.errors.tables.splice(index, 1);
    // },
    async handleOptionClick(option) {
      console.log('aaaa',option)
      this.loading = true;
      try {
              const response = await axios.get('/bd-tables/columns', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,  
              },
              params:{
                  name:option.value
                }
    
            });
               console.log('tables',response);
                this.ColonneOptions = response.data.data.map(el => ({
                  label: el,
                  value: el,
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

.nombre{
  color:red;
  font-weight:900;

}
   
</style>