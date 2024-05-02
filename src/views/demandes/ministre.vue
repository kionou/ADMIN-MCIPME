<template>
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <PageHeader title="Demandes" pageTitle="Demandes"  :statistic="statistic"/>
      <BRow>
      <BCol lg="12">
        <BTabs class="default-tabs" content-class="p-3 text-muted">
          <BTab v-for="(demande, index) in demandeOptions" :key="index" :active="index === activeTab">
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="fas fa-home"></i>
              </span>
              <span class="d-none d-sm-inline-block">{{ demande.label }}</span>
            </template>
            <Annoter :demande="demande"></Annoter>
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
  import Annoter from '../../components/admin/demandes/ministre/annoter.vue';
  
  import axios from "@/lib/axiosConfig";
  export default {
  components: {
    Layout,
    PageHeader,
    Loading,
    Annoter,
  },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      demandeOptions: [
        {
          id: null, // Un identifiant unique pour la demande "Annoter"
          label: 'Annoter',
          icon: 0, // Icône pour la demande "Annoter"
          component: 'Attente' // Nom du composant pour la demande "Annoter"
        }
      ],
      activeTab: 0
    }
  },
  async mounted() {
    this.loading = true;
    this.loggedInUser = this.$store.getters['auth/myAuthenticatedUser'];
    await this.fetchDemande();
  },
  methods: {
    async fetchDemande() {
      try {
        const response = await axios.get('/type-demandes', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          },
          params:{

            Direction:this.loggedInUser.direction
          }
        });
        console.log('demandeee', this.demandeOptions)
        const typeDemandes = response.data.data.map(demande => ({
          id: demande.id,
          label: demande.LibelleTypeDemandes,
          icon: 1,
          component: 'Annoter' // Vous devrez ajuster ceci en fonction du composant correspondant à chaque demande
        }));
        this.demandeOptions = [...this.demandeOptions, ...typeDemandes]; // Ajoute les données de l'API à demandeOptions
        console.log('demandeee', this.demandeOptions)
        this.loading = false;
      } catch (error) {
        console.error('Error fetching demande:', error);
        if (error.response && (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401)) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");
        }
      }
    },
    getIconForDemande(libelle) {
      // Ajoutez ici la logique pour déterminer l'icône en fonction du libellé de la demande
      // Par exemple, retournez une classe d'icône FontAwesome en fonction du type de demande
      // Vous pouvez également utiliser un objet de correspondance pour mapper les libellés aux classes d'icônes
      return "far fa-user"; // Par défaut, retourne une icône utilisateur
    }
  }
}
  </script>
  
  <style lang="" scoped>
    /* Ajoutez vos styles ici si nécessaire */
  </style>
  