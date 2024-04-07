

<template>
  <div class="account-pages my-5 pt-5">
    <BContainer>
      <BRow class="justify-content-center">
        <BCol md="8" lg="6" xl="5">
          <BCard no-body class="overflow-hidden">
            <div class="bg-primary-subtle">
              <BRow>
                <BCol cols="7">
                  <div class="text-primary p-4">
                    <h5 class="text-primary">Réinitialiser le mot de passe</h5>
                  
                  </div>
                </BCol>
                <BCol cols="5">
                  <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
                </BCol>
              </BRow>
            </div>
            <BCardBody class="pt-0">
              <div>
                <BLink href="/">
                  <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle">
                    <img src="@/assets/img/armoirie.png" alt style="width: 75%; height: 75%;"/>
                  </span>
                </div>
                </BLink>
              </div>

              <div class="p-2">
                <small>{{ error }}</small>
                <BForm class="p-2" >
              <BFormGroup class="mb-3" id="input-group-1" label="Mot de passe" label-for="input-1">
              <MazInput v-model="password"  no-radius type="password"  color="info" placeholder="abc123@&"  />
              <small v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</small> 
              </BFormGroup>

              <BFormGroup class="mb-3" id="input-group-2" label="Confirmer le Mot de passe" label-for="input-2">
                <MazInput v-model="confirmer_password"  no-radius type="password" color="info" placeholder="abc123@&" />
                <small v-if="v$.confirmer_password.$error">{{v$.confirmer_password.$errors[0].$message}}</small> 
                <small v-if="!validatePasswordsMatch()" >Les mots de passe ne correspondent pas.</small>
              </BFormGroup>
          
              <div class="boutton">
                     <button class="" @click="submit()">Valider</button>
                     </div>
             
              
            </BForm>
              </div>
            </BCardBody>
          </BCard>
        
        </BCol>
      </BRow>
    </BContainer>

    <BModal v-model="dialogpassword" hide-footer centered header-class="border-0">
      <div>
    
    <div class="account-pages ">
      <BContainer>
        <BRow >
          <BCol >
            <BCard no-body class="overflow-hidden" style=" box-shadow:none !important;
             border: 1px solid #c9d1d9 !important;">
              Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous
               connecter en toute sécurité. Merci pour votre vigilance en matière de sécurité !   
            </BCard>
            
          </BCol>
        </BRow>
      </BContainer>
    </div>
  </div>
    </BModal>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
  import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
  import axios from '@/lib/axiosConfig.js'
  import Loading from '@/components/others/loading.vue';

/**
 * Recover password Sample page
 */
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
      

};
</script>
