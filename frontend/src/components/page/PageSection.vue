<template>
  <page-container>
    <template v-slot:picture><page-image :src="pic" /></template>
    <page-text delay="200">
      <template v-slot:welcome><slot name="welcome"></slot></template>
      <slot></slot>
      <template v-slot:buttons>
        <slot name="buttons"></slot>
      </template>
    </page-text>
  </page-container>
</template>
<script>
import PageContainer from "./PageContainer.vue";
import PageText from "./PageText.vue";
import PageImage from "./PageImage.vue";

export default {
  name: "PageSection",
  props: ["pic"],
  components: {
    PageText: PageText,
    PageImage,
    PageContainer,
  },
};
</script>
<style></style>
