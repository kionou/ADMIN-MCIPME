<template>
  <Layout  >
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <!-- <PageHeader title="Cartographie" pageTitle="Tableau de bord"  :statistic="statistic"/> -->
    <div class="cartographie" >
        <section>
          <iframe src="https://bd-mcipme.org/enterprise/App/Vues/master.html#/map" title="collect" style="width: 100%; height: 100vh; border: none;"></iframe>
         </section>
     </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Loading from '@/components/others/loading.vue';
import axios from "@/lib/axiosConfig";

export default {
  components: {
    Layout,
    PageHeader,
    Loading,
    
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

<style  lang="css" scoped>
  .cartographie{
   
 }

 /* a detruir */
 .content {
  padding:0px !important;
 }
  .panel-body , .col-lg-12{
  padding:0px !important;
 }

 /* a mettre */

 .page-container {
    width: 100%;
    border: 1px solid red;
    padding: 10px;
    height: 100%;
}

.panel-body{

height: 60vh;
margin-top: 8px;
display: flex;
flex-direction: column;
}

#map{

height: 510px;
}



</style>


