<template>
    <div class="bloc-modale"  >   
    <div class="overlay" ></div>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="preloader1">
                        <div class="loader loader-inner-1">
                            <div class="loader loader-inner-2">
                                <div class="loader loader-inner-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
       
    
    </div>
</template>

<script>
export default {
    name: 'DNPMECLPreloader',
    data() {
        return {
            
             };
            },
mounted() { 
   
},
methods: {},
};
</script>

<style lang="css" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 10px;
  overflow: hidden;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.container-fluid{padding:2em 0em 4em 0em;}
.container{padding:2em 0em 5em 0em;}

/********************  Preloader Demo-1 *******************/
.preloader1,.preloader1 .loader{display:flex;align-content:center}
.preloader1{height:100%;width:100%;padding:20px 0;flex-flow:column wrap;justify-content:center;align-items:center;perspective:700}
.preloader1 .loader{text-align:center;margin:5px;border-radius:50%;border:4px solid #f91010;flex-flow:column wrap;justify-content:center;align-items:center;transform-style:preserve-3d;position:relative}
.preloader1 .preloader1 .loader-inner-1{animation:change_first_circle 2s ease-in-out infinite ; border:4px solid #f91010;}
.preloader1 .loader-inner-2{animation:change_second_circle 2s ease-in-out infinite ; border:4px solid #f9d310;}
.preloader1 .loader-inner-3{width:100px;height:100px;animation:change_last_circle 3s linear infinite ; border:4px solid #139864;}
@keyframes change_first_circle{
    50%{transform:rotateX(360deg) scale(.8)}
}
@keyframes change_second_circle{
    50%{transform:rotateY(360deg) scale(.8)}
}
@keyframes change_last_circle{
    50%{transform:rotateX(360deg) scale(.8)}
}











</style>