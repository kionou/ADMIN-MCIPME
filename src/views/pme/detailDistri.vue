<template >
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Detail Entreprise " pageTitle="Tableau de bord" />
   <div class="container-xxl flex-grow-1 container-p-y">
            <!-- Header -->
            <div class="row">
                <div class="col-12">
                    <div class="card mb-4">
                        <div class="user-profile-header-banner">
                            <img src="@/assets/img/guinee.jpg" alt="Banner image" class="rounded-top" />
                        </div>
                        <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
                            <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                                <img src="@/assets/img/prof.png" alt="user image"
                                    class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img" />
                            </div>
                            <div class="name-user">
                                <div
                                    class="d-flex  align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                                    <div class="user-profile-info text-capitalize">
                                        <h4 class="text-capitalize">{{ data.NomMpme }}</h4>
                                        <ul
                                            class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                                            <li class="list-inline-item fw-semibold"><i
                                                    class="fa-solid fa-location-dot"></i> {{ data.Ville }} {{ data.Localisation }} {{ data.Rue }} </li>
                                            

                                        </ul>
                                       
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <!-- <div class="flex-grow-1 mt-3 mt-sm-5">
                                <div
                                    class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                                    <div class="user-profile-info text-capitalize">
                                        <h4 class="text-capitalize">{{ data.NomMpme }}</h4>
                                        <ul
                                            class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                                            <li class="list-inline-item fw-semibold"><i
                                                    class="fa-solid fa-location-dot"></i> {{ data.Ville }} {{ data.Localisation }} {{ data.Rue }}</li>
                                           

                                        </ul>
                                        <hr>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!--/ Header -->

            <!-- Navbar pills -->
            <div class="col-lg-12 col-12 mb-4">
                <div class="nav-align-top mb-4">
                    <ul class="nav nav-pills mb-3" role="tablist">
                        <li class="nav-item">
                            <button type="button" class="nav-link  active" role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-home1" aria-controls="navs-pills-top-home1"
                                aria-selected="true">
                                Informations générales
                            </button>
                        </li>

                        <li class="nav-item">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1"
                                aria-selected="false">
                                Importatrice
                            </button>
                        </li>

                        <li class="nav-item">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-messages11" aria-controls="navs-pills-top-messages1"
                                aria-selected="false" @click="reloadChild">
                                Positon
                            </button>
                        </li>

                    </ul>
                    <div class="tab-content">
                        <div class=" tab-pane fade show active" id="navs-pills-top-home1" role="tabpanel">

                            <div class="row ttb">
                                <div class=" card col-xl-6 col-lg-6 col-md-6 py-2 ttb1">
                                    <div class=" bg-white rounded-lg  ">
                                       
                                        <div class="">
                                            <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
                                               
                                                <div class="border-t border-gray-200">
                                                    <dl>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Sigle Pme</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.SigleMpme }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Nom Dirigeant</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NomDirigeant }} {{ data.PrenomDirigeant }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date de Création</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AnneeCreation }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date de début des activités</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.AnneeEntreeActivite }}</dd>
                                                        </div>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Forme  juridique</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.CodeStatutJuridique }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Secteur d'activité</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">  {{ data.PrincipalSecteurActivite }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Téléphone WhathApp</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroWhatsApp }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6  ">
                                                            <dt class="text-sm font-medium text-gray-500">Téléphone Secondaire</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NumeroTelephoneSecondaire }}</dd>
                                                        </div>

                                                        
                                                    </dl>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="rounded-lg  mt-3">
                        <p class="max-w-2xl mb-1 text-center font-semibold text-gray-900">Nombre d'Employés dans l'Entreprise: Hommes et Femmes</p>
                        <div class="-my-2  sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden border-b border-gray-200  rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                               
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Hommes</th>
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Femmes</th>
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Total</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white">
                                            
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmployeGuinneH }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmployeGuinneF }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmploye}}</td>
                                               
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                                </div>

                                <div class=" card col-xl-6 col-lg-6 col-md-6 py-2 ttb1">
                                    <div class=" bg-white rounded-lg  ">
                                       
                                        <div class="">
                                            <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
                                               
                                                <div class="border-t border-gray-200">
                                                    <dl>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Adresse Email</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AdresseEmail }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Autre Statut Juridique</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.AutreStatutJuridique }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Liste Sous Secteur Activite</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.ListeSousSecteurActivite }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Pays du Siège Social</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.PaysSiegeSocial }}</dd>
                                                        </div>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Numero Nif</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroNif }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date Generation du Numero Nif</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">  {{ data.DateGenerationNif }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Numéro Rccm</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroRccm }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-4 sm:px-6  ">
                                                            <dt class="text-sm font-medium text-gray-500">Numero de la TVA</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NumeroTva }}</dd>
                                                        </div>

                                                        
                                                    </dl>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="rounded-lg  mt-3">
                        <p class="max-w-2xl mb-1 text-center font-semibold text-gray-900"> Nombre d'Actionnaires dans l'Entreprise: Hommes et Femmes</p>
                        <div class="-my-2  sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden border-b border-gray-200  rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                               
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Hommes</th>
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Femmes</th>
                                                <th scope="col"
                                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    Total</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white">
                                            
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaireGuinneH }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaireGuinneF }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaire}}</td>
                                            
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                                </div>
                            </div>



                        </div>
                        <div class="tab-pane fade" id="navs-pills-top-profile1" role="tabpanel">
                            <BCardBody v-if="paginatedItems.length === 0" class="noresul">
                                <div >
                            <span> Vous n'êtes relié à aucune entreprise Importatrices </span>
                            </div>
                            </BCardBody>
                            <BCardBody v-else>
                                <BRow class="justify-content-center">
                        <div class="parent" v-for="pme in paginatedItems" :key="pme.id">
                        <div class="carde" >
                        <div class="content-box">
                            <span class="carde-title">{{ pme.NomMpme }}</span>
                            <!-- <p class="carde-content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            </p> -->
                            <p class="texte-content carde-content">Date creation: <span>{{ pme.AnneeCreation }}</span></p>
                            <div class="texte">
                            <p class="texte-content">Region: <span>{{ pme.Region }}</span></p>
                            <p class="texte-content">Ville: <span>{{ pme.Ville }}</span></p>
                            <p class="texte-content">Secteur Activité: <span>{{ pme.PrincipalSecteurActivite }}</span></p>
                            <p class="texte-content">Taille: <span>{{ pme.SigleMpme }}</span></p>
                            <p class="texte-content">Email: <span>{{ pme.AdresseEmail }}</span></p>
                            <p class="texte-content">Contact: <span> {{ pme.NumeroWhatsApp }}</span></p>
                            <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <ul class="list-unstyled hstack gap-1 mb-0">
                                <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                                            <router-link :to="{ name: 'detail-importatrice', params: { id: pme.CodeMpme }}" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-eye-circle-outline"></i></router-link>
                                        </li>
                                        
                                        <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Edit">
                                            <Blink href="#" class="btn btn-sm btn-soft-info"><i class="mdi mdi-pencil-outline"></i></Blink>
                                        </li>
                                        <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Delete">
                                            <Blink href="#jobDelete" data-bs-toggle="modal" class="btn btn-sm btn-soft-danger"><i class="mdi mdi-delete-outline"></i></Blink>
                                        </li>
                                        
                                        <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                                            <BDropdown toggle-class="btn btn-sm btn-soft-primary" menu-class="dropdown-menu-end"
                                                variant="white" right>
                                                <template #button-content>
                                                    <i class="mdi mdi-dots-vertical"></i>
                                                </template>
                                                <BDropdownItem href="#">Open</BDropdownItem>
                                                <BDropdownItem href="#">Edit</BDropdownItem>
                                                <BDropdownItem href="#">Rename</BDropdownItem>
                                                <BDropdownDivider />
                                                <BDropdownItem href="#">Remove</BDropdownItem>
                                                </BDropdown>
                                        </li>
                                        </ul>

                            </div>
                        </div>
                        <div class="date-box">
                            <img src="../../assets/img/guinea.png" alt="">
                        </div>
                    </div>
                    </div>
                        </div>   
                        </BRow>
                            </BCardBody>
                            
                            <BRow>
                                <BCol lg="12">
                                    <div class="container_pagination">
                                    <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
                                    </div>
                                </BCol>
                                </BRow>
                    </div>

                    <div class="tab-pane fade" id="navs-pills-top-messages11" role="tabpanel">
                        <Position :data="data"  :key="childKey"/>
           
                    </div>

                </div>
            </div>
        </div>

    </div>

   

 </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import Position from '../../components/admin/pme/position.vue'
