<script>
 import Layout from "../../layouts/main.vue";
 import PageHeader from "@/components/page-header.vue";
 import { apexChartData } from "@/views/charts/data-apex";




import Stat from "@/components/widgets/stat.vue";
import Transaction from "@/components/widgets/transaction.vue";
import Emailsent from "@/components/widgets/emailsent.vue";
import SocialSource from "@/components/widgets/social-source.vue";
import Activity from "@/components/widgets/activity.vue";
import SellingProduct from "@/components/widgets/selling-product.vue";
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import SecteurDni from '@/components/admin/statistique/dni/secteur.vue'
import Zone from '@/components/admin/statistique/dni/zone.vue'
import Zone1 from '@/components/admin/statistique/dni/zone1.vue'


/**
 * Dashboard Component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Loading ,
   
    Stat,
    Transaction,

    Emailsent,
    SocialSource,
    Activity,
    SellingProduct,
    SecteurDni,
    Zone,
    Zone1
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
    statistic() {
      return `Bienvenue à l'accueil de la ${this.loggedInUser.direction}`;
    }
  },
  data() {
    return {
      apexChartData,
      loading:true,
      DataOptions:[],
      statData: [],
      mpme:[],
      SecteurActiviteOptions:[],
      IndicateursOptions:[],
      regionOptions:[],
      canCancel: false,
      useSlot: false,
     
      
      
      // fetchingStats: true,
      // earningStatus: true,
    };
    
  },
async  mounted() {
    console.log("index",this.loggedInUser);
    await this.fetchStatics()

    await this.fetchMpme()
    await this.fetchRegionOptions()
    await this.fetchSecteurActiviteOptions()
  },
  methods: {
    
  async fetchStatics() {
            try {
              const response = await axios.get('/directions/statistics/dashboards', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
               console.log(response.data.data);
                this.DataOptions = response.data.data;
               console.log(this.DataOptions[0].PmeCount);
               this.statData = [
               
        {
          icon: "bx bx-copy-alt",
          title: "Total unités industrielles",
           value: response.data.data[0].PmeCount || 0,
        },
        // {
        //   icon: "bx bx-archive-in",
        //   title: " Total production ",
        //   value:  response.data.data[0].TotalProduction|| 0,
        // },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Total emplois crées",
          value:  response.data.data[0].EmployersCount || 0,
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Contribution PIB",
          value:  response.data.data[0].Pib || 0,
        },
        {
          icon: "bx bx-copy-alt",
          title: "Demandes en attente",
          value:  0,
        },
       
      ],
             

               this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
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
                 this.indicateur1 = response.data.data[0].id
                 this.indicateur2 = response.data.data[1].id
               
               this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
            }
    },
    async fetchStaAnnuel() {
        try {
          const response = await axios.get(`/indicateurs/statistics/${this.indicateur1}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          const dataFromAPI = response.data.data;
          console.log('eee', dataFromAPI)
          const categories = dataFromAPI.map(item => item.IntituleZone); // Récupérer les noms des unités industrielles
            this.datay = categories
          // Mettre à jour les catégories
  
          // Mettre à jour les données du graphique avec les données de l'API
          this.datax = dataFromAPI.map(item => parseInt(item.nb));
        } catch (error) {
          console.error(error);
          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/"); //a revoir
          }
        }
      },
      async fetchMpme() {
        try {
          const response = await axios.get('/mcipme', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const dataFromAPI = response.data.data;
          console.log(dataFromAPI);

          // Triez les données par date de création (supposons que la propriété soit `dateCreation`)
        const sortedData = dataFromAPI.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Prenez les quatre premières entreprises
        const latestFourCompanies = sortedData.slice(0, 4);

        console.log(latestFourCompanies);
        this.mpme = latestFourCompanies
          
  
          this.loading = false;
        } catch (error) {
          console.error(error);
        
        }
      },
      async fetchRegionOptions() {
    // Renommez la méthode pour refléter qu'elle récupère les options de pays
    try {
      await this.$store.dispatch("fetchRegionOptions");
      const options = JSON.parse(
        JSON.stringify(this.$store.getters["getRegionOptions2"])
       
      ); // Accéder aux options des pays via le getter
      console.log(options);
      this.regionOptions = options;
      // Affecter les options à votre propriété sortedCountryOptions
      this.loading = false
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des options des pays :",
        error.message
      );
    }
  },
  async fetchSecteurActiviteOptions() {
      try {
        await this.$store.dispatch("fetchSecteurActiviteOptions" , this.loggedInUser); // Action spécifique aux secteurs d'activité
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getsecteurActiviteOptions"])
        );
        this.SecteurActiviteOptions = options;
        console.log('rrrr',options);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des secteurs d'activité:",
          error.message
        );
      }
    },
      NameRegion(id){
          try {
          
     
         const selectedRegion = this.regionOptions.find(region => region.CodeRegion === id);    
          console.log('selectedRegion',selectedRegion);
          if (selectedRegion) {
          return  selectedRegion.NomRegion;         
          } else {
              console.error('Région non trouvée dans les options.');
          }
          } catch (error) {
            console.error(
        "Erreur lors de la récupération des options des pays :",
        error.message
      );
          }
      
 },
 NameActivite(id){
          try {
          
     console.log( this.SecteurActiviteOptions);
         const selectedRegion = this.SecteurActiviteOptions.find(region => region.value === id );    
          console.log('selectedRegion',selectedRegion);
          if (selectedRegion) {
          return  selectedRegion.label;         
          } else {
              console.error('Région non trouvée dans les options.');
          }
          } catch (error) {
            console.error(
        "Erreur lors de la récupération des options des pays :",
        error.message
      );
          }
      
 },
 },
};
</script>

<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <PageHeader title="Accueil" pageTitle="Tableau de bord"  :statistic="statistic" />
    <BRow>
      <BCol xl="12">
        <BRow>
          <BCol  v-for="stat of statData" :key="stat.icon">
            <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
          </BCol>
        </BRow>
     
        </BCol>
    </BRow>
  

      <BRow>
      <BCol lg="6" >
        <div>
          <div>
            <Zone1  ></Zone1>
          </div>
        </div>
      </BCol>

      <BCol lg="6" >
        <div>
          <div>
            <Zone ></Zone>
          </div>
        </div>
      </BCol>
    </BRow>

    <BRow class="justify-content-center">
       
      <div class="parent" v-for="pme in mpme" :key="pme.id">
     <div class="carde" >
    <div class="content-box">
      <span class="carde-title">{{ pme.NomMpme }}</span>
          <p class="texte-content carde-content">Date creation : <span>{{ pme.AnneeCreation }}</span></p>
          <div class="texte">
            <p class="texte-content" v-if="pme">Code DNI : <span>{{ pme.CodeMpme }}</span></p>
          <p class="texte-content">Region: <span>{{ NameRegion(pme.Region) }}</span></p>
          <p class="texte-content text-truncate">Secteur Activité : <span>{{ NameActivite(pme.PrincipalSecteurActivite) }}</span></p>
          <p class="texte-content">Superficie Occupée : <span>{{ pme.SuperficieOccupee || 0 }} ha</span></p>
          <p class="texte-content text-truncate">Email : <span>{{ pme.AdresseEmail }}</span></p>
          <p class="texte-content">Contact : <span> {{ pme.NumeroWhatsApp }}</span></p>
        <div >
          <router-link :to="{ name: 'detail-industrielle', params: { id: pme.CodeMpme }}" >   <span class="see-more">
              <i class="bx bx-show"></i>
            </span>
          </router-link>             

        </div>
    </div>
    <div class="date-box" v-if="pme">
       <img v-if="pme.profile === null" src="@/assets/img/guinea.png" alt="">
       <img v-else :src="pme.profile" alt="">
    </div>
</div>
</div>
   </div> 

    
      
    </BRow>
 
 
  </Layout>
</template>
<style scoped>
.parent {
  width: 340px;
  padding: 20px;
  perspective: 1000px;
}

.carde {
  padding-top: 50px;
 
  border: 3px solid rgb(255, 255, 255);
  transform-style: preserve-3d;
  background: linear-gradient(135deg,#0000 18.75%,#f3f3f3 0 31.25%,#0000 0),
      repeating-linear-gradient(45deg,#f3f3f3 -6.25% 6.25%,#ffffff 0 18.75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 0;
  background-color: #f0f0f0;
  width: 100%;
  box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
  transition: all 0.5s ease-in-out;
}

.carde .texte {

margin-top: 10px;
}

.carde .texte-content {
color: #f0f0f0 !important;
font-weight: bold;
font-size: 13px;
margin-bottom: 10px !important;

}

/* .carde:hover {
  background-position: -100px 100px, -100px 100px;
  transform: rotate3d(0.5, 1, 0, 30deg);
} */

.content-box {
  background: var(--color-primary);
  /* border-radius: 10px 100px 10px 10px; */
  transition: all 0.5s ease-in-out;
  padding: 35px 25px 10px 25px;
  transform-style: preserve-3d;
}

.content-box .carde-title {
  display: inline-block;
    font-size: 16px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    position: absolute;
    top: -33px;
    right: 24px;
}

.content-box .carde-title:hover {
  transform: translate3d(0px, 0px, 60px);
}

.content-box .carde-content {
    
    font-weight: 700;
    color: #f2f2f2;
    position: absolute;
    right: 33px;
    top: 11px;
}

.content-box .carde-content:hover {
  transform: translate3d(0px, 0px, 60px);
}

.content-box .see-more {
  cursor: pointer;
   
    display: flex;
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    color: var(--color-primary);
    background: white;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 20px);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    
}
.content-box .see-more i {
  font-size: 20px;
}
.content-box .see-more:hover {
  transform: translate3d(0px, 0px, 60px);
}

.date-box {
  position: absolute;
  top: -16px;
  left: 5px;
  height: 60px;
  width: 60px;
  border: 1px solid #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
}

.date-box img {
 width: 100%;
 height: 100%;
}


</style>
