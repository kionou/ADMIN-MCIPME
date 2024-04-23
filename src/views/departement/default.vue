<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <PageHeader title="Departement" pageTitle="Tableau de bord" />
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            <div class="d-flex align-items-center justify-content-between">
              <BCardTitle class="mb-0">Liste des departements</BCardTitle>

              <div class="flex-shrink-0 d-flex">
                <BCol xxl="4" lg="9" class="me-3">
                  <MazInput
                    v-model="searchQuery"
                    no-radius
                    type="email"
                    color="info"
                    size="sm"
                    placeholder="Recherchez ..."
                  />
                </BCol>
                <div @click="AddUser = true" class="btn btn-primary">
                  Ajouter
                </div>
              </div>
            </div>
          </BCardBody>

          <BCardBody v-if="typeOptions.length === 0" class="noresul">
            <div>
              <span>
                Vous n'avez pas encore de type de demandes, vous pouvez
                également en ajouter un !!
              </span>
            </div>
          </BCardBody>

          <BCardBody v-else>
            <div>
              <div class="row">
                <BCol
                  xl="6"
                  sm="7"
                  v-for="(card, index) in filteredList"
                  :key="index"
                >
                  <BCard no-body v-if="oneDirection === card.Direction">
                    <BCardBody>
                      <BRow>
                        <div class="carde" style="width: 420px">
                          <div class="content-box" style="height: 150px">
                            <span class="carde-title">{{ card.Name }}</span>
                            <div class="texte">
                              <p class="texte-content">
                                Description:
                                <span>{{ card.Description }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </BRow>
                    </BCardBody>
                  </BCard>
                </BCol>
              </div>
            </div>
            <BRow>
              <BCol lg="12">
                <div class="container_pagination">
                  <Pag
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @page-change="updateCurrentPage"
                  />
                </div>
              </BCol>
            </BRow>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <BModal
      v-model="AddUser"
      hide-footer
      centered
      header-class="border-0"
      title-class="font-18"
      @hide="clean()"
    >
      <div>
        <div class="account-pages" style="width: 100%">
          <BContainer>
            <BRow>
              <BCol>
                <BCard
                  no-body
                  class="overflow-hidden"
                  style="
                    box-shadow: none !important;
                    border: 1px solid #c9d1d9 !important;
                  "
                >
                  <div class="bg-primary-subtle">
                    <BRow>
                      <BCol cols="12 text-center">
                        <div class="modalheader p-4">
                          <h5 class="text-primary">Ajouter un departement</h5>
                        </div>
                      </BCol>
                    </BRow>
                  </div>
                  <BCardBody class="pt-0">
                    <div>
                      <router-link to="#">
                        <div class="avatar-md profile-user-wid">
                          <span
                            class="avatar-title rounded-circle"
                            style="position: relative; z-index: 33"
                          >
                            <img
                              src="@/assets/img/armoirie.png"
                              alt
                              style="width: 75%; height: 75%; z-index: 33"
                            />
                          </span>
                        </div>
                      </router-link>
                    </div>
                    <div class="p-2">
                      <BForm class="form-horizontal">
                        <BRow>
                          <BCol md="12">
                            <div class="mb-3 position-relative">
                              <label for="userpassword"
                                >Nom du departement</label
                              >
                              <MazInput
                                v-model="step1.nom"
                                no-radius
                                type="text"
                                name="nom"
                                color="info"
                                placeholder="exemple"
                              />
                              <small v-if="v$.step1.nom.$error">{{
                                v$.step1.nom.$errors[0].$message
                              }}</small>
                            </div>
                          </BCol>
                          <BCol md="12">
                            <div class="mb-3 position-relative">
                              <label for="userpassword">Description</label>
                              <MazInput
                                v-model="step1.description"
                                no-radius
                                type="text"
                                name="description"
                                color="info"
                                placeholder="exemple"
                              />
                              <small v-if="v$.step1.description.$error">{{
                                v$.step1.description.$errors[0].$message
                              }}</small>
                            </div>
                          </BCol>
                        </BRow>

                        <BRow class="mb-0">
                          <BCol cols="12" class="text-end">
                            <div class="boutton">
                              <button class="" @click="HamdleAddUser()">
                                Valider
                              </button>
                            </div>
                          </BCol>
                        </BRow>
                      </BForm>
                    </div>
                  </BCardBody>
                </BCard>
              </BCol>
            </BRow>
          </BContainer>
        </div>
      </div>
    </BModal>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import PageHeader from "@/components/page-header.vue";
import Pag from "@/components/others/pagination.vue";
import axios from "@/lib/axiosConfig.js";
import Loading from "@/components/others/loading.vue";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import Swal from "sweetalert2";

export default {
  components: {
    Layout,
    PageHeader,
    Loading,
    Pag,
    MazPhoneNumberInput,
  },
  data() {
    return {
      loading: true,
      AddUser: false,
      searchQuery: "",
      ToId: "",
      regionOptions: [],
      currentPage: 1,
      itemsPerPage: 8,
      typeOptions: [],
      dataEdit: false,
      id: "",
      oneDirection: JSON.parse(localStorage.getItem("myAuthenticatedUserData"))
        .direction,
      totalPageArray: [],
      resultError: {},
      v$: useVuelidate(),
      error: "",
      step1: {
        nom: "",
        description: "",
      },

      step2: {
        nom: "",
        superficie: "",
      },
    };
  },
  validations: {
    step1: {
      nom: {
        require,
        lgmin: lgmin(2),
        lgmax: lgmax(50),
      },
      description: {
        require,
        lgmin: lgmin(2),
        lgmax: lgmax(200),
      },
    },
    step2: {
      superficie: {
        require,
      },
      nom: {
        require,
        lgmin: lgmin(2),
        lgmax: lgmax(20),
      },
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    filteredList() {
      if (!this.searchQuery) {
        return this.typeOptions;
      } else {
        return this.typeOptions.filter((item) =>
          item.LibelleTypeDemandes.toLowerCase().includes(
            this.searchQuery.toLowerCase()
          )
        );
      }
    },
    // totalPages() {
    //   return Math.ceil(this.regionOptions.length / this.itemsPerPage);
    // },
    // paginatedItems() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.typeOptions.slice(startIndex, endIndex);
    // },
  },
  async mounted() {
    console.log("uusers", this.loggedInUser);
    await this.fetchRegionOptions();
  },
  methods: {
    async fetchDepartement() {
      try {
        const response = await axios.get("/departments", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: { Direction: this.loggedInUser.direction },
        });
        console.log(response.data.data);
        this.typeOptions = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error("errorqqqqq", error);

        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    clean() {
      this.step1.nom = "";
      this.step1.description = "";
    },
    validatePasswordsMatch() {
      return this.step1.password === this.step1.confirm_password;
    },
    successmsg: successmsg,
    async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])
        ); // Accéder aux options des pays via le getter
        console.log(options);
        this.regionOptions = options; // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    async HamdleAddUser() {
      (this.error = ""), (this.resultError = ""), this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let DataUser = {
          Name: this.step1.nom,
          description: this.step1.description,
          Direction: this.loggedInUser.direction,
        };

        try {
          const response = await axios.post("/departments", DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.AddUser = false;
            this.loading = false;
            this.successmsg(
              "Création de departement",
              "Votre departement a été créee avec succès !"
            );
            await this.fetchDepartement();
            this.clean();
          } else {
          }
        } catch (error) {
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },
    async UpdateAddUser() {
      (this.error = ""), (this.resultError = ""), this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const myObjectString = localStorage.getItem("myAuthenticatedUserData");
        const myObject = JSON.parse(myObjectString);
        const specificElement = myObject.direction;

        let DataUser = {
          id: this.id,
          LibelleTypeDemandes: this.step1.libelle,
          Direction: specificElement,
        };

        try {
          const response = await axios.post(
            "/type-demandes/" + this.id + "/update",
            DataUser,
            {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            }
          );
          this.step1.libelle = "";
          // this.AddUser = false;
          if (response.data.status === "success") {
            this.AddUser = false;
            this.loading = false;
            this.successmsg(
              "Modification du type de demande",
              "Votre type de demande a été modifié avec succès !"
            );
            await this.fetchTypeDemandes();
          } else {
          }
        } catch (error) {
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },
    async confirmDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le!",
        cancelButtonText: "Non, annulez!",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.DeleteUser(id);
      }
    },
    async DeleteUser(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/type-demandes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg("Supprimé!", "Votre region a été supprimée.");
          await this.fetchTypeDemandes();
        } else {
          console.log("error", response.data);
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("user/clearLoggedInUser");
          this.$router.push("/"); //a revoir
        }
      }
    },

    dataUpdate() {
      this.dataEdit = true;
      this.AddUser = true;
    },
    recup(id) {
      for (let u of this.typeOptions) {
        if (u.id == id) {
          this.step1.libelle = u.LibelleTypeDemandes;
          this.id = u.id;
        }
      }
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.regionOptions.slice(startIndex, endIndex);
    },

    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
        console.log(" errorMessages", errorMessages, typeof errorMessages);

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        console.log(
          " concatenatedError",
          concatenatedError,
          typeof concatenatedError
        );

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
      console.log("resultError", this.resultError);
    },
  },
  mounted() {
    this.fetchDepartement();
  },
};
</script>
<style>
.yes {
  text-align: center;
}
</style>
