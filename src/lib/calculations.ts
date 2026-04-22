/**
 * calculations.ts — Biblioteca de cálculos financeiros
 *
 * Funções puras, testáveis, sem dependências.
 * Todos os cálculos rodam client-side (no browser do usuário).
 * Nenhum dado é enviado pra servidor.
 */

// ============================================================================
// MORTGAGE / LOAN CALCULATIONS
// ============================================================================

/**
 * Calcula o pagamento mensal de uma hipoteca (fórmula padrão de amortização).
 *
 * @param principal - Valor principal do empréstimo (ex: 300000)
 * @param annualRate - Taxa de juros anual em % (ex: 6.5 para 6.5%)
 * @param years - Número de anos (ex: 30)
 * @returns Pagamento mensal em dólares
 */
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return payment;
}

/**
 * Gera cronograma de amortização completo.
 * Retorna array com cada mês mostrando: juros, principal, saldo.
 */
export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  years: number
): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  const payment = calculateMortgagePayment(principal, annualRate, years);

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = payment - interestPayment;
    balance -= principalPayment;
    cumulativeInterest += interestPayment;
    cumulativePrincipal += principalPayment;

    schedule.push({
      month,
      payment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  return schedule;
}

/**
 * Calcula pagamento total ao longo da vida do empréstimo.
 */
export function calculateTotalPayment(
  principal: number,
  annualRate: number,
  years: number
): { totalPaid: number; totalInterest: number } {
  const monthlyPayment = calculateMortgagePayment(principal, annualRate, years);
  const totalPaid = monthlyPayment * years * 12;
  const totalInterest = totalPaid - principal;

  return { totalPaid, totalInterest };
}

// ============================================================================
// MORTGAGE — FULL MONTHLY PAYMENT (P&I + tax + insurance + PMI + HOA)
// ============================================================================

export interface MortgageParams {
  homePrice: number;
  downPayment: number;
  annualRate: number;
  years: number;
  propertyTaxRate: number;   // annual %, e.g. 1.2
  homeInsuranceRate: number; // annual %, e.g. 0.5
  pmiRate: number;           // annual %, e.g. 0.5 (only if down < 20%)
  hoaMonthly: number;        // fixed $ per month
}

export interface MortgageResult {
  principal: number;
  downPaymentPct: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthly: number;
  totalInterest: number;
  totalPayments: number;
}

export function calculateFullMonthlyPayment(params: MortgageParams): MortgageResult {
  const { homePrice, downPayment, annualRate, years,
          propertyTaxRate, homeInsuranceRate, pmiRate, hoaMonthly } = params;

  const principal = Math.max(0, homePrice - downPayment);
  const downPaymentPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  const monthlyPI       = calculateMortgagePayment(principal, annualRate, years);
  const monthlyTax      = (propertyTaxRate / 100 * homePrice) / 12;
  const monthlyInsurance = (homeInsuranceRate / 100 * homePrice) / 12;
  const monthlyPMI      = downPaymentPct < 20 ? (pmiRate / 100 * principal) / 12 : 0;
  const totalMonthly    = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + hoaMonthly;

  const { totalPaid, totalInterest } = calculateTotalPayment(principal, annualRate, years);

  return {
    principal,
    downPaymentPct,
    monthlyPI,
    monthlyTax,
    monthlyInsurance,
    monthlyPMI,
    monthlyHOA: hoaMonthly,
    totalMonthly,
    totalInterest,
    totalPayments: totalPaid,
  };
}

export function getPayoffDate(startDate: Date, years: number): string {
  const payoff = new Date(startDate);
  payoff.setMonth(payoff.getMonth() + Math.round(years * 12));
  return payoff.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export interface YearlyRow {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

export function aggregateAmortizationByYear(schedule: AmortizationRow[]): YearlyRow[] {
  const yearly: YearlyRow[] = [];
  let totalPayment = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;

  for (let i = 0; i < schedule.length; i++) {
    const row = schedule[i];
    totalPayment  += row.payment;
    totalPrincipal += row.principal;
    totalInterest  += row.interest;

    if ((i + 1) % 12 === 0 || i === schedule.length - 1) {
      yearly.push({
        year: yearly.length + 1,
        totalPayment,
        totalPrincipal,
        totalInterest,
        endingBalance: Math.max(0, row.balance),
      });
      totalPayment = totalPrincipal = totalInterest = 0;
    }
  }

  return yearly;
}

// ============================================================================
// LOAN (PERSONAL / CONSUMER) — any frequency
// ============================================================================

export type PaymentFrequency = 'monthly' | 'biweekly' | 'weekly';

export interface LoanParams {
  principal: number;
  annualRate: number;
  years: number;
  frequency: PaymentFrequency;
}

export interface LoanResult {
  paymentAmount: number;
  periodsPerYear: number;
  totalPeriods: number;
  totalPaid: number;
  totalInterest: number;
  monthlyEquivalent: number;
}

export function calculateLoanPayment(params: LoanParams): LoanResult {
  const { principal, annualRate, years, frequency } = params;
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'biweekly' ? 26 : 52;
  const periodRate     = annualRate / 100 / periodsPerYear;
  const totalPeriods   = years * periodsPerYear;

  let paymentAmount: number;
  if (periodRate === 0 || principal <= 0) {
    paymentAmount = totalPeriods > 0 ? principal / totalPeriods : 0;
  } else {
    const factor = Math.pow(1 + periodRate, totalPeriods);
    paymentAmount = (principal * periodRate * factor) / (factor - 1);
  }

  const totalPaid         = paymentAmount * totalPeriods;
  const totalInterest     = Math.max(0, totalPaid - principal);
  const monthlyEquivalent = totalPaid / (years * 12);

  return { paymentAmount, periodsPerYear, totalPeriods, totalPaid, totalInterest, monthlyEquivalent };
}

export function generateLoanPeriodSchedule(params: LoanParams): AmortizationRow[] {
  const { principal, annualRate, years, frequency } = params;
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'biweekly' ? 26 : 52;
  const periodRate     = annualRate / 100 / periodsPerYear;
  const totalPeriods   = years * periodsPerYear;
  const payment        = calculateLoanPayment(params).paymentAmount;

  const schedule: AmortizationRow[] = [];
  let balance           = principal;
  let cumulativeInterest  = 0;
  let cumulativePrincipal = 0;

  for (let period = 1; period <= totalPeriods; period++) {
    const interestPayment  = balance * periodRate;
    const principalPayment = Math.min(payment - interestPayment, balance);
    balance -= principalPayment;
    cumulativeInterest  += interestPayment;
    cumulativePrincipal += principalPayment;

    schedule.push({
      month: period,
      payment,
      principal: principalPayment,
      interest:  interestPayment,
      balance:   Math.max(0, balance),
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  return schedule;
}

export function generateLoanAmortizationByYear(params: LoanParams): YearlyRow[] {
  const { frequency } = params;
  const periodsPerYear = frequency === 'monthly' ? 12 : frequency === 'biweekly' ? 26 : 52;
  const schedule       = generateLoanPeriodSchedule(params);

  const yearly: YearlyRow[] = [];
  let totalPayment = 0, totalPrincipal = 0, totalInterest = 0;
  let periodsInYear = 0;

  for (let i = 0; i < schedule.length; i++) {
    const row = schedule[i];
    totalPayment   += row.payment;
    totalPrincipal += row.principal;
    totalInterest  += row.interest;
    periodsInYear++;

    if (periodsInYear === periodsPerYear || i === schedule.length - 1) {
      yearly.push({
        year: yearly.length + 1,
        totalPayment,
        totalPrincipal,
        totalInterest,
        endingBalance: Math.max(0, row.balance),
      });
      totalPayment = totalPrincipal = totalInterest = periodsInYear = 0;
    }
  }

  return yearly;
}

// ============================================================================
// AUTO LOAN
// ============================================================================

export interface AutoLoanParams {
  vehiclePrice: number;
  downPayment: number;
  tradeIn: number;
  termMonths: number;        // 24 | 36 | 48 | 60 | 72 | 84
  annualRate: number;
  salesTaxRate: number;      // % on (vehiclePrice - tradeIn)
  otherFees: number;         // doc fee, title, registration ($)
}

export interface AutoLoanResult {
  taxableAmount: number;
  salesTaxAmount: number;
  loanAmount: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateAutoLoan(params: AutoLoanParams): AutoLoanResult {
  const { vehiclePrice, downPayment, tradeIn, termMonths, annualRate, salesTaxRate, otherFees } = params;
  const taxableAmount  = Math.max(0, vehiclePrice - tradeIn);
  const salesTaxAmount = taxableAmount * (salesTaxRate / 100);
  const loanAmount     = Math.max(0, vehiclePrice - downPayment - tradeIn) + salesTaxAmount + otherFees;
  const monthlyPayment = calculateMortgagePayment(loanAmount, annualRate, termMonths / 12);
  const totalPaid      = monthlyPayment * termMonths;
  const totalInterest  = Math.max(0, totalPaid - loanAmount);
  return { taxableAmount, salesTaxAmount, loanAmount, monthlyPayment, totalPaid, totalInterest };
}

// ============================================================================
// PAYMENT CALCULATOR — solve for loan amount given a target payment
// ============================================================================

export function calculateMaxLoan(monthlyPayment: number, annualRate: number, years: number): number {
  if (monthlyPayment <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  const factor = Math.pow(1 + r, n);
  return monthlyPayment * (factor - 1) / (r * factor);
}

// ============================================================================
// COMPOUND GROWTH — savings/investment calculators (multi-frequency)
// ============================================================================

export type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually';

export interface CompoundGrowthParams {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface CompoundGrowthYear {
  year: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyContribution: number;
  yearlyInterest: number;
}

export interface CompoundGrowthResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearByYear: CompoundGrowthYear[];
}

export function calculateCompoundGrowth(params: CompoundGrowthParams): CompoundGrowthResult {
  const { principal, monthlyContribution, annualRate, years, compoundingFrequency } = params;
  const r = annualRate / 100;

  // Effective monthly rate for each compounding frequency
  let mRate: number;
  if (compoundingFrequency === 'daily') {
    mRate = Math.pow(1 + r / 365, 365 / 12) - 1;
  } else if (compoundingFrequency === 'monthly') {
    mRate = r / 12;
  } else if (compoundingFrequency === 'quarterly') {
    mRate = Math.pow(1 + r / 4, 1 / 3) - 1;
  } else {
    mRate = Math.pow(1 + r, 1 / 12) - 1;
  }

  const yearByYear: CompoundGrowthYear[] = [];
  let balance = principal;
  let totalContributions = principal;
  let totalInterest = 0;

  for (let y = 1; y <= years; y++) {
    let yearlyContribution = 0;
    let yearlyInterest = 0;
    const balanceStart = balance;

    for (let m = 0; m < 12; m++) {
      const interest = balance * mRate;
      balance += interest + monthlyContribution;
      yearlyContribution += monthlyContribution;
      yearlyInterest += interest;
    }

    totalContributions += yearlyContribution;
    totalInterest = balance - totalContributions;

    yearByYear.push({
      year: y,
      balance,
      totalContributions,
      totalInterest,
      yearlyContribution,
      yearlyInterest,
    });
  }

  return { finalBalance: balance, totalContributions, totalInterest: Math.max(0, totalInterest), yearByYear };
}

// ============================================================================
// RETIREMENT — withdrawal simulation (Mode B)
// ============================================================================

export interface WithdrawalParams {
  balance: number;
  monthlyWithdrawal: number;
  annualReturnRate: number;
  inflationRate: number;
}

export interface WithdrawalYearRow {
  year: number;
  startBalance: number;
  annualWithdrawal: number;
  annualReturn: number;
  endBalance: number;
}

export interface WithdrawalResult {
  monthsLast: number;
  yearsLast: number;
  sustainable: boolean;
  depletionDate: string;
  yearByYear: WithdrawalYearRow[];
}

export function calculateWithdrawalYears(params: WithdrawalParams): WithdrawalResult {
  const { balance: initialBalance, monthlyWithdrawal, annualReturnRate, inflationRate } = params;
  const monthlyReturn = annualReturnRate / 100 / 12;
  const annualInflation = inflationRate / 100;

  const yearByYear: WithdrawalYearRow[] = [];
  let bal = initialBalance;
  let months = 0;
  let currentMonthlyWithdrawal = monthlyWithdrawal;
  const maxYears = 100;

  for (let y = 1; y <= maxYears; y++) {
    if (bal <= 0) break;
    const startBalance = bal;
    let annualWithdrawal = 0;
    let annualReturn = 0;

    for (let m = 0; m < 12; m++) {
      if (bal <= 0) { months += 0; break; }
      const interest = bal * monthlyReturn;
      bal = bal + interest - currentMonthlyWithdrawal;
      annualWithdrawal += currentMonthlyWithdrawal;
      annualReturn += interest;
      months++;
      if (bal <= 0) { bal = 0; break; }
    }

    yearByYear.push({
      year: y,
      startBalance,
      annualWithdrawal,
      annualReturn,
      endBalance: Math.max(0, bal),
    });

    if (bal <= 0) break;
    currentMonthlyWithdrawal *= (1 + annualInflation);
  }

  const sustainable = bal > 0;
  const yearsLast = months / 12;

  const depletionYear = new Date().getFullYear() + Math.floor(yearsLast);
  const depletionDate = sustainable
    ? 'Sustainable for 100+ years'
    : new Date(depletionYear, 0).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return { monthsLast: months, yearsLast, sustainable, depletionDate, yearByYear };
}

// ============================================================================
// RETIREMENT — nest egg & savings needed (Mode C)
// ============================================================================

export interface RetirementNeedParams {
  annualIncomeDesired: number;
  yearsInRetirement: number;
  returnRateInRetirement: number;
  inflationRate: number;
  yearsToRetirement: number;
  currentSavings: number;
  accumulationRate: number;
}

export interface RetirementNeedResult {
  nestEggNeeded: number;
  monthlySavingsRequired: number;
  inflationAdjustedAnnualIncome: number;
}

export function calculateRetirementNeed(params: RetirementNeedParams): RetirementNeedResult {
  const {
    annualIncomeDesired, yearsInRetirement, returnRateInRetirement,
    inflationRate, yearsToRetirement, currentSavings, accumulationRate,
  } = params;

  // Inflate desired income to retirement-day dollars
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const inflationAdjustedAnnualIncome = annualIncomeDesired * inflationFactor;

  // Real rate (Fisher equation)
  const realRate = (1 + returnRateInRetirement / 100) / (1 + inflationRate / 100) - 1;
  const monthlyRealRate = realRate / 12;
  const nMonths = yearsInRetirement * 12;
  const monthlyIncome = inflationAdjustedAnnualIncome / 12;

  // Nest egg = PV of annuity
  let nestEggNeeded: number;
  if (Math.abs(monthlyRealRate) < 1e-10) {
    nestEggNeeded = monthlyIncome * nMonths;
  } else {
    nestEggNeeded = monthlyIncome * (1 - Math.pow(1 + monthlyRealRate, -nMonths)) / monthlyRealRate;
  }

  // Future value of current savings
  const accMonthlyRate = accumulationRate / 100 / 12;
  const nAccMonths = yearsToRetirement * 12;
  const fvCurrentSavings = currentSavings * Math.pow(1 + accMonthlyRate, nAccMonths);

  // Gap to fill
  const gap = Math.max(0, nestEggNeeded - fvCurrentSavings);

  // PMT to fill gap
  let monthlySavingsRequired: number;
  if (accMonthlyRate === 0 || nAccMonths === 0) {
    monthlySavingsRequired = nAccMonths > 0 ? gap / nAccMonths : 0;
  } else {
    const fvFactor = Math.pow(1 + accMonthlyRate, nAccMonths);
    monthlySavingsRequired = gap * accMonthlyRate / (fvFactor - 1);
  }

  return { nestEggNeeded, monthlySavingsRequired, inflationAdjustedAnnualIncome };
}

// ============================================================================
// COMPOUND INTEREST & INVESTMENT
// ============================================================================

/**
 * Calcula valor futuro com juros compostos.
 *
 * @param principal - Investimento inicial
 * @param monthlyContribution - Aporte mensal
 * @param annualRate - Taxa anual em %
 * @param years - Tempo em anos
 */
export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): { futureValue: number; totalContributions: number; totalInterest: number } {
  const monthlyRate = annualRate / 100 / 12;
  const numMonths = years * 12;

  let balance = principal;
  for (let i = 0; i < numMonths; i++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
  }

  const totalContributions = principal + monthlyContribution * numMonths;
  const totalInterest = balance - totalContributions;

  return {
    futureValue: balance,
    totalContributions,
    totalInterest,
  };
}

// ============================================================================
// RETIREMENT
// ============================================================================

/**
 * Calcula quanto tu precisa aposentar usando regra dos 4%.
 * (Se tu retira 4% por ano da poupança, dinheiro dura ~30 anos)
 */
export function calculateRetirementGoal(
  desiredAnnualIncome: number,
  withdrawalRate: number = 4
): number {
  return desiredAnnualIncome / (withdrawalRate / 100);
}

/**
 * Simula crescimento de 401k ou IRA.
 */
export function simulate401k(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  annualContribution: number,
  employerMatch: number,
  annualRate: number
): { finalBalance: number; totalContributed: number; yearByYear: number[] } {
  const years = retirementAge - currentAge;
  const totalContribution = annualContribution + employerMatch;
  const yearByYear: number[] = [];

  let balance = currentBalance;
  let totalContributed = currentBalance;

  for (let y = 0; y < years; y++) {
    balance = balance * (1 + annualRate / 100) + totalContribution;
    totalContributed += totalContribution;
    yearByYear.push(balance);
  }

  return {
    finalBalance: balance,
    totalContributed,
    yearByYear,
  };
}

// ============================================================================
// TAXES (SIMPLIFIED US FEDERAL - 2026 brackets for example)
// ============================================================================

/**
 * Calcula imposto federal US simplificado (single filer, 2026 brackets).
 * NÃO INCLUI: state tax, FICA, deductions avançadas.
 */
export function calculateFederalTax(income: number): number {
  const brackets = [
    { max: 11925, rate: 0.10 },
    { max: 48475, rate: 0.12 },
    { max: 103350, rate: 0.22 },
    { max: 197300, rate: 0.24 },
    { max: 250525, rate: 0.32 },
    { max: 626350, rate: 0.35 },
    { max: Infinity, rate: 0.37 },
  ];

  let tax = 0;
  let prevMax = 0;

  for (const bracket of brackets) {
    if (income > bracket.max) {
      tax += (bracket.max - prevMax) * bracket.rate;
      prevMax = bracket.max;
    } else {
      tax += (income - prevMax) * bracket.rate;
      break;
    }
  }

  return tax;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Formata número como moeda USD.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formata como porcentagem.
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formata número com separadores de milhares.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
