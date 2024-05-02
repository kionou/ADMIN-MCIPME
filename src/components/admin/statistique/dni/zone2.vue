<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999;"> </Loading>
      <BRow> 
        <BCol md="12">
          <div class="mb-3 position-relative">
            <label for="userpassword">Indicateur</label>
            <MazSelect label="" disabled v-model="indicateur1" color="info" no-radius :options="IndicateursOptions"  search />
          </div>
      </BCol>  
      </BRow>
      <BCard class="card z-index-2">
        <div class="card-titre">
          <h6 class="mb-0 text-center">Statistiques par zone industrielle</h6>
          <ul class="list-unstyled hstack gap-1 mb-0 justify-content-end !important;">
                  <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                      <BDropdown toggle-class="btn btn-sm btn-soft-primary" 
                              variant="white" dropright top>
                              <template #button-content>
                                <i class="mdi mdi-dots-vertical"></i>
                              </template>
                              <BDropdownItem href="#">Histogramme</BDropdownItem>
                              <BDropdownItem href="#">Camembert</BDropdownItem>
                              <BDropdownItem href="#">Courbe</BDropdownItem>     
                            </BDropdown>
                     </li>
            </ul>
          <hr class="dark horizontal">
        </div>
        <highcharts :options="chartOptions"></highcharts>
      </BCard>
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
    IndicateursOptions:[],
    chartOptions: {
      chart: {
        type: 'column',
       
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
      series: [{
        name: 'Zone Industrielle',
        colorByPoint: true,
        data: [] // Les données seront mises à jour dynamiquement
      }],
    },
  };
},

    async mounted() {
      await this.fetchIndicateursOptions();
      await this.fetchStatistics();
    },
    methods: {
      async fetchStatistics() {
        try {
          const response = await axios.get(`/indicateurs/statistics/${this.indicateur1}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const dataFromAPI = response.data.data;
          console.log(dataFromAPI);

  
          this.chartOptions.xAxis.categories = dataFromAPI.map(item => item.IntituleZone); // Noms des secteurs d'activité
          this.chartOptions.series[0].data = dataFromAPI.map(item => ({
            name: item.IntituleZone,
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
          this.IndicateursOptions = response.data.data.map(sousprefecture => ({
                label: sousprefecture.Description,
                value: sousprefecture.id,  }));
          this.indicateur2 = response.data.data[1].id;
          this.indicateur1 = response.data.data[0].id;
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
