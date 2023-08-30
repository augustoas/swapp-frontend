<template>
  <BaseHighchart
    ref="chart"
    :categories="categories"
    :title="title"
    :type="type"
    :series="series"
    :hide-legend-symbols="true"
    :tick-amount="6"
    :y-axis="yAxis"
    :x-axis="xAxis"
    :tooltip="tooltip"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseHighchart, {
  defaultFontStyles,
} from "@/components/Base/BaseHighchart.vue";
import * as Highcharts from "highcharts";

@Component({
  components: {
    BaseHighchart,
  },
})
export default class CurrentMonthChart extends Vue {
  public title = "$ 100,000";
  public type = "spline";

  public categories: string[] = [
    "1 July",
    "8 July",
    "16 July",
    "24 July",
    "31 July",
  ];

  public marker = {
    fillColor: "#A9C1FD",
    enabled: true,
    symbol: "circle",
    lineColor: "#FFFFFF",
    radius: 6,
    lineWidth: 3,
  };

  public series = [
    {
      name: "Income in current month",
      data: [35000, 140000, 25000, 60000, 40000],
      color: "#336CFB",
      marker: this.marker,
    },
  ];

  public get xAxis(): Highcharts.AxisOptions {
    return {
      categories: this.categories,
    };
  }

  public get yAxis(): Highcharts.YAxisOptions {
    return {
      tickAmount: 6,
      labels: {
        style: { ...defaultFontStyles },
        formatter: function () {
          return "$" + this.axis.defaultLabelFormatter.call(this);
        },
      },
    };
  }

  public get tooltip() {
    return {
      useHTML: true,
      borderColor: "#FFFFFF",
      backgroundColor: "#FFFFFF",

      formatter(this: Highcharts.TooltipFormatterContextObject) {
        const tooltipHtml: string[] = [];
        const legendBoxStyle =
          "backgroundColor: #FFFFFF; width: 64px; text-align: center;  ";
        const legendTextStyle =
          "font-size: 12px; font-weight: 700; color: #336CFB;";

        const tooltip = `
          <div style="${legendBoxStyle}">
            <span style="${legendTextStyle}">
              $ ${this.y}
            </span>
          </div>
      `;

        tooltipHtml.push(tooltip);
        return tooltipHtml;
      },
    };
  }
}
</script>

<style lang="scss"></style>
