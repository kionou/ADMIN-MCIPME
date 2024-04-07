<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Documents" pageTitle="Tableau de bord" />
      <BRow>
        <BCol lg="12">
          <BTabs class="default-tabs" content-class="p-3 text-muted">
            <BTab active class="border-0">
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="fas fa-home"></i>
                </span>
                <span class="d-none d-sm-inline-block">Documents</span>
              </template>
              <Categorie ></Categorie>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block">Sous-documents</span>
              </template>
              <SousCategorie ></SousCategorie>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block">Fichiers</span>
              </template>
              <Fichier ></Fichier>
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
  import Categorie from '../../components/admin/documents/categorie.vue';
  import SousCategorie from '../../components/admin/documents/souscategorie.vue';
  import Fichier from '../../components/admin/documents/fichier.vue';
 
 
  
  export default {
    components: {
      Layout,
      PageHeader,
      Loading,
      Categorie,
      SousCategorie,
      Fichier
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
  