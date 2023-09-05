import { Vue, Component } from "vue-property-decorator";

@Component
export default class ResponsiveMixin extends Vue {
  public isMobile: boolean;
  created() {
    window.addEventListener("resize", this.checkIsMobile);
    this.checkIsMobile();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.checkIsMobile);
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 920;
  }
}
