/**
 * pdf-footer.ts — Shared PDF footer with QR code + hyperlink for all calculator pages.
 * Called by each calculator's savePDF() function before doc.save().
 */

/**
 * Appends a branded footer to the last page of the provided jsPDF document.
 * The footer contains a QR code linking back to the live calculator with the
 * current querystring values, a clickable hyperlink, and attribution text.
 *
 * @param doc        - jsPDF instance (typed as `any` to avoid importing jsPDF types here)
 * @param shareUrl   - Full URL including querystring (window.location.href at time of save)
 * @param calcTitle  - Human-readable title for the calculation (e.g. "Mortgage Calculation")
 */
export async function addPdfFooter(
  doc: any,
  shareUrl: string,
  calcTitle: string,
): Promise<void> {
  // Normalize localhost dev URLs to production domain
  const pdfShareUrl = shareUrl.replace(/^https?:\/\/localhost:\d+/, 'https://moneymathcalc.com');
  shareUrl = pdfShareUrl;
  const pageCount: number = doc.internal.getNumberOfPages();
  const pageH: number = doc.internal.pageSize.getHeight(); // 297mm for A4
  const pageW: number = doc.internal.pageSize.getWidth();  // 210mm for A4

  // If current y-position on last page is too close to bottom, add new page for footer
  doc.setPage(pageCount);
  const FOOTER_HEIGHT = 42; // mm
  const footerTop = pageH - FOOTER_HEIGHT;

  // ── Separator line ──────────────────────────────────────────────────────────
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(20, footerTop, pageW - 20, footerTop);

  // ── QR Code ─────────────────────────────────────────────────────────────────
  const QR_SIZE = 24; // mm
  const QR_X = 20;
  const QR_Y = footerTop + 4;

  try {
    const { default: QRCode } = await import('qrcode');
    const qrDataUrl: string = await (QRCode as any).toDataURL(shareUrl, {
      width: 256,  // px — rendered at 256px, scaled to QR_SIZE mm in PDF
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    });
    doc.addImage(qrDataUrl, 'PNG', QR_X, QR_Y, QR_SIZE, QR_SIZE);
  } catch (_err) {
    // QR generation failed — draw a placeholder box instead
    doc.setDrawColor(180, 180, 180);
    doc.rect(QR_X, QR_Y, QR_SIZE, QR_SIZE);
    doc.setFontSize(5);
    doc.setTextColor(160, 160, 160);
    doc.text('QR', QR_X + QR_SIZE / 2 - 2, QR_Y + QR_SIZE / 2);
  }

  // ── Text block ──────────────────────────────────────────────────────────────
  const TEXT_X = QR_X + QR_SIZE + 4; // 4mm gap right of QR
  const MAX_URL_LEN = 72;
  const displayUrl =
    shareUrl.length > MAX_URL_LEN
      ? shareUrl.substring(0, MAX_URL_LEN - 3) + '...'
      : shareUrl;

  // Label
  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);
  doc.text('Recalculate or share online:', TEXT_X, footerTop + 10);

  // Hyperlink URL (blue, clickable in PDF viewers)
  doc.setTextColor(0, 82, 204);
  doc.textWithLink(displayUrl, TEXT_X, footerTop + 18, { url: shareUrl });

  // Attribution + disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(155, 155, 155);
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  doc.text(
    `Powered by MoneyMathCalc.com  ·  ${calcTitle}  ·  Generated ${dateStr}`,
    TEXT_X,
    footerTop + 26,
  );
  doc.text(
    'Results are estimates for educational purposes only. Not financial advice. Consult a licensed professional.',
    TEXT_X,
    footerTop + 32,
  );
}
