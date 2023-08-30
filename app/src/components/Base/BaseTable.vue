<template>
  <div class="table-container">
    <h5>{{ title }}</h5>
    <v-data-table
      :title="title"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :hide-default-footer="hideFooter"
    >
      <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BaseTable extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly headers!: Array<any>;
  @Prop({ required: true }) readonly items!: Array<any>;
  @Prop({ default: "500px" }) readonly tableHeight!: string;
  @Prop({ default: true }) readonly hideFooter!: boolean;
  @Prop({ default: true }) readonly hideHeader!: boolean;
  @Prop({ default: false }) readonly hidePagination!: boolean;
}
</script>

<style lang="scss">
h5 {
  text-align: left;
  padding: 24px 16px;
}

.table-container {
  margin-top: 30px;
  background-color: #ffffff;
  box-shadow: 0px 12px 26px rgba(16, 30, 115, 0.06);
  border: 1px solid #ffffff;
  border-radius: 8px;
}
</style>
