/**
 * calc-helpers.ts — Shared DOM/input helpers for all calculator pages.
 * Pure browser utilities; no calculation logic.
 */

export function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

export function parseDollar(id: string): number {
  const el = $(id) as HTMLInputElement | null;
  if (!el) return 0;
  return parseFloat(el.value.replace(/[^0-9.]/g, '')) || 0;
}

export function parseDecimal(id: string): number {
  const el = $(id) as HTMLInputElement | null;
  if (!el) return 0;
  // Accept "6.40" (US) or "6,40" (BR/EU locale typo) — always parse as decimal
  return parseFloat(el.value.replace(',', '.').replace(/[^0-9.]/g, '')) || 0;
}

export function normalizeDecimalInput(id: string, decimals: number = 2): void {
  const el = $(id) as HTMLInputElement | null;
  if (!el) return;
  const v = parseDecimal(id);
  if (!isNaN(v) && v > 0) el.value = v.toFixed(decimals);
}

export function formatDollarInput(id: string): void {
  const el = $(id) as HTMLInputElement | null;
  if (!el) return;
  const v = parseFloat(el.value.replace(/[^0-9.]/g, ''));
  if (!isNaN(v)) el.value = Math.round(v).toLocaleString('en-US');
}

export function setText(id: string, val: string): void {
  const el = $(id);
  if (el) el.textContent = val;
}

export function setHtml(id: string, val: string): void {
  const el = $(id);
  if (el) el.innerHTML = val;
}

export function showEl(id: string, visible: boolean): void {
  const el = $(id);
  if (!el) return;
  visible ? el.classList.remove('hidden') : el.classList.add('hidden');
}

export function showToast(msg: string): void {
  const existing = document.getElementById('_toast_overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = '_toast_overlay';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'display:flex', 'align-items:center',
    'justify-content:center', 'z-index:9999', 'pointer-events:none',
  ].join(';');

  const box = document.createElement('div');
  box.style.cssText = [
    'background:#fff', 'border:2px solid #0052CC', 'border-radius:12px',
    'padding:20px 32px', 'box-shadow:0 20px 60px rgba(0,0,0,0.18)',
    'display:flex', 'align-items:center', 'gap:12px',
    'font-family:Inter,sans-serif', 'font-size:1.05rem', 'font-weight:600',
    'color:#111827', 'opacity:0', 'transform:scale(0.9)',
    'transition:opacity 0.18s ease,transform 0.18s ease',
  ].join(';');

  box.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B876" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${msg}`;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    box.style.opacity = '1';
    box.style.transform = 'scale(1)';
  });

  setTimeout(() => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => overlay.remove(), 200);
  }, 2000);
}
