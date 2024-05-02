<template >
    <Layout>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Detail entreprise " pageTitle="Entreprise" />
   <div class="container-xxl flex-grow-1 ">
            <!-- Header -->
            <div class="row">
                <div class="col-12">
                    <div class="card ">
                        <div class="user-profile-header-banner">
                            <img src="@/assets/img/guinee.jpg" alt="Banner image" class="rounded-top" />
                        </div>
                        <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center">
                            <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                                <img v-if="data.profile === null" src="@/assets/img/guinea.png" alt="profile image" class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
                                <img v-else :src="data.profile" alt="profile image" class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
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
                                <!-- <hr> -->
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
                            <button type="button" class="nav-link  " role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-home11" aria-controls="navs-pills-top-home11"
                                aria-selected="false">
                               Plus d'informations 
                            </button>
                        </li>
                        

                        <li class="nav-item">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1"
                                aria-selected="false">
                                Entreprises rattachées
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#navs-pills-top-profile12" aria-controls="navs-pills-top-profile12"
                                aria-selected="false">
                                Skockages disponibles
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
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Sigle DNCIC</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.SigleMpme }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Nom Dirigeant</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NomDirigeant }} {{ data.PrenomDirigeant }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date de Création</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AnneeCreation }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date de début des activités</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.AnneeEntreeActivite }}</dd>
                                                        </div>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Forme  juridique</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.statut_juridique"> {{ data.statut_juridique.NomStatutJuridique }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Secteur d'activité</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.secteur_activite">  {{ data.secteur_activite.NomSecteurActivite }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Téléphone WhathApp</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroWhatsApp }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6  ">
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
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.PersonnelPermanentHomme || 0 }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.PersonnelPermanentFemme || 0 }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmploye || 0}}</td>
                                               
                                            </tr>
                                        </tbody>
                                    </table>
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
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaireGuinneH || 0 }} </td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaireGuinneF || 0 }}</td>
                                                <td
                                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreActionnaire || 0}}</td>
                                            
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
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Adresse Email</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AdresseEmail }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Autre Statut Juridique</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.AutreStatutJuridique }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Liste Sous Secteur Activite</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="sous"> 
                                                                <span v-for="pme in sous" :key="pme.id" > {{ pme.NomSousSecteur }} , </span> 
                                                                 </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Pays du Siège Social</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.PaysSiegeSocial }}</dd>
                                                        </div>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Numero Nif</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroNif }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Date Generation du Numero Nif</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">  {{ data.DateGenerationNif }}</dd>
                                                        </div>

                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Numéro Rccm</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.NumeroRccm }} </dd>
                                                        </div>
                                                        <div
                                                            class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6  ">
                                                            <dt class="text-sm font-medium text-gray-500">Numero de la TVA</dt>
                                                            <dd
                                                                class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NumeroTva }}</dd>
                                                        </div>
                                                        <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                                            <dt class="text-sm font-medium text-gray-500">Type d'entreprise</dt>
                                                            <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.type_entreprises"> 
                                                                <span v-for="pme in data.type_entreprises" :key="pme.id" > {{ pme.type_entreprise.IntituleType }} , </span> 
                                                                 </dd>
                                                        </div>

                                                        
                                                    </dl>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="card card-action mb-4">
                                        <div class="card-header align-items-center">
                                            <h5 class="card-action-title mb-0"><i class="bx bx-list-ul me-2"></i>Details Documents</h5>
                                          
                                        </div>
                                        <div class="card-body">
                                            <ul class="timeline ms-2">
                                                <li class="timeline-item timeline-item-transparent">
                                                    <span class="timeline-point timeline-point-primary"></span>
                                                    <div class="timeline-event">
                                                
                                                        <div class="d-flex flex-wrap gap-2">
                                                            <p v-if="data.FichierRccm === null"> Pas de Rccm pour l'instant !</p>
                                                            <a   v-else  :href="data.FichierRccm" class="me-3 d-flex flex-column align-items-center"  download>
                                                                <img src="@/assets/misc/pdf.png" alt="Document image"
                                                                    width="20" class="me-2" />
                                                                <span class="h6">Fichier Rccm</span>
                                                            </a>

                                                            <p v-if="data.FichierNif === null"> Pas de Nif pour l'instant !</p>
                                                            <a   v-else  :href="data.FichierNif" class="me-3 d-flex flex-column align-items-center"  download>
                                                                <img src="@/assets/misc/pdf.png" alt="Document image"
                                                                    width="20" class="me-2" />
                                                                <span class="h6">Fichier Nif</span>
                                                            </a>

                                                            <p v-if="data.FichierCertificat === null"> Pas de certificat pour l'instant !</p>
                                                            <a   v-else  :href="data.FichierCertificat" class="me-3 d-flex flex-column align-items-center"  download>
                                                                <img src="@/assets/misc/pdf.png" alt="Document image"
                                                                    width="20" class="me-2" />
                                                                <span class="h6">Fichier Certificat</span>
                                                            </a>
                                                           
                                                        </div>
                                                        
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>



                        </div>

                        <div class=" tab-pane fade " id="navs-pills-top-home11" role="tabpanel">

