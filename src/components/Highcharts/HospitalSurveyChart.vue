<template>
  <BaseHighchart
    ref="chart"
    :categories="categories"
    :title="title"
    :type="type"
    :series="series"
    :x-axis="xAxis"
    :tooltip="tooltip"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseHighchart from "@/components/Base/BaseHighchart.vue";
import * as Highcharts from "highcharts";

@Component({
  components: {
    BaseHighchart,
  },
})
export default class HospitalSurveyChart extends Vue {
  public title = "Hospital Survey";
  public type = "areaspline";

  public categories: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  public get xAxis(): Highcharts.AxisOptions {
    return {
      categories: this.categories,
    };
  }

  public marker = {
    fillColor: "#FFFFFF",
    lineWidth: 1,
    enabled: false,
    symbol: "circle",
    lineColor: null as unknown,
  };

  public series = [
    {
      name: "Patients 2019",
      data: [140, 90, 250, 120, 200, 220, 150, 110, 80, 120, 180, 250],
      color: "#336CFB",
      marker: this.marker,
      fillColor: {
        linearGradient: [0, 0, 0, 200],
        stops: [
          [0, Highcharts.color("#336CFB").setOpacity(0.3).get("rgba")],
          [1, Highcharts.color("#336CFB").setOpacity(0.02).get("rgba")],
        ],
      },
    },
    {
      name: "Patients 2020",
      data: [70, 130, 100, 110, 140, 80, 65, 95, 160, 200, 140, 120],
      color: "#FAC032",
      marker: this.marker,
      fillColor: {
        linearGradient: [0, 0, 0, 200],
        stops: [
          [0, Highcharts.color("#FAC032").setOpacity(0.3).get("rgba")],
          [1, Highcharts.color("#FAC032").setOpacity(0.02).get("rgba")],
        ],
      },
    },
  ];

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
              ${this.y}
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
