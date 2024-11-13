<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Rapport" pageTitle="Statistiques"  :statistic="statistic"/>
      <BRow>
        <BCol lg="12">
          <Rapport ></Rapport>
        
        </BCol>
      </BRow>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/layouts/main.vue";
  import PageHeader from "@/components/page-header.vue";
  import Loading from '@/components/others/loading.vue';
  import Rapport from '@/components/admin/statistique/rapport.vue'
  
  import axios from "@/lib/axiosConfig";
  
  export default {
    components: {
      Layout,
      PageHeader,
      Loading,
      Rapport

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
      // statistic() {
      //   return `Total des Utilisateurs: Personnels = ${this.UserOptionsPersonnels} et Entreprises = ${this.UserOptionsEntreprise}  `;
      // }
    },
    async mounted() {
      console.log("uusers", this.loggedInUser);
        // await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
             try {
               const response = await axios.get('/users', {
               headers: {
                 Authorization: `Bearer ${this.loggedInUser.token}`,
                 
               },
     
             });
                     console.log(response.data.data);
                   // Filtrer les utilisateurs dont Identifiant est null
                  
                   this.UserOptions = response.data.data.length;
                   console.log( this.UserOptions);
                   const filteredUsersPersonnels = response.data.data.filter(user => user.Identifiant !== null);
                   console.log(filteredUsersPersonnels.length); 
                   this.UserOptionsEntreprise = filteredUsersPersonnels.length
  
                   const filteredUsersEntreprise = response.data.data.filter(user => user.Identifiant === null);
                   console.log(filteredUsersEntreprise.length); 
                   this.UserOptionsPersonnels = filteredUsersEntreprise.length
  
                this.loading = false;
             
             } catch (error) {
               console.error('errorqqqqq',error);
             
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
  