<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   
      <BRow class="align-items-center">
        <!-- <button @click="generatePDF2">Générer PDF</button> -->

        <BCol md="10">
          <div class="mb-3 position-relative">
            <label for="userpassword">Indicateur</label>
            <MazSelect label="" multiple v-model="indicateur" color="info" no-radius :options="IndicateursOptions" search></MazSelect>
          </div>
        </BCol>
        <BCol cols="2" >
            <div class="boutton">
            <button class="" style="margin-top:12px !important" @click="handleIndicateurChange()">Valider</button>
            </div>
        </BCol>
      </BRow>
      <BRow >
        
        <BCardBody v-if="allStatistics.length === 0" class="noresul">
           <div >
         <span> Pas de statistiques disponibles pour le moment !! </span>
          </div>
         </BCardBody>
          
        <BCol v-else md="6" v-for="(statistics, index) in allStatistics" :key="index" >
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
  import html2pdf from 'html2pdf.js';
  import logo from "@/assets/img/logo/logopme.png"
  import ninba1 from "@/assets/img/ninba1.png"

  
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
        camembertOptions: [],
        logo:logo,
        ninba1:ninba1,
      };
    },
  
    async mounted() {
      await this.fetchIndicateursOptions();
      await this.fetchStatistics();
    },
    methods: {
        gettruncature(a){
       
        if (a.includes("Pme Par ")) {
            return  a.replace("Pme Par ", "");
        } else if (a.includes("Unité Industrielle Par ")) {
            return  a.replace("Unité Industrielle Par ", "");
        }
            
        },
       
        async handleIndicateurChange() {
          this.loading = true;

          // Appeler fetchStatistics() lorsque les indicateurs changent
          await this.fetchStatistics();
        },
      async fetchStatistics() {
        try {

          console.log('lastIndicateurIds',this.indicateur)
          const statisticsPromises = this.indicateur.map(async indicateurId => {
            const response = await axios.get(`/indicateurs/statistics/${indicateurId}`, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            });
            return response.data.data;
          });
  
          this.allStatistics = await Promise.all(statisticsPromises);
          console.log(' this.allStatistics',  this.allStatistics)
          this.loading = false;
          // Initialiser les types de graphique pour chaque élément
          this.chartTypes = Array(this.allStatistics.length).fill('histogramme');
  
          // Réinitialiser les options de graphique
          this.chartOptions = [];
          this.camembertOptions = [];
  
          this.allStatistics.forEach((statistics, index) => {
            this.loadChartData(statistics, index);
          });
  
       
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
        let nouvellePhrase = indicatorName.replace("Unité Industrielle Par ", "");
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
        this.loading = false;

      },
  
      switchChartType(type, index) {
        this.chartTypes[index] = type; // Changer le type de graphique pour l'élément spécifié
      },
      generatePDF() {
 
  const contentToInsert = `
  <style>
             
             .general h1{
                 font-weight: 800;
                 text-transform: uppercase;
                 font-size: 20px;
                 line-height: normal;
                 color: var(--color-primary);
                 text-align: center;
                 font-family: math;
              }
                 
             .general{
             
                 width: 100%;
                padding-top:15px;
                 display: flex;
                 flex-direction: column;
                 font-family: var(--font-default);
                 /* justify-content: center;
                 align-items: center; */
                 /* border: 1px solid red; */
             }
             
             .topbar {
               /* background: var(--color-secondary); */
               height: 90px;
               font-size: 14px;
               transition: all 0.5s;
               /* color: #fff; */
               padding: 0;
               display: flex;
               align-items: center;
               justify-content: center;
               /* border: 1px solid red; */
             }
             .topbar1{
             
             /* border: 1px solid red; */
             height: 100%;
             align-items: center;
             display: flex;
             align-items: center;
             justify-content: space-between;
             width: 95%;
             }
             .topbar1 img {
               max-height: 90px;
               margin-right: 6px;
             }
             .top-right1{
             
               display: flex;
               align-items: center;
             }
             
               @media (max-width: 1100px) {
             
                 .topbar {
                  
                   height: 170px;
                 
                 }
                 .topbar1 img {
                   max-height: 100px;
                 }
             
                 .topbar1{
                   width: 97%;
                   }
               }
               @media (max-width: 800px) {
             
                 .topbar1 img {
                   max-height: 80px;
                 }
                  
               }
             
               .contenu_1{
             
                 /* border: 1px solid red; */
                 display: flex;
                 flex-direction: column;
                 align-items: center;
             
                
               }
             
               .contenu_11{
             
             /* border: 1px solid rgb(0, 140, 255); */
             padding: 10px 0;
             /* box-shadow: 0 0 10px rgba(0,0,0,0.25); */
             margin: 10px 0;
             display: flex;
                 flex-direction: column;
                 align-items: center;
             }
               </style>
    <div class="general">
      <section id="topbar" class="topbar ">
        <div class=" topbar1 ">
          <div class="">
            <img src="${logo}" alt="">
          </div>
        
          <div class="top-right1">
            <img src="${ninba1}" alt="" style="max-height: 70px;">
            <!-- <img src="../assets/logo/dnpme-cl5.png" alt="" style="max-height: 100px;">                -->
          </div>           
        </div>
      </section>
      <div class="contenu_1">
        <div class="contenu_11">
          <h1>Direction Nationale de l'Industrie (DNI)</h1>
        </div>
        <p>Liste des statistiques concernées:  </p>
      </div>
      <BRow >
       
        <BCardBody v-if="allStatistics.length === 0" class="noresul">
           <div >
         <span> Pas de statistiques disponibles pour le moment !! </span>
          </div>
         </BCardBody>
          
        <BCol v-else md="12" v-for="(statistics, index) in allStatistics" :key="index" >
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
  `;

  
  const element = document.querySelector('.general');

  // Générer le PDF à partir de l'élément et le sauvegarder
   const pdf =  html2pdf().from(element).save();
   console.log('pdf',pdf)
},
generatePDF2() {
 
 const contentToInsert = `
 <style>
            
            .general h1{
                font-weight: 800;
                text-transform: uppercase;
                font-size: 20px;
                line-height: normal;
                color: var(--color-primary);
                text-align: center;
                font-family: math;
             }
                
            .general{
            
                width: 100%;
               padding-top:15px;
                display: flex;
                flex-direction: column;
                font-family: var(--font-default);
                /* justify-content: center;
                align-items: center; */
                /* border: 1px solid red; */
            }
            
            .topbar {
              /* background: var(--color-secondary); */
              height: 90px;
              font-size: 14px;
              transition: all 0.5s;
              /* color: #fff; */
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              /* border: 1px solid red; */
            }
            .topbar1{
            
            /* border: 1px solid red; */
            height: 100%;
            align-items: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 95%;
            }
            .topbar1 img {
              max-height: 90px;
              margin-right: 6px;
            }
            .top-right1{
            
              display: flex;
              align-items: center;
            }
            
              @media (max-width: 1100px) {
            
                .topbar {
                 
                  height: 170px;
                
                }
                .topbar1 img {
                  max-height: 100px;
                }
            
                .topbar1{
                  width: 97%;
                  }
              }
              @media (max-width: 800px) {
            
                .topbar1 img {
                  max-height: 80px;
                }
                 
              }
            
              .contenu_1{
            
                /* border: 1px solid red; */
                display: flex;
                flex-direction: column;
                align-items: center;
            
               
              }
            
              .contenu_11{
            
            /* border: 1px solid rgb(0, 140, 255); */
            padding: 10px 0;
            /* box-shadow: 0 0 10px rgba(0,0,0,0.25); */
            margin: 10px 0;
            display: flex;
                flex-direction: column;
                align-items: center;
            }
              </style>
   <div class="general">
     <section id="topbar" class="topbar ">
       <div class=" topbar1 ">
         <div class="">
           <img src="${logo}" alt="">
         </div>
       
         <div class="top-right1">
           <img src="${ninba1}" alt="" style="max-height: 70px;">
           <!-- <img src="../assets/logo/dnpme-cl5.png" alt="" style="max-height: 100px;">                -->
         </div>           
       </div>
     </section>
     <div class="contenu_1">
       <div class="contenu_11">
         <h1>Direction Nationale de l'Industrie (DNI)</h1>
       </div>
       <p>Liste des statistiques concernées:  </p>
     </div>
    
   </div>
 `;

 
 const element = document.querySelector('.test');
 const elements = document.querySelector('.TestPdf');
  element.innerHTML = contentToInsert;
 // Générer le PDF à partir de l'élément et le sauvegarder
  const pdf =  html2pdf().from(elements).save();
  console.log('pdf',pdf)
},

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

.TestPdf{
  opacity:0;
  padding:0 10px;
  display:none;
}

  </style>
  