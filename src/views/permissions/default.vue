<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <PageHeader title="Gestion Utilisateurs" pageTitle="Tableau de bord" />
    <BRow>
      <BCol lg="12">
        <BTabs class="default-tabs" content-class="p-3 text-muted">
          <BTab active class="border-0">
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="fas fa-home"></i>
              </span>
              <span class="d-none d-sm-inline-block">Rôles</span>
            </template>
            <Roles></Roles>
          </BTab>
          <BTab>
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="far fa-user"></i>
              </span>
              <span class="d-none d-sm-inline-block">Permissions</span>
            </template>
            <Permissions></Permissions>
          </BTab>
        </BTabs>
      </BCol>
    </BRow>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Loading from "@/components/others/loading.vue";
import Region from "../../components/admin/localites/regions.vue";
import Prefecture from "../../components/admin/localites/prefectures.vue";
import Sous from "../../components/admin/localites/sousprefecture.vue";
import Quartier from "../../components/admin/localites/quartier.vue";
import Roles from "../../components/utilisateurs/role.vue";
import Permissions from "../../components/utilisateurs/permission.vue";

export default {
  components: {
    Layout,
    PageHeader,
    Loading,
    Region,
    Prefecture,
    Sous,
    Quartier,
    Roles,
    Permissions,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  },
  async mounted() {
    console.log("uusers", this.loggedInUser);
  },
  methods: {},
};
</script>

<style lang="" scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
