<template>
  <BaseContainer title="MẠNG LƯỚI PHỦ SÓNG CẢ NƯỚC">
    <div style="text-align: center">
      <p>
        Magic Post tự hào đã & đang mở rộng mạng lưới quốc tế để mang đến trải nghiệm tốt nhất.
      </p>
    </div>
    <SingleSkill v-for="skill in skills" :key="skill.id" :skill="skill" />
  </BaseContainer>
</template>
<script>
import SingleSkill from "./SingleSkill.vue";
import BaseContainer from "../reusable/BaseContainer.vue";

export default {
  props: ["skills"],
  name: "SkillsGrid",
  components: { SingleSkill, BaseContainer },
};
</script>
<style scoped></style>
