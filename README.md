# MoneyMathCalc

Free financial calculators for Americans — 10 tools, zero signups.

🌐 **Live:** https://moneymathcalc.com

## Calculators

- 🏠 Mortgage Calculator
- 💰 Loan Calculator
- 🚗 Auto Loan Calculator
- 💳 Payment Calculator
- 📈 Compound Interest Calculator
- 📊 Investment Calculator
- 🏖️ Retirement Calculator
- 📑 Amortization Calculator
- 🧾 Income Tax Calculator (Federal + 50 States)
- 💵 Salary Calculator

## Features

- 100% free, no signup required
- Accurate 2026 tax data
- All 50 US states supported
- PDF export with QR code state restoration
- Privacy-first: all calculations run in your browser
- Works offline after first load (PWA)

## Tech Stack

- [Astro 4](https://astro.build/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- Vanilla JavaScript (zero framework runtime)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Performance

- 4–10 KB JavaScript per calculator
- Lazy-loaded PDF generation (jsPDF)
- Core Web Vitals optimized

## Development

```bash
npm install
npm run dev      # start dev server on :4321
npm run build    # production build to dist/
npm run preview  # preview production build
```

## License

© 2026 MoneyMathCalc. All rights reserved.
