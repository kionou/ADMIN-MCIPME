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
     
      
    
      canCancel: false,
      useSlot: false,
     
      
      
      // fetchingStats: true,
      // earningStatus: true,
    };
    
  },
async  mounted() {
    console.log("index",this.loggedInUser);
    await this.fetchStatics()
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
        {
          icon: "bx bx-archive-in",
          title: " Total production ",
          value:  response.data.data[0].TotalProduction|| 0,
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Total emploi crée",
          value:  response.data.data[0].EmployersCount || 0,
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Contribution PIB",
          value:  response.data.data[0].Pib || 0,
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
          <BCol md="3" v-for="stat of statData" :key="stat.icon">
            <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
          </BCol>
        </BRow>
     
        </BCol>
    </BRow>
    <BRow>
      <BCol lg="6" v-for="(data, index) in apexChartData" :key="'apex-chart-' + index">
        <BCard no-body>
          <BCardBody>
            <BCardTitle class="mb-4">{{ data.title }}</BCardTitle>
            <apexchart class="apex-charts" :height="data.height" :type="data.type" dir="ltr" :series="data.chart.series" :options="data.chart.chartOptions">
            </apexchart>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <BRow class="justify-content-center">
      <div class="parent">
         <div class="carde">
        <div class="content-box">
            <span class="carde-title">Cimenterie Guinee</span>
            <!-- <p class="carde-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            </p> -->
            <p class="texte-content carde-content">Date creation: <span>1900</span></p>
            <div class="texte">
            <p class="texte-content">Region: <span>Conakry</span></p>
            <p class="texte-content">Ville: <span>Conakry</span></p>
            <p class="texte-content">Secteur Activité: <span>Conakry</span></p>
            <p class="texte-content">Taille: <span>Conakry</span></p>
            <p class="texte-content">Email: <span>kionou.00@gmail.com</span></p>
            <p class="texte-content">Contact: <span> +227 0757408303</span></p>
            <div class="w-100 d-flex justify-content-end">
            <span class="see-more">
              <i class="bx bx-show"></i>
            </span>
  
            </div>
        </div>
        <div class="date-box">
           <img src="../../assets/img/guinea.png" alt="">
        </div>
    </div>
  </div>
       </div>
       <div class="parent">
         <div class="carde">
        <div class="content-box">
            <span class="carde-title">Cimenterie Guinee</span>
            <!-- <p class="carde-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            </p> -->
            <p class="texte-content carde-content">Date creation: <span>1900</span></p>
            <div class="texte">
            <p class="texte-content">Region: <span>Conakry</span></p>
            <p class="texte-content">Ville: <span>Conakry</span></p>
            <p class="texte-content">Secteur Activité: <span>Conakry</span></p>
            <p class="texte-content">Taille: <span>Conakry</span></p>
            <p class="texte-content">Email: <span>kionou.00@gmail.com</span></p>
            <p class="texte-content">Contact: <span> +227 0757408303</span></p>
            <div class="w-100 d-flex justify-content-end">
            <span class="see-more">
              <i class="bx bx-show"></i>
            </span>
  
            </div>
        </div>
        <div class="date-box">
           <img src="../../assets/img/guinea.png" alt="">
        </div>
    </div>
  </div>
       </div>
       <div class="parent">
         <div class="carde">
        <div class="content-box">
            <span class="carde-title">Cimenterie Guinee</span>
            <!-- <p class="carde-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            </p> -->
            <p class="texte-content carde-content">Date creation: <span>1900</span></p>
            <div class="texte">
            <p class="texte-content">Region: <span>Conakry</span></p>
            <p class="texte-content">Ville: <span>Conakry</span></p>
            <p class="texte-content">Secteur Activité: <span>Conakry</span></p>
            <p class="texte-content">Taille: <span>Conakry</span></p>
            <p class="texte-content">Email: <span>kionou.00@gmail.com</span></p>
            <p class="texte-content">Contact: <span> +227 0757408303</span></p>
            <div class="w-100 d-flex justify-content-end">
            <span class="see-more">
              <i class="bx bx-show"></i>
            </span>
  
            </div>
        </div>
        <div class="date-box">
           <img src="../../assets/img/guinea.png" alt="">
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
  top: -24px;
  left: 13px;
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
