import { r as t, h as i, g as e } from './p-9031eb6a.js';
import { t as s } from './p-6a46bf1b.js';
import { l as a } from './p-d0805f56.js';
import { V as h } from './p-5cacdfc9.js';
const o = 'category',
  r = 'value',
  n = class {
    constructor(i) {
      t(this, i),
        (this.baseChartSpec = {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          config: { legend: { symbolType: 'circle' } },
          encoding: {
            theta: { field: 'value', type: 'quantitative', stack: !0 },
            color: { field: o, type: 'nominal', scale: { range: h }, legend: null },
          },
          layer: [
            { mark: { type: 'arc', outerRadius: 80 } },
            { mark: { type: 'text', radius: 90 }, encoding: { text: { field: r, type: 'quantitative' } } },
          ],
          view: { stroke: null },
        }),
        (this.chartData = void 0),
        (this.includeLegend = void 0),
        (this.legendPosition = 'right'),
        (this.legendTitle = void 0),
        (this.colorFieldName = void 0),
        (this.outerRadius = void 0),
        (this.innerRadius = void 0),
        (this.labelRadius = void 0),
        (this.labelField = void 0),
        (this.gauge = void 0),
        (this.centerText = void 0),
        (this.centerSubText = void 0),
        (this.showTooltip = !0),
        (this.tooltipOptions = void 0),
        (this.legendX = void 0),
        (this.legendY = void 0),
        (this.legendFontSize = void 0),
        (this.legendSymbolSize = void 0),
        (this.embedOptions = void 0);
    }
    parseData() {
      this.outerRadius || this.innerRadius || a(this.root, 'requires at least one of outer-radius or inner-radius');
      let t = {};
      this.chartData && (t = { data: this.chartData }),
        this.legendPosition && (this.baseChartSpec.config.legend.orient = this.legendPosition),
        this.includeLegend
          ? ((this.baseChartSpec.encoding.color.legend = {}),
            (this.legendX || this.legendY) &&
              ((this.baseChartSpec.config.legend.orient = 'none'),
              this.legendX && (this.baseChartSpec.encoding.color.legend.legendX = this.legendX),
              this.legendY && (this.baseChartSpec.encoding.color.legend.legendY = this.legendY)),
            this.legendFontSize && (this.baseChartSpec.encoding.color.legend.labelFontSize = this.legendFontSize),
            this.legendSymbolSize && (this.baseChartSpec.encoding.color.legend.symbolSize = this.legendSymbolSize))
          : (this.baseChartSpec.encoding.color.legend = null);
      const i = this.colorFieldName || o;
      i && (this.baseChartSpec.encoding.color.field = i);
      this.baseChartSpec.encoding.color.title = this.legendTitle || '';
      let e = this.outerRadius,
        s = this.innerRadius;
      e || (e = s + 32), s || (s = e - 32);
      let h = 1;
      this.gauge
        ? ((this.baseChartSpec.layer = [
            {
              data: { values: [{ progress: 'default', value: 100 }] },
              mark: { type: 'arc', innerRadius: s },
              encoding: { theta: { field: 'value', type: 'quantitative' }, color: { value: '#E4E9F0' }, tooltip: null },
            },
            { mark: { type: 'arc', outerRadius: e, innerRadius: s, padAngle: 0.01 } },
            { mark: { type: 'arc', innerRadius: s, padAngle: 0.01 } },
          ]),
          (h = 2))
        : (this.baseChartSpec.layer = [
            { mark: { type: 'arc', outerRadius: e, innerRadius: s } },
            { mark: { type: 'arc', innerRadius: s, stroke: '#fff' } },
          ]);
      const n = this.centerText;
      n &&
        this.baseChartSpec.layer.push({
          data: { values: [{ centerText: n, value: 0 }] },
          mark: { align: 'center', type: 'text', baseline: 'middle' },
          encoding: {
            color: { value: '#4C5054' },
            text: { field: 'centerText' },
            size: { value: { expr: 'height * 0.09' } },
            tooltip: null,
          },
        });
      const l = this.centerSubText;
      l &&
        this.baseChartSpec.layer.push({
          data: { values: [{ centerSubText: l, value: 0 }] },
          mark: { align: 'center', type: 'text', baseline: 'middle', y: { expr: 'height/2 + 20' } },
          encoding: {
            color: { value: '#6A6D70' },
            text: { field: 'centerSubText' },
            size: { value: { expr: 'height * 0.06' } },
            tooltip: null,
          },
        });
      const d = this.labelRadius,
        u = this.labelField || r;
      d &&
        this.baseChartSpec.layer.push({
          mark: { type: 'text', radius: d },
          encoding: { text: { field: u, type: 'quantitative' } },
        }),
        this.showTooltip &&
          (this.tooltipOptions
            ? ((this.baseChartSpec.layer[h].mark.tooltip = { content: 'data' }),
              (this.tooltipSpec = { actions: !1, tooltip: this.tooltipOptions }))
            : (this.baseChartSpec.encoding.tooltip = { field: u, aggregate: 'count', type: 'quantitative' }));
      const c = Object.assign(this.baseChartSpec, t);
      this.visualizationSpec = c;
    }
    componentWillLoad() {
      s(this.root), this.parseData();
    }
    render() {
      return i('gux-visualization-beta', { visualizationSpec: this.visualizationSpec, embedOptions: this.tooltipSpec });
    }
    get root() {
      return e(this);
    }
    static get watchers() {
      return { chartData: ['parseData'] };
    }
  };
n.style = 'gux-visualization-beta{height:fit-content;color:#2e394c}';
export { n as gux_chart_donut_beta };
