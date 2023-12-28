<template>
  <section
    class="vh-100 d-flex justify-content-center align-items-center"
    style="background-color: aliceblue"
  >
    <div class="container py-5">
      <div class="row flex-lg-row-reverse align-items-center g-md-5 py-5">
        <slot name="picture"></slot>
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "PageContainer",
  props: ["delay"],
};
</script>
<style></style>
