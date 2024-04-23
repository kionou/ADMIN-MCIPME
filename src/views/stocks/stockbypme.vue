<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Stockages" pageTitle="Tableau de bord"  :statistic="statistic"/>
    
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            <div class="d-flex align-items-center justify-content-between">
              <BCardTitle class="mb-0 ">Liste des Produits  Disponibles</BCardTitle>
 
 
              <div class="flex-shrink-0 d-flex">
                 <BCol xxl="4" lg="9" class=" me-3">
                <MazInput v-model="searchQuery"   no-radius type="text"  color="info" size="sm" placeholder="Recherchez ..." />
              </BCol>
                <!-- <div @click="$router.push({ path: '/zone-industrielle/ajouter' })" class="btn btn-primary">Ajouter</div> -->
                
              </div>
            </div>
          </BCardBody>
 
          <BCardBody v-if="paginatedItems.length === 0" class="noresul">
            <div >
          <span> Vous n'avez pas encore de personnel, vous pouvez également en ajouter un !! </span>
           </div>
          </BCardBody>
         
          
          
          <BCardBody v-else>
             <div class="py-2 d-flex justify-content-center align-items-center flex-wrap">
 
         <div class="" style="width: 370px; border:1px solid #dedfe1; margin:0 10px 10px 0" v-for="stock in paginatedItems" :key="stock.id">
           <BRow class="align-items-center">
             <BCol xl="5">
               <div class="text-center p-2 border-end">
                 <div class="avatar-sm mx-auto mb-3 mt-1" style="border:1px solid #dedfe1; width: 4rem; height: 4rem;  border-radius: 50%;">
                   <span class="avatar-title rounded-circle   font-size-16">
                    
                     <img  v-if="stock.produit === null" src="@/assets/img/produits.jpg" alt="" class="w-100 h-100 rounded-circle">
                     <img v-else :src="stock.produit.ImageProduit" alt="" class="w-100 h-100 rounded-circle">
                   </span>
                 </div>
                 <h5 class="text-truncate pb-1">
                     {{formatCreatedAt(stock.DateDeMiseAJourStock)  }}
                 </h5>
               </div>
             </BCol>
 
             <BCol xl="7">
               <div class="p-2 text-center text-xl-start">
                 <BRow>
                   <BCol cols="12">
                     <div>
                       <p class="text-muted mb-2 text-truncate">Nom du produit </p>
                       <h5 v-if="stock.produit">{{stock.produit.NomProduit}}</h5>
                     </div>
                   </BCol>
                   
                 </BRow>
                 <BRow>
                     <BCol cols="12">
                     <div>
                       <p class="text-muted mb-2 text-truncate">Quantite Réel</p>
                       <h5>{{stock.QuantiteReel}} </h5>
                     </div>
                   </BCol>
                 </BRow>
               </div>
             </BCol>
           </BRow>
         </div>    
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
  import PageHeader from "@/components/page-header.vue";
  import Loading from '@/components/others/loading.vue';
  import axios from '@/lib/axiosConfig.js'
  import moment from 'moment';
  import Pag from '@/components/others/pagination.vue'
  
  export default {
    components: {
      Layout,
      PageHeader,
      Loading,
      Pag
    },
    props:['id'],
    data() {
      return {
      loading: true,
      StocksOptions:[],
      currentPage: 1,
      itemsPerPage: 8,
      totalPageArray: [],
      zoneOptions:[],
       
       
      }
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      },
      // statistic() {
      //   return `Total des Utilisateurs: Personnels = ${this.UserOptionsPersonnels} et Entreprises = ${this.UserOptionsEntreprise}  `;
      // },
      totalPages() {
    return Math.ceil(this.StocksOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.StocksOptions.slice(startIndex, endIndex);
    },
    },
    async mounted() {
      console.log("uusers", this.loggedInUser);
      await this.fetchStock()
      await this.fetchZone()
       
    },
    methods: {
        formatCreatedAt(createdAt) {
    return moment(createdAt).format('DD/MM/YY ');
    },
        async fetchStock() {
            console.log(this.id)
      try {
         const response = await axios.get('/stocks', {
           headers: { Authorization: `Bearer ${this.loggedInUser.token}`},
           params:{ code:this.id}
         });
         console.log("Réponse du téléversement :", response);
         if (response.data.status === "success") {
          
            this.StocksOptions = response.data.data
           this.loading =false
         } 
       } catch (error) {
         console.error("Erreur lors du téléversement :", error);
         if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                 await this.$store.dispatch('auth/clearMyAuthenticatedUser');
               this.$router.push("/");  //a revoir
             }
       }
        },
        async fetchZone() {
      try {
         const response = await axios.get('/zone-industrielles', {
           headers: {
            
             Authorization: `Bearer ${this.loggedInUser.token}`,
           },
         });
         console.log("Réponse du téléversement :", response);
         if (response.data.status === "success") {
          const selectedActualites = response.data.data;
          const filteredUsers = selectedActualites.filter(user => user.TypeZone === 'PRIVEE' );
                  console.log(filteredUsers); // Affiche la liste des utilisateurs dont Identifiant
        
         console.log(selectedActualites);
        
           this.loading =false
         } 
       } catch (error) {
         console.error("Erreur lors du téléversement :", error);
         if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                 await this.$store.dispatch('auth/clearMyAuthenticatedUser');
               this.$router.push("/");  //a revoir
             }
       }
  },
    }
  }
  </script>
  
  <style lang="" scoped>
    /* Ajoutez vos styles ici si nécessaire */
  </style>
  