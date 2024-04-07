<template>
  <BRow>
    <BCol cols="12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0 font-size-18">{{ title }}</h4>
        <div style="font-weight: bolder;" >{{ statistic }}</div>
        
        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <BLink href="javascript: void(0);">{{ pageTitle }}</BLink>
            </li>
           
            <li class="breadcrumb-item active">{{ title }}</li>
          </ol>
        </div>
      </div>
    </BCol>
  </BRow>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    pageTitle: {
      type: String,
      default: '',
    },
    statistic: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
     
     
     
    };
  },

  mounted() {
    console.log("index",this.loggedInUser);
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
   shouldShowNavbar() {
    this.$store.dispatch('auth/loadMyAuthenticatedUser')
    
      return (
        this.isAuthenticated &&
        this.$route.path !== '/'
       
      );
    },
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
  },
  
  watch: {
    isAuthenticated(newValue) {
      console.log('User is logged in:', newValue);
    },
  },
  methods: {
 
  
  },
};
</script>

<style scoped>
font{
  font-weight: bolder;
}
</style>

