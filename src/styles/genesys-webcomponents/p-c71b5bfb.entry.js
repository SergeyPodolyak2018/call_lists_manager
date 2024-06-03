import { r as t, h as i, g as e } from './p-9031eb6a.js';
import { t as s } from './p-6a46bf1b.js';
import { l as a } from './p-d0805f56.js';
import { V as o } from './p-5cacdfc9.js';
const r = 'category',
  h = 'value',
  n = class {
    constructor(i) {
      t(this, i),
        (this.baseChartSpec = {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          config: { legend: { symbolType: 'circle' } },
          encoding: {
            theta: { field: 'value', type: 'quantitative', stack: !0 },
            color: { field: r, type: 'nominal', scale: { range: o }, legend: null },
            tooltip: { aggregate: 'count', type: 'quantitative' },
          },
          layer: [
            { mark: { type: 'arc', outerRadius: 80 } },
            { mark: { type: 'text', radius: 90 }, encoding: { text: { field: h, type: 'quantitative' } } },
          ],
          view: { stroke: null },
        }),
        (this.chartData = void 0),
        (this.includeLegend = void 0),
        (this.legendPosition = 'right'),
        (this.legendTitle = void 0),
        (this.colorFieldName = void 0),
        (this.outerRadius = void 0),
        (this.labelRadius = void 0),
        (this.labelField = void 0),
        (this.embedOptions = void 0);
    }
    parseData() {
      this.outerRadius || a(this.root, 'requires outer-radius');
      let t = {};
      this.chartData && (t = { data: this.chartData }),
        this.includeLegend && (this.baseChartSpec.encoding.color.legend = !0),
        this.legendPosition && (this.baseChartSpec.config.legend.orient = this.legendPosition);
      const i = this.colorFieldName || r;
      i && (this.baseChartSpec.encoding.color.field = i);
      const e = this.legendTitle;
      e && (this.baseChartSpec.encoding.color.title = e),
        (this.baseChartSpec.layer = [{ mark: { type: 'arc', outerRadius: this.outerRadius } }]);
      const s = this.labelRadius;
      s &&
        this.baseChartSpec.layer.push({
          mark: { type: 'text', radius: s },
          encoding: { text: { field: this.labelField || h, type: 'quantitative' } },
        });
      const o = Object.assign(this.baseChartSpec, t);
      this.visualizationSpec = o;
    }
    componentWillLoad() {
      s(this.root), this.parseData();
    }
    render() {
      return i('gux-visualization-beta', { visualizationSpec: this.visualizationSpec });
    }
    get root() {
      return e(this);
    }
    static get watchers() {
      return { chartData: ['parseData'] };
    }
  };
n.style = 'gux-visualization-beta{height:fit-content;color:#2e394c}';
export { n as gux_chart_pie_beta };
