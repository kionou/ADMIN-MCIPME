<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <PageHeader title="Type de Demande" pageTitle="Paramétrages" />
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            <div class="d-flex align-items-center justify-content-between">
              <BCardTitle class="mb-0">Liste des types de demandes</BCardTitle>

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
            <div
              class="py-2 d-flex  align-items-center flex-wrap"
            >
              <div
                class=""
                style="
                  width: 400px;
                  border: 1px solid #dedfe1;
                  margin: 0 10px 10px 0;
                  padding: 8px;
                "
                v-for="(value, key) in filteredList"
                :key="key"
              >
                <BRow class="align-items-center">
                  <BCol xl="9">
                    <div class="text-center p-2 border-end">
                      <div class="p-2 text-center text-xl-start">
                        <BRow>
                          <BCol cols="12">
                            <div>
                              <p class="text-muted mb-2 text-truncate">
                                Libellé :
                              </p>
                              <h5>
                                {{ value.LibelleTypeDemandes }}
                              </h5>
                            </div>
                          </BCol>
                        </BRow>
                      </div>
                    </div>
                  </BCol>

                  <BCol xl="3">
                    <h5 class="text-truncate pb-1">
                      <ul
                        class="list-unstyled hstack gap-1 mb-0 justify-content-center"
                      >
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Edit"
                        >
                          <Blink
                            href="#"
                            @click="
                              dataUpdate();
                              recup(value.id);
                            "
                            class="btn btn-sm btn-soft-info"
                            ><i class="mdi mdi-pencil-outline"></i
                          ></Blink>
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Delete"
                        >
                          <Blink
                            href="#"
                            @click="confirmDelete(value.id)"
                            data-bs-toggle="modal"
                            class="btn btn-sm btn-soft-danger"
                            ><i class="mdi mdi-delete-outline"></i
                          ></Blink>
                        </li>
                      </ul>
                    </h5>
                  </BCol>
                </BRow>
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
                          <h5 class="text-primary">
                            {{
                              dataEdit
                                ? "Modifier un type de demande"
                                : "Ajouter un type de demande"
                            }}
                          </h5>
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
                              <label for="userpassword">Libellé</label>
                              <MazInput
                                v-model="step1.libelle"
                                no-radius
                                type="text"
                                name="nom"
                                color="info"
                                placeholder="exemple"
                              />
                              <small v-if="v$.step1.libelle.$error">{{
                                v$.step1.libelle.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['CodeRegion']">
                                {{ resultError["CodeRegion"] }}
                              </small>
                            </div>
                          </BCol>
                        </BRow>

                        <BRow class="mb-0">
                          <BCol cols="12" class="text-end">
                            <div class="boutton">
                              <button class="" @click="actions()">
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

    <BModal
      v-model="UpdateUser1"
      hide-footer
      centered
      header-class="border-0"
      title-class="font-18"
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
                          <h5 class="text-primary">
                            Modifier Zone Industrielle
                          </h5>
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
                              <label for="userpassword">Nom</label>
                              <MazInput
                                v-model="step2.nom"
                                no-radius
                                type="text"
                                name="nom"
                                color="info"
                                placeholder="001"
                              />
                              <small v-if="v$.step2.nom.$error">{{
                                v$.step2.nom.$errors[0].$message
                              }}</small>
                              <small v-if="resultError['CodeRegion']">
                                {{ resultError["CodeRegion"] }}
                              </small>
                            </div>
                          </BCol>
                        </BRow>
                        <BCol md="12">
                          <div class="mb-3 position-relative">
                            <label for="userpassword">Superficie</label>
                            <MazInput
                              v-model="step2.superficie"
                              no-radius
                              type="text"
                              name="superficie"
                              color="info"
                              placeholder="Conakry"
                            />
                            <small v-if="v$.step2.superficie.$error">{{
                              v$.step2.superficie.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['NomRegion']">
                              {{ resultError["NomRegion"] }}
                            </small>
                          </div>
                        </BCol>
                        <BRow> </BRow>

                        <BRow class="mb-0">
                          <BCol cols="12" class="text-end">
                            <div class="boutton">
                              <button class="" @click="submitUpdate()">
                                Modifier
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
      UpdateUser1: false,
      ToId: "",
      regionOptions: [],
      currentPage: 1,
      itemsPerPage: 8,
      typeOptions: [],
      dataEdit: false,
      id: "",
      totalPageArray: [],
      resultError: {},
      v$: useVuelidate(),
      error: "",
      step1: {
        libelle: "",
      },

      step2: {
        nom: "",
        superficie: "",
      },
    };
  },
  validations: {
    step1: {
      libelle: {
        require,
        lgmin: lgmin(2),

      },
    },
    step2: {
      superficie: {
        require,
      },
      nom: {
        require,
        lgmin: lgmin(2),
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
    async fetchTypeDemandes() {
      try {
        const response = await axios.get("/type-demandes", {
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
        const myObjectString = localStorage.getItem("myAuthenticatedUserData");
        const myObject = JSON.parse(myObjectString);
        const specificElement = myObject.direction;

        let DataUser = {
          LibelleTypeDemandes: this.step1.libelle,
          Direction: this.loggedInUser.direction,
        };

        try {
          const response = await axios.post("/type-demandes", DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.AddUser = false;
            this.loading = false;
            this.successmsg(
              "Création de type de demande",
              "Votre type de demande a été créee avec succès !"
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
    async UpdateUser(id) {
      this.UpdateUser1 = true;
      this.loading = true;

      try {
        // Recherchez l'objet correspondant dans le tableau regionOptions en fonction de l'ID
        const user = this.regionOptions.find((user) => user.id === id);

        if (user) {
          // Utilisez les informations récupérées de l'objet user
          console.log("Informations de l'utilisateur:", user);

          (this.step2.code = user.CodeRegion),
            (this.step2.nom = user.NomRegion),
            (this.ToId = user.CodeRegion);
        } else {
          console.log("Utilisateur non trouvé avec l'ID", id);
        }
        this.loading = false;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du document:", error);

        this.loading = false;
      }
    },

    async submitUpdate() {
      this.v$.step2.$touch();
      console.log("bonjour");

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
        this.loading = true;

        const dataCath = {
          CodeRegion: this.step2.code,
          NomRegion: this.step2.nom,
          Statut: 1,
        };
        console.log("dataCath", dataCath);

        try {
          const response = await axios.put(`regions/${this.ToId}`, dataCath, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            await this.fetchRegionOptions();
            this.UpdateUser1 = false;
            this.loading = false;
            this.successmsg(
              "Modification de",
              "Votre region a été modifiée avec succès !"
            );
          }
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("user/clearLoggedInUser");
            this.$router.push("/"); //a revoir
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("cest pas bon ", this.v$.$errors);
      }
    },
    actions() {
      if (this.dataEdit) {
        this.UpdateAddUser();
      } else {
        this.HamdleAddUser();
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
    this.fetchTypeDemandes();
  },
};
</script>
<style lang="" scoped></style>
