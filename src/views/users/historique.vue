<template >
  <Layout>
   <Loading v-if="loading" style="z-index: 99999;"></Loading>
 <PageHeader title="Historiques" pageTitle="Gestion Utilisateurs" />
 <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
           <div class="d-flex align-items-center justify-content-between">
             <BCardTitle class="mb-0 ">Liste des historiques</BCardTitle>

             <div class="flex-shrink-0 d-flex">
                <BCol xxl="9" xl="9" lg="9" md="9" sm="9" class="me-1">
               <MazInput v-model="control.name" @input="filterByName"    no-radius type="text"  color="info" size="sm" placeholder="Recherchez ..." />
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
                         <a  :href="region.LienDocument" download class="btn btn-sm btn-primary"><i class="mdi mdi-download-outline"></i></a>
                       </li>
                       <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                         <Blink href="#" @click="confirmDelete(region.id)" data-bs-toggle="modal" class="btn btn-sm btn-danger"><i class="mdi mdi-delete-outline"></i></Blink>
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
  control: { name: '',},
   loading:true,
   AddUser:false,
   UpdateUser1:false,
   ToId:'',
   IndicateursOptions:[],
   data:[],
   currentPage: 1,
   itemsPerPage: 10,
   totalPageArray: [],
    resultError: {},
   v$: useVuelidate(),
     error:'',
   
 }
},
validations: {

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
              const historiques = response.data.data.data;
              this.data = historiques
              this.IndicateursOptions =  this.data;
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
    filterByName() {
this.currentPage = 1;
if (this.control.name !== null) {
   const tt = this.control.name;
  const  searchValue = tt.toLowerCase()
  this.IndicateursOptions =this.data.filter(user => {
    const Nom = user.user.Nom || '';
    const Prenoms = user.user.Prenoms || '';
    const Actions = user.Action || '';
    return Nom.toLowerCase().includes(searchValue) || Prenoms.toLowerCase().includes(searchValue) || Actions.toLowerCase().includes(searchValue);
  });

} else {
this.IndicateursOptions = [...this.data];
 
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

},
}
</script>
<style lang="" scoped>
 
</style>