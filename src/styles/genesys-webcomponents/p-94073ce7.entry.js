import { r as t, h as i, g as s } from './p-9031eb6a.js';
import { t as a } from './p-6a46bf1b.js';
import { V as e } from './p-5cacdfc9.js';
import { l as h } from './p-d0805f56.js';
const o = class {
  constructor(i) {
    t(this, i),
      (this.baseChartSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        mark: { type: 'bar' },
        config: {
          axis: { ticks: !1, titlePadding: 8 },
          axisX: { labelAngle: 0 },
          scale: { bandPaddingInner: 0.4, bandPaddingOuter: 0.4 },
          legend: { symbolType: 'circle' },
          bar: { color: e[0] },
        },
        encoding: {
          x: { type: 'nominal' },
          y: { type: 'quantitative' },
          tooltip: { aggregate: 'count', type: 'quantitative' },
        },
      }),
      (this.chartData = void 0),
      (this.xTickLabelSlant = void 0),
      (this.includeLegend = void 0),
      (this.xFieldName = void 0),
      (this.yFieldName = void 0),
      (this.xAxisTitle = void 0),
      (this.yAxisTitle = void 0),
      (this.legendTitle = void 0),
      (this.legendPosition = 'right'),
      (this.chartLayers = void 0),
      (this.embedOptions = void 0);
  }
  parseData() {
    (this.xFieldName && this.yFieldName) || h(this.root, 'requires x-field-name and y-field-name');
    let t = {};
    this.chartData && (t = { data: this.chartData }),
      this.xTickLabelSlant && (this.baseChartSpec.config.axisX.labelAngle = 45),
      this.includeLegend && (this.baseChartSpec.encoding.color = { field: 'category' }),
      this.legendPosition && (this.baseChartSpec.config.legend.orient = this.legendPosition);
    const i = this.xFieldName,
      s = this.yFieldName,
      a = this.xAxisTitle,
      o = this.yAxisTitle,
      r = this.legendTitle;
    if (this.chartLayers) {
      const t = this.chartLayers.map(t => ({
        mark: 'bar',
        transform: [{ filter: { field: 'series', equal: t } }],
        encoding: { x: { field: i, type: 'nominal' }, y: { field: s, type: 'quantitative' } },
      }));
      this.baseChartSpec.layer = t;
    } else
      i && (this.baseChartSpec.encoding.x.field = i),
        s && (this.baseChartSpec.encoding.y.field = s),
        a && (this.baseChartSpec.encoding.x.title = a),
        o && (this.baseChartSpec.encoding.y.title = o),
        r && (this.baseChartSpec.encoding.color.title = r);
    this.baseChartSpec.config.range = { [i]: e };
    const n = Object.assign(this.baseChartSpec, t);
    this.visualizationSpec = n;
  }
  componentWillLoad() {
    a(this.root), this.parseData();
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
o.style =
  'gux-visualization-beta{height:fit-content;color:#2e394c;}gux-visualization-beta .mark-rect.layer_0_marks path{fill:url(#diagonalHatch0)}gux-visualization-beta .mark-rect.layer_1_marks path{fill:#1da8b3}';
export { o as gux_chart_column_beta };
