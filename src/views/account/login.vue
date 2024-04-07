<template>
  
  <Layout>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <BRow class="justify-content-center">
      <BCol md="8" lg="6" xl="5">
        <BCard no-body class="overflow-hidden">
          <div class="bg-primary-subtle">
            <BRow>
              <BCol cols="7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">De retour parmi nous ! </h5>
                  <p>Veuillez vous connecter pour accéder au BD-MCIMPE.</p>
                </div>
              </BCol>
              <BCol cols="5" class="align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </BCol>
            </BRow>
          </div>
          <BCardBody class="pt-0">
            <div>
              <router-link to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle">
                    <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%;"/>
                  </span>
                </div>
              </router-link>
            </div>
            <small>{{  error }}</small>

            <BForm class="p-2" >
              <BFormGroup class="mb-3" id="input-group-1" label="Adresse Email" label-for="input-1">
              <MazInput v-model="step1.email"  no-radius type="email" name="email" color="info" placeholder="exemple@gmail.com" />
              <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small> 
              </BFormGroup>

              <BFormGroup class="mb-3" id="input-group-2" label="Mot de passe" label-for="input-2">
                <MazInput v-model="step1.password"  no-radius type="password" color="info" placeholder="Abc123@&" />
                <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small> 
              </BFormGroup>
          
              <div class="boutton">
                   <button class="" @click="Hamdlelogin" >Connexion</button>
               </div>
             
              <div class="mt-4 text-center">
                <div class="text-muted" @click="showModal = true ; error = '' ; step2.email = '' ">
                  <i class="mdi mdi-lock me-1"></i> Mot de passe oublié ?
                </div>
              </div>
            </BForm>
          </BCardBody>
        </BCard>

     
      </BCol>
    </BRow>

    <BModal v-model="showModal" hide-footer centered header-class="border-0">
      <div>
    
    <div class="account-pages ">
      <BContainer>
        <BRow >
          <BCol >
            <BCard no-body class="overflow-hidden" style=" box-shadow:none !important;
             border: 1px solid #c9d1d9 !important;">
              <div class="bg-primary-subtle">
                <BRow>
                  <BCol cols="7">
                    <div class="text-primary p-4">
                      <h5 class="text-primary">Réinitialiser le mot de passe</h5>
                      
                    </div>
                  </BCol>
                  <BCol cols="5">
                    <img src="@/assets/images/profile-img.png" alt class="img-fluid mt-3" />
                  </BCol>
                </BRow>
              </div>
              <BCardBody class="pt-0">
                <div>
                  <router-link to="/">
                    <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle">
                    <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%;"/>
                  </span>
                </div>
                  </router-link>
                </div>
                <div class="p-2">
                  <BForm class="form-horizontal">
                    <div class="user-thumb text-center mb-4">
                      Entrez votre adresse e-mail et des instructions vous seront envoyées !
                    </div>
                    

                    <div class="mb-3">
                      <label for="userpassword">Adresse Email</label>
                      <MazInput v-model="step2.email"  no-radius type="email"  color="info" placeholder="exemple@gmail.com" />
                       <small v-if="v$.step2.email.$error">{{v$.step2.email.$errors[0].$message}}</small> 
                    </div>

                    <BRow class="mb-0">
                      <BCol cols="12" class="text-end">
                        <div class="boutton">
                        <button class="" @click="PasswordOtp()">Réinitialiser</button>
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

    <BModal v-model="verifiOtp" hide-footer centered header-class="border-0">
      <div>
    
    <div class="account-pages ">
      <BContainer>
        <BRow >
          <BCol >
            <BCard no-body class="overflow-hidden" style=" box-shadow:none !important;
             border: 1px solid #c9d1d9 !important;">
              <div class="bg-primary-subtle">
                <BRow>
                  <BCol cols="7">
                    <div class="text-primary p-3">
                      <h5 class="text-primary">Réinitialiser le mot de passe</h5>
                      
                    </div>
                  </BCol>
                  <BCol cols="5">
                    <img src="@/assets/images/profile-img.png" alt class="img-fluid mt-3" />
                  </BCol>
                </BRow>
              </div>
              <BCardBody class="pt-0">
                <div>
                  <router-link to="/">
                    <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle">
                    <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%;"/>
                  </span>
                </div>
                  </router-link>
                </div>
                <small>{{ errorOtp }}</small>
                <div class="p-2">
                  <BForm class="form-horizontal">
                    <div class="user-thumb text-center mb-4">
                      Veuillez entrer le code que nous avons envoyé à votre
                       adresse e-mail pour réinitialiser votre mot de passe.
                    </div>
                    

                    <div class="mb-3">
                    
                      <MazInputCode v-model="step3.code"  color="info"  />
                       <small v-if="v$.step3.code.$error">{{v$.step3.code.$errors[0].$message}}</small> 
                    </div>

                    <BRow class="mb-0">
                      <div class="boutton">
                        <button class="" @click="HamdleOtpPassword()">Valider</button>
                       </div>
                      <BCol cols="12" >
                        <div class="mt-4 text-center">
                     <div class="text-muted" @click="renew">
                      Renvoyer un nouveau code
                </div>
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
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import { mapActions } from 'vuex';
import Layout from "../../layouts/auth.vue";
import MazInputCode from 'maz-ui/components/MazInputCode'





/**
 * Login component
 */
export default {
 
  components: {
    Layout, Loading , MazInputCode
  },
 
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
  },

  data() {
        return {
           loading:false,
           showModal:false,
           verifiOtp:false, 
            dialogOtpPassword:false,
            InfoUser:'',
            errorOtp:'',
            step1:{
             email: '',
             password: '',
           },

             step2:{
              email:'',
        },

        step3:{
            code:'',
        },
        step4:{
             code:'',
        },
       
        v$: useVuelidate(),
        error:''
        }
    },
    validations: {
    step1:{
        email: {
      require,
      ValidEmail
    },
    password: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    }
    },
    step2:{
      email: {
      require,
      ValidEmail
    },
            
        },
        step3:{
        code: {
      require,
    },
  },
    step4:{
            code:{
        require,
      lgmin: lgmin(4),
      lgmax: lgmax(4),
            }
            
        },

    
  },
  mounted() {
    console.log("navbarrrr",this.loggedInUser);
  },
  methods: {
    ...mapActions('auth', ['setMyAuthenticatedUser']),
    async Hamdlelogin(){

this.error = '',
 this.v$.step1.$touch()
  if (this.v$.$errors.length == 0 ) {
     this.loading = true
    
let DataUser = {
email:this.step1.email,
password:this.step1.password
}
console.log("eeeee",DataUser);
try {
const response = await axios.post('/system/login' , DataUser);
console.log('response.login', response.data); 
if (response.data.status === "success") {
this.InfoUser = response.data.data
// this.dialogOtp = true
this.loading = false
this.setMyAuthenticatedUser(this.InfoUser);
 if (this.InfoUser.user.Direction === 'DNI') {
     this.$router.push('/dni'); 
    } else {
      this.$router.push('/dncic'); }

} else {

}



} catch (error) {
console.log('response.login', error); 

this.loading = false
if (error.response.data.status === "error") {
return this.error = error.response.data.message

} else {
return this.error = "L'authentification a échoué"
}
}
    }else{
    
    console.log('pas bon', this.v$.$errors);
    
    } 
},

async PasswordOtp(){

this.v$.step2.$touch()
if (this.v$.$errors.length == 0 ) {
  this.loading = true

let CodeUserEmail ={
 email:1,
 value:this.step2.email

}
console.log("eee",CodeUserEmail);
try {
const response = await axios.post('mcipme/send-otp', CodeUserEmail);

console.log('response.Code', response); 
if (response.data.status === 'success') {
this.showModal = false
 this.verifiOtp = true
this.loading = false
} else {
this.loading = false
  this.errorOtp = "Echec de l'envoi du code"
}

} catch (error) {
console.log('error',error);
if (response.data.status === 'error') {
 


}
}
}else{

console.log('error',this.v$.$errors);


}
},

onOtpInputPassworod() {
      // Vérifiez si l'OTP est complètement saisi (longueur de 4 chiffres)
        this.errorOtp  = ''
      console.log(this.step3.code);
      if (this.step3.code.length === 4) {
        // Déclenchez votre action ici, par exemple, appelez une méthode pour envoyer à l'API
        this.HamdleOtpPassword();
      }
    },
    async  HamdleOtpPassword(){
        this.error = '',
         this.v$.step3.$touch()
          if (this.v$.$errors.length == 0 ) {
             this.loading = true
            
            let DataUser = {
            email: true,
            value: this. step2.email,
            code: this. step3.code
        }
      console.log("eeeee",DataUser);
   
     
      try {
      const response = await axios.post('/mpme/verification-otp' , DataUser);
      console.log('response.login', response.data); 
      if(response.data.status === 'success'){
        localStorage.setItem('resetPasswordInfo', JSON.stringify({
                  email: this.step2.email,
                  code: this.step3.code// Assurez-vous de récupérer le code correctement
                }));
             this.$router.push('/reinitialiser');
              this.loading = false
              this.dialogOtpPassword = false
      }else{
      
       this.errorOtp = "Echec de vérification du code."
       this. step3.code = ''
       this.loading = false
      }
    
        
              
     
    } catch (error) {
      console.log('response.login', error); 

      this.loading = false
      if (error.response.data.status === 'error') {
       return this.errorOtp = "L'authentification a échoué"
        
      } else {
        
      }
    }
            }else{
            
            console.log('pas bon', this.v$.$errors);
            
            }

    },
    async renew() {
      console.log('okk' );
     
        const requestData = {
          email: 1,
          value: this.step2.email ,
        };

        try {
          // Effectuez une demande pour renvoyer un nouveau code par e-mail
          const response = await axios.post('mcipme/send-otp', requestData);
          if (response.data.status === 'success') {
            alert('Un nouveau code a été envoyé à votre e-mail.');
           
          } else {
            // Erreur, affichez un message d'erreur
            alert('Une erreur s\'est produite lors de l\'envoi du nouveau code.');
          }
        } catch (error) {
          console.error('Erreur lors de la demande de renvoi du code par e-mail :', error);
        }
      
     
      
    },
  },


};
</script>
<style scoped >
.form-control-lg{

border-radius: none !important;
}

.form-control{

border-radius: none !important;
}

.m-input-code {
   
    justify-content: center !important;
}


</style>