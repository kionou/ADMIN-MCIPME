






  <template>
    <div>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <BRow>
        <BCol md="12">
          <div class="mb-3 position-relative">
            <label for="userpassword">Indicateur</label>
            <MazSelect label="" disabled v-model="indicateur2" color="info" no-radius :options="IndicateursOptions" search></MazSelect>
          </div>
        </BCol>
      </BRow>
      <BCard class="card z-index-2">
        <div class="card-titre">
          <h6 class="mb-0 text-center">Statistiques par secteur d'activité</h6>
          <ul class="list-unstyled hstack gap-1 mb-0 justify-content-end !important;">
            <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                <div class="dropdowns">
          <div class="dropdown-toggles btn btn-sm btn-soft-primary"  @click="toggleDropdown">
            <i class="mdi mdi-dots-vertical"></i>
          </div>
          <ul class="dropdown-menus" v-show="isDropdownOpen">
            <li @click="switchChartType('histogramme')">Histogramme</li>
            <li @click="switchChartType('camembert')">Camembert</li>
            <li @click="switchChartType('courbe')">Courbe</li>
          </ul>
        </div>
          </li>

          </ul>
          <hr class="dark horizontal">
        </div>
        <highcharts v-if="chartType === 'histogramme'" :options="chartOptions"></highcharts>
        <highcharts v-else-if="chartType === 'camembert'" :options="camembertOptions"></highcharts>
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
        isDropdownOpen: false,
        chartType: 'camembert', // Par défaut, afficher l'histogramme
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
        name: 'Secteurs Activite',
        colorByPoint: true,
        data: [] // Les données seront mises à jour dynamiquement
      }],
    },
    camembertOptions: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true, // Activer les étiquettes de données
        format: '{point.percentage:.1f}%', // Format de l'étiquette de données
        distance: -50 // Distance de l'étiquette par rapport au centre du camembert (optionnel)
      },
      showInLegend: true
    }
  },
      series: [{
        name: 'Secteurs Activite',
        colorByPoint: true,
        data: [] // Les données seront mises à jour dynamiquement
      }]
    }
  
      };
    },
  
    async mounted() {
      await this.fetchIndicateursOptions();
      await this.fetchStatistics();
    },
    methods: {
        async fetchStatistics() {
        try {
          const response = await axios.get(`/indicateurs/statistics/${this.indicateur2}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const dataFromAPI = response.data.data;
          console.log(dataFromAPI);

  
          this.chartOptions.xAxis.categories = dataFromAPI.map(item => item.NomSecteurActivite); // Noms des secteurs d'activité
          this.chartOptions.series[0].data = dataFromAPI.map(item => ({
            name: item.NomSecteurActivite,
            y: parseInt(item.nb)
          }));
    const camembertData = dataFromAPI.map(item => ({
      name: item.NomSecteurActivite,
      y: parseInt(item.nb)
    }));

    this.camembertOptions.series[0].data = camembertData;
  
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
       switchChartType(type) {
      this.chartType = type; // Mettre à jour le type de graphique en fonction du clic de l'utilisateur
      this.isDropdownOpen = false; // Fermer le dropdown après avoir sélectionné une option
    },
    toggleDropdown() {
        console.log('ee')
      this.isDropdownOpen = !this.isDropdownOpen; // Inverser l'état du dropdown
    }
    },
  };
  </script>

  <style lang="css" scoped>
/* Style pour le dropdown */
.dropdowns {
  position: relative;
  display: inline-block;
}

.dropdown-toggles {

  padding: 4px 9px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-menus {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  list-style: none;
  margin: 0;
  left: -91px;
  top: 101%;
  z-index: 1000;
  display: block;
}

.dropdown-menus li {
  padding: 8px 30px;
  cursor: pointer;
}

.dropdown-menus li:hover {
  background-color: #f0f0f0;
}
</style>
  
  
  