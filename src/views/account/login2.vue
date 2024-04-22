<template >
    <div>
      <div class="login">
        <Loading v-if="loading" style="z-index: 99999;"></Loading>
  
          <div class="login-reg-panel">
          
                              
          <div class="register-info-box">
              <img src="@/assets/img/armoirie.png" alt="" class="w-50">
          </div>
                              
          <div class="white-panel">
              <div class="login-show">
                  <small>{{ error  }}</small>
                           <h2>Connexion</h2>
                  <p>Connectez-vous à votre espace administrateur</p>
                  
                  <div class="mb-6">
                      <v-text-field v-model="step1.email"  :counter="10" label="Adresse Email" name="email"   color="blue-grey-lighten-2" type="email" hide-details required variant="outlined" ></v-text-field>
                  <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small> 
                  </div>
                  
                      <div class="mb-6">
                          <v-text-field v-model="step1.password" :append-inner-icon="visible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'" :type="visible ? 'text' : 'password'" color="blue-grey-lighten-2"
                     hint="Au moins 8 caractères"  variant="outlined"  label="Mot de passe" name="password"  counter @click:append-inner="visible = !visible"
                     ></v-text-field>
                        <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                      </div>
  
                     <p class="signin" style="text-align: end; " @click="ChangePassword"> <span >Mot de passe oublié ?</span> </p>
                     <div class="boutton">
                     <button class="" @click="Hamdlelogin()">Connexion</button>
                     </div>
                  
              
              </div>
              
          </div>
      </div>
  
      </div>
      <div class="text-center pa-4">
      <v-dialog v-model="dialogOtp"  width="auto">
        
        <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
    <small>{{  errorOtp }}</small>
      <h3 class="text-h5">Verification Code</h3>
  
      <div class="text-subtitle-2 font-weight-light mb-3">
          Un code d'authentification vient de vous être envoyé par e-mail. 
          Veuillez le saisir ci-dessous pour finaliser votre connexion.
      </div>
  
      <v-otp-input
        v-model="step2.code"
        class="mb-8"
        divider="•"
        length="4"
        variant="outlined"
        @input="onOtpInput"
      ></v-otp-input>
  
      <div class="text-caption">
        <v-btn
          color="primary"
          size="x-small"
          text="Renvoyer un nouveau code"
          variant="text"
          @click="renew"
        ></v-btn>
      </div>
    </v-sheet>
        
      </v-dialog>
    </div>
  
    <div class="text-center pa-4">
      <v-dialog v-model="dialogPassword"  width="auto">
        
        <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h3 class="text-h5">Entrer votre Adresse Email</h3>
  
      <div class="text-subtitle-2 font-weight-light mb-3">
          Pour réinitialiser votre mot de passe, veuillez entrer votre 
          adresse e-mail et suivre les instructions à suivre.
      </div>
  
                      <div class="mb-6">
                      <v-text-field v-model="step3.email"  :counter="10" label="Adresse Email" name="email"   color="blue-grey-lighten-2" type="email" hide-details required variant="outlined" ></v-text-field>
                     <small v-if="v$.step3.email.$error">{{v$.step3.email.$errors[0].$message}}</small> 
                  </div>
  
      <div class="text-caption">
          <div class="boutton">
              <button class="" @click="PasswordOtp()">réinitialisation</button>
              </div>
      </div>
    </v-sheet>
        
      </v-dialog>
    </div>
  
    <div class="text-center pa-4">
      <v-dialog v-model="dialogOtpPassword"  width="auto">
        
        <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
    <small>{{  errorOtp }}</small>
      <h3 class="text-h5">Verification Code</h3>
  
      <div class="text-subtitle-2 font-weight-light mb-3">
        Veuillez entrer le code que nous avons envoyé à votre
         adresse e-mail pour réinitialiser votre mot de passe.
      </div>
  
      <v-otp-input
        v-model="step4.code"
        class="mb-8"
        divider="•"
        length="4"
        variant="outlined"
        @input="onOtpInputPassworod"
      ></v-otp-input>
  
      <div class="text-caption">
        <v-btn
          color="primary"
          size="x-small"
          text="Renvoyer un nouveau code"
          variant="text"
          @click="renew"
        ></v-btn>
      </div>
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
  import { mapActions } from 'vuex';
  export default {
    components: {
         Loading 
  
      },
  
      data() {
          return {
            loading:false,
              show1: false,
              visible:false,
              dialogOtp:false,
              dialogPassword:false, 
              dialogOtpPassword:false,
              InfoUser:'',
              errorOtp:'',
              step1:{
               email: '',
               password: '',
             },
  
               step2:{
               code:'',
          },
  
          step3:{
              email:'',
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
              code:{
          require,
        lgmin: lgmin(4),
        lgmax: lgmax(4),
              }
              
          },
          step3:{
          email: {
        require,
        ValidEmail
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
    computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
  },
    methods: {
      // ...mapActions({  saveVerificationCode: 'saveVerificationCode', }),
       ...mapActions('auth', ['setMyAuthenticatedUser']),
      async Hamdlelogin(){
  
          this.error = '',
           this.v$.step1.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
              
        let DataUser = {
          email:this.step1.email,
          password:this.step1.password,
          remember:true 
        }
        console.log("eeeee",DataUser);
        try {
        const response = await axios.post('/system/login' , DataUser);
        console.log('response.login', response.data); 
        if (response.data.status === "success") {
          this.InfoUser = response.data.data
          this.dialogOtp = true
          this.loading = false
          this.SendOtp()
          
        } else {
          
        }
       
        
        
      } catch (error) {
        console.log('response.login', error); 
  
        this.loading = false
        if (error.response.data.message === "Vous n'êtes pas autoriser à vous connecter en tant que pme.") {
         return this.error = "Accès refusé vous n'êtes pas autorisé."
          
        } else {
          return this.error = "L'authentification a échoué"
        }
      }
              }else{
              
              console.log('pas bon', this.v$.$errors);
              
              } 
      },
  
      async SendOtp(){
          this.responseEmail = true
          let DataSend = {
          email:1,
          value:this.step1.email
        }
          try {
              const response = await axios.post('/mcipme/send-otp', DataSend);
             console.log(response);
            } catch (error) {
              console.error('Erreur postlogin:', error);
            }
  
      },
      onOtpInput() {
        // Vérifiez si l'OTP est complètement saisi (longueur de 4 chiffres)
        this.errorOtp  = ''
        if (this.step2.code.length === 4) {
          // Déclenchez votre action ici, par exemple, appelez une méthode pour envoyer à l'API
          this.HamdleOtp();
        }
      },
     async  HamdleOtp(){
          this.error = '',
           this.v$.step2.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
              
              let DataUser = {
              email: true,
              value: this. step1.email,
              code: this. step2.code
          }
        console.log("eeeee",DataUser);
     
       
        try {
        const response = await axios.post('/mcipme/verification-otp' , DataUser);
        console.log('response.login', response.data); 
        if(response.data.status === 'success'){
            this.setMyAuthenticatedUser(this.InfoUser);
            if (this.InfoUser.user.Direction === 'DNI') {
                this.$router.push('/dni'); 
                this.loading = false
                  this.dialogOtp = false
              } else {
                this.$router.push('/dncic'); 
                this.loading = false
                  this.dialogOtp = false
              }
            
        }else{
        
         this.errorOtp = "Echec de vérification du code."
         this. step2.code = ''
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
            value: this.step1.email ,
          };
  
          try {
            // Effectuez une demande pour renvoyer un nouveau code par e-mail
            const response = await axios.post('/mcipme/send-otp', requestData);
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
      async ChangePassword(){
            this.dialogPassword = true
            this.error = ''
            
    
    }, 
  
    async PasswordOtp(){
  
             this.v$.step3.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
            
            let CodeUserEmail ={
              email:1,
              value:this.step3.email
            
            }
            console.log("eee",CodeUserEmail);
            try {
           const response = await axios.post('/mcipme/send-otp', CodeUserEmail);
           
           console.log('response.Code', response); 
           if (response.data.status === 'success') {
            this.dialogPassword = false
           this.dialogOtpPassword = true
           this.loading = false
           } else {
            
           }
      
      } catch (error) {
          console.log('error',error);
      }
            }else{
            
          console.log('error',this.v$.$errors);
            
            
            }
    },
  
    onOtpInputPassworod() {
        // Vérifiez si l'OTP est complètement saisi (longueur de 4 chiffres)
        this.errorOtp  = ''
        if (this.step4.code.length === 4) {
          // Déclenchez votre action ici, par exemple, appelez une méthode pour envoyer à l'API
          this.HamdleOtpPassword();
        }
      },
      async  HamdleOtpPassword(){
          this.error = '',
           this.v$.step4.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
              
              let DataUser = {
              email: true,
              value: this. step3.email,
              code: this. step4.code
          }
        console.log("eeeee",DataUser);
     
       
        try {
        const response = await axios.post('/mcipme/verification-otp' , DataUser);
        console.log('response.login', response.data); 
        if(response.data.status === 'success'){
          localStorage.setItem('resetPasswordInfo', JSON.stringify({
                    email: this.step3.email,
                    code: this.step4.code// Assurez-vous de récupérer le code correctement
                  }));
               this.$router.push('/reinitialiser2');
                this.loading = false
                this.dialogOtpPassword = false
        }else{
        
         this.errorOtp = "Echec de vérification du code."
         this. step4.code = ''
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
    top: 17%;
    right: -48px;
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
          width: 50%;
          display: flex;
    justify-content: center;
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