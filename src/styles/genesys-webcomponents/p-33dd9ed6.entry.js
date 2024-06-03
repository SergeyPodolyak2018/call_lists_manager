import { r as t, h as i, g as s } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
import { V as a } from './p-5cacdfc9.js';
import { l as o } from './p-d0805f56.js';
const h = 'category',
  n = class {
    constructor(i) {
      t(this, i),
        (this.baseChartSpec = {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          params: [{ name: 'onHover', select: { type: 'point', on: 'mouseover' } }],
          config: {
            axis: { ticks: !1, titlePadding: 8, gridColor: '#F6F7F9' },
            axisX: { labelAngle: 0, grid: !0 },
            legend: { symbolType: 'circle' },
          },
          width: { step: 40 },
          encoding: {
            x: { type: 'nominal' },
            y: { type: 'quantitative' },
            color: { field: h, type: 'nominal', scale: { range: a }, legend: null },
            size: { condition: [{ param: 'onHover', empty: !1, value: 100 }], value: 40 },
          },
        }),
        (this.chartData = void 0),
        (this.xTickLabelSlant = void 0),
        (this.includeLegend = void 0),
        (this.legendPosition = 'right'),
        (this.xFieldName = void 0),
        (this.xAxisTitle = void 0),
        (this.yFieldName = void 0),
        (this.yAxisTitle = void 0),
        (this.legendTitle = void 0),
        (this.colorFieldName = void 0),
        (this.useShape = void 0),
        (this.embedOptions = void 0);
    }
    parseData() {
      (this.xFieldName && this.yFieldName) || o(this.root, 'requires x-field-name and y-field-name');
      let t = {};
      this.chartData && (t = { data: this.chartData }),
        this.xTickLabelSlant && (this.baseChartSpec.config.axisX.labelAngle = -45),
        this.legendPosition && (this.baseChartSpec.config.legend.orient = this.legendPosition);
      const i = this.xFieldName,
        s = this.xAxisTitle,
        e = this.yFieldName,
        a = this.yAxisTitle,
        n = this.legendTitle,
        l = this.useShape || 'circle',
        r = this.colorFieldName || h;
      this.includeLegend && (this.baseChartSpec.encoding.color.legend = !0),
        i && (this.baseChartSpec.encoding.x.field = i),
        s && (this.baseChartSpec.encoding.x.title = s),
        e && (this.baseChartSpec.encoding.y.field = e),
        a && (this.baseChartSpec.encoding.y.title = a),
        r && (this.baseChartSpec.encoding.color.field = r),
        n && (this.baseChartSpec.encoding.color.title = n),
        (this.baseChartSpec.mark = { type: l, filled: !0 }),
        (this.baseChartSpec.config.legend.symbolType = l),
        (this.baseChartSpec.encoding.shape = { field: r, type: 'nominal' }),
        (this.baseChartSpec.encoding.tooltip = [
          { field: i, type: 'nominal', title: s },
          { field: e, type: 'quantitative', title: a },
          { field: r, type: 'nominal', title: n },
        ]);
      const c = Object.assign(this.baseChartSpec, t);
      this.visualizationSpec = c;
    }
    componentWillLoad() {
      e(this.root), this.parseData();
    }
    render() {
      return i('gux-visualization-beta', { visualizationSpec: this.visualizationSpec });
    }
    get root() {
      return s(this);
    }
    static get watchers() {
      return { chartData: ['parseData'] };
    }
  };
n.style = 'gux-visualization-beta{height:fit-content;color:#2e394c}';
export { n as gux_chart_scatter_plot_beta };
