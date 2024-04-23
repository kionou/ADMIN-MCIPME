<template>
  <Layout>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <PageHeader title="Rôles" pageTitle="Tableau de bord" />
    <BRow>
      <BCol lg="12">
        <BCard no-body>
          <BCardBody class="border-bottom">
            <div class="d-flex align-items-center justify-content-between">
              <BCardTitle class="mb-0">Liste des Rôles</BCardTitle>

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

          <BCardBody v-if="paginatedItems.length === 0" class="noresul">
            <div>
              <span>
                Vous n'avez pas encore de rôles, vous pouvez également en
                ajouter un !!
              </span>
            </div>
          </BCardBody>

          <BCardBody v-else>
            <div class="table-responsive">
              <BTableSimple class="align-middle table-nowrap table-hover">
                <BThead class="table-light" style="">
                  <BTr>
                    <BTh scope="col" style="width: 70px"></BTh>
                    <BTh scope="col">Nom</BTh>
                    <BTh scope="col">Permissions</BTh>
                    <BTh scope="col">Action</BTh>
                  </BTr>
                </BThead>
                <BTbody>
                  <BTr v-for="region in filteredList" :key="region.id">
                    <BTd> </BTd>
                    <BTd>{{ region.name }}</BTd>
                    <BTd
                      ><button
                        @click="
                          permission = true;
                          id_test = region.id;
                        "
                        style="
                          color: #fff;
                          background-color: #007575;
                          padding: 7px;
                          border-radius: 5px;
                        "
                      >
                        Détails
                      </button>
                    </BTd>
                    <BTd>
                      <ul class="list-unstyled hstack gap-1 mb-0">
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Edit"
                        >
                          <Blink
                            href="#"
                            @click="updateRole(region.id)"
                            class="btn btn-sm btn-soft-info"
                            ><i class="mdi mdi-pencil-outline"></i
                          ></Blink>
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="add"
                        >
                          <Blink
                            href="#"
                            @click="
                              addPermission = true;
                              id_test = region.id;
                            "
                            data-bs-toggle="modal"
                            class="btn btn-sm btn-soft-primary"
                          >
                            <i class="mdi mdi-plus"></i>
                          </Blink>
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          aria-label="Delete"
                        >
                          <Blink
                            href="#"
                            @click="confirmDelete(region.id)"
                            data-bs-toggle="modal"
                            class="btn btn-sm btn-soft-danger"
                            ><i class="mdi mdi-delete-outline"></i
                          ></Blink>
                        </li>
                      </ul>
                    </BTd>
                  </BTr>
                </BTbody>
              </BTableSimple>
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
                          <h5 class="text-primary">
                            {{
                              dataEdit ? "Modifier un rôle" : "Ajouter un rôle"
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
                              <label for="userpassword">Nom</label>
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
      v-model="permission"
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
                  <!-- <div class="bg-primary-subtle">
                    <BRow>
                      <BCol cols="12 text-center">
                        <div class="modalheader p-4">
                          <h5 class="text-primary">Modifier un utilisateur</h5>
                        </div>
                      </BCol>
                    </BRow>
                  </div> -->

                  <BCardBody class="pt-0">
                    <div class="p-2">
                      <BForm class="form-horizontal">
                        <BRow> </BRow>
                        <div
                          v-for="permission in permissionByRole"
                          :key="permission.id"
                        >
                          <p>{{ permission.name }}</p>
                        </div>

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
    <BModal
      v-model="addPermission"
      hide-footer
      centered
      header-class="border-0"
      title-class="font-18"
      @hide="clean2()"
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
                          <h5 class="text-primary">Ajouter des permissions</h5>
                        </div>
                      </BCol>
                    </BRow>
                  </div>

                  <BCardBody class="pt-0">
                    <div class="p-2">
                      <BForm class="form-horizontal">
                        <BRow> </BRow>

                        <BCol md="12">
                          <div class="mb-3 position-relative">
                            <div
                              v-for="permission in permissionOption"
                              :key="permission.id"
                            >
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="permission.name"
                                  :id="'permissionCheckbox' + permission.id"
                                  v-model="checkedPermissions"
                                  style="
                                    width: 20px;
                                    height: 20px;
                                    margin-right: 10px;
                                  "
                                />
                                <label
                                  class="form-check-label"
                                  for="permissionCheckbox{{ permission.id }}"
                                  style="font-size: 20px"
                                >
                                  {{ permission.name }}
                                </label>
                              </div>
                            </div>
                          </div>
                        </BCol>
                        <BRow> </BRow>

                        <BRow class="mb-0">
                          <BCol cols="12" class="text-end">
                            <div class="boutton">
                              <button class="" @click="HamdleAddPermission()">
                                Ajouter
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
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";

import Pag from "@/components/others/pagination.vue";
import axios from "@/lib/axiosConfig.js";
import Loading from "@/components/others/loading.vue";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import Swal from "sweetalert2";

export default {
  components: {
    Loading,
    Pag,
    MazPhoneNumberInput,
  },
  data() {
    return {
      loading: true,
      AddUser: false,
      addPermission: false,
      dataEdit: false,
      searchQuery: "",
      permission: false,
      permissionByRole: "",
      ToId: "",
      roleOptions: [],
      checkedPermissions: [],
      permissionOption: [],
      id: "",
      id_test: "",
      currentPage: 1,
      roleOptions: "",
      itemsPerPage: 8,
      totalPageArray: [],
      resultError: {},
      v$: useVuelidate(),
      error: "",
      step1: {
        nom: "",
      },

      step2: {
        code: "",
        nom: "",
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
    },
    step2: {
      code: {
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
    totalPages() {
      return Math.ceil(this.roleOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.roleOptions.slice(startIndex, endIndex);
    },
    filteredList() {
      if (!this.searchQuery) {
        return this.paginatedItems;
      } else {
        return this.paginatedItems.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
  async mounted() {
    console.log("uusers", this.loggedInUser);
    await this.fetchRole();
    this.fetchPermission();
    this.fetchPermissions(this.id_test);
  },
  methods: {
    validatePasswordsMatch() {
      return this.step1.password === this.step1.confirm_password;
    },
    successmsg: successmsg,
    async fetchRole() {
      try {
        const response = await axios.get("/roles", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: { Direction: this.loggedInUser.direction },
        });
        this.roleOptions = response.data.data;
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
    async fetchPermissions(id) {
      try {
        const response = await axios.get(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: { Direction: this.loggedInUser.direction },
        });
        console.log(response);
        this.permissionByRole = response.data.data;
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
    actions() {
      if (this.dataEdit) {
        this.UpdateAddUser();
      } else {
        this.HamdleAddUser();
      }
    },

    async HamdleAddUser() {
      (this.error = ""), (this.resultError = ""), this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let DataUser = {
          name: this.step1.nom,
        };

        try {
          const response = await axios.post("/roles", DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.AddUser = false;
            this.loading = false;
            this.successmsg(
              "Création de rôle",
              "Votre rôle a été crée avec succès !"
            );
            await this.fetchRole();
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
    async HamdleAddPermission() {
      this.loading = true;
      let DataUser = {
        permissions: this.checkedPermissions,
        code: this.id_test,
      };

      try {
        const response = await axios.post(
          "/roles/assign-permissions",
          DataUser,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        if (response.data.status === "success") {
          this.AddUser = false;
          this.loading = false;
          this.successmsg(
            "Ajout de permission",
            "Votre permission a été ajoutée avec succès !"
          );
          this.clean2();
          this.addPermission = false;
          console.log(response);
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
    },
    clean2() {
      this.checkedPermissions = [];
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
        const response = await axios.delete(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg("Supprimé!", "Votre rôle a été supprimé.");
          await this.fetchRole();
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
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    async UpdateAddUser() {
      (this.error = ""), (this.resultError = ""), this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        let DataUser = {
          name: this.step1.nom,
        };

        try {
          const response = await axios.put(`/roles/${this.id}`, DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          this.step1.nom = "";
          this.AddUser = false;
          if (response.data.status === "success") {
            this.AddUser = false;
            this.loading = false;
            this.successmsg(
              "Modification du type de demande",
              "Votre type de demande a été modifié avec succès !"
            );
            await this.fetchRole();
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
    async fetchPermission() {
      try {
        const response = await axios.get("/permissions", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: { Direction: this.loggedInUser.direction },
        });
        this.permissionOption = response.data.data.data;
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
            await this.fetchRole();
            this.permission = false;
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
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("cest pas bon ", this.v$.$errors);
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
      return this.roleOptions.slice(startIndex, endIndex);
    },
    updateRole(id) {
      this.dataEdit = true;
      this.AddUser = true;
      this.recup(id);
    },
    recup(id) {
      for (let u of this.roleOptions) {
        if (u.id == id) {
          this.step1.nom = u.name;
          this.id = u.id;
        }
      }
    },
    clean() {
      this.step1.nom = "";
      this.dataEdit = false;
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
};
</script>
<style lang="" scoped></style>
