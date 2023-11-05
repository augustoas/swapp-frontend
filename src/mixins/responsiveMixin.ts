import { Vue, Component } from "vue-property-decorator";

@Component
export default class ResponsiveMixin extends Vue {
  public isMobile: boolean = window.innerWidth < 840;
  created() {
    window.addEventListener("resize", this.checkIsMobile);
    this.checkIsMobile();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.checkIsMobile);
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 840;
  }
}