<div class="row ttb">
    <div class=" card col-xl-6 col-lg-6 col-md-6 py-2 ttb1">
        <div class=" bg-white rounded-lg  ">
           
            <div class="">
                <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg">
                   
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Titre Dirigeant</dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.TitreDirigeant }} </dd>
                            </div>
                            <div
                                class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Nom Dirigeant</dt>
                                <dd
                                    class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NomDirigeant }} {{ data.PrenomDirigeant }}</dd>
                            </div>

                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Sexe Dirigeant </dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.SexeDirigeant }} </dd>
                            </div>
                            <div
                                class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Pays Dirigeant</dt>
                                <dd
                                    class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.PaysDirigeant }}</dd>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Année Naissance Dirigeant</dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AnneeNaissanceDirigeant }} </dd>
                            </div>
                            <div
                                class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Dirigeant Proprietaire</dt>
                                <dd
                                    class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">  {{ data.DirigeantProprietaire }}</dd>
                            </div>

                           

                            
                        </dl>
                    </div>
                </div>

                <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3">
                   
                   <div class="border-t border-gray-200">
                       <dl>
                           <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Titre Repondant </dt>
                               <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.TitreRepondant }} </dd>
                           </div>
                           <div
                               class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Nom Repondant</dt>
                               <dd
                                   class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NomRepondant }} </dd>
                           </div>

                           <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Fonction Repondant </dt>
                               <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.FonctionRepondant }} </dd>
                           </div>
                           <div
                               class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Adresse du Repondant</dt>
                               <dd
                                   class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.AdresseRepondant }}</dd>
                           </div>
                           <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Ville du Repondant </dt>
                               <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.VilleRepondant }} </dd>
                           </div>
                           <div
                               class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Téléphone WhatsApp du Repondant </dt>
                               <dd
                                   class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">  {{ data.TelephoneWhatsAppRepondant }}</dd>
                           </div>
                           <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Contacter </dt>
                               <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.Contacter }} </dd>
                           </div>

                          

                           
                       </dl>
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
                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Titre Proprietaire </dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.TitreProprietaire }} </dd>
                            </div>
                            <div
                                class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Nom Proprietaire</dt>
                                <dd
                                    class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.NomProprietaire }} {{ data.PrenomProprietaire }}</dd>
                            </div>

                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Sexe Proprietaire </dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.SexeProprietaire }} </dd>
                            </div>
                            <div
                                class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Pays Proprietaire</dt>
                                <dd
                                    class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.PaysProprietaire }}</dd>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Année Naissance Proprietaire</dt>
                                <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.AnneeNaissanceProprietaire }} </dd>
                            </div>
                           

                            
                        </dl>
                    </div>
                </div>

                <div class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3">
                   
                   <div class="border-t border-gray-200">
                       <dl>
                           <div class="px-4 py-3 bg-gray-50 sm:grid  grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Existance Actionnaire </dt>
                               <dd class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> {{ data.ExistanceActionnaire }} </dd>
                           </div>
                           <div
                               class="px-4 py-3 bg-white sm:grid grid align-items-center sm:grid-cols-3 sm:gap-6 sm:px-6">
                               <dt class="text-sm font-medium text-gray-500">Existance Conseil Administration</dt>
                               <dd
                                   class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2">{{ data.ExistanceConseilAdministration }} </dd>
                           </div>

                          
                          

                           
                       </dl>
                   </div>
               </div>

            </div>

        </div>

        <div class="rounded-lg  mt-3">
