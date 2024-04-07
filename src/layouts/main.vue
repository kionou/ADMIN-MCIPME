<script>
import Vertical from "./vertical.vue";
import Horizontal from "./horizontal.vue";

import { useLayoutStore } from "@/state/pinia";
const layoutStore = useLayoutStore();

export default {
  components: {
    Vertical,
    Horizontal
  },
  data() {
    return {};
  },
  computed: {
    layoutType() {
      return layoutStore.layoutType;
    }
  },
  methods: {},
  mounted() {
    // document.querySelector("html").setAttribute('dir', 'rtl');
  }
};
</script>

<template>
  <div>
    <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
