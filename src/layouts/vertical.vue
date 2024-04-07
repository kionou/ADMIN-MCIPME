<script>
import router from "@/router";

import NavBar from "@/components/nav-bar.vue";
import SideBar from "@/components/side-bar.vue";
import RightBar from "@/components/right-bar.vue";
import Footer from "@/components/footer.vue";

import { useLayoutStore } from "@/state/pinia";
const layoutStore = useLayoutStore();

/**
 * Vertical layout
 */
export default {
  components: { NavBar, SideBar, RightBar, Footer },
  data() {
    return {
      type: layoutStore.leftSidebarType,
      isMenuCondensed: false
    };
  },
  computed: {
    layoutWidth() {
      return layoutStore.layoutWidth;
    },
    leftSidebarType() {
      return layoutStore.leftSidebarType;
    },
    loader() {
      return layoutStore.loader;
    },
    mode() {
      return layoutStore.mode
    }
  },
  created: () => {
    document.body.removeAttribute("data-layout", "horizontal");
    document.body.removeAttribute("data-topbar", "dark");
    document.body.removeAttribute("data-layout-size", "boxed");
    document.body.classList.remove("auth-body-bg");
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    }
  },
  mounted() {
  
  }
};
</script>

<template>
  <div>
   
    <div id="layout-wrapper">
      <NavBar />
      <SideBar
        :is-condensed="isMenuCondensed"
        :type="leftSidebarType"
        :width="layoutWidth"
        :mode="mode"
      />
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div>
            <slot />
          </div>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>