<p class="max-w-2xl mb-1 text-center font-semibold text-gray-900"> Nombre d'employés temporaires dans l'entreprise</p>
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
                   
                    
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white">
                
                    <td
                        class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.PersonnelTemporaireHomme || 0 }} </td>
                    <td
                        class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.PersonnelTemporaireFemme || 0 }}</td>
                 
                
                </tr>
            </tbody>
        </table>
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
                  
                   
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white">
                
                    <td
                        class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmployeGuinneH || 0 }}</td>
                    <td
                        class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap">{{ data.NbreEmployeGuinneF || 0 }}</td>
                    
                   
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
          <span> Vous n'êtes relié à aucune entreprise distributrice </span>
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
          <p class="texte-content" v-if="pme.Region">Region: <span>{{ pme.Region.NomRegion }}</span></p>
          <p class="texte-content">Ville: <span>{{ pme.Ville }}</span></p>
          <p class="texte-content">Secteur Activité: <span>{{ pme.PrincipalSecteurActivite }}</span></p>
          <p class="texte-content">Taille: <span>{{ pme.SigleMpme }}</span></p>
          <p class="texte-content">Email: <span>{{ pme.AdresseEmail }}</span></p>
          <p class="texte-content">Contact: <span> {{ pme.NumeroWhatsApp }}</span></p>
          <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
            <ul class="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                         <router-link :to="{ name: 'detail-distributrice', params: { id: pme.CodeMpme }}" class="btn btn-sm btn-soft-primary"><i class="mdi mdi-eye-circle-outline"></i></router-link>
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
         <img src="@/assets/img/guinea.png" alt="">
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
                    <div class="tab-pane fade" id="navs-pills-top-profile12" role="tabpanel">
                            <BCardBody v-if="StocksOptions.length === 0" class="noresul">
            <div >
          <span> L'entreprise n'a pas encore de skockage disponible </span>
           </div>
          </BCardBody>
          <BCardBody v-else>
             <div class="py-2 d-flex justify-content-center align-items-center flex-wrap">
 
         <div class="" style="width: 370px; border:1px solid #dedfe1; margin:0 10px 10px 0" v-for="stock in StocksOptions" :key="stock.id">
           <BRow class="align-items-center">
             <BCol xl="5">
               <div class="text-center p-2 border-end">
                 <div class="avatar-sm mx-auto mb-3 mt-1" style="border:1px solid #dedfe1; width: 4rem; height: 4rem;  border-radius: 50%;">
                   <span class="avatar-title rounded-circle   font-size-16">
                    
                     <img  v-if="stock.produit === null" src="@/assets/img/produits.jpg" alt="" class="w-100 h-100 rounded-circle">
                     <img v-else :src="stock.produit.ImageProduit" alt="" class="w-100 h-100 rounded-circle">
                   </span>
                 </div>
                 <h5 class="text-truncate pb-1">
                     {{formatCreatedAt(stock.DateDeMiseAJourStock)  }}
                 </h5>
               </div>
             </BCol>
 
             <BCol xl="7">
               <div class="p-2 text-center text-xl-start">
                 <BRow>
                   <BCol cols="12">
                     <div>
                       <p class="text-muted mb-2 text-truncate">Nom du produit </p>
                       <h5 v-if="stock.produit">{{stock.produit.NomProduit}}</h5>
                     </div>
                   </BCol>
                   
                 </BRow>
                 <BRow>
                     <BCol cols="12">
                     <div>
                       <p class="text-muted mb-2 text-truncate">Quantite Réel</p>
                       <h5>{{stock.QuantiteReel}} </h5>
                     </div>
                   </BCol>
                 </BRow>
               </div>
             </BCol>
           </BRow>
         </div>    
             </div>
           
          </BCardBody>
        
         
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
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import Position from '@/components/admin/pme/position.vue'
import Pag from '@/components/others/pagination.vue'
import moment from 'moment';


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
         sous:[],
         StocksOptions:[],
         currentPage: 1,
         itemsPerPage: 10,
    
   }
 },
 computed:{
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
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
async  mounted() {
    await  this.fetchData()
    await this.fetchStock()
     await   this.fetchDataImport()
 },
 methods: {
    updateCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
    });
  },
 
//   updatePaginatedItems() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     return this.dataImport.slice(startIndex, endIndex);
//   },
    async  reloadChild() {
      this.childKey += 1; // Changez la clé pour recharger le composant enfant
    },
        async fetchData() {
            const response = await axios.get(`/mcipme/${this.id}`)
            const data = response.data.data
            console.log('eeee', data);
            this.data = data.detail
            this.sous = data.list_sous_secteurs
            this.loading =   false
            // this.items = JSON.parse(this.data.ListeSousSecteurActivite)
  

        },

        async fetchDataImport() {
            const response = await axios.get(`/mcipme/importatrices/${this.id}`,{
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
            const data = response.data.data
            this.datadoc = data
            console.log('doc', data);
            this.dataImport = data
        },

        formatCreatedAt(createdAt) {
    return moment(createdAt).format('DD/MM/YY ');
    },
        async fetchStock() {
            console.log(this.id)
      try {
         const response = await axios.get('/stocks', {
           headers: { Authorization: `Bearer ${this.loggedInUser.token}`},
           params:{ code:this.id}
         });
         console.log("Réponse du téléversement :", response);
         if (response.data.status === "success") {
          
            this.StocksOptions = response.data.data
         console.log("Réponse du téléversement :",  this.StocksOptions);

           this.loading =false
         } 
       } catch (error) {
         console.error("Erreur lors du téléversement :", error);
         if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                 await this.$store.dispatch('auth/clearMyAuthenticatedUser');
               this.$router.push("/");  //a revoir
             }
       }
        },
        
 },
}
</script>
<style lang="css" scoped>

.name-user{
/* border:1px solid red; */
width: 100%;
height: 50px;
height: auto;
    margin-top: 34px;

}
@media (max-width: 1100px) {

    .ttb{
    
    flex-direction:column;
    }
    .ttb1 , .ttb2{
    
    width: 100%;
    }

}


.container_pagination {
    width: auto;
    text-align: end;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin: 5px;
  
  }

  .noresul {
  border: 1px solid #F9D310;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border-radius: 6px;
  font-size: 20px;

}
.contenu {

/* border: 1px solid red; */
padding: 15px 10px;
}

.task {
  position: relative;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--color-secondary);
  margin: 0 10px 10px 0;
  width: 300px;
  height: 250px;
}

.image {

  width: 100%;
  height: 100%;

}

.task:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.image img {

  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
</style>