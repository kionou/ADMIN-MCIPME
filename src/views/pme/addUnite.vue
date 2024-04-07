<template >
    <Layout>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
   <PageHeader title="Entreprise" pageTitle="Tableau de bord" />
   <BRow>
     <BCol lg="12">
       <BCard no-body>
         <BCardBody class="border-bottom">
            <div class="generastep" data-aos="zoom-out" data-aos-delay="100">
    <div class="stepper">
      <div class="stepper-progress">
        <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
      </div>

      <div
        class="stepper-item"
        :class="{ current: currentStep == item, success: currentStep > item }"
        v-for="item in 6"
        :key="item"
      >
        <div class="stepper-item-counter">
          <img
            class="icon-success"
            src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
            alt=""
          />
          <span class="number">
            {{ item }}
          </span>
        </div>
        <span class="stepper-item-title"> Etape {{ item }} </span>
      </div>
    </div>
             </div>   

             <div class="container-fluid" style="margin-top: 48px">
  
                <form class="form" >
                <!-- Étape 1 -->
                <div v-if="currentStep === 1">
                    <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
                        <p class="titre">INFORMATIONS GENERALE</p>
                        <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  
                  <label for="userpassword">Region <span class="text-danger">*</span></label>
                  <MazSelect
                   label="Sélectionner la région"
                    v-model="step1.region"
                     no-radius  color="info"
                    :options="regionOptions"
                    :class="{ 'error-border': resultError['Region'] }"
                    @input="resultError['Region'] = false"
                    v-slot="{ option }"
                     search
                   
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionClick(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step1.region.$error">{{
                  v$.step1.region.$errors[0].$message
                }}</small>
                <small v-if="resultError['Region']"> {{ resultError["Region"] }} </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="Sousprefecture"
                    >Prefecture <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner la préfecture"
                    v-model="step1.prefecture"
                     no-radius  color="info"
                    :options="prefectureOptions1"
                    v-slot="{ option }"
                    search
                    :disabled="isPrefectureDisabled"

                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionPrefecture(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step1.prefecture.$error">{{
                                    v$.step1.prefecture.$errors[0].$message }}</small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="Commune">Commune <span class="text-danger">*</span></label>
                  <MazSelect
                  label="Sélectionner la commune"
                    v-model="step1.commune"
                     no-radius  color="info"
                    :options="sous_prefectureOptions"
                    @click="handleChange"
                    :class="{ 'error-border': resultError['Commune'] }"
                    @input="resultError['Commune'] = false"
                    v-slot="{ option }"
                    search
                    :disabled="isCommuneDisabled"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionCommune(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>

                  <!-- <input type="text" name="Commune" id="Commune" placeholder="" v-model="step1.commune"> -->
                </div>
                <small v-if="v$.step1.commune.$error">{{
                  v$.step1.commune.$errors[0].$message
                }}</small>
                <small v-if="resultError['Commune']">
                  {{ resultError["Commune"] }}
                </small>
              </div>
            </div>
                     </div>
                     <div class="content">
                        <p class="titre">INFORMATIONS SUR L'ENTREPRISE</p>
               
                        <div class="row mb-3 mt-3 content-group">
                        <div class="col">
                            <div class="input-groupe">
                            <label for="SigleMpme"
                                >Sigle Mpme </label
                            >
                            <input
                                type="text"
                                name="SigleMpme"
                                id="SigleMpme"
                                placeholder="DNPMECL"
                                v-model="step1.sigle_mpme"
                                :class="{ 'error-border': resultError['SigleMpme'] }"
                                @input="resultError['SigleMpme'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.sigle_mpme.$error">{{
                            v$.step1.sigle_mpme.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['SigleMpme']">
                            {{ resultError["SigleMpme"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="nom"
                                >Raison sociale  <span class="text-danger">*</span></label
                            >
                            <input
                                type="text"
                                name="nom"
                                id="nom"
                                placeholder="DNPMECL"
                                v-model="step1.nom"
                                :class="{ 'error-border': resultError['NomMpme'] }"
                                @input="resultError['NomMpme'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.nom.$error">{{
                            v$.step1.nom.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['NomMpme']">
                            {{ resultError["NomMpme"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="Quartier"
                                >Quartier <span class="text-danger">*</span></label
                            >
                            <MazSelect
                            label="Sélectionner le quartier"
                                v-model="step1.quartier"
                                no-radius  color="info"
                                :options="QuartierOptions"

                                :class="{ 'error-border': resultError['Quartier'] }"
                                @input="resultError['Quartier'] = false"
                                search
                                :disabled="isQuartierDisabled"
                            
                            />
                            </div>
                            <small v-if="v$.step1.quartier.$error">{{
                            v$.step1.quartier.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['Quartier']">
                            {{ resultError["Quartier"] }}
                            </small>
                        </div>
                        </div>
                        <div class="row mb-3 mt-3 content-group">
                        <div class="col">
                            <div class="input-groupe">
                            <label for="Rue">Rue </label>
                            <input
                                type="text"
                                name="Rue"
                                id="Rue"
                                placeholder="12 Conakry"
                                v-model="step1.rue"
                                :class="{ 'error-border': resultError['Rue'] }"
                                @input="resultError['Rue'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.rue.$error">{{
                            v$.step1.rue.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['Rue']"> {{ resultError["Rue"] }} </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="nom">Boîte Postale </label>
                            <input
                                type="text"
                                name="BoitePostale"
                                id="BoitePostale"
                                placeholder="1234"
                                v-model="step1.boite_postale"
                                :class="{ 'error-border': resultError['BoitePostale'] }"
                                @input="resultError['BoitePostale'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.boite_postale.$error">{{
                            v$.step1.boite_postale.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['BoitePostale']">
                            {{ resultError["BoitePostale"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="NumeroWhatsApp"
                                >Numéro WhatsApp <span class="text-danger">*</span></label
                            >
                            <MazPhoneNumberInput
                                v-model="step1.tel_what"
                                show-code-on-list
                                no-radius  color="info"
                                :ignored-countries="['AC']"
                                defaultCountryCode="GN"
                                @update="results = $event"
                                :success="results?.isValid"
                                :class="{ 'error-border': resultError['NumeroWhatsApp'] }"
                                @input="resultError['NumeroWhatsApp'] = false"
                            />
                            </div>
                        </div>
                        <small v-if="v$.step1.tel_what.$error">{{
                            v$.step1.tel_what.$errors[0].$message
                        }}</small>
                        <small v-if="resultError['NumeroWhatsApp']">
                            {{ resultError["NumeroWhatsApp"] }}
                        </small>
                        </div>
                        <div class="row mb-3 mt-3 content-group">
                        <div class="col">
                            <div class="input-groupe">
                            <label for="NumeroTelephoneSecondaire"
                                >Numéro Téléphone Secondaire
                            </label>
                            <MazPhoneNumberInput
                                v-model="step1.tel_second"
                                show-code-on-list
                                no-radius  color="info"
                                :ignored-countries="['AC']"
                                 defaultCountryCode="GN"
                                @update="results = $event"
                                :success="results?.isValid"
                                :class="{ 'error-border': resultError['NumeroTelephoneSecondaire'] }"
                                @input="resultError['NumeroTelephoneSecondaire'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.tel_second.$error">{{
                            v$.step1.tel_second.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['NumeroTelephoneSecondaire']">
                            {{ resultError["NumeroTelephoneSecondaire"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="AdresseEmail">Adresse Email <span class="text-danger">*</span></label>
                            <input
                                type="email"
                                name="email"
                                id="AdresseEmail"
                                placeholder="dnpmecl@gmail.com"
                                v-model="step1.email"
                                :class="{ 'error-border': resultError['AdresseEmail'] }"
                                @input="resultError['AdresseEmail'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.email.$error">{{
                            v$.step1.email.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['AdresseEmail']">
                            {{ resultError["AdresseEmail"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="SiteWeb">Site Web </label>
                            <input
                                type="url"
                                name="url"
                                id="SiteWeb"
                                placeholder="https://exemple.com"
                                v-model="step1.url"
                                :class="{ 'error-border': resultError['SiteWeb'] }"
                                @input="resultError['SiteWeb'] = false"
                            />
                            </div>
                            <small v-if="v$.step1.url.$error">{{
                            v$.step1.url.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['SiteWeb']">
                            {{ resultError["SiteWeb"] }}
                            </small>
                        </div>
                        </div>
         
                     </div>

                  </div>
                  
               
              </BCardBody>
            </BCard>
                
                    <div class="btnForm py-3 d-flex items-center justify-content-end">
                    <button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStep">
                        Suivant
                    </button>
                    </div>
                </div>

                <!-- Étape 2 -->
                <div v-if="currentStep === 2">
                    <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
                        <p class="titre">INFORMATIONS SUR L'ACTIVITE</p>
                        <div class="row mb-3 mt-3 content-group">
                 <div class="col">
                <div class="input-groupe">
                  <label for="AnneeCreation"
                    >Année de Création <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    label="Sélectionner une année"
                    v-model="step2.an_creation"
                    no-radius  color="info"
                    :options="yearOptions"
                    :class="{ 'error-border': resultError['AnneeCreation'] }"
                    @input="resultError['AnneeCreation'] = false"
                    search
                  />
                
                </div>
                <small v-if="v$.step2.an_creation.$error">{{
                  v$.step2.an_creation.$errors[0].$message
                }}</small>
                <small v-if="resultError['AnneeCreation']">
                  {{ resultError["AnneeCreation"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="AnneeEntreeActivite"
                    >Année d'Entrée en Activité <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    v-model="step2.an_entre_acti"
                    label="Sélectionner une année"
                    no-radius  color="info"
                    :options="yearOptions"
                    :class="{ 'error-border': resultError['AnneeEntreeActivite'] }"
                    @input="resultError['AnneeEntreeActivite'] = false"
                    search
                  />
                
                </div>
                <small v-if="v$.step2.an_entre_acti.$error">{{
                  v$.step2.an_entre_acti.$errors[0].$message
                }}</small>
                <small v-if="resultError['AnneeEntreeActivite']">
                  {{ resultError["AnneeEntreeActivite"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="CodeStatutJuridique">Statut Juridique</label>
                  <MazSelect
                    v-model="step2.code_st_juriq"
                    label="Sélectionner votre statut juridique"
                    no-radius  color="info"
                    :options="StatutJuridiqueOptions"
                    :class="{ 'error-border': resultError['CodeStatutJuridique'] }"
                    @input="resultError['CodeStatutJuridique'] = false"
                   
                    search
                  />
                </div>
                <small v-if="v$.step2.code_st_juriq.$error">{{
                  v$.step2.code_st_juriq.$errors[0].$message
                }}</small>
                <small v-if="resultError['CodeStatutJuridique']">
                  {{ resultError["CodeStatutJuridique"] }}
                </small>
              </div>
            </div>
            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="AutreStatutJuridique">Autre Statut Juridique</label>
                  <MazSelect
                  label="Sélectionner votre statut juridique"
                    v-model="step2.autr_st_juriq"
                    no-radius  color="info"
                    :options="StatutJuridiqueOptions"
                    :class="{ 'error-border': resultError['AutreStatutJuridique'] }"
                    @input="resultError['AutreStatutJuridique'] = false"
                    search
                  />
                  <!-- <input type="text" name="AutreStatutJuridique" id="AutreStatutJuridique" placeholder=""
                                        v-model="step2.autr_st_juriq"> -->
                </div>
                <small v-if="v$.step2.autr_st_juriq.$error">{{
                  v$.step2.autr_st_juriq.$errors[0].$message
                }}</small>
                <small v-if="resultError['AutreStatutJuridique']">
                  {{ resultError["AutreStatutJuridique"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PrincipalSecteurActivite"
                    >Principal Secteur d'Activite <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner votre secteur activité"
                    v-model="step2.prin_sect_acti"
                    no-radius  color="info"
                    :options="SecteurActiviteOptions"
                    :class="{ 'error-border': resultError['PrincipalSecteurActivite'] }"
                    @input="resultError['PrincipalSecteurActivite'] = false"
                   
                    search
                  />
                </div>
                <small v-if="v$.step2.prin_sect_acti.$error">{{
                  v$.step2.prin_sect_acti.$errors[0].$message
                }}</small>
                <small v-if="resultError['PrincipalSecteurActivite']">
                  {{ resultError["PrincipalSecteurActivite"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="ListeSousSecteurActivite"
                    >Liste Sous Secteur Activite <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner vos sous secteurs activités"
                    v-model="step2.selectedSousSecteurs"
                    no-radius  color="info"
                    :options="SousSecteurActiviteOptions"
                    multiple
                    :class="{ 'error-border': resultError['ListeSousSecteurActivite'] }"
                    @input="resultError['ListeSousSecteurActivite'] = false"
                   
                    search
                  />
                  
                   
                
                <small v-if="v$.step2.selectedSousSecteurs.$error">{{
                  v$.step2.selectedSousSecteurs.$errors[0].$message
                }}</small>
                <small v-if="resultError['ListeSousSecteurActivite']">
                  {{ resultError["ListeSousSecteurActivite"] }}
                </small>
              </div>
            </div>
            <div class="row mb-3 mt-3 content-group">
              
              <div class="col">
                <div class="input-groupe">
                  <label for="PaysSiegeSocial"
                    >Pays du Siège Social <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner votre pays"
                    v-model="step2.PaysSiegeSocial"
                    :options="sortedCountryOptions"
                    v-slot="{ option }"
                    search
                    no-radius  color="info"
                    :class="{ 'error-border': resultError['PaysSiegeSocial'] }"
                    @input="resultError['PaysSiegeSocial'] = false"
                    option-value-key="value" option-label-key="label" option-input-value-key="value"
                   
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                    >
                      <MazAvatar size="0.8rem" :src="option.flag" />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step2.PaysSiegeSocial.$error">{{
                  v$.step2.PaysSiegeSocial.$errors[0].$message
                }}</small>
                <small v-if="resultError['PaysSiegeSocial']">
                  {{ resultError["PaysSiegeSocial"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="ListeSousSecteurActivite"
                    >Êtes-vous une unité distributrice ? <span class="text-danger">*</span></label
                  >
                  <MazSelect label="Sélectionner Oui ou Non"
                    v-model="step2.distributrice"
                    no-radius  color="info"
                    :options="choix"
                    
                    search
                  />
                  
                <small v-if="v$.step2.distributrice.$error">{{
                  v$.step2.distributrice.$errors[0].$message
                }}</small>
              </div>
            </div>
            <div class="col" v-if="step2.distributrice === 'Oui'">
                <div class="input-groupe">
                  <label for="ListeSousSecteurActivite"
                    >Choisissez vos unités importatrices  <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner vos unités importatrices"
                    v-model="step2.pmes"
                    no-radius  color="info"
                    :options="McipmeOptions"
                    multiple
                    :class="{ 'error-border': resultError['pmes'] }"
                    @input="resultError['pmes'] = false"
                   
                    search
                  />
                  
                   
                
                <small v-if="v$.step2.pmes.$error">{{
                  v$.step2.pmes.$errors[0].$message
                }}</small>
                <small v-if="resultError['pmes']">
                  {{ resultError["pmes"] }}
                </small>
              </div>
            </div>


            </div>
                     </div>
                     
                  </div>
                  <div class="content">
                        <p class="titre">INFORMATIONS D'IDENTIFICATION COMMERCIALE</p>
               
                        <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="NumeroNif">Numero Nif</label>
                  <input
                    type="text"
                    name="NumeroNif"
                    id="NumeroNif"
                    placeholder="1234567890L"
                    v-model="step2.nbre_nif"
                    :class="{ 'error-border': resultError['NumeroNif'] }"
                    @input="resultError['NumeroNif'] = false"
                  />
                </div>
              </div>
              <small v-if="v$.step2.nbre_nif.$error">{{
                v$.step2.nbre_nif.$errors[0].$message
              }}</small>
              <small v-if="resultError['NumeroNif']">
                {{ resultError["NumeroNif"] }}
              </small>
            
            
              <div class="col">
                <div class="input-groupe">
                  <label for="DateGenerationNif">Date Generation du Numero Nif </label>
                  <input
                    type="date"
                    name="DateGenerationNif"
                    id="DateGenerationNif"
                    placeholder=""
                    v-model="step2.DateGenerationNif"
                    :class="{ 'error-border': resultError['DateGenerationNif'] }"
                    @input="resultError['DateGenerationNif'] = false"
                  />
                </div>
              </div>
              <small v-if="v$.step2.DateGenerationNif.$error">{{
                v$.step2.DateGenerationNif.$errors[0].$message
              }}</small>
              <div class="col">
                <div class="input-groupe">
                  <label for="FichierNif">Fichier Nif</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                     @change="handleFileUploadNif"
                    name="FichierNif"
                    id="FichierNif"
                    placeholder=""
                   
                    :class="{ 'error-border': resultError['FichierNif'] }"
                    @input="resultError['FichierNif'] = false"
                  />
                </div>
              </div>
              <small v-if="v$.step2.FichierNif.$error">{{
                v$.step2.FichierNif.$errors[0].$message
              }}</small>
              <small v-if="resultError['FichierNif']">
                {{ resultError["FichierNif"] }}
              </small>

             
            </div>

            <div class="row mb-3 mt-3 content-group">
             <div class="col">
                <div class="input-groupe">
                  <label for="NumeroRccm">Numéro Rccm </label>
                  <input
                    type="text"
                    name="NumeroRccm"
                    id="NumeroRccm"
                    placeholder="09R09999999"
                    v-model="step2.nbre_rccm"
                    :class="{ 'error-border': resultError['NumeroRccm'] }"
                    @input="resultError['NumeroRccm'] = false"
                  />
                </div>
              </div>
                <small v-if="v$.step2.nbre_rccm.$error">{{
                v$.step2.nbre_rccm.$errors[0].$message
              }}</small>
              <small v-if="resultError['NumeroRccm']">
                {{ resultError["NumeroRccm"] }}
              </small>
              <div class="col">
                <div class="input-groupe">
                  <label for="FichierRccm">Fichier Rccm </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                     @change="handleFileUploadRccm"
                    name="FichierRccm"
                    id="FichierRccm"
                    placeholder=""
                   
                    :class="{ 'error-border': resultError['FichierRccm'] }"
                    @input="resultError['FichierRccm'] = false"
                  />
                </div>
              </div>
                <small v-if="v$.step2.FichierRccm.$error">{{
                v$.step2.FichierRccm.$errors[0].$message
              }}</small>
              <small v-if="resultError['FichierRccm']">
                {{ resultError["FichierRccm"] }}
              </small>
              <div class="col">
                <div class="input-groupe">
                  <label for="NumeroTva">Numero de la TVA</label>
                  <input
                    type="text"
                    name="NumeroTva"
                    id="NumeroTva"
                    placeholder="exemple"
                    v-model="step2.NumeroTva"
                    :class="{ 'error-border': resultError['NumeroTva'] }"
                    @input="resultError['NumeroTva'] = false"
                  />
                </div>
              </div>
              <small v-if="v$.step2.NumeroTva.$error">{{
                v$.step2.NumeroTva.$errors[0].$message
              }}</small>
              <small v-if="resultError['NumeroTva']">
                {{ resultError["NumeroTva"] }}
              </small>
             
            </div>
         
                     </div>
                </div>
               
              </BCardBody>
                      </BCard>
                
                    <div class="btnForm py-3 d-flex items-center justify-content-between">
                    <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                    <button class="btnLogin" @click.prevent="nextStep">Suivant</button>
                    </div>
                </div>
                <!-- Étape 3 -->
                <div v-if="currentStep === 3">
                    <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
                        <p class="titre">INFORMATIONS SUR LES PERSONNELS</p>
                        <div class="row mb-3 mt-3 content-group">
              
                          <div class="col">
                <div class="input-groupe">
                  <label for="PersonnelPermanentFemme">Personnel Permanent Femme </label>
                  <input
                    type="text"
                    name="PersonnelPermanentFemme"
                    id="PersonnelPermanentFemme"
                    placeholder="21"
                    v-model="step3.pers_per_femm"
                    :class="{ 'error-border': resultError['PersonnelPermanentFemme'] }"
                    @input="resultError['PersonnelPermanentFemme'] = false"
                    option-value-key="value" option-label-key="label" option-input-value-key="value"
                  />
                </div>
                <small v-if="v$.step3.pers_per_femm.$error">{{
                  v$.step3.pers_per_femm.$errors[0].$message
                }}</small>
                <small v-if="resultError['PersonnelPermanentFemme']">
                  {{ resultError["PersonnelPermanentFemme"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PersonnelPermanentHomme">Personnel Permanent Homme </label>
                  <input
                    type="text"
                    name="PersonnelPermanentHomme"
                    id="PersonnelPermanentHomme"
                    placeholder="11"
                    v-model="step3.pers_per_homm"
                    :class="{ 'error-border': resultError['PersonnelPermanentHomme'] }"
                    @input="resultError['PersonnelPermanentHomme'] = false"
                  />
                </div>
                <small v-if="v$.step3.pers_per_homm.$error">{{
                  v$.step3.pers_per_homm.$errors[0].$message
                }}</small>

                <small v-if="resultError['PersonnelPermanentHomme']">
                  {{ resultError["PersonnelPermanentHomme"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NbreEmploye"
                    >Nombre d'employés Guinéens<span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="NbreEmploye"
                    id="NbreEmploye"
                    placeholder="33"
                    v-model="step3.NbreEmploye"
                    :class="{ 'error-border': resultError['NbreEmploye'] }"
                    @input="resultError['NbreEmploye'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreEmploye.$error">{{
                  v$.step3.NbreEmploye.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreEmploye']">
                  {{ resultError["NbreEmploye"] }}
                </small>
              </div>
                         </div>
                        <div class="row mb-3 mt-3 content-group">
              

              <div class="col">
                <div class="input-groupe">
                  <label for="NbreEmployeGuinneF"
                    >Nombre d'employées féminines Guinéennes</label
                  >
                  <input
                    type="text"
                    name="NbreEmployeGuinneF"
                    id="NbreEmployeGuinneF"
                    placeholder="11"
                    v-model="step3.NbreEmployeGuinneF"
                    :class="{ 'error-border': resultError['NbreEmployeGuinneF'] }"
                    @input="resultError['NbreEmployeGuinneF'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreEmployeGuinneF.$error">{{
                  v$.step3.NbreEmployeGuinneF.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreEmployeGuinneF']">
                  {{ resultError["NbreEmployeGuinneF"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NbreEmployeGuinneH"
                    >Nombre d'employés masculins Guinéens</label
                  >
                  <input
                    type="text"
                    name="NbreEmployeGuinneH"
                    id="NbreEmployeGuinneH"
                    placeholder="55"
                    v-model="step3.NbreEmployeGuinneH"
                    :class="{ 'error-border': resultError['NbreEmployeGuinneH'] }"
                    @input="resultError['NbreEmployeGuinneH'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreEmployeGuinneH.$error">{{
                  v$.step3.NbreEmployeGuinneH.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreEmployeGuinneH']">
                  {{ resultError["NbreEmployeGuinneH"] }}
                </small>
              </div>
                        </div>

                        <div class="row mb-3 mt-3 content-group">
                        <div class="col">
                            <div class="input-groupe">
                            <label for="PersonnelTemporaireFemme"
                                >Personnel Temporaire Femme
                            </label>
                            <input
                                type="text"
                                name="PersonnelTemporaireFemme"
                                id="PersonnelTemporaireFemme"
                                placeholder="33"
                                v-model="step3.pers_temp_femm"
                                :class="{ 'error-border': resultError['PersonnelTemporaireFemme'] }"
                                @input="resultError['PersonnelTemporaireFemme'] = false"
                            />
                            </div>
                            <small v-if="v$.step3.pers_temp_femm.$error">{{
                            v$.step3.pers_temp_femm.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['PersonnelTemporaireFemme']">
                            {{ resultError["PersonnelTemporaireFemme"] }}
                            </small>
                        </div>
                        <div class="col">
                            <div class="input-groupe">
                            <label for="PersonnelTemporaireHomme"
                                >Personnel Temporaire Homme
                            </label>
                            <input
                                type="text"
                                name="PersonnelTemporaireHomme"
                                id="PersonnelTemporaireHomme"
                                placeholder="44"
                                v-model="step3.pers_temp_homm"
                                :class="{ 'error-border': resultError['PersonnelTemporaireHomme'] }"
                                @input="resultError['PersonnelTemporaireHomme'] = false"
                            />
                            </div>
                            <small v-if="v$.step3.pers_temp_homm.$error">{{
                            v$.step3.pers_temp_homm.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['PersonnelTemporaireHomme']">
                            {{ resultError["PersonnelTemporaireHomme"] }}
                            </small>
                        </div>
                        
                        </div>
                  </div>
                  <div class="content">
                        <p class="titre">INFORMATIONS SUR LES  ACTIONNAIRESE</p>
                        <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="NbreActionnaireGuinneF"
                    >Nombre d'actionnaires Guinéens Femmes</label
                  >
                  <input
                    type="text"
                    name="NbreActionnaireGuinneF"
                    id="NbreActionnaireGuinneF"
                    placeholder="11"
                    v-model="step3.NbreActionnaireGuinneF"
                    :class="{ 'error-border': resultError['NbreActionnaireGuinneF'] }"
                    @input="resultError['NbreActionnaireGuinneF'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreActionnaireGuinneF.$error">{{
                  v$.step3.NbreActionnaireGuinneF.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreActionnaireGuinneF']">
                  {{ resultError["NbreActionnaireGuinneF"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NbreActionnaireGuinneH"
                    >Nombre d'actionnaires Guinéens Hommes</label
                  >
                  <input
                    type="text"
                    name="NbreActionnaireGuinneH"
                    id="NbreActionnaireGuinneH"
                    placeholder="55"
                    v-model="step3.NbreActionnaireGuinneH"
                    :class="{ 'error-border': resultError['NbreActionnaireGuinneH'] }"
                    @input="resultError['NbreActionnaireGuinneH'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreActionnaireGuinneH.$error">{{
                  v$.step3.NbreActionnaireGuinneH.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreActionnaireGuinneH']">
                  {{ resultError["NbreActionnaireGuinneH"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NbreActionnaireGuinne"
                    >Nombre d'actionnaires Guinéens</label
                  >
                  <input
                    type="text"
                    name="NbreActionnaireGuinne"
                    id="NbreActionnaireGuinne"
                    placeholder="33"
                    v-model="step3.NbreActionnaireGuinne"
                    :class="{ 'error-border': resultError['NbreActionnaireGuinne'] }"
                    @input="resultError['NbreActionnaireGuinne'] = false"
                  />
                </div>
                <small v-if="v$.step3.NbreActionnaireGuinne.$error">{{
                  v$.step3.NbreActionnaireGuinne.$errors[0].$message
                }}</small>
                <small v-if="resultError['NbreActionnaire']">
                  {{ resultError["NbreActionnaire"] }}
                </small>
              </div>
            </div>
                     </div>
                </div>
               
              </BCardBody>
                    </BCard>
                
                <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                <button class="btnLogin" @click.prevent="nextStep">Suivant</button>
                </div>
                 </div>
            <!-- Étape 4 -->
            <div v-if="currentStep === 4">
                <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
                        <p class="titre">INFORMATIONS SUR LE DIRIGEANT</p>
              
                    <div class="row mb-3 mt-3 content-group">
              
              <div class="col">
                <div class="input-groupe">
                  <label for="TitreDirigeant"
                    >Titre Dirigeant <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Monsieur ou Madame"
                    v-model="step4.titreDirigeant"
                    no-radius  color="info"
                    :options="titre"
                    :class="{ 'error-border': resultError['TitreDirigeant'] }"
                    @input="resultError['TitreDirigeant'] = false"
                    search
                  />
                </div>
                <small v-if="v$.step4.titreDirigeant.$error">{{
                  v$.step4.titreDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['TitreDirigeant']">
                  {{ resultError["TitreDirigeant"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NomDirigeant"
                    >Nom Dirigeant <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="NomDirigeant"
                    id="NomDirigeant"
                    placeholder="Doe"
                    v-model="step4.nomDirigeant"
                    :class="{ 'error-border': resultError['NomDirigeant'] }"
                    @input="resultError['NomDirigeant'] = false"
                  />
                </div>
                <small v-if="v$.step4.nomDirigeant.$error">{{
                  v$.step4.nomDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['NomDirigeant']">
                  {{ resultError["NomDirigeant"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PrenomDirigeant"
                    >Prénom Dirigeant <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="PrenomDirigeant"
                    id="PrenomDirigeant"
                    placeholder="John"
                    v-model="step4.prenomDirigeant"
                    :class="{ 'error-border': resultError['PrenomDirigeant'] }"
                    @input="resultError['PrenomDirigeant'] = false"
                  />
                </div>
                <small v-if="v$.step4.prenomDirigeant.$error">{{
                  v$.step4.prenomDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['PrenomDirigeant']">
                  {{ resultError["PrenomDirigeant"] }}
                </small>
              </div>
            </div>

            <div class="row mb-3 mt-3 content-group">
             
              <div class="col">
                <div class="input-groupe">
                  <label for="SexeDirigeant"
                    >Sexe Dirigeant <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Masculin ou Feminin"
                    v-model="step4.sexeDirigeant"
                     no-radius  color="info"
                    :options="sexes"
                    :class="{ 'error-border': resultError['SexeDirigeant'] }"
                    @input="resultError['SexeDirigeant'] = false"
                    search
                  />
                </div>
                <small v-if="v$.step4.sexeDirigeant.$error">{{
                  v$.step4.sexeDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['SexeDirigeant']">
                  {{ resultError["SexeDirigeant"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PaysDirigeant"
                    >Pays Dirigeant <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner votre pays"
                    v-model="step4.paysDirigeant"
                    :options="sortedCountryOptions"
                    v-slot="{ option }"
                    search
                     no-radius  color="info"
                    option-value-key="value" option-label-key="label" option-input-value-key="value"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                    >
                      <MazAvatar
                        size="0.8rem"
                        :src="option.flag"
                        :class="{ 'error-border': resultError['PaysDirigeant'] }"
                        @input="resultError['PaysDirigeant'] = false"
                      />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step4.paysDirigeant.$error">{{
                  v$.step4.paysDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['PaysDirigeant']">
                  {{ resultError["PaysDirigeant"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="AnneeNaissanceDirigeant">Année Naissance Dirigeant </label>
                  <MazSelect
                  label="Sélectionner une année"
                    v-model="step4.anneeNaissanceDirigeant"
                     no-radius  color="info"
                    :options="yearOptions"
                    :class="{ 'error-border': resultError['AnneeNaissanceDirigeant'] }"
                    @input="resultError['AnneeNaissanceDirigeant'] = false"
                    search
                  />
                  <!-- <VueDatePicker v-model="step4.anneeNaissanceDirigeant" :year-picker="true"
                                        :year-range="[1940, new Date().getFullYear()]"></VueDatePicker> -->
                </div>
                <small v-if="v$.step4.anneeNaissanceDirigeant.$error">{{
                  v$.step4.anneeNaissanceDirigeant.$errors[0].$message
                }}</small>
                <small v-if="resultError['AnneeNaissanceDirigeant']">
                  {{ resultError["AnneeNaissanceDirigeant"] }}
                </small>
              </div>
            </div>

            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="DirigeantProprietaire"
                    >Dirigeant Proprietaire <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Oui ou Non"
                    v-model="step4.dirigeantProprietaire"
                     no-radius  color="info"
                    :options="choix"
                    :class="{ 'error-border': resultError['DirigeantProprietaire'] }"
                    @input="resultError['DirigeantProprietaire'] = false"   v-slot="{ option }"
                    search
                  >

                  <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleDirigeantProprietaireChange(option)"
                    >
                      {{ option.label }}
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step4.dirigeantProprietaire.$error">{{
                  v$.step4.dirigeantProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['DirigeantProprietaire']">
                  {{ resultError["DirigeantProprietaire"] }}
                </small>
              </div>
            </div>
                     
                  </div>
                  <div class="content">
                        <p class="titre">INFORMATIONS SUR LE PROPRIETERE</p>
                        <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="TitreProprietaire"
                    >Titre Proprietaire <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Monsieur ou Madamed"
                    v-model="step4.titreProprietaire"
                     no-radius  color="info"
                    :options="titre"
                    :class="{ 'error-border': resultError['TitreProprietaire'] }"
                    @input="resultError['TitreProprietaire'] = false"
                    search
                  />
                </div>
                <small v-if="v$.step4.titreProprietaire.$error">{{
                  v$.step4.titreProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['TitreProprietaire']">
                  {{ resultError["TitreProprietaire"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="NomProprietaire"
                    >Nom Proprietaire <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="NomProprietaire"
                    id="NomProprietaire"
                    placeholder="Doe"
                    v-model="step4.nomProprietaire"
                    :class="{ 'error-border': resultError['NomProprietaire'] }"
                    @input="resultError['NomProprietaire'] = false"
                  />
                </div>
                <small v-if="v$.step4.nomProprietaire.$error">{{
                  v$.step4.nomProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['NomProprietaire']">
                  {{ resultError["NomProprietaire"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PrenomProprietaire"
                    >Prénom Proprietaire <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name="PrenomProprietaire"
                    id="PrenomProprietaire"
                    placeholder="John"
                    v-model="step4.prenomProprietaire"
                    :class="{ 'error-border': resultError['PrenomProprietaire'] }"
                    @input="resultError['PrenomProprietaire'] = false"
                  />
                </div>
                <small v-if="v$.step4.prenomProprietaire.$error">{{
                  v$.step4.prenomProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['PrenomProprietaire']">
                  {{ resultError["PrenomProprietaire"] }}
                </small>
              </div>
            </div>

            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="SexeProprietaire"
                    >Sexe Proprietaire <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Masculin ou Féminin"
                    v-model="step4.sexeProprietaire"
                     no-radius  color="info"
                    :options="sexes"
                    :class="{ 'error-border': resultError['SexeProprietaire'] }"
                    @input="resultError['SexeProprietaire'] = false"
                    search
                  />
                </div>
                <small v-if="v$.step4.sexeProprietaire.$error">{{
                  v$.step4.sexeProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['SexeProprietaire']">
                  {{ resultError["SexeProprietaire"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="PaysProprietaire"
                    >Pays Proprietaire <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner votre pays"
                    v-model="step4.paysProprietaire"
                    :options="sortedCountryOptions"
                    v-slot="{ option }"
                    search
                     no-radius  color="info"
                    option-value-key="value" option-label-key="label" option-input-value-key="value"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                    >
                      <MazAvatar
                        size="0.8rem"
                        :src="option.flag"
                        :class="{ 'error-border': resultError['PaysProprietaire'] }"
                        @input="resultError['PaysProprietaire'] = false"
                      />
                      <strong>
                        {{ option.label }}
                      </strong>
                    </div>
                  </MazSelect>
                </div>
                <small v-if="v$.step4.paysProprietaire.$error">{{
                  v$.step4.paysProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['PaysProprietaire']">
                  {{ resultError["PaysProprietaire"] }}
                </small>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="AnneeNaissanceProprietaire"
                    >Année Naissance Proprietaire
                  </label>
                  <MazSelect
                  label="Sélectionner une année"
                    v-model="step4.anneeNaissanceProprietaire"
                     no-radius  color="info"
                    :options="yearOptions"
                    :class="{ 'error-border': resultError['AnneeNaissanceProprietaire'] }"
                    @input="resultError['AnneeNaissanceProprietaire'] = false"
                    search
                  />
                </div>
                <small v-if="v$.step4.anneeNaissanceProprietaire.$error">{{
                  v$.step4.anneeNaissanceProprietaire.$errors[0].$message
                }}</small>
                <small v-if="resultError['AnneeNaissanceProprietaire']">
                  {{ resultError["AnneeNaissanceProprietaire"] }}
                </small>
              </div>
            </div>
                </div>
                </div>
               
              </BCardBody>
                 </BCard>
                <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                <button class="btnLogin" @click.prevent="nextStep">Suivant</button>
                </div>
            </div>
            <!-- Étape 5 -->
            <div v-if="currentStep === 5">
                <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
            <p class="titre">INFORMATIONS SUR LE REPONDANT</p>
            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="TitreRepondant"
                    >Titre Repondant <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Oui ou Non"
                    v-model="step5.titreRepondant"
                     no-radius  color="info"
                    :options="titre"
                    :class="{ 'error-border': resultError['TitreRepondant'] }"
                    @input="resultError['TitreRepondant'] = false"
                    search
                  />
                  <small v-if="v$.step5.titreRepondant.$error">{{
                    v$.step5.titreRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['TitreRepondant']">
                    {{ resultError["TitreRepondant"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="NomRepondant"
                    >Nom Repondant <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="step5.nomRepondant"
                    type="text"
                    name="NomRepondant"
                    id="NomRepondant"
                    placeholder="Doe"
                    :class="{ 'error-border': resultError['NomRepondant'] }"
                    @input="resultError['NomRepondant'] = false"
                  />
                  <small v-if="v$.step5.nomRepondant.$error">{{
                    v$.step5.nomRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['NomRepondant']">
                    {{ resultError["NomRepondant"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="FonctionRepondant"
                    >Fonction Repondant <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="step5.fonctionRepondant"
                    type="text"
                    name="FonctionRepondant"
                    id="FonctionRepondant"
                    placeholder="Chef de service"
                    :class="{ 'error-border': resultError['FonctionRepondant'] }"
                    @input="resultError['FonctionRepondant'] = false"
                  />
                  <small v-if="v$.step5.fonctionRepondant.$error">{{
                    v$.step5.fonctionRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['FonctionRepondant']">
                    {{ resultError["FonctionRepondant"] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="AdresseRepondant"
                    >Adresse du Repondant<span class="text-danger">*</span></label
                  >
                  <input
                    v-model="step5.adresseRepondant"
                    type="text"
                    name="AdresseRepondant"
                    id="AdresseRepondant"
                    placeholder="12 conakry"
                    :class="{ 'error-border': resultError['AdresseRepondant'] }"
                    @input="resultError['AdresseRepondant'] = false"
                  />
                  <small v-if="v$.step5.adresseRepondant.$error">{{
                    v$.step5.adresseRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['AdresseRepondant']">
                    {{ resultError["AdresseRepondant"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="VilleRepondant"
                    >Ville du Repondant <span class="text-danger">*</span></label
                  >
                  <input
                    v-model="step5.villeRepondant"
                    type="text"
                    name="VilleRepondant"
                    id="VilleRepondant"
                    placeholder="conakry"
                    :class="{ 'error-border': resultError['VilleRepondant'] }"
                    @input="resultError['VilleRepondant'] = false"
                  />
                  <small v-if="v$.step5.villeRepondant.$error">{{
                    v$.step5.villeRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['VilleRepondant']">
                    {{ resultError["VilleRepondant"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="TelephoneWhatsAppRepondant"
                    >Téléphone WhatsApp du Repondant
                    <span class="text-danger">*</span></label
                  >
                  <MazPhoneNumberInput
                    v-model="step5.telephoneWhatsAppRepondant"
                    show-code-on-list
                     no-radius  color="info"
                    :ignored-countries="['AC']"
                    @update="results = $event"
                    :success="results?.isValid"
                    :class="{ 'error-border': resultError['TelephoneWhatsAppRepondant'] }"
                    @input="resultError['TelephoneWhatsAppRepondant'] = false"
                  />

                  <small v-if="v$.step5.telephoneWhatsAppRepondant.$error">{{
                    v$.step5.telephoneWhatsAppRepondant.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['TelephoneWhatsAppRepondant']">
                    {{ resultError["TelephoneWhatsAppRepondant"] }}
                  </small>
                </div>
              </div>
            </div>

            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="Contacter"
                    >Contacter<span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Oui ou Non"
                    v-model="step5.contacter"
                     no-radius  color="info"
                    :options="choix"
                    :class="{ 'error-border': resultError['Contacter'] }"
                    @input="resultError['Contacter'] = false"
                    search
                  />
                  <small v-if="v$.step5.contacter.$error">{{
                    v$.step5.contacter.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['Contacter']">
                    {{ resultError["Contacter"] }}
                  </small>
                </div>
              </div>
            </div>
                   </div>

                   <div class="content">
            <p class="titre">INFORMATIONS AUTRES</p>
            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="ExistanceActionnaire"
                    >Existance Actionnaire <span class="text-danger">*</span></label
                  >
                  <MazSelect
                    label="Sélectionner Oui ou Non"
                    v-model="step5.existanceActionnaire"
                    no-radius  color="info"
                    :options="choix"
                    :class="{ 'error-border': resultError['ExistanceActionnaire'] }"
                    @input="resultError['ExistanceActionnaire'] = false"
                    search
                  />
                  <small v-if="v$.step5.existanceActionnaire.$error">{{
                    v$.step5.existanceActionnaire.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['ExistanceActionnaire']">
                    {{ resultError["ExistanceActionnaire"] }}
                  </small>
                </div>
              </div>
              <div class="col">
                <div class="input-groupe">
                  <label for="ExistanceConseilAdministration"
                    >Existance Conseil Administration
                    <span class="text-danger">*</span></label
                  >
                  <MazSelect
                  label="Sélectionner Oui ou Non"
                    v-model="step5.existanceConseilAdministration"
                    no-radius  color="info"
                    :options="choix"
                    :class="{
                      'error-border': resultError['ExistanceConseilAdministration'],
                    }"
                    @input="resultError['ExistanceConseilAdministration'] = false"
                    search
                  />
                  <small v-if="v$.step5.existanceConseilAdministration.$error">{{
                    v$.step5.existanceConseilAdministration.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['ExistanceConseilAdministration']">
                    {{ resultError["ExistanceConseilAdministration"] }}
                  </small>
                </div>
              </div>
              
            </div>
                   </div>

                </div>
               
              </BCardBody>
                 </BCard>
                
                <div class="btnForm py-3 d-flex items-center justify-content-between">
                <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                <button class="btnLogin" @click.prevent="nextStep">Suivant</button>
                </div>
            </div>

                <!-- Étape 6 -->
                <div v-if="currentStep === 6">
                    <BCard no-body class="overflow-hidden" style=" box-shadow:none !important; border: 1px solid #c9d1d9 !important; border-radius:0 !important">
                    <BCardBody class="pt-0">
                
                  <div class="form-container">
                    <div class="content">
            <p class="titre">INFORMATIONS GEOGRAPHIQUES</p>
            <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="LienGoogleMapMpme">Lien Google Map Mpme</label>
                  <input
                    v-model="step6.lienGoogleMapMpme"
                    type="text"
                    name="LienGoogleMapMpme"
                    id="LienGoogleMapMpme"
                    placeholder="https://www.google.com/maps/place/ROUEN+39 RUE DE AZERTY"
                    :class="{ 'error-border': resultError['LienGoogleMapMpme'] }"
                    @input="resultError['LienGoogleMapMpme'] = false"
                  />
                  <small v-if="v$.step6.lienGoogleMapMpme.$error">{{
                    v$.step6.lienGoogleMapMpme.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['LienGoogleMapMpme']">
                    {{ resultError["LienGoogleMapMpme"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="LatitudeMpme">Latitude Mpme</label>
                  <input
                    v-model="step6.latitudeMpme"
                    type="text"
                    name="LatitudeMpme"
                    id="LatitudeMpme"
                    placeholder="11.3333"
                    :class="{ 'error-border': resultError['LatitudeMpme'] }"
                    @input="resultError['LatitudeMpme'] = false"
                  />
                  <small v-if="v$.step6.latitudeMpme.$error">{{
                    v$.step6.latitudeMpme.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['LatitudeMpme']">
                    {{ resultError["LatitudeMpme"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="LongitudeMpme">Longitude Mpme</label>
                  <input
                    v-model="step6.longitudeMpme"
                    type="text"
                    name="LongitudeMpme"
                    id="LongitudeMpme"
                    placeholder="-12.333"
                    :class="{ 'error-border': resultError['LongitudeMpme'] }"
                    @input="resultError['LongitudeMpme'] = false"
                  />
                  <small v-if="v$.step6.longitudeMpme.$error">{{
                    v$.step6.longitudeMpme.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['LongitudeMpme']">
                    {{ resultError["LongitudeMpme"] }}
                  </small>
                </div>
              </div>
            </div>

            <!-- <div class="row mb-3 mt-3 content-group">
              <div class="col">
                <div class="input-groupe">
                  <label for="AltitudeMpme">Altitude Mpme </label>
                  <input
                    v-model="step6.altitudeMpme"
                    type="text"
                    name="AltitudeMpme"
                    id="AltitudeMpme"
                    placeholder=""
                    :class="{ 'error-border': resultError['AltitudeMpme'] }"
                    @input="resultError['AltitudeMpme'] = false"
                  />
                  <small v-if="v$.step6.altitudeMpme.$error">{{
                    v$.step6.altitudeMpme.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['AltitudeMpme']">
                    {{ resultError["AltitudeMpme"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="PrecisionGPSMpme">Precision GPS Mpme</label>
                  <input
                    v-model="step6.precisionGPSMpme"
                    type="text"
                    name="PrecisionGPSMpme"
                    id="PrecisionGPSMpme"
                    placeholder=""
                    :class="{ 'error-border': resultError['PrecisionGPSMpme'] }"
                    @input="resultError['PrecisionGPSMpme'] = false"
                  />
                  <small v-if="v$.step6.precisionGPSMpme.$error">{{
                    v$.step6.precisionGPSMpme.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['PrecisionGPSMpme']">
                    {{ resultError["PrecisionGPSMpme"] }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="input-groupe">
                  <label for="OrigineDonnees">Origine Donnees</label>
                  <input
                    v-model="step6.origineDonnees"
                    type="text"
                    name="OrigineDonnees"
                    id="OrigineDonnees"
                    placeholder=""
                    :class="{ 'error-border': resultError['OrigineDonnees'] }"
                    @input="resultError['OrigineDonnees'] = false"
                  />
                  <small v-if="v$.step6.origineDonnees.$error">{{
                    v$.step6.origineDonnees.$errors[0].$message
                  }}</small>
                  <small v-if="resultError['OrigineDonnees']">
                    {{ resultError["OrigineDonnees"] }}
                  </small>
                </div>
              </div>
            </div> -->

          </div>

                </div>
               
              </BCardBody>
                 </BCard>

                    <div class="btnForm py-3 d-flex items-center justify-content-between">
                    <button class="btnLogin" @click.prevent="prevStep">Précédent</button>
                    <button class="btnLogin" @click.prevent="nextStep">Terminer</button>
                    </div>
                </div>
            

                
                
                </form>
              </div>
</BCardBody>
        
         
       </BCard>
     </BCol>
   </BRow>


  
   

 </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import Loading from '@/components/others/loading.vue';
import axios from "@/lib/axiosConfig.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidNumeri } from "@/functions/rules";
import {successmsg} from "@/lib/modal.js"


export default {
   components: {
   Layout,
   PageHeader,
   Loading ,
   
 },
 computed:{
   loggedInUser() {
     return this.$store.getters['auth/myAuthenticatedUser'];
   },
   stepperProgress() {
      return (100 / 5) * (this.currentStep - 1) + "%";
    },
    isPrefectureDisabled() {
      return !this.step1.region;
    },
    isCommuneDisabled() {
      return !this.step1.prefecture;
    }, 
    isQuartierDisabled() {
      return !this.step1.commune;
    },
   
 },
 data() {
   return { 
    
       loading:false,
       currentStep: 1,
       error: "",
      resultError: {},
      isButtonDisabled: false,
      isOpen: false,
      option:'',
      sortedCountryOptions: [],
      regionOptions: [],
      prefectureOptions: [],
      prefectureOptions1: [],
      sous_prefectureOptions: [],
      SecteurActiviteOptions: [],
      StatutJuridiqueOptions: [],
      McipmeOptions:[],
      QuartierOptions: [],
     
    //   ChiffreOptions: chiffre,
 // Pour stocker les sous-secteurs sélectionnés
      SousSecteurActiviteOptions: [],
      years: [],
      yearOptions: [],
      code: "",
      localite: "",
      localites: [],
      userData: "",
      sexes: [
        { label: "Masculin", value: "M" },
        { label: "Féminin", value: "F" },
      ],
      choix: [
        { label: "Oui", value: "Oui" },
        { label: "Non", value: "Non" },
      ],
      chois: [
        { label: "Oui", value: 1 },
        { label: "Non", value: 0 },
      ],
      titre: [
        { label: "Monsieur", value: "M" },
        { label: "Madame", value: "F" },
      ],
      v$: useVuelidate(),

      step1: {
        region: "",
        commune: "",
        ville: "",
        prefecture:"",
        sous_prefecture: "",
        localisation: "",
        sigle_mpme: "",
        nom: "",
        quartier: "",
        rue: "",
        boite_postale: "",
        tel_what: "",
        tel_second: "",
        email: "",
        url: "",     
      },
      // etapes 2
      step2:{
        an_creation: "",
        an_entre_acti: "",
        code_st_juriq: "",
        autr_st_juriq: "",
        prin_sect_acti: "",
        selectedSousSecteurs: [],
        an_prod_1: "", 
        PaysSiegeSocial: "Guinea",
        distributrice:"",
        pmes:"",

        nbre_rccm: "",
        FichierRccm:"",
        nbre_nif: "",
        FichierNif:"",
        DateGenerationNif: "",
        NumeroTva: "",

      },
        // etapes 3
        step3:{
        NbreEmployeGuinneF:'',
        NbreEmployeGuinneH:'',
        NbreEmploye:'',

        pers_per_femm: 0,
        pers_per_homm: 0,
        pers_temp_femm: 0,
        pers_temp_homm: 0,
       

        NbreActionnaireGuinneF: 0,
        NbreActionnaireGuinneH: 0,
        NbreActionnaireGuinne: 0,
        },
        // etapes 4
        step4:{
        titreDirigeant: "",
        nomDirigeant: "",
        prenomDirigeant: "",
        sexeDirigeant: "",
        paysDirigeant: "Guinea",
        anneeNaissanceDirigeant: "",
        dirigeantProprietaire: "",

        titreProprietaire: "",
        nomProprietaire: "",
        prenomProprietaire: "",
        sexeProprietaire: "",
        paysProprietaire: "Guinea",
        anneeNaissanceProprietaire: "",
        },
        // step5
        step5:{
        titreRepondant: "",
        nomRepondant: "",
        fonctionRepondant: "",
        adresseRepondant: "",
        villeRepondant: "",
        telephoneWhatsAppRepondant: "",
        contacter: "",
        existanceActionnaire: "",
        existanceConseilAdministration: "",
    },

     // step6
     step6:{
        lienGoogleMapMpme: "",
        latitudeMpme: "",
        longitudeMpme: "",
        altitudeMpme: "",
        precisionGPSMpme: "",
        origineDonnees: "",
    },
     
   }
 },
 validations: {
    step1: {
      region: { require },
      commune: { require },
      // ville: { require },
      prefecture: { require },
      // sous_prefecture: { require },
      localisation: {},
      sigle_mpme: { },
      nom: { require },
      quartier: { require },
      rue: {},
      boite_postale: { ValidNumeri },
      tel_what: { require },
      tel_second: {},
      email: { require },
      url: {},
    },
    step2:{

        an_creation: { require },
      an_entre_acti: { require },
      code_st_juriq: {},
      autr_st_juriq: {},
      prin_sect_acti: { require },
      selectedSousSecteurs: { require },
      PaysSiegeSocial: { require },
      distributrice: { require },
      pmes: {},
      nbre_rccm: {},
      FichierRccm:{},
      nbre_nif: {},
      FichierNif:{},
      DateGenerationNif: {},
      NumeroTva: {},
    },
    step3:{
        NbreEmployeGuinneF:{ ValidNumeri },
        NbreEmployeGuinneH:{ ValidNumeri },
        NbreEmploye:{require, ValidNumeri },

        pers_per_femm: { ValidNumeri },
      pers_per_homm: { ValidNumeri },
      pers_temp_femm: { ValidNumeri },
      pers_temp_homm: { ValidNumeri },

     
      NbreActionnaireGuinneF: { ValidNumeri },
      NbreActionnaireGuinneH: { ValidNumeri },
      NbreActionnaireGuinne: { ValidNumeri },

    },
    step4:{

     titreDirigeant: { require },
      nomDirigeant: { require },
      prenomDirigeant: { require },
      sexeDirigeant: { require },
      paysDirigeant: { require },
      anneeNaissanceDirigeant: {},
      dirigeantProprietaire: { require },

      titreProprietaire: { require },
      nomProprietaire: { require },
      prenomProprietaire: { require },
      sexeProprietaire: { require },
      paysProprietaire: { require },
      anneeNaissanceProprietaire: {},
    },
    step5:{
      
        titreRepondant: { require },
      nomRepondant: { require },
      fonctionRepondant: { require },
      adresseRepondant: { require },
      villeRepondant: { require },
      telephoneWhatsAppRepondant: { require },
      contacter: { require },
      existanceActionnaire: { require },
      existanceConseilAdministration: { require },
    },
     // step6
     step6:{
        lienGoogleMapMpme: {},
      latitudeMpme: {},
      longitudeMpme: {},
      // altitudeMpme: {},
      // precisionGPSMpme: {},
      // origineDonnees: {},
    },

   
  
  },


async mounted() {

   console.log("uusers",this.loggedInUser);
   const localStorageUserData = localStorage.getItem('tempMpmeData') || null;
   if(localStorageUserData !== null){
    const userDataString = JSON.parse(localStorageUserData)
   this.userData = userDataString
            this.storeUserDataLocal(userDataString);
           console.log("UserData:",userDataString );
   }
   
   try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
      console.log("data", this.loggedInUser);
      await Promise.all([
        this.fetchMpmeData(),
        this.fetchCountryOptions(),
        this.fetchRegionOptions(),
        this.fetchPrefectureOptions(),
        this.fetchSousPrefectureOptions(),
        this.fetchQuartierOptions(),
        this.fetchSecteurActiviteOptions(),
        this.fetchSousSecteurActiviteOptions(),
        this.fetchStatutJuridiqueOptions(),
        this.initializeYears(),
       
      ]);
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  
 },

  methods: {
    createMpmeData() {
      return {
        Region: this.step1.region,
        Commune: this.step1.commune,
        Sousprefecture: this.step1.sous_prefecture,
        Ville: this.step1.ville,
        Localisation: this.step1.localisation,
        SigleMpme: this.step1.sigle_mpme,
        NomMpme: this.step1.nom,
        Quartier: this.step1.quartier,
        Rue: this.step1.rue,
        BoitePostale: this.step1.boite_postale,
        NumeroWhatsApp: this.step1.tel_what,
        NumeroTelephoneSecondaire: this.step1.tel_second,
        AdresseEmail: this.step1.email,
        SiteWeb: this.step1.url,

        // step2
        AnneeCreation:this.step2.an_creation ,
        AnneeEntreeActivite: this.step2.an_entre_acti ,
        CodeStatutJuridique: this.step2.code_st_juriq,
        AutreStatutJuridique: this.step2.autr_st_juriq,
        PrincipalSecteurActivite: this.step2.prin_sect_acti,
        ListeSousSecteurActivite: JSON.parse(JSON.stringify(this.step2.selectedSousSecteurs)),
        AnneeProduction1: this.step2.an_prod_1,
        PaysSiegeSocial: this.step2.PaysSiegeSocial,
        pmes:this.step2.pmes,
        NumeroRccm: this.step2.nbre_rccm,
        FichierRccm: this.step2.FichierRccm,
        NumeroNif: this.step2.nbre_nif,
        FichierNif: this.step2.FichierNif,
        DateGenerationNif: this.step2.DateGenerationNif,
        NumeroTva: this.step2.NumeroTva,

        // step3
        NbreEmployeGuinneF: parseInt(this.step3.NbreEmployeGuinneF) ,
        NbreEmployeGuinneH: parseInt(this.step3.NbreEmployeGuinneH) ,
        NbreEmploye:  parseInt(this.step3.NbreEmploye) ,
        PersonnelPermanentFemme: this.step3.pers_per_femm || 0,
        PersonnelPermanentHomme: this.step3.pers_per_homm || 0,
        PersonnelTemporaireFemme: this.step3.pers_temp_femm || 0,
        PersonnelTemporaireHomme: this.step3.pers_temp_homm || 0,
        NbreActionnaireGuinneF: this.step3.NbreActionnaireGuinneF || 0,
        NbreActionnaireGuinneH: this.step3.NbreActionnaireGuinneH || 0,
        NbreActionnaire: this.step3.NbreActionnaireGuinne || 0,
       
            // step4
    
        TitreDirigeant: this.step4.titreDirigeant,
        NomDirigeant: this.step4.nomDirigeant,
        PrenomDirigeant: this.step4.prenomDirigeant,
        SexeDirigeant: this.step4.sexeDirigeant,
        PaysDirigeant: this.step4.paysDirigeant,
        AnneeNaissanceDirigeant: parseInt(this.step4.anneeNaissanceDirigeant).toString(),
        DirigeantProprietaire: this.step4.dirigeantProprietaire,
        TitreProprietaire: this.step4.titreProprietaire,
        NomProprietaire: this.step4.nomProprietaire,
        PrenomProprietaire: this.step4.prenomProprietaire,
        SexeProprietaire: this.step4.sexeProprietaire,
        PaysProprietaire: this.step4.paysProprietaire,
        AnneeNaissanceProprietaire: this.step4.anneeNaissanceProprietaire,
       
        // step5
        TitreRepondant: this.step5.titreRepondant,
        NomRepondant: this.step5.nomRepondant,
        FonctionRepondant: this.step5.fonctionRepondant,
        AdresseRepondant: this.step5.adresseRepondant,
        VilleRepondant: this.step5.villeRepondant,
        TelephoneWhatsAppRepondant: this.step5.telephoneWhatsAppRepondant,
        Contacter: this.step5.contacter,
        ExistanceActionnaire: this.step5.existanceActionnaire,
        ExistanceConseilAdministration: this.step5.existanceConseilAdministration,
       
        // step6
        LienGoogleMapMpme: this.step6.lienGoogleMapMpme,
        LatitudeMpme: this.step6.latitudeMpme,
        LongitudeMpme: this.step6.longitudeMpme,
        AltitudeMpme: this.step6.altitudeMpme,
        PrecisionGPSMpme: this.step6.precisionGPSMpme,
        OrigineDonnees: this.step6.origineDonnees,

        Direction:this.loggedInUser.direction
      };
    },
    async nextStep() {
    //   this.loading = true;
      if (this.currentStep === 1) {
        this.error = "";
        this.v$.step1.$touch();
        if (this.v$.$errors.length == 0) {
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          this.currentStep++;
          window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
         
            
      } else if (this.currentStep === 2) {
        this.error = "";
        this.v$.step2.$touch();
        if (this.v$.$errors.length == 0) {
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          this.currentStep++;
          window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
       
      } else if (this.currentStep === 3) {
        this.error = "";
        this.v$.step3.$touch();
        if (this.v$.$errors.length == 0) {
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          this.currentStep++;
          window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
           
      }else if (this.currentStep === 4) {
        this.error = "";
        this.v$.step4.$touch();
        if (this.v$.$errors.length == 0) {
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          this.currentStep++;
          window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
          
     }else if (this.currentStep === 5) {
      this.error = "";
        this.v$.step5.$touch();
        if (this.v$.$errors.length == 0) {
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          this.currentStep++;
          window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
          
     }else if (this.currentStep === 6) {
         this.error = "";
        this.v$.step6.$touch();
        if (this.v$.$errors.length == 0) {
          this.loading = true
          const mpmeData = this.createMpmeData();
          console.log("mpmeData1", mpmeData);
          localStorage.setItem('tempMpmeData', JSON.stringify(mpmeData));
          const success = await this.enregistrerMpmeDonnees(mpmeData);
          console.log("success", success);
          if (success) {
            this.isOpen = true;
            this.loading = false;
          } else {
            console.error("Erreur lors de l'enregistrement des données pour le MPME");
            window.scrollTo({ top: 0, behavior: "smooth" });
            this.loading = false;
          }
          
        } else {
          console.log("errroor1", this.v$.$errors);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
         
        }
          
     }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    successmsg:successmsg,

    // appeel apî
    async enregistrerMpmeDonnees(mpmeData) {
      try {
       
        const response = await axios.post('/mcipme', mpmeData, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
             
          },
        });

        console.log("response", response);
        if (response.status === 200) {
          console.log("Données MPME mises à jour avec succès !");
          localStorage.removeItem('tempMpmeData')
  setTimeout(()=>{
    this.successmsg("Création d'une Entreprise","L'entreprise a été créée avec succès ! Le propriétaire va recevoir un email contenant ces informations pour se connecter à son portail.")
  }, 5000);
          router.go(-1)
          return true;
        } else {
          console.error("Erreur lors de la mise à ", response.data);
          this.error = response.data.message;
          return false;
        }
      } catch (error) {
        console.log("Erreur lors de la mise à jour des données MPME guinee :", error);
        if (
          (error && error.response.data === "Unauthorized") ||
          error.response.data.status === "error"
        ) {
          console.log("aut", error.response.data.status === "error");
          
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
      }
    },

    initializeYears() {
      const currentYear = new Date().getFullYear();
      for (let year = 1800; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.yearOptions = this.years.map((year) => ({
        label: String(year),
        value: String(year),
      }));
    },

    async fetchMpmeData() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchMpmeData", this.loggedInUser);
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getMpmeData"])
        ); // Accéder aux options des pays via le getter
        console.log("Options des pays:", options);
        this.McipmeOptions = options.map((country) => ({
        label:country.NomMpme,
        value: country.CodeMpme,
      }));;
       // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async fetchCountryOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchCountries");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getCountryOptions"])
        ); // Accéder aux options des pays via le getter
        console.log("Options des pays:", options);
        this.sortedCountryOptions = options; // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions"])
        ); // Accéder aux options des pays via le getter
        this.regionOptions = options; // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async fetchPrefectureOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchPrefectureOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getprefectureOptions"])
        ); // Accéder aux options des pays via le getter
         this.prefectureOptions = options
        // Affecter les options à votre propriété sortedCountryOptions

      
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des prefecture :",
          error.message
        );
      }
    },

    async fetchSousPrefectureOptions() {
  try {
    await this.$store.dispatch("fetchSous_PrefectureOptions");
    const options = JSON.parse(JSON.stringify(this.$store.getters["getSousprefectureOptions"]));
    this.sous_prefectureOptions = options.map((country) => ({
        label:country. NomSousPrefecture,
        value: country.CodeSousPrefecture,
      }));
     console.log('Sous-préfecture :', options);
    const sousPrefectureValue = this.userData.Commune;
    const selectedSousPrefecture = options.find(option => option. CodeSousPrefecture === sousPrefectureValue);
    console.log('Sous-préfecture111 :', sousPrefectureValue);
    console.log('Sous-préfecture2222 :', selectedSousPrefecture);
    console.log('Sous-préfecture2222 :', this.prefectureOptions);

    
    if (selectedSousPrefecture) {
      const selectedPrefecture = this.prefectureOptions.find(option => option.CodePrefecture === selectedSousPrefecture.CodePrefecture);
      if (selectedPrefecture) {
        
        console.log('Préfecture sélectionnée :',selectedPrefecture);
        console.log('Code de la préfecture :', selectedPrefecture.CodePrefecture);
        this.prefectureOptions1.push(selectedPrefecture);
        this.step1.prefecture = selectedPrefecture.CodePrefecture
        this.prefectureOptions1 =  this.prefectureOptions1.map((country) => ({
        label:country. NomPrefecture,
        value: country.CodePrefecture,
      }));;
         console.log('Code de la préfecture :', this.prefectureOptions1 );
        
      } else {
        console.log('Préfecture non trouvée pour la valeur de la sous-préfecture :', sousPrefectureValue);
      }
    } else {
      console.log('Sous-préfecture non trouvée pour la valeur :', sousPrefectureValue);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des options des sous-préfectures :",
      error.message
    );
  }
},

    async fetchQuartierOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchQuartierOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getQuartierOptions"])
       
        ); // Accéder aux options des pays via le getter
     console.log('Sous-préfecture :', options);

        this.QuartierOptions = options.map((country) => ({
        label:country. NomQuartier,
        value: country.CodeQuartier,
      }));; // Affecter les options à votre propriété sortedCountryOptions
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des prefecture :",
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
    async fetchSousSecteurActiviteOptions() {
      try {
        await this.$store.dispatch("fetchSousSecteurOptions"); // Remplacez par l'action de votre store
        this.SousSecteurActiviteOptions = this.$store.getters[
          "getSousSecteurOptions"
        ].map((option) => {
          return {
            label: option.label,
            value: option.value,
          };
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des secteurs d'activité:",
          error.message
        );
      }
    },
    async fetchStatutJuridiqueOptions() {
      try {
        await this.$store.dispatch("fetchStatutJuridiqueOptions"); // Action spécifique aux statuts juridiques
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getStatutJuridiqueOptions"])
        );
        console.log('Code de la préfecture :', options);

        this.StatutJuridiqueOptions = options.map(statutJuridique => ({
        label: statutJuridique.NomStatutJuridique,
        value: statutJuridique.CodeStatutJuridique,
      }));;
        console.log('Code de la préfecture :', this.StatutJuridiqueOptions );

      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des statuts juridiques:",
          error.message
        );
      }
    },
   
    async fetchLocalite(code, localite) {
      try {
        const response = await axios.get("/localites/children-by-code", {
          params: { code: code, type_localite: localite },
        });
        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des options des response :", error);
      }
    },

    async handleOptionClick(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "REGION");
        console.log("Données de localité :", localiteData.prefectures);
        const options = localiteData.prefectures.map((prefecture) => ({
          label: prefecture.NomPrefecture,
          value: prefecture.CodePrefecture,
          code: prefecture.CodeRegion,
        }));
        console.log("Données de localitézzz :",options );

        this.prefectureOptions1 = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },

    async handleOptionPrefecture(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "PREFECTURE");
        const userId = this.loggedInUser.id;
        option.identifiant = userId
        this.option = option
        console.log('prefecture',this.option);
        console.log("Données de localité :", localiteData.sous_prefectures);
        const options = localiteData.sous_prefectures.map((sous_prefecture) => ({
          label: sous_prefecture.NomSousPrefecture,
          value: sous_prefecture.CodeSousPrefecture,
          code: sous_prefecture.CodePrefecture,
        }));
         this.sous_prefectureOptions = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },

    async handleOptionCommune(option) {
      this.loading = true;

      try {
        const localiteData = await this.fetchLocalite(option.value, "COMMUNE");
        console.log("Données de localité :", localiteData.quartiers);
        const options = localiteData.quartiers.map((quartier) => ({
          label: quartier.NomQuartier,
          value: quartier.CodeQuartier,
          code: quartier.CodeSousPrefecture,
        }));
         this.QuartierOptions = options;
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la récupération des données de localité :", error);
      }
    },
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
        console.log(" errorMessages", errorMessages, typeof errorMessages);

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        console.log(" concatenatedError", concatenatedError, typeof concatenatedError);

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
      console.log("resultError", this.resultError);
    },
    handleDirigeantProprietaireChange(option) {
      console.log("Données de localité :", option);
      if (option.value === 'Oui') {
        // Copiez les données du dirigeant dans les données du propriétaire
        this.step4.titreProprietaire = this.step4.titreDirigeant;
        this.step4.nomProprietaire = this.step4.nomDirigeant;
        this.step4.prenomProprietaire = this.step4.prenomDirigeant;
        this.step4.sexeProprietaire = this.step4.sexeDirigeant;
        this.step4.paysProprietaire = this.step4.paysDirigeant;
        this.step4.anneeNaissanceProprietaire = this.step4.anneeNaissanceDirigeant;
      }
    },

    handleFileUploadRccm(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("handleFileUploadRccm Selected file:", file);
      this.step2.FichierRccm = file
    },
     handleFileUploadNif(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("handleFileUploadNif Selected file:", file);
      this.step2.FichierNif = file
    },

    storeUserDataLocal(userData) {

      this.step1.region = userData.Region;
      this.step1.commune = userData.Commune;
      this.step1.ville = userData.Ville;
      this.step1.sous_prefecture = userData.Sousprefecture;
      this.step1.localisation = userData.Localisation;
      this.step1.sigle_mpme = userData.SigleMpme;
      this.step1.nom = userData.NomMpme;
      this.step1.quartier = userData.Quartier;
      this.step1.rue = userData.Rue;
      this.step1.boite_postale = userData.BoitePostale;
      this.step1.tel_what = userData.NumeroWhatsApp;
      this.step1.tel_second = userData.NumeroTelephoneSecondaire;
      this.step1.email = userData.AdresseEmail;
      this.step1.url = userData.SiteWeb;

      this.step2.an_creation = userData.AnneeCreation;
      this.step2.an_entre_acti = userData.AnneeEntreeActivite;
      this.step2.code_st_juriq = parseInt(userData.CodeStatutJuridique);
      this.step2.autr_st_juriq = parseInt(userData.AutreStatutJuridique);
      this.step2.prin_sect_acti = userData.PrincipalSecteurActivite;
      this.step2.selectedSousSecteurs = userData.ListeSousSecteurActivite;
      this.step2.an_prod_1 = userData.AnneeProduction1;
      this.step2.PaysSiegeSocial = userData.PaysSiegeSocial;
      this.step2.pmes = userData.pmes;
      this.step2.nbre_rccm = userData.NumeroRccm;
      this.step2.FichierRccm=userData.FichierRccm
      this.step2.nbre_nif = userData.NumeroNif;
      this.step2.FichierNif = userData.FichierNif;
      this.step2.DateGenerationNif = userData.DateGenerationNif;
      this.step2.NumeroTva = userData.NumeroTva;

      this.step3.NbreEmployeGuinneF = userData.NbreEmployeGuinneF;
      this.step3.NbreEmployeGuinneH = userData.NbreEmployeGuinneH;
      this.step3.NbreEmploye = userData.NbreEmploye;
      this.step3.pers_per_femm = userData.PersonnelPermanentFemme;
      this.step3.pers_per_homm = userData.PersonnelPermanentHomme;
      this.step3.pers_temp_femm = userData.PersonnelTemporaireFemme;
      this.step3.pers_temp_homm = userData.PersonnelTemporaireHomme;
      this.step3.NbreActionnaireGuinneF = userData.NbreActionnaireGuinneF;
      this.step3.NbreActionnaireGuinneH = userData.NbreActionnaireGuinneH;
      this.step3.NbreActionnaireGuinne = userData.NbreActionnaire;
      

      this.step4.titreDirigeant = userData.TitreDirigeant;
      this.step4.nomDirigeant = userData.NomDirigeant;
      this.step4.prenomDirigeant = userData.PrenomDirigeant;
      this.step4.sexeDirigeant = userData.SexeDirigeant;
      this.step4.paysDirigeant = userData.PaysDirigeant;
      this.step4.anneeNaissanceDirigeant = userData.AnneeNaissanceDirigeant;
      this.step4.dirigeantProprietaire = userData.DirigeantProprietaire;
      this.step4.titreProprietaire = userData.TitreProprietaire;
      this.step4.nomProprietaire = userData.NomProprietaire;
      this.step4.prenomProprietaire = userData.PrenomProprietaire;
      this.step4.sexeProprietaire = userData.SexeProprietaire;
      this.step4.paysProprietaire = userData.PaysProprietaire;
      this.step4.anneeNaissanceProprietaire = userData.AnneeNaissanceProprietaire;

      this.step5.titreRepondant = userData.TitreRepondant;
      this.step5.nomRepondant = userData.NomRepondant;
      this.step5.fonctionRepondant = userData.FonctionRepondant;
      this.step5.adresseRepondant = userData.AdresseRepondant;
      this.step5.villeRepondant = userData.VilleRepondant;
      this.step5.telephoneWhatsAppRepondant = userData.TelephoneWhatsAppRepondant;
      this.step5.contacter = userData.Contacter;
      this.step5.existanceActionnaire = userData.ExistanceActionnaire;
      this.step5.existanceConseilAdministration = userData.ExistanceConseilAdministration;

      this.step6.lienGoogleMapMpme = userData.LienGoogleMapMpme;
      this.step6.latitudeMpme = userData.LatitudeMpme;
      this.step6.longitudeMpme = userData.LongitudeMpme;
      this.step6.altitudeMpme = userData.AltitudeMpme;
      this.step6.precisionGPSMpme = userData.PrecisionGPSMpme;
      this.step6.origineDonnees = userData.OrigineDonnees;

     
      // ... Lier d'autres propriétés de la même manière
    },

  
  },
}
</script>
<style lang="css" scoped>
.error {
  /* border: 1px solid red; */
  max-width: 1140px;
  margin: 40px auto;
  padding: 10px;
  color: red;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}


.error-border {
  border: 2px solid red !important; /* Bordure rouge en cas d'erreur */
  border-radius: 0.5rem !important;
}







.form-container {
  /* width: 700px; */
  max-width: 1140px;
  margin: 0 auto;
  /* border-radius: 0.75rem; */
  background-color: white;

  color: black;

}

.form .content {

  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-groupe {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-groupe label {
  display: block;
  color: #000;
  margin-bottom: 4px;
  font-size: 13px;
}

.titre {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
  font-size: 12px;
      /* background: #f9d310; */
      width: fit-content;
      border: 1px solid #f9d310;
      padding: 1px 5px;
}

.input-groupe input,
.form-select {
  width: 100%;
  border: 1px solid #e5e7eb;
  outline: 0;
  padding: 14px;
  color: rgb(3, 3, 5);
}

.input-groupe input:focus {
  border-color: var(--color-primary);
}

.form-select:focus {
  border-color: var(--color-primary);
  outline: 0;
  box-shadow: 0 0 0 0 rgba(101, 113, 255, 0.25);
}

.signup a:hover {
  text-decoration: underline var(--color-primary);
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--color-secondary);
  padding: 0.75rem;
  text-align: center;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 50px;
}

.signup {
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
}


.btnForm {
  max-width: 1140px;
  margin: 20px auto;
  background-color: white;
  padding: 1rem;
  color: black;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.btnLogin {
  padding: 1em 3em;
  font-size: 12px;
  font-weight: 500;
  color: #000;
  background-color: #f9d310;
  border: none;
  border-radius: 45px;

  cursor: pointer;
  outline: none;
}

.btnLogin:hover {
  background-color: #fff;
  border: 1px solid #f9d310;
}

.generastep {
  max-width: 1140px;
  margin: 10px auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(201, 209, 217) !important;
}

.tx-green-1 {
  color: #f9d310;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: #fff;
  padding: 60px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 660px;
  position: relative;
  z-index: 0;
  /* margin-bottom: 24px; */
}

.stepper-progress {
  position: absolute;
  background-color: #c5c5c5;
  height: 2px;
  z-index: -1;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.stepper-progress-bar {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #f9d310;
  transition: all 500ms ease;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c5;
  transition: all 500ms ease;
}

.stepper-item-counter {
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
  background-color: #fff;
  border-radius: 100%;
  border: 2px solid #c5c5c5;
  position: relative;
}

.stepper-item-counter .icon-success {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  width: 24px;
  transition: all 500ms ease;
}

.stepper-item-counter .number {
  font-size: 16px;
  transition: all 500ms ease;
}

.stepper-item-title {
  position: absolute;
  font-size: 13px;
  bottom: -39px;
  width: 71px;
  display: flex;
  justify-content: center;
}

.stepper-item.success .stepper-item-counter {
  border-color: #f9d310;
  background-color: #ffed93;
  color: #fff;
  font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
  opacity: 1;
  transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
  opacity: 0;
  transform: scale(0);
}

.stepper-item.success .stepper-item-title {
  color: #f9d310;
}

.stepper-item.current .stepper-item-counter {
  border-color: #f9d310;
  background-color: #f9d310;
  color: #fff;
  font-weight: 600;
}

.stepper-item.current .stepper-item-title {
  color: #818181;
}

.supp {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 45px;
  z-index: 3;
  cursor: pointer;
  outline: none;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.supp:hover {
  background-color: #fff;
}

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 80%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  z-index: 0;
  border-radius: 50%;
  border: 1px solid var(--color-primary);
}

.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 230px;
}

.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;

  margin-bottom: 0;
}

.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  height: 2em;
}

/* Upload Area */
.upload-area {
  width: 100%;
  /* max-width: 25rem; */
  background-color: rgb(255, 255, 255);
  border: 2px solid var(--color-secondary);
  border-radius: 24px;
  padding: 2rem 1.875rem 5rem 1.875rem;
  /* margin: 0.625rem; */
  text-align: center;
}

.upload-area--open {
  /* Slid Down Animation */
  animation: slidDown 500ms ease-in-out;
}

.upload-area__title {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.3125rem;
}

.upload-area__paragraph {
  font-size: 0.9375rem;
  color: rgb(196, 195, 196);
  margin-top: 0;
}

.upload-area__tooltip {
  position: relative;
  color: var(--color-secondary);
  cursor: pointer;
  transition: color 300ms ease-in-out;
}

.upload-area__tooltip:hover {
  color: var(--clr-blue);
}

.upload-area__tooltip-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -125%);
  min-width: max-content;
  background-color: rgb(255, 255, 255);
  color: rgb(63, 134, 255);
  border: 1px solid var(--color-secondary);
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transition: none 300ms ease-in-out;
  transition-property: opacity, visibility;
}

.upload-area__tooltip:hover .upload-area__tooltip-data {
  opacity: 1;
  visibility: visible;
}

/* Drop Zoon */
.upload-area__drop-zoon {
  position: relative;
  height: 11.25rem;
  /* 180px */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed var(--color-secondary);
  border-radius: 15px;
  margin-top: 2.1875rem;

  transition: border-color 300ms ease-in-out;
}


@media screen and (max-width: 768px) {
  .form-container {
    width: 700px;
    max-width: 100%;
  }

  .content-group {
    display: flex;
    flex-direction: column;
  }

  .profil1{

    top:-26px;
  }

  .upload-area__title{

    font-size:1.6rem;
  }
}
   
</style>