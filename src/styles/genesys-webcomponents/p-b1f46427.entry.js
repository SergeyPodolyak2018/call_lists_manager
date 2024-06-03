import { r as t, h as i, g as s } from './p-9031eb6a.js';
import { t as e } from './p-6a46bf1b.js';
import { V as h } from './p-5cacdfc9.js';
import { l as a } from './p-d0805f56.js';
const o = 'category',
  n = class {
    constructor(i) {
      t(this, i),
        (this.baseChartSpec = {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          mark: { type: 'line', interpolate: 'linear', point: !1 },
          config: { axis: { ticks: !1, titlePadding: 8 }, axisX: { labelAngle: 0 }, legend: { symbolType: 'circle' } },
          encoding: {
            x: { type: 'nominal' },
            y: { type: 'quantitative' },
            color: { field: o, type: 'nominal', scale: { range: h }, legend: null },
            tooltip: { aggregate: 'count', type: 'quantitative' },
          },
        }),
        (this.chartData = void 0),
        (this.xTickLabelSlant = void 0),
        (this.includeLegend = void 0),
        (this.legendPosition = 'right'),
        (this.includeDataPointMarkers = void 0),
        (this.xFieldName = void 0),
        (this.xAxisTitle = void 0),
        (this.yFieldName = void 0),
        (this.yAxisTitle = void 0),
        (this.legendTitle = void 0),
        (this.colorFieldName = void 0),
        (this.strokeDash = void 0),
        (this.interpolation = void 0),
        (this.embedOptions = void 0);
    }
    parseData() {
      (this.xFieldName && this.yFieldName) || a(this.root, 'requires x-field-name and y-field-name');
      let t = {};
      this.chartData && (t = { data: this.chartData }),
        this.xTickLabelSlant && (this.baseChartSpec.config.axisX.labelAngle = 45),
        this.includeLegend && (this.baseChartSpec.encoding.color.legend = !0),
        this.legendPosition && (this.baseChartSpec.config.legend.orient = this.legendPosition);
      const i = this.xFieldName,
        s = this.xAxisTitle,
        e = this.yFieldName,
        h = this.yAxisTitle,
        n = this.legendTitle,
        r = this.colorFieldName || o,
        l = this.interpolation,
        c = this.strokeDash,
        d = this.includeDataPointMarkers;
      i && (this.baseChartSpec.encoding.x.field = i),
        s && (this.baseChartSpec.encoding.x.title = s),
        e && (this.baseChartSpec.encoding.y.field = e),
        h && (this.baseChartSpec.encoding.y.title = h),
        r && (this.baseChartSpec.encoding.color.field = r),
        n && (this.baseChartSpec.encoding.color.title = n),
        c && (this.baseChartSpec.encoding.strokeDash = { field: r, type: 'nominal' }),
        l && (this.baseChartSpec.mark.interpolate = l),
        d && (this.baseChartSpec.mark.point = d);
      const p = Object.assign(this.baseChartSpec, t);
      this.visualizationSpec = p;
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
export { n as gux_chart_line_beta };
