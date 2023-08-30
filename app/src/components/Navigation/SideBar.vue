<template>
  <v-navigation-drawer app permanent class="side-nav" width="256">
    <div class="side-nav__logo-nav">
      <img src="@/assets/logo-image.png" alt="Swapp" />
    </div>
    <v-list flat>
      <v-subheader class="side-nav__subtitle">MEDICINE</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <BaseIcon :fill="getFilled(i)" :icon="item.icon" />
          </v-list-item-icon>
          <v-list-item-content class="subtitle2 subtitle2--side-nav">
            <span class="list-icon-text" v-text="item.name"></span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { sideBarIcons } from "@/assets/icons/icons";
import BaseIcon from "../Base/BaseIcon.vue";

@Component({
  components: {
    BaseIcon,
  },
})
export default class SideBar extends Vue {
  public name = "SideBar";
  public selectedItem = 0;
  public sideBarIcons = sideBarIcons;

  public items = [
    {
      name: "Dashboard",
      icon: this.sideBarIcons.dashboardIcon,
    },
    {
      name: "Appointments",
      icon: this.sideBarIcons.appointmentIcon,
    },
    {
      name: "Doctors",
      icon: this.sideBarIcons.doctorIcon,
    },
    {
      name: "Departments",
      icon: this.sideBarIcons.doctorIcon,
    },
    {
      name: "Patients",
      icon: this.sideBarIcons.patientIcon,
    },
    {
      name: "Payments",
      icon: this.sideBarIcons.paymentIcon,
    },
    {
      name: "Help",
      icon: this.sideBarIcons.helpIcon,
    },
  ];

  getFilled(index: number) {
    return index === this.selectedItem ? true : false;
  }
}
</script>

<style lang="scss" scoped>
.side-nav {
  box-shadow: 4px 0px 16px 0px #101e7314;
}

.side-nav__logo-nav {
  margin: 24px 90px 24px 24px;
}

.side-nav__subtitle {
  margin: 0px 90px 0px 24px;
  padding: 0px;
  color: var(--grey) !important;
}

::v-deep .v-list {
  padding: 0px !important;
}
::v-deep .v-list-item {
  padding: 0px;
  align-self: center;

  .v-list-item__icon:first-child {
    margin-right: 10px;
  }

  .v-list-item__icon {
    margin: 0px 0px 0px 24px;
    align-self: center;
  }

  .v-list-item__content {
    flex: none;
  }
}

::v-deep .v-list-item:last-child {
  border-top: 1px solid #e8e8e8;
  margin-top: 4px;
  padding-top: 10px;
}
</style>
