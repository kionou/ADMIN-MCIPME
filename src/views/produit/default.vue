<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Produits" pageTitle="Paramétrages" />
      <BRow>
        <BCol lg="12">
          <BTabs class="default-tabs" content-class="p-3 text-muted">
            <BTab active class="border-0">
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="fas fa-home"></i>
                </span>
                <span class="d-none d-sm-inline-block"> Produits</span>
              </template>
             
              <Sous ></Sous>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block"> Sous categories</span>
              </template>
              <SousCat ></SousCat>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block"> Categories</span>
              </template>
              <Prefecture ></Prefecture>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block"> Formes</span>
              </template>
              <Formes ></Formes>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block"> Unités</span>
              </template>
              <!-- vrai -->
              <Unites></Unites>
             
            </BTab>
           
          </BTabs>
        </BCol>
      </BRow>
    </Layout>
  </template>
  
  <script>
  import Layout from "../../layouts/main.vue";
  import PageHeader from "@/components/page-header.vue";
  import Loading from '@/components/others/loading.vue';
  import Prefecture from '../../components/admin/produits/categories.vue';
  import Sous from '../../components/admin/produits/produits.vue';
  import SousCat from '../../components/admin/produits/souscat.vue';
  import Unites from '../../components/admin/produits/unite.vue'
  import Formes from '../../components/admin/produits/formes.vue'
 
  
 
  
  
  export default {
    components: {
      Layout,
      PageHeader,
      Loading,
      Prefecture,
      Sous,
      SousCat,
      Unites,
      Formes
   
    },
    data() {
      return {
        loading: false,
       
      }
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      }
    },
    async mounted() {
      console.log("uusers", this.loggedInUser);
   
    },
    methods: {
      
     
    }
  }
  </script>
  
  <style lang="" scoped>
    /* Ajoutez vos styles ici si nécessaire */
  </style>
  