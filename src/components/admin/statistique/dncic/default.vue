<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   
      <BRow class="justify-content-center">
        <BCol md="6" v-for="(statistics, index) in allStatistics" :key="index">
          <BCard class="card z-index-2">
            <div class="card-titre">
              <h6 class="mb-0 text-center">Statistique par {{ gettruncature(IndicateursOptions[index].label)  }} </h6>
              <ul class="list-unstyled hstack gap-1 mb-0 justify-content-end !important;">
                <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                  <div class="dropdowns">
                    <div class="dropdown-toggles btn btn-sm btn-primary" @click="switchChartType('histogramme', index)">
                      H
                    </div>
                  </div>
                </li>
                <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                  <div class="dropdowns">
                    <div class="dropdown-toggles btn btn-sm btn-primary" @click="switchChartType('camembert', index)">
                      C
                    </div>
                  </div>
                </li>
              </ul>
              <hr class="dark horizontal">
            </div>
            <div v-if="chartTypes[index] === 'histogramme'" >
              <input type="hidden" name="" :value="loadChartData(statistics, index)">
              <highcharts :options="chartOptions[index]"></highcharts>
            </div>
            <div v-else-if="chartTypes[index] === 'camembert'">
              <input type="hidden" name="" :value="loadChartData(statistics, index)">
              <highcharts :options="camembertOptions[index]"></highcharts>
            </div>
          </BCard>
        </BCol>
      </BRow>
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
        titre:'',
        indicateur:[],
        allStatistics:[],
        chartTypes: [], // Tableau pour stocker les types de graphique pour chaque élément
        chartOptions: [],
        camembertOptions: []
      };
    },
  
    async mounted() {
      await this.fetchIndicateursOptions();
      await this.fetchStatistics();
    },
    methods: {
        gettruncature(a){
            if (a.includes("Pme Par ")) {
           return a.replace("Pme Par ", "");
        } else if (a.includes("Unité Industrielle Par ")) {
           return a.replace("Unité Industrielle Par ", "");
        }
       
            
        },
      async fetchStatistics() {
        try {
          const lastIndicateurIds = this.IndicateursOptions.slice(0, 6).map(indicateur => indicateur.value);
          const lastIndicateurId = this.IndicateursOptions.slice(0, 6).map(indicateur => indicateur);
          console.log('lastIndicateurIds',lastIndicateurId)
          const statisticsPromises = lastIndicateurIds.map(async indicateurId => {
            const response = await axios.get(`/indicateurs/statistics/${indicateurId}`, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            });
            return response.data.data;
          });
  
          this.allStatistics = await Promise.all(statisticsPromises);
          console.log(' this.allStatistics',  this.allStatistics)
  
          // Initialiser les types de graphique pour chaque élément
          this.chartTypes = Array(this.allStatistics.length).fill('histogramme');
  
          // Réinitialiser les options de graphique
          this.chartOptions = [];
          this.camembertOptions = [];
  
          this.allStatistics.forEach((statistics, index) => {
            this.loadChartData(statistics, index);
          });
  
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
          this.indicateur = []
          const indicateurs = response.data.data.filter(indicateur => indicateur.IsActive === "1");
          const derniersIndicateurs = indicateurs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);
          console.log('derniersIndicateurs',derniersIndicateurs)
  
          this.IndicateursOptions = derniersIndicateurs.map(indicateur => ({
            label: indicateur.Description,
            value: indicateur.id,
          }));
          const lastIndicateurIds = this.IndicateursOptions.slice(0, 6).map(indicateur => indicateur.value);
          console.log('lastIndicateurIds',lastIndicateurIds)
          lastIndicateurIds.forEach(indica => {
                       this.indicateur.push(indica)

                    });
          this.loading = false;
        } catch (error) {
          console.error('errorqqqqq', error);
        }
      },
  
      loadChartData(statisticsArray, index) {
        console.log(' this.allStatistics',  statisticsArray)
  
        const chartData = [];
        const camembertData = [];
        const uniqueNames = [];
        statisticsArray.forEach(statistic => {

            // Récupérer dynamiquement le nom
        const name = Object.keys(statistic).find(key => key !== 'nb');
        const y = parseInt(statistic.nb);

        // Si le nom n'est pas déjà dans uniqueNames, l'ajouter
        if (name && !uniqueNames.includes(statistic[name])) {
            uniqueNames.push(statistic[name]);
        }

        // Ajouter les données au tableau de données du graphique
        chartData.push({
            name: statistic[name], // Utiliser le nom extrait
            y: y
        });

        // Ajouter les données au tableau de données du camembert
        camembertData.push({
            name: statistic[name], // Utiliser le nom extrait
            y: y
        });
    });
        const indicatorName = this.IndicateursOptions[index].label;
        let nouvellePhrase = indicatorName;
        if (indicatorName.includes("Pme Par ")) {
            nouvellePhrase = indicatorName.replace("Pme Par ", "");
        } else if (indicatorName.includes("Unité Industrielle Par ")) {
            nouvellePhrase = indicatorName.replace("Unité Industrielle Par ", "");
        }
        console.log(nouvellePhrase);
          
      
        // Mettre à jour les options de graphique en colonnes
        this.chartOptions[index] = {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: nouvellePhrase
            }
          },
          plotOptions: {
            column: {
              depth: 25,
              dataLabels: {
                enabled: true,
                color: '#000',
                inside: false,
                format: '{point.y}',
              }
            }
          },
          series: [{
            name: nouvellePhrase,
            colorByPoint: true,
            data: chartData
          }]
        };
  
        // Mettre à jour les options de graphique en camembert
        this.camembertOptions[index] = {
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
                enabled: true,
                format: '{point.percentage:.1f}%',
                distance: -50
              },
              showInLegend: true
            }
          },
          series: [{
            name: nouvellePhrase,
            colorByPoint: true,
            data: camembertData
          }]
        };
      },
  
      switchChartType(type, index) {
        this.chartTypes[index] = type; // Changer le type de graphique pour l'élément spécifié
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
  </style>
  