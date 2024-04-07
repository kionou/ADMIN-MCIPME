<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <PageHeader title="Utilisateurs" pageTitle="Tableau de bord"  :statistic="statistic"/>
    <BRow>
      <BCol lg="12">
        <BTabs class="default-tabs" content-class="p-3 text-muted">
          <BTab active class="border-0">
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="fas fa-home"></i>
              </span>
              <span class="d-none d-sm-inline-block">Personnels</span>
            </template>
            <Personnel ></Personnel>
          </BTab>
          <BTab>
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="far fa-user"></i>
              </span>
              <span class="d-none d-sm-inline-block">Entreprises</span>
            </template>
            <Entreprise ></Entreprise>
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
import Personnel from '../../components/admin/users/defaut.vue';
import Entreprise from '../../components/admin/users/entreprise.vue';

import axios from "@/lib/axiosConfig";

export default {
  components: {
    Layout,
    PageHeader,
    Loading,
    Personnel,
    Entreprise
  },
  data() {
    return {
      loading: false,
      UserOptions:'',
     
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
    statistic() {
      return `Total des Utilisateurs: ${this.UserOptions}`;
    }
  },
  async mounted() {
    console.log("uusers", this.loggedInUser);
    //  await this.fetchData();
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
                
                 this.UserOptions = response.data.data.
length
;
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
