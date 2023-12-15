<template>
  <!-- Menu -->
  <MenuVue :links="links">Magic<span class="prim">Post</span></MenuVue>
  <HeroSection id="hero" pic="header.png">
    <template v-slot:welcome>Order delivery near you!</template>
    <template v-slot:buttons>
      <!-- <simple-button
        class="btn-primary text-white"
        url="https://github.com/Huakhanhdoan/magic_post"
        icon="fab linkedin-in"
        >Hire me!</simple-button
      > -->
      <form class="form-inline">
        <div class="form-group">
          <label for="inputDelivety" class="sr-only">address</label>
          <input type="text" class="form-control" placeholder="Enter delivery address" />
        </div>
      </form>
      <button type="submit" class="btn btn-primary mb-2">Confirm</button>
    </template>
  </HeroSection>
  <SkillsGrid id="skills" :skills="skills" />
  <ExperienceTable id="edu-exp" :experience="experience" />
  <AwardsGrid id="awards" :awards="awards" />
  <ProjectsGrid id="projects" :projects="projects" />
  <FooterVue :links="socials" :copyright="copyright" />
</template>
<script>
import MenuVue from "@/components/shared/AppMenu.vue";
import FooterVue from "@/components/shared/AppFooter.vue";
import HeroSection from "@/components/hero/HeroSection.vue";
import SkillsGrid from "@/components/skills/SkillsGrid.vue";
import ExperienceTable from "@/components/experience/ExperienceTable.vue";
import AwardsGrid from "@/components/awards/AwardsGrid.vue";
import ProjectsGrid from "@/components/projects/ProjectsGrid.vue";

// data to fill components
import skills from "@/data/skills";
import experience from "@/data/experience";
import awards from "@/data/awards";
import projects from "@/data/projects";

import SimpleButton from "@/components/reusable/SimpleButton.vue";
import HiWord from "@/components/reusable/HighlightIt.vue";

export default {
  name: "HomeView",
  data: () => {
    return {
      delay: 100,
      links: [
        {
          name: "Home",
          url: "#hero",
        },
        {
          name: "Giới thiệu",
          url: "#skills",
        },
        {
          name: "Tiêu chí",
          url: "#edu-exp",
        },
        {
          name: "Thành tích",
          url: "#awards",
        },
        {
          name: "Dịch vụ",
          url: "#projects",
        },
      ],
      skills,
      experience,
      awards,
      projects,
      socials: [
        {
          id: 2,
          icon: "fab github",
          url: "https://github.com/xtenzq",
        },
      ],
      copyright: "2023 Magic Post",
    };
  },
  components: {
    MenuVue,
    FooterVue,
    HeroSection,
    SkillsGrid,
    ExperienceTable,
    AwardsGrid,
    ProjectsGrid,
    SimpleButton,
    HiWord,
  },
};
</script>
<style lang="scss" scoped>
.prim {
  color: $primary;
}
</style>
