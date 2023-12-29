/* eslint-disable */
<template>
  <div>
    <!-- Menu -->
    <MenuVue :links="links">Magic<span class="prim">Post</span></MenuVue>
    <PageSection id="page" pic="header.png">
      <template v-slot:welcome>Tra cứu đơn hàng</template>
      <form>
        <div class="form-group" id="input">
          <input
            v-model="idOrder"
            type="input"
            class="form-control"
            id="exampleInput"
            placeholder="Nhập mã vận đơn của bạn."
          />
        </div>
        <v-btn @click="search" color="primary">Xác nhận</v-btn>
      </form>
      <div v-if="dialog" max-width="600px" style="margin-top: 20px">
        <card-infomation :idOder="idOrder"></card-infomation>
      </div>
    </PageSection>
    <HeroSection id="hero" pic="UAV.png">
      <template v-slot:welcome>Về chúng tôi</template>
      <b>MagicPost</b>
      <hi-word>
        là thương hiệu chuyển phát nhanh dựa trên sự phát triển của công nghệ và
        Internet. Chúng tôi sở hữu mạng lưới rộng khắp nhằm hỗ trợ các hoạt động
        giao nhận hàng hóa nhanh chóng không chỉ ở nội thành mà còn ở ngoại
        thành và các vùng xa của các tỉnh thành trong cả nước Việt Nam.
      </hi-word>
    </HeroSection>
    <SkillsGrid id="skills" :skills="skills" />
    <ExperienceTable id="edu-exp" :experience="experience" />
    <AwardsGrid id="awards" :awards="awards" />
    <ProjectsGrid id="projects" :projects="projects" />
    <div class="bg-dark text-white">
      <div class="d-flex justify-content-around">
        <div>
          <br />
          Magic<span class="prim">Post</span>
          <h5>CÔNG TY TNHH MỘT THÀNH VIÊN CHUYỂN PHÁT NHANH</h5>
          <div class="h7">
            Giấy CNĐKKD: 0313617136 - Ngày cấp: 13/01/2016, đăng ký thay đổi lần
            06 ngày 25/09/2018 <br />
            Cơ Quan Cấp: Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư TP Hồ
            Chí Minh
          </div>
        </div>
        <div>
          <br /><br />
          <h5>THÔNG TIN LIÊN HỆ</h5>
          <div class="h7">
            <ul class="nav flex-column">
              <li class="nav-item mb2">E-Mail: cskh@jtexpress.vn</li>
              <li class="nav-item mb2">Phone: 1900 1088</li>
              <li class="nav-item mb2">
                Address: 10 Mai Chí Thọ, P. Thủ Thiêm, Thành phố Thủ Đức, TP.
                HCM
              </li>
            </ul>
          </div>
        </div>
        <div>
          <br /><br />
          <h5>TẢI ỨNG DỤNG</h5>
          <div class="d-flex flex-row">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/Huakhanhdoan/magic_post/"
              title="Link to Download"
              class="qr-code"
              alt="Giao hàng Chuyển phát nhanh"
            />
            <div class="ml-5 d-flex flex-column">
              <a
                href="https://apps.apple.com/us/app/j-t-vnm-vip/id1474072185"
                target="_blank"
              >
                <img
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/259/6275ca259876b348340439.png"
                  alt="J&T Express - Giao hàng Chuyển phát nhanh"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.msd.VIPyueNanClient&amp;hl=vi&amp;gl=US"
                target="_blank"
              >
                <img
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/bd7/6275cabd7222d202962202.png"
                  alt="J&T Express - Giao hàng Chuyển phát nhanh"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <FooterVue :links="socials" :copyright="copyright" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuVue from "@/components/shared/AppMenu.vue";
import FooterVue from "@/components/shared/AppFooter.vue";
import PageSection from "@/components/page/PageSection.vue";
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
import CardInfomation from "../components/card/CardInfomation.vue";

export default {
  name: "HomeView",
  data: () => {
    return {
      dialog: false,
      idOrder: "",
      delay: 100,
      links: [
        {
          name: "Trang chủ",
          url: "#page",
        },
        {
          name: "Giới thiệu",
          url: "#hero",
        },
        {
          name: "Tiêu chí",
          url: "#skills",
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
          id: 1,
          icon: "fab github",
          url: "https://github.com/xtenzq",
        },
      ],
      copyright: "2023 Magic Post",
    };
  },
  components: {
    PageSection,
    MenuVue,
    FooterVue,
    HeroSection,
    SkillsGrid,
    ExperienceTable,
    AwardsGrid,
    ProjectsGrid,
    CardInfomation,
  },
  methods: {
    search() {
      this.dialog = true;
      console.log(this.idOder);
    },
  },
};
</script>
<style lang="scss" scoped>
.prim {
  color: $primary;
}

#input {
  padding-bottom: 10px;
}

h5 {
  padding-bottom: 5px;
  padding-top: 5px;
}

.h7 {
  font-size: 0.85rem;
}

.qr-code {
  height: 80px;
  width: 80px;
}
</style>
/* eslint-enable */
