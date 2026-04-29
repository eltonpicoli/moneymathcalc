export interface PieSegment {
  label: string;
  value: number;
  color: string;
}

export interface LinePoint {
  x: number;
  y: number;
}

export interface ChartOptions {
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  formatY?: (v: number) => string;
}

/**
 * Generates an SVG pie chart string from segments.
 * Returns empty string if all values are zero.
 */
export function generatePieChart(segments: PieSegment[]): string {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return '';

  const cx = 100;
  const cy = 100;
  const r = 80;
  let paths = '';
  let startAngle = -Math.PI / 2;

  for (const seg of segments) {
    if (seg.value === 0) continue;
    const slice = (seg.value / total) * 2 * Math.PI;
    const endAngle = startAngle + slice;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = slice > Math.PI ? 1 : 0;
    const pct = ((seg.value / total) * 100).toFixed(1);
    paths += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z" fill="${seg.color}" stroke="white" stroke-width="2" class="ct-pie-slice" data-label="${seg.label}" data-value="${seg.value}" data-pct="${pct}" data-total="${total}"/>`;
    startAngle = endAngle;
  }

  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Payment breakdown chart">${paths}</svg>`;
}

/**
 * Generates a simple SVG line chart.
 * points: array of {x, y} — x is the year/period, y is the value.
 */
export function generateLineChart(
  points: LinePoint[],
  options: ChartOptions = {}
): string {
  if (points.length < 2) return '';

  const {
    width = 560,
    height = 280,
    formatY = (v: number) => `$${Math.round(v).toLocaleString()}`,
  } = options;

  const padLeft = 70;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 40;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = 0;
  const maxY = Math.max(...ys) * 1.05;

  const toSvgX = (x: number) =>
    padLeft + ((x - minX) / (maxX - minX || 1)) * chartW;
  const toSvgY = (y: number) =>
    padTop + chartH - ((y - minY) / (maxY - minY || 1)) * chartH;

  const polyline = points
    .map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`)
    .join(' ');

  // Y-axis labels (5 ticks)
  const yTicks = Array.from({ length: 5 }, (_, i) => minY + (maxY / 4) * i);
  const yAxisLines = yTicks
    .map(v => {
      const y = toSvgY(v);
      return `<line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#E5E7EB" stroke-width="1"/>
              <text x="${padLeft - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6B7280">${formatY(v)}</text>`;
    })
    .join('');

  // X-axis labels (show first, middle, last)
  const xSamples = [points[0], points[Math.floor(points.length / 2)], points[points.length - 1]];
  const xAxisLabels = xSamples
    .map(p => `<text x="${toSvgX(p.x)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6B7280">${p.x}</text>`)
    .join('');

  const dataPoints = points.map(p => ({
    x: p.x,
    svgX: Math.round(toSvgX(p.x) * 10) / 10,
    svgY: Math.round(toSvgY(p.y) * 10) / 10,
    formatted: formatY(p.y),
  }));
  const dataAttr = JSON.stringify(dataPoints).replace(/'/g, '&#39;');

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Balance over time chart">
  <style>polyline { fill: none; stroke: #0052CC; stroke-width: 2.5; stroke-linejoin: round; }</style>
  ${yAxisLines}
  <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#E5E7EB" stroke-width="1"/>
  <polyline points="${polyline}"/>
  ${xAxisLabels}
  <g class="ct-guide" visibility="hidden">
    <line class="ct-guide-line" x1="0" x2="0" y1="${padTop}" y2="${padTop + chartH}" stroke="#374151" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
    <circle class="ct-guide-dot" cx="0" cy="0" r="4" fill="#0052CC" stroke="white" stroke-width="2"/>
  </g>
  <rect class="ct-line-overlay" x="${padLeft}" y="${padTop}" width="${chartW}" height="${chartH}" fill="transparent" data-points='${dataAttr}'/>
</svg>`;
}

export interface DualLineOptions extends ChartOptions {
  label1?: string;
  label2?: string;
  color1?: string;
  color2?: string;
}

/**
 * Generates a dual-line SVG chart: line1 (dashed, lower) and line2 (solid, upper).
 * Fills area between lines and base area for contributions.
 */
