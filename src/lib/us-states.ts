/**
 * us-states.ts — Dados dos 50 estados US + DC
 *
 * Usado pra geração programática de páginas tipo:
 * /mortgage-calculator-texas, /mortgage-calculator-california, etc.
 *
 * Dados: median home price, property tax rate, state income tax.
 * Fontes: dados públicos US Census, NAR, Tax Foundation.
 * ATENÇÃO: atualizar anualmente.
 */

export interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  medianHomePrice: number;
  propertyTaxRate: number; // % annual
  stateIncomeTax: number;   // % top bracket
  capitalCity: string;
  majorCities: string[];
  region: 'Northeast' | 'Midwest' | 'South' | 'West';
  neighborStates: string[]; // slugs dos estados vizinhos
}

export const US_STATES: StateData[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    slug: 'alabama',
    medianHomePrice: 228000,
    propertyTaxRate: 0.41,
    stateIncomeTax: 5.0,
    capitalCity: 'Montgomery',
    majorCities: ['Birmingham', 'Huntsville', 'Mobile'],
    region: 'South',
    neighborStates: ['florida', 'georgia', 'mississippi', 'tennessee'],
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    slug: 'alaska',
    medianHomePrice: 365000,
    propertyTaxRate: 1.19,
    stateIncomeTax: 0,
    capitalCity: 'Juneau',
    majorCities: ['Anchorage', 'Fairbanks'],
    region: 'West',
    neighborStates: [],
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    slug: 'arizona',
    medianHomePrice: 432000,
    propertyTaxRate: 0.63,
    stateIncomeTax: 2.5,
    capitalCity: 'Phoenix',
    majorCities: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
    region: 'West',
    neighborStates: ['california', 'nevada', 'new-mexico', 'utah'],
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    slug: 'arkansas',
    medianHomePrice: 202000,
    propertyTaxRate: 0.62,
    stateIncomeTax: 4.4,
    capitalCity: 'Little Rock',
    majorCities: ['Little Rock', 'Fayetteville', 'Fort Smith'],
    region: 'South',
    neighborStates: ['louisiana', 'mississippi', 'missouri', 'oklahoma', 'tennessee', 'texas'],
  },
  {
    name: 'California',
    abbreviation: 'CA',
    slug: 'california',
    medianHomePrice: 786000,
    propertyTaxRate: 0.75,
    stateIncomeTax: 13.3,
    capitalCity: 'Sacramento',
    majorCities: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose'],
    region: 'West',
    neighborStates: ['arizona', 'nevada', 'oregon'],
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    slug: 'colorado',
    medianHomePrice: 568000,
    propertyTaxRate: 0.51,
    stateIncomeTax: 4.4,
    capitalCity: 'Denver',
    majorCities: ['Denver', 'Colorado Springs', 'Aurora'],
    region: 'West',
    neighborStates: ['arizona', 'kansas', 'nebraska', 'new-mexico', 'oklahoma', 'utah', 'wyoming'],
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    slug: 'connecticut',
    medianHomePrice: 412000,
    propertyTaxRate: 2.14,
    stateIncomeTax: 6.99,
    capitalCity: 'Hartford',
    majorCities: ['Bridgeport', 'New Haven', 'Stamford'],
    region: 'Northeast',
    neighborStates: ['massachusetts', 'new-york', 'rhode-island'],
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    slug: 'delaware',
    medianHomePrice: 345000,
    propertyTaxRate: 0.58,
    stateIncomeTax: 6.6,
    capitalCity: 'Dover',
    majorCities: ['Wilmington', 'Dover', 'Newark'],
    region: 'South',
    neighborStates: ['maryland', 'new-jersey', 'pennsylvania'],
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    slug: 'florida',
    medianHomePrice: 398000,
    propertyTaxRate: 0.91,
    stateIncomeTax: 0,
    capitalCity: 'Tallahassee',
    majorCities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    region: 'South',
    neighborStates: ['alabama', 'georgia'],
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    slug: 'georgia',
    medianHomePrice: 335000,
    propertyTaxRate: 0.92,
    stateIncomeTax: 5.39,
    capitalCity: 'Atlanta',
    majorCities: ['Atlanta', 'Augusta', 'Savannah'],
    region: 'South',
    neighborStates: ['alabama', 'florida', 'north-carolina', 'south-carolina', 'tennessee'],
  },
  // NOTA: Pro Claude Code completar os 50+ quando rodar o script.
  // Este é um arquivo-seed com os 10 maiores pra demonstração.
  // O Claude Code, na Fase 4, completará os restantes usando dados reais.
];

/**
 * Helper pra buscar estado por slug.
 */
export function getStateBySlug(slug: string): StateData | undefined {
  return US_STATES.find(s => s.slug === slug);
}

/**
 * Helper pra buscar estados vizinhos (pra internal linking).
 */
export function getNeighborStates(slug: string): StateData[] {
  const state = getStateBySlug(slug);
  if (!state) return [];
  return state.neighborStates
    .map(s => getStateBySlug(s))
    .filter((s): s is StateData => s !== undefined);
}
