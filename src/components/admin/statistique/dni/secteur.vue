<template>
    <div>
      <apexchart type="bar" :options="chartOptions" height="350" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  import axios from '@/lib/axiosConfig';

  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      },
    },
    data() {
      return {
        indicateur1:'',
        test:[],
        series: [{
          data: [] // Utilisez les données de votre objet barChart
        }],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#34c38f'],
          grid: {
            borderColor: '#f1f1f1',
          },
          xaxis: {
            categories: [] // Utilisez les catégories de votre objet barChart
          }
        }
      };
    },
    async mounted() {
  
      await this.fetchStatistics();
    },
    methods: {
      async fetchStatistics() {
        try {
          const response = await axios.get(`/indicateurs/statistics/${4}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const dataFromAPI = response.data.data;
          console.log('dniiiii',dataFromAPI);

            if(this.chartOptions.xaxis.categories){
                this.chartOptions.xaxis.categories = dataFromAPI.map(item => item.NomSecteurActivite); // Noms des secteurs d'activité
          console.log('dataFromAPI.map(item => item.NomSecteurActivite)',dataFromAPI.map(item => item.NomSecteurActivite))
          this.series[0].data = dataFromAPI.map(item => parseInt(item.nb));
            }
          
  
          this.loading = false;
        } catch (error) {
          console.error(error);
        
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
  