export function generateDualLineChart(
  line1: LinePoint[],
  line2: LinePoint[],
  options: DualLineOptions = {}
): string {
  if (line1.length < 2 || line2.length < 2) return '';

  const {
    width = 560,
    height = 280,
    formatY = (v: number) => `$${Math.round(v / 1000)}k`,
    label1 = 'Principal',
    label2 = 'Balance',
    color1 = '#9CA3AF',
    color2 = '#0052CC',
  } = options;

  const padLeft = 70;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 56;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const allY = [...line1.map(p => p.y), ...line2.map(p => p.y)];
  const xs = line2.map(p => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...allY) * 1.05;
  const minY = 0;

  const toSvgX = (x: number) => padLeft + ((x - minX) / (maxX - minX || 1)) * chartW;
  const toSvgY = (y: number) => padTop + chartH - ((y - minY) / (maxY - minY || 1)) * chartH;

  const baseY = toSvgY(0);

  // Polygon for base (contributions fill)
  const contrib1 = line1.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const contrib1Rev = [...line1].reverse().map(p => `${toSvgX(p.x)},${baseY}`);
  const contribPoly = `${contrib1} ${padLeft + chartW},${baseY} ${padLeft},${baseY}`;

  // Polygon for interest area (between line1 and line2)
  const line2Pts = line2.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const line1RevPts = [...line1].reverse().map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
  const interestPoly = `${line2Pts} ${line1RevPts}`;

  // Y-axis ticks (5)
  const yTicks = Array.from({ length: 5 }, (_, i) => (maxY / 4) * i);
  const yAxisLines = yTicks.map(v => {
    const y = toSvgY(v);
    return `<line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#E5E7EB" stroke-width="1"/>
    <text x="${padLeft - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6B7280">${formatY(v)}</text>`;
  }).join('');

  // X-axis labels
  const xSamples = [line2[0], line2[Math.floor(line2.length / 2)], line2[line2.length - 1]];
  const xAxisLabels = xSamples.map(p =>
    `<text x="${toSvgX(p.x)}" y="${padTop + chartH + 16}" text-anchor="middle" font-size="11" fill="#6B7280">${p.x}</text>`
  ).join('');

  // Legend
  const legendY = height - 14;
  const legend = `
    <rect x="${padLeft + 4}" y="${legendY - 9}" width="18" height="3" fill="${color1}" rx="1" opacity="0.7"/>
    <text x="${padLeft + 26}" y="${legendY}" font-size="11" fill="#6B7280">${label1}</text>
    <rect x="${padLeft + 110}" y="${legendY - 9}" width="18" height="3" fill="${color2}" rx="1"/>
    <text x="${padLeft + 132}" y="${legendY}" font-size="11" fill="#374151">${label2}</text>`;

  const dataPoints = line2.map((p2, i) => {
    const p1 = line1[i] !== undefined ? line1[i] : line1[line1.length - 1];
    return {
      x: p2.x,
      svgX: Math.round(toSvgX(p2.x) * 10) / 10,
      svgY1: Math.round(toSvgY(p1.y) * 10) / 10,
      svgY2: Math.round(toSvgY(p2.y) * 10) / 10,
      formatted1: formatY(p1.y),
      formatted2: formatY(p2.y),
      label1,
      label2,
    };
  });
  const dataAttr = JSON.stringify(dataPoints).replace(/'/g, '&#39;');

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Investment growth chart">
  ${yAxisLines}
  <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#E5E7EB" stroke-width="1"/>
  <polygon points="${contribPoly}" fill="#F3F4F6" opacity="0.8"/>
  <polygon points="${interestPoly}" fill="#E6F0FF" opacity="0.8"/>
  <polyline points="${contrib1}" fill="none" stroke="${color1}" stroke-width="2" stroke-dasharray="5,3"/>
  <polyline points="${line2Pts}" fill="none" stroke="${color2}" stroke-width="2.5" stroke-linejoin="round"/>
  ${xAxisLabels}
  ${legend}
  <g class="ct-guide" visibility="hidden">
    <line class="ct-guide-line" x1="0" x2="0" y1="${padTop}" y2="${padTop + chartH}" stroke="#374151" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
    <circle class="ct-guide-dot-1" cx="0" cy="0" r="4" fill="${color1}" stroke="white" stroke-width="2"/>
    <circle class="ct-guide-dot-2" cx="0" cy="0" r="4" fill="${color2}" stroke="white" stroke-width="2"/>
  </g>
  <rect class="ct-line-overlay" x="${padLeft}" y="${padTop}" width="${chartW}" height="${chartH}" fill="transparent" data-points='${dataAttr}'/>
</svg>`;
}

/**
 * Generates a legend HTML string for a pie chart.
 */
export function generatePieLegend(segments: PieSegment[], total: number): string {
  return segments
    .filter(s => s.value > 0)
    .map(s => {
      const pct = total > 0 ? ((s.value / total) * 100).toFixed(1) : '0';
      return `<div class="flex items-center gap-2 text-sm">
        <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${s.color}"></span>
        <span class="text-gray-700">${s.label}</span>
        <span class="text-gray-500 ml-auto">${pct}%</span>
      </div>`;
    })
    .join('');
}
