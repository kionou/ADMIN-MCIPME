<script>
import simplebar from "simplebar-vue";
import { layout1, layout2, layout3 } from "../assets/images/layouts/data";
import { useLayoutStore } from "@/state/pinia";
const layoutStore = useLayoutStore();
/**
 * Right sidebar component
 */
export default {
  setup() {
    
  },
  components: {
    simplebar
  },
  data() {
    return {
      layout1, layout2, layout3,
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"]
      }
    };
  },
  methods: {
    hide() {
      this.$parent.toggleRightSidebar();
    },
    handleRightBarClick() {
      this.$parent.hideRightSidebar();
    },
    middleware(event) {
      if (event.target.classList)
        return !event.target.classList.contains("toggle-right");
    }
  },
  computed: {
    layout: {
      get() {
        return layoutStore.layoutType;
      },
      set(layout) {
        layoutStore.changeLayoutType(layout);
      }
    },
    mode: {
      get() {
        return layoutStore.mode;
      },
      set(mode) {
        layoutStore.changeMode(mode);
      }
    },
  
    topbar: {
      get() {
        return layoutStore.topbar;
      },
      set(topbar) {
        layoutStore.changeTopbar(topbar);
      }
    },
    sidebarType: {
      get() {
        return layoutStore.leftSidebarType;
      },
      set(type) {
        layoutStore.changeLeftSidebarType(type);
      }
    },
    loader: {
      get() {
        return layoutStore.loader;
      },
      set(value) {
        layoutStore.changeLoaderValue(value);
      }
    }
  }
};
</script>

<template>
  <div>
    <div v-click-outside="config" class="right-bar">
      <simplebar class="h-100">
        <div class="rightbar-title px-3 py-4 d-flex">
          <h5 class="m-0">Settings</h5>
          <BLink href="javascript:void(0);" class="right-bar-toggle ms-auto" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
          </BLink>
        </div>
        <hr class="mt-0" />
        <div class="p-3">
          <h6 class="mb-0">Layout</h6>
          <hr class="mt-1" />

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="layout" id="layout-radio1" value="vertical"
              v-model="layout" />
            <label class="form-check-label" for="layout-radio1">Vertical</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="layout" id="layout-radio2" value="horizontal"
              v-model="layout" />
            <label class="form-check-label" for="layout-radio2">Horizontal</label>
          </div>
         

         

        </div>
        
      </simplebar>
    </div>
 
    <div class="rightbar-overlay"></div>
  </div>
</template>