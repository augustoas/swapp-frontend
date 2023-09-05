<template>
  <highcharts
    ref="baseCharts"
    class="highchart-container"
    :options="chartOptions"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as Highcharts from "highcharts";

export const defaultFontStyles = {
  color: "#CACCCF",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.2px",
  fontFamily: "Lato",
};

const defaultTitleFontStyle = {
  color: "#25282B",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0.2px",
  fontFamily: "Lato",
};

const defaultYAxis = {
  title: {
    text: "",
  },
  min: 0,
  tickAmount: 7,
  labels: {
    style: { ...defaultFontStyles },
  },
  gridLineDashStyle: "longdash",
};

const defaultXAxis = {
  labels: {
    align: "right",
    style: { ...defaultFontStyles },
  },
};

const defaultLegend = {
  useHTML: true,
  align: "right",
  verticalAlign: "top",
  symbolHeight: 3,
  squareSymbol: false,
  itemStyle: {
    lineHeight: "25px",
    color: "var(--grey)",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "700",
  },
};

const defaultPlotOptions = {
  series: {
    states: {
      inactive: {
        opacity: 0.8,
      },
    },
  },
};

@Component
export default class BaseHighchart extends Vue {
  @Prop({ required: true }) readonly series!: Array<any>;
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly type!: string;
  @Prop() readonly plotOptions!: Highcharts.PlotOptions | undefined;
  @Prop() readonly categories!: string[];
  @Prop() readonly yAxis!: Highcharts.YAxisOptions | undefined;
  @Prop() readonly xAxis!: Highcharts.YAxisOptions | undefined;
  @Prop({ default: () => ({}) }) readonly tooltip!: any;
  @Prop({ default: false }) readonly hideLegendSymbols!: boolean;

  public get chartOptions() {
    return {
      series: [...this.series],
      chart: {
        type: this.type,
        marginLeft: 50,
        marginRight: 20,
        marginTop: 100,
      },
      title: {
        text: this.title,
        align: "left",
        x: 10,
        y: 40,
        style: { ...defaultTitleFontStyle },
      },
      legend: {
        ...defaultLegend,
        symbolWidth: this.hideLegendSymbols ? 0 : 30,
      },
      xAxis: { ...defaultXAxis, ...this.xAxis },
      yAxis: { ...defaultYAxis, ...this.yAxis },
      plotOptions: { ...defaultPlotOptions, ...this.plotOptions },
      credits: {
        enabled: false,
      },
      tooltip: {
        ...this.tooltip,
      },
    };
  }
}
</script>

<style lang="scss" scoped>
.highchart-container {
  margin-top: 30px;
  border: solid 1px #ffffff;
  box-shadow: 0px 12px 26px rgba(16, 30, 115, 0.06);
  border-radius: 8px;
}
</style>
