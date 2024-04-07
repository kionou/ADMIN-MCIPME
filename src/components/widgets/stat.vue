<script>
/**
 * Stat component -- specify the widget icon, title and value.
 */
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>

<template>
  <BCard class="mini-stats-wid" no-body>
    <BCardBody>
      <div class="d-flex">
        <div class="flex-grow-1">
          <p class="text-muted fw-medium mb-2">{{title}}</p>
          <h4 class="mb-0 mt-3">{{value}}</h4>
        </div>

        <div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
          <span class="avatar-title" style="background-color: var(--color-primary);">
            <i :class="`${icon} font-size-24`"></i>
          </span>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<style scoped>
.card-body {
  
    padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
    color: var(--bs-card-color);
    width: 100% !important;
    height: 120px !important;
    
}
</style>