import Pag from '@/components/others/pagination.vue'


export default {
    props:['id'],
   components: {
   Layout,
   PageHeader,
   Loading,
   Position,
   Pag
   
  
 },
 computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
    statistic() {
      return `Bienvenue à l'accueil de la ${this.loggedInUser.direction}`;
    },
    totalPages() {
   return Math.ceil(this.dataImport.length / this.itemsPerPage);
   },
   paginatedItems() {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return this.dataImport.slice(startIndex, endIndex);
   },
  },
 data() {
   return { 
    loading:true,
         data: '',
         isFullScreen: false,
         childKey: 0,
         sous_secteur:'',
         items:'',
         dataImport:[],
         dataimage:[],
         currentPage: 1,
     itemsPerPage: 8,
     totalPageArray: [],
    
   }
 },

async  mounted() {
    await  this.fetchData()
     await   this.fetchDataImport()
//    await this.fetchDataImage()
 },
 methods: {
    updateCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
    });
  },
 
 
    async  reloadChild() {
      this.childKey += 1; // Changez la clé pour recharger le composant enfant
    },
        async fetchData() {
            const response = await axios.get(`/mcipme/${this.id}`)
            const data = response.data.data
            console.log('eeee', data);
            this.data = data
            this.loading =   false
            // this.items = JSON.parse(this.data.ListeSousSecteurActivite)
  

        },

        async fetchDataImport() {
            const response = await axios.get(`/mcipme/distributrices/${this.id}`,{
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
            const data = response.data.data
           
            console.log('doc', data);
            this.dataImport = data
        },
        updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataImport.slice(startIndex, endIndex);
  },

        async fetchDataImage() {
            const response = await axios.get('/mpme/photos/publication-de-photo-mpme')
            const data = response.data.data.data
            this.dataimage = data
            console.log('image', data);
            this.dataimage = this.dataimage.filter((img) => {
            return img.CodeMpme === this.id; // Remplacez "userId" par la propriété qui contient l'ID de l'utilisateur dans vos données de documents.
            });
            console.log('this.dataimage',this.dataimage);
        },
        
 },
}
</script>
<style lang="css" scoped>

.parent {
  width: 340px;
  padding: 20px;
  perspective: 1000px;
}

.carde {
  padding-top: 50px;
 
  border: 3px solid #eff2f7;
  transform-style: preserve-3d;
  background: linear-gradient(135deg,#0000 18.75%,#f3f3f3 0 31.25%,#0000 0),
      repeating-linear-gradient(45deg,#f3f3f3 -6.25% 6.25%,#ffffff 0 18.75%);
  background-size: 60px 60px;
  background-position: 0 0, 0 0;
  background-color: #f0f0f0;
  width: 100%;
 
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