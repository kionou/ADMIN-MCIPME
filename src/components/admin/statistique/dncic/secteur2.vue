<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999;"> </Loading>
  
      <div class="card z-index-2">
        <div class="card-titre">
          <h6 class="mb-0 text-center">Statistiques par secteur d'activité</h6>
          <hr class="dark horizontal">
        </div>
        <highcharts :options="chartOptions"></highcharts>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/lib/axiosConfig';
  import { Chart } from 'highcharts-vue';
  import Loading from '@/components/others/loading.vue';
  
  export default {
    components: {
      highcharts: Chart,
      Loading
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      },
    },
    data() {
  return {
    loading: true,
    chartOptions: {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: {
        text: '' // Vous pouvez laisser vide si vous ne voulez pas de titre spécifique
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Unites Industrielles'
        }
      },
      plotOptions: {
        column: {
          depth: 25,
          dataLabels: {
            enabled: true,
            color: '#000', // Couleur des étiquettes de données
            inside: false,
            format: '{point.y}',
          }
        }
      },
      colors: ['#FF6604', '#544fc5'],// Définissez ici les couleurs que vous souhaitez utiliser
      series: [{
        name: 'Secteurs Activite',
        colorByPoint: true,
        data: [] // Les données seront mises à jour dynamiquement
      }],
    },
  };
},

    async mounted() {
     
      await this.fetchStatistics();
    },
    methods: {
      async fetchStatistics() {
        try {
          const response = await axios.get(`/indicateurs/statistics/${5}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const dataFromAPI = response.data.data;
  
          this.chartOptions.xAxis.categories = dataFromAPI.map(item => item.NomSecteurActivite); // Noms des secteurs d'activité
          this.chartOptions.series[0].data = dataFromAPI.map(item => ({
            name: item.NomSecteurActivite,
            y: parseInt(item.nb)
          }));
  
          this.loading = false;
        } catch (error) {
          console.error(error);
          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/"); // Redirection vers la page de connexion
          }
        }
      },
      async fetchIndicateursOptions() {
        try {
          const response = await axios.get('/indicateurs', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log(response.data.data);
          this.indicateur1 = response.data.data[1].id;
          this.indicateur2 = response.data.data[0].id;
          this.loading = false;
        } catch (error) {
          console.error('errorqqqqq', error);
          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/"); //a revoir
          }
        }
      },
    },
  };
  </script>
  