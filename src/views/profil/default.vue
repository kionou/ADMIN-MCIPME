<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Profil" pageTitle="Gestion Utilisateurs"  />
      <BRow>
        <BCol lg="12">
          <BTabs class="default-tabs" content-class="p-3 text-muted">
            <BTab active class="border-0">
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="fas fa-home"></i>
                </span>
                <span class="d-none d-sm-inline-block">General</span>
              </template>
           <General></General>
            </BTab>
            <BTab>
              <template v-slot:title>
                <span class="d-inline-block d-sm-none">
                  <i class="far fa-user"></i>
                </span>
                <span class="d-none d-sm-inline-block">Mot de passe</span>
              </template>
                <Password></Password>
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
  import General from '../../components/admin/profil/general.vue';
  import Password from '../../components/admin/profil/password.vue';
    
  export default {
    components: {
      Layout,
      PageHeader,
      Loading,
      General,
      Password
    },
    data() {
      return {
        loading: false,
      
       
      }
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      },
     
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
  