<template >
    <div>
      <div class="login">
        <Loading v-if="loading" style="z-index: 99999;"></Loading>
  
          <div class="login-reg-panel">
          
                              
          <div class="register-info-box">
              <img src="@/assets/img/logo/logopme.png" alt="" class="w-100">
          </div>
                              
          <div class="white-panel">
              <div class="login-show">
                  <small>{{ error  }}</small>
                  <h2>Réinitialisation</h2>
                  <p>Connectez-vous à votre espace administrateur</p>
                  
                         <div class="mb-6">
                          <v-text-field v-model="password" :append-inner-icon="visible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'" :type="visible ? 'text' : 'password'" color="blue-grey-lighten-2"
                         hint="Au moins 8 caractères"  variant="outlined"  label="Mot de passe" name="password"  counter @click:append-inner="visible = !visible"
                             ></v-text-field>
                        <small v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</small>
                      </div>
                  
                      <div class="mb-6">
                          <v-text-field v-model="confirmer_password" :append-inner-icon="visible1 ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'" :type="visible1 ? 'text' : 'password'" color="blue-grey-lighten-2"
                         hint="Au moins 8 caractères"  variant="outlined"  label="Confirmer le Mot de passe" name="password"  counter @click:append-inner="visible1 = !visible1"
                     ></v-text-field>
                        <small v-if="v$.confirmer_password.$error">{{v$.confirmer_password.$errors[0].$message}}</small>
                        <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>
                      </div>
  
                 
                     <div class="boutton">
                     <button class="" @click="submit()">Valider</button>
                     </div>
                  
              
              </div>
              
          </div>
      </div>
  
      </div>
      <div class="text-center pa-4">
      <v-dialog v-model="dialogpassword"  width="auto">
        
        <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
    <small>{{  errorOtp }}</small>
      <h3 class="text-h5">Changement de mot de passe réussi</h3>
  
      <div class="text-subtitle-2 font-weight-light mb-3">
        Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous
         connecter en toute sécurité. Merci pour votre vigilance en matière de sécurité !
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>

       
        <div class="boutton">
            <button class="" style="padding: 10px 30px;" @click="$router.push({ path: '/' })" >OK</button>
            </div>
      </v-card-actions>
    </v-sheet>
        
      </v-dialog>
      
    </div>

    <div class="text-center pa-4">
      <v-dialog v-model="dialogmessage"  width="auto">
        
        <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
    <small>{{  errorOtp }}</small>
      <h3 class="text-h5">Première connexion : Changez votre mot de passe maintenant !</h3>
  
      <div class="text-subtitle-2 font-weight-light mb-3">
        Bravo pour votre inscription ! Comme premier pas sur notre portail,
         veuillez modifier votre mot de passe pour garantir la sécurité de votre compte.
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>

       
        <div class="boutton">
            <button class="" style="padding: 10px 30px;"  @click="dialogmessage = false" >OK</button>
            </div>
      </v-card-actions>
    </v-sheet>
        
      </v-dialog>
      
    </div>
  
   
    </div>
    
     
      
  </template>
  <script>
  import useVuelidate from '@vuelidate/core';
  import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
  import axios from '@/lib/axiosConfig.js'
  import Loading from '@/components/others/loading.vue';

  export default {
    components: {
         Loading 
  
      },
  
      data() {
          return {
             loading:false, 
              visible:false,
              visible1:false,
              dialogpassword:false,
              dialogmessage:false,
              email:'',
              code:'',
            confirmer_password: '',
            password: '',
            v$: useVuelidate(),
            error:''
          }
      },
      validations: {
        password:{
              require,
                lgmin:lgmin(8), 
            },
            confirmer_password:{
              require,
                lgmin:lgmin(8),
              
            },
      
      
    },
    mounted() {
        const resetPasswordInfo = JSON.parse(localStorage.getItem('resetPasswordInfo'));

if (resetPasswordInfo) {
  this.email = resetPasswordInfo.email;
  this.code = resetPasswordInfo.code;
  if (resetPasswordInfo.message === true) {
    this.dialogmessage = true
    
  }
}
    },
    methods: {
     
        validatePasswordsMatch() {
      return this.password === this.confirmer_password;
    },
      async  submit(){
            this.error = ''
            this.v$.$touch()
            if (this.v$.$errors.length == 0 ) {
              this.loading = true
             let   DataUser={
                    code:this.code,
                    email:true,
                    value:this.email,
                    password:this.password,
                    password_confirmation:this.confirmer_password
                }
                console.log('data user :',DataUser);
           
          try {
            const response = await axios.post('/mcipme-password/password/reset', DataUser);
            console.log('response.Code', response);
            if (response.data.status === 'success') {
              localStorage.removeItem('resetPasswordInfo');
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.loading = false
              this.dialogpassword = true

            }

          } catch (error) {
            this.loading = false
            console.error('Erreur postlogin:', error);
            return this.error = error.response.data.message


          }
              }
            },
    },
      
  }
  </script>
  <style lang="css" scoped>
  
     
  @import url('https://fonts.googleapis.com/css?family=Mukta');
  
  .login{
  
     
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
  }
  
  
  .login-reg-panel{
      position: relative;
      /* top: 50%; */
      /* transform: translateY(-50%); */
      text-align:center;
      width:70%;
      /* right:0;left:0; */
      /* margin:auto; */
      height:400px;
      /* background-color: rgba(236, 48, 20, 0.9); */
      border: 1px solid #d9d9d9;
     
  }
  .white-panel{
      background-color: rgba(255,255, 255, 1);
      height:450px;
      position:absolute;
      top:-23px;
      width:45%;
      right:calc(50% - 50px);
      transition:.3s ease-in-out;
      z-index:0;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
      
  }
  .login-reg-panel input[type="radio"]{
      position:relative;
      display:none;
  }
  .login-reg-panel{
      color:#B8B8B8;
  }
  .login-reg-panel #label-login, 
  .login-reg-panel #label-register{
      border:1px solid #9E9E9E;
      padding:5px 5px;
      width:150px;
      display:block;
      text-align:center;
      border-radius:10px;
      cursor:pointer;
      font-weight: 600;
      font-size: 18px;
  }
  .login-info-box{
      width:30%;
      padding:0 50px;
      top:20%;
      left:0;
      position:absolute;
      text-align:left;
  }
  .register-info-box{
      width: 38%; 
      top: 33%;
      right: 48px;
      position: absolute;
      
  }
  .right-log{right:50px !important;}
  
  .login-show, 
  .register-show{
      z-index: 1;
      display:block;
      opacity:1;
      transition:0.3s ease-in-out;
      color:#242424;
      text-align:left;
      padding:30px 50px;
      text-align: center;
  }
  .show-log-panel{
      display:block;
      opacity:0.9;
  }
  
  
  .boutton a{
      display:inline-block;
      padding:10px 0;
  }
  
  
  
  .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  }
  
  
  
  .signin span {
  color: royalblue;
  }
  
  .signin span:hover {
  text-decoration: underline royalblue;
  cursor: pointer;
  }
  
  @media (max-width: 1100px) {
  
      .login-reg-panel{
  
          display: flex;
        
      height: auto;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      padding: 20px 10px;
      } 
  
      .white-panel{
          position: static;
          width: 100%;
      max-width: 380px;
      }
  
      .register-info-box{
          position: static;
          margin-bottom: 20px;
          width: 56%;
      }
  }
  
  @media (max-width: 675px) {
      .login-reg-panel{
     
      width:100%;
  
     
  }
  
  .register-info-box{
        
          width: 50%;
      }
  }
  @media (max-width: 530px) {
  
  .register-info-box{
        
          width: 60%;
      }
  }
  @media (max-width: 460px) {
  
  .register-info-box{
        
          width: 70%;
      }
  }
      
      
      
      
  </style>