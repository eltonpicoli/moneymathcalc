PARTE 1 — IDENTIDADE DO SITE

1.1 Posicionamento

Nome: MoneyMathCalc

Domínio: moneymathcalc.com

Tagline principal: "Smart money calculations, made simple."

Sub-tagline: "Free financial calculators that give you clear answers, fast."

Quem somos (a autoridade é a ferramenta):

"MoneyMathCalc is a free platform dedicated to making financial calculations accessible to everyone. We don't offer financial advice — we offer precise, transparent, and instant calculations, so you can make informed decisions with confidence. Our calculators use industry-standard formulas validated against authoritative sources."

1.2 Tom de voz



Direto, prático, humano

Sem jargão desnecessário

Exemplos concretos com números reais

Segunda pessoa ("your payment", "you'll pay")

Parágrafos curtos (2-4 frases)

Empatia: entende que finanças estressam

Zero acadêmico, zero formal corporativo



Comparação:



❌ Como NÃO escrever: "The amortization schedule demonstrates the systematic distribution of principal and interest over the loan's term."

✅ Como escrever: "Your amortization schedule shows how each payment is split. In year 1, most of your $1,972 monthly payment goes to interest — only $303 reduces the actual loan."



1.3 Paleta de cores (Clean \& Profissional, vibe SoFi/Wise/Mint)

Primary (ação, botões, links):

\- primary-600: #0052CC  (azul profissional, confiável)

\- primary-700: #003D99  (hover state)

\- primary-50:  #E6F0FF  (fundos sutis)



Accent (destaques, resultados, success):

\- accent-500:  #00B876  (verde dinheiro, positivo)

\- accent-50:   #E6F9F1  (fundos de sucesso)



Neutrals (texto, fundos):

\- gray-900: #111827  (texto principal)

\- gray-700: #374151  (texto secundário)

\- gray-500: #6B7280  (texto terciário, labels)

\- gray-200: #E5E7EB  (bordas)

\- gray-50:  #F9FAFB  (fundos)

\- white:    #FFFFFF



Alerts (para AVISOS financeiros):

\- warning-500: #F59E0B (amarelo atenção)

\- danger-500:  #EF4444 (vermelho alerta)

1.4 Tipografia

Fonte principal: Inter (Google Fonts, gratuita)



Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

Usada em TODO o site

Moderna, legível, mobile-friendly



Fonte monospace (só pra números grandes em resultados): JetBrains Mono



Resultados numéricos ficam mais "profissionais" e legíveis em monospace

Usa apenas em resultados destacados (tipo "$1,972.79")



Escala tipográfica:



Display (H1 hero): 48px / 3rem, bold

H1 página: 36px / 2.25rem, bold

H2: 28px / 1.75rem, semibold

H3: 22px / 1.375rem, semibold

Body: 16px / 1rem, regular

Small: 14px / 0.875rem

Tiny: 12px / 0.75rem





PARTE 2 — ARQUITETURA DO SITE

2.1 Estrutura de URLs completa

/                                    → Homepage

/mortgage-calculator                  → Calculadora 1

/loan-calculator                      → Calculadora 2

/auto-loan-calculator                 → Calculadora 3

/retirement-calculator                → Calculadora 4

/compound-interest-calculator         → Calculadora 5

/investment-calculator                → Calculadora 6

/amortization-calculator              → Calculadora 7

/income-tax-calculator                → Calculadora 8

/payment-calculator                   → Calculadora 9

/salary-calculator                    → Calculadora 10



/about                                → Sobre

/contact                              → Contato

/privacy-policy                       → Política de Privacidade

/terms-of-use                         → Termos de Uso

/disclaimer                           → Disclaimer (IMPORTANTE em site financeiro)



/guides                               → Hub de guias (futuro)

/404                                  → Página de erro customizada

/sitemap.xml                          → Sitemap automático

/robots.txt                           → Robots



/ads.txt                              → Pra AdSense (obrigatório após aprovação)

IMPORTANTE: URLs sem .html no final (padrão moderno, melhor que calculator.net).

2.2 Navegação principal (Header)

Menu desktop:

\[Logo: MoneyMathCalc]     Home   Calculators ▼   Guides   About

Dropdown "Calculators":

Loans \& Mortgage

├─ Mortgage Calculator

├─ Loan Calculator

├─ Auto Loan Calculator

├─ Amortization Calculator

└─ Payment Calculator



Savings \& Investment

├─ Compound Interest Calculator

├─ Investment Calculator

└─ Retirement Calculator



Income \& Taxes

├─ Salary Calculator

└─ Income Tax Calculator

Mobile: hamburger menu que revela mesma estrutura.

2.3 Rodapé (Footer)

4 colunas:

Coluna 1: Sobre



Logo + descrição 1 linha

"MoneyMathCalc is your free partner for smart financial calculations."



Coluna 2: Calculators



Links pras 10 calculadoras



Coluna 3: Resources



About

Contact

Guides

Blog (futuro)



Coluna 4: Legal



Privacy Policy

Terms of Use

Disclaimer



Barra inferior:



© 2026 MoneyMathCalc. All rights reserved.

Disclaimer curto: "Tools for educational purposes only. Not financial advice."





PARTE 3 — WIREFRAMES DAS PÁGINAS

3.1 Homepage

┌─────────────────────────────────────────────┐

│ \[HEADER fixo com nav]                       │

├─────────────────────────────────────────────┤

│                                             │

│         HERO SECTION                        │

│  ┌───────────────────────────────────┐      │

│  │ Smart money calculations,         │      │

│  │ made simple.                      │      │

│  │                                   │      │

│  │ Free financial calculators that  │      │

│  │ give you clear answers, fast.    │      │

│  │                                   │      │

│  │ \[🔍 Search calculators...]        │      │

│  └───────────────────────────────────┘      │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  MOST POPULAR CALCULATORS                   │

│  ┌─────────┐ ┌─────────┐ ┌─────────┐        │

│  │Mortgage │ │  Loan   │ │Compound │        │

│  │  Calc   │ │  Calc   │ │Interest │        │

│  └─────────┘ └─────────┘ └─────────┘        │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  ALL CALCULATORS (organized by category)    │

│                                             │

│  🏠 Loans \& Mortgage                        │

│  \[Grid 5 cards]                             │

│                                             │

│  💰 Savings \& Investment                    │

│  \[Grid 3 cards]                             │

│                                             │

│  💼 Income \& Taxes                          │

│  \[Grid 2 cards]                             │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  WHY USE MONEYMATHCALC?                     │

│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐         │

│  │ ⚡   │  │ 🎯  │  │ 🔒  │  │ 💯  │         │

│  │Fast │  │Precise│ │Privacy│ │Free│         │

│  └─────┘  └─────┘  └─────┘  └─────┘         │

│                                             │

├─────────────────────────────────────────────┤

│ \[FOOTER]                                    │

└─────────────────────────────────────────────┘

3.2 Página de Calculadora (template master)

Esta é A página mais importante. Cada calculadora segue essa estrutura:

┌─────────────────────────────────────────────┐

│ \[HEADER]                                    │

├─────────────────────────────────────────────┤

│ Home > Loans > Mortgage Calculator          │ ← Breadcrumb

├─────────────────────────────────────────────┤

│                                             │

│  H1: Mortgage Calculator                    │

│  Subtitle: Calculate your monthly payment   │

│  with taxes, insurance, and PMI.            │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  ┌─────────────────┬───────────────────┐    │

│  │ INPUTS          │ RESULTS (already  │    │

│  │                 │ showing example)  │    │

│  │ Home Price      │                   │    │

│  │ \[$ 400,000  ]   │ Monthly Payment:  │    │

│  │                 │   $1,972.79       │    │

│  │ Down Payment    │                   │    │

│  │ \[ 20% | $80,000]│ \[Pie chart]       │    │

│  │                 │                   │    │

│  │ Loan Term       │ Principal \& Int:  │    │

│  │ \[30 years ▼  ]  │   $1,972.79       │    │

│  │                 │ Property Tax:     │    │

│  │ Interest Rate   │   $400.00         │    │

│  │ \[ 6.40%    ]    │ Insurance:        │    │

│  │                 │   $125.00         │    │

│  │ \[+Advanced ▼]   │ Total: $2,497.79  │    │

│  │                 │                   │    │

│  │ \[ CALCULATE ]   │                   │    │

│  │                 │                   │    │

│  └─────────────────┴───────────────────┘    │

│                                             │

│  \[Share Result] \[Save as PDF] \[Reset]       │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  AMORTIZATION SCHEDULE                      │

│  \[Line chart showing balance over time]     │

│  \[Table expandable: monthly/yearly view]    │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  📢 \[AD SLOT: in-article-1 — 728x90]        │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  ## How to use this calculator              │

│  (300-400 words)                            │

│                                             │

│  ## How mortgage payments are calculated    │

│  (400-500 words with formula explanation)   │

│                                             │

│  ## Understanding your results              │

│  (200-300 words)                            │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  📢 \[AD SLOT: in-article-2 — 300x250]       │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  ## Frequently Asked Questions              │

│  \[6-8 FAQs em accordion]                    │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  ## Related Calculators                     │

│  \[Grid 4 cards]                             │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│  📢 \[AD SLOT: bottom — 728x90]              │

│                                             │

├─────────────────────────────────────────────┤

│ \[FOOTER]                                    │

└─────────────────────────────────────────────┘

Detalhes críticos do wireframe:



Inputs E Results lado a lado em desktop, empilhados em mobile

Results JÁ POPULADOS ao carregar a página (sem precisar clicar Calculate)

Botão Calculate visível mas opcional — ao alterar qualquer input e sair do campo (blur), recalcula automaticamente

Share Result gera URL com querystring (?home=400000\&down=80000\&rate=6.4\&term=30) pra permitir compartilhamento fácil

Save as PDF gera PDF no cliente (jsPDF) — sem enviar nada pro servidor

Advanced toggle esconde inputs avançados (Property Tax, Insurance, PMI, HOA) até usuário clicar — reduz overwhelm inicial





PARTE 4 — ESPECIFICAÇÃO DAS 10 CALCULADORAS

Vou detalhar cada uma com: inputs, outputs, fórmula, exemplo pré-preenchido, features específicas.

CALC 1: Mortgage Calculator

URL: /mortgage-calculator

Keyword primária: "mortgage calculator" (volume US: \~2.2M buscas/mês)

Keywords secundárias: "home loan calculator", "monthly mortgage payment calculator", "mortgage calculator with taxes and insurance"

Inputs:



Home Price (default: $400,000) — número com separador de milhares

Down Payment (default: 20% / $80,000) — toggle entre % e $

Loan Term (default: 30 years) — dropdown: 10, 15, 20, 25, 30

Interest Rate (default: 6.40%) — número decimal

\[Advanced, oculto por padrão]:



Property Tax % (default: 1.2%)

Home Insurance % (default: 0.5%)

PMI % (default: 0.5%, só se down < 20%)

HOA Fee $ (default: $0)

Start Date (default: mês atual)







Outputs:



Monthly Payment (P\&I): destaque grande

Total Monthly (com taxes, insurance, etc): destaque

Breakdown pie chart: P\&I, Tax, Insurance, HOA

Total Interest Paid ao longo do loan

Total of Payments

Payoff Date

Amortization line chart + tabela expandable



Fórmula (standard):

M = P × \[r(1+r)^n] / \[(1+r)^n – 1]

onde:

M = monthly payment

P = principal (loan amount = home price - down payment)

r = monthly interest rate (annual / 12 / 100)

n = number of payments (years × 12)

Features específicas:



Toggle entre monthly/biweekly payment view

Slider pra "extra monthly payment" mostrando impacto

Banner discreto abaixo: "See how today's rate compares — Current avg 30-year: 6.33%" (dado real, atualizável)

FAQ específico com 8 perguntas comuns





CALC 2: Loan Calculator (genérico)

URL: /loan-calculator

Keyword primária: "loan calculator" (volume US: \~1.4M/mês)

Keywords secundárias: "personal loan calculator", "loan payment calculator", "loan amortization calculator"

Inputs:



Loan Amount (default: $25,000)

Loan Term (default: 5 years) — flexible, 1-30

Interest Rate (default: 8.5%)

\[Advanced]:



Payment Frequency (monthly, biweekly, weekly)

Start Date







Outputs:



Monthly Payment

Total Interest

Total Paid

Amortization schedule



Fórmula: mesma do mortgage (reutiliza função).

Features específicas:



Use cases listados: "Great for: Personal loans, debt consolidation, medical bills"

Comparison: ver 2 loans lado a lado





CALC 3: Auto Loan Calculator

URL: /auto-loan-calculator

Keyword primária: "auto loan calculator" (volume US: \~370K/mês)

Keywords secundárias: "car loan calculator", "car payment calculator", "auto payment calculator"

Inputs:



Vehicle Price (default: $35,000)

Down Payment (default: $5,000)

Trade-in Value (default: $0)

Loan Term (default: 60 months) — dropdown: 24, 36, 48, 60, 72, 84

Interest Rate (default: 7.5%)

\[Advanced]:



Sales Tax % (default: 6%)

Other Fees $ (default: $500)







Outputs:



Monthly Payment

Total Loan Amount (com tax e fees)

Total Interest

Amortization



Features específicas:



Aviso útil: "Most experts recommend keeping car payments below 10% of take-home pay."

Calculator "Price from Payment": usuário diz quanto pode pagar/mês, calculadora diz preço máximo do carro





CALC 4: Retirement Calculator

URL: /retirement-calculator

Keyword primária: "retirement calculator" (volume US: \~550K/mês)

Keywords secundárias: "retirement savings calculator", "how much to retire", "retirement planner"

Inputs:



Current Age (default: 35)

Retirement Age (default: 67)

Current Savings (default: $30,000)

Monthly Contribution (default: $500)

Expected Annual Return % (default: 7%)

\[Advanced]:



Inflation Rate (default: 3%)

Desired Retirement Income/year







Outputs:



Total at Retirement (destacado)

Total Contributed

Total Interest Earned

Inflation-adjusted value

Growth chart ao longo dos anos



Fórmula:

FV = P(1+r)^n + PMT × \[((1+r)^n – 1) / r]

onde:

FV = Future Value

P = initial principal

r = monthly return rate

n = months

PMT = monthly contribution

Features específicas:



Toggle "adjust for inflation" (mostra valor de compra hoje)

Sugestão contextual: "At this rate, you'll have $X at 67. Is that enough? Try our Retirement Income Calculator →"





CALC 5: Compound Interest Calculator

URL: /compound-interest-calculator

Keyword primária: "compound interest calculator" (volume US: \~450K/mês)

Keywords secundárias: "compound interest", "compounding calculator", "investment growth calculator"

Inputs:



Initial Investment (default: $10,000)

Monthly Contribution (default: $200)

Annual Interest Rate (default: 7%)

Years (default: 20)

Compounding Frequency (default: Monthly) — dropdown: Daily, Monthly, Quarterly, Annually



Outputs:



Final Balance (destaque)

Total Principal

Total Interest

Interactive chart mostrando growth year by year

Table expandable por ano



Fórmula:

A = P(1 + r/n)^(nt) + PMT × \[((1 + r/n)^(nt) – 1) / (r/n)]

Features específicas:



Visualização poderosa: "The Power of Time" — slider que mostra impact de começar 5 anos antes/depois

Comparison: "This vs no contribution vs different rate"





CALC 6: Investment Calculator

URL: /investment-calculator

Keyword primária: "investment calculator" (volume US: \~350K/mês)

Keywords secundárias: "investment return calculator", "investment growth calculator", "ROI calculator"

Inputs:



Starting Amount (default: $20,000)

Additional Contribution (default: $500/month)

Return Rate (default: 8%)

Investment Length (default: 10 years)



Outputs:



End Balance

Total Contributions

Total Return ($ e %)

Chart



Features específicas:



Toggle "After inflation"

Toggle "After taxes"





CALC 7: Amortization Calculator

URL: /amortization-calculator

Keyword primária: "amortization calculator" (volume US: \~300K/mês)

Keywords secundárias: "amortization schedule", "loan amortization", "amortization table"

Inputs:



Loan Amount (default: $250,000)

Interest Rate (default: 6.5%)

Term (default: 30 years)

Start Date (default: mês atual)

\[Extra payments opcionais]



Outputs:



Full amortization schedule (mês a mês)

Principal vs Interest split por ano

Total Interest

Download Schedule (CSV / PDF)

Chart balance over time



Features específicas:



Export real pra CSV/PDF

View toggle: Monthly | Yearly

Calculator "When will I pay off 50% of principal?"





CALC 8: Income Tax Calculator

URL: /income-tax-calculator

Keyword primária: "income tax calculator" (volume US: \~450K/mês)

Keywords secundárias: "federal tax calculator", "tax calculator 2026", "take home pay calculator"

Inputs:



Annual Income (default: $75,000)

Filing Status (Single / Married filing jointly / HoH) — dropdown

State (dropdown com 50 estados + DC)

\[Advanced]:



Pre-tax Deductions (401k, HSA)

Post-tax Deductions







Outputs:



Federal Tax Owed

State Tax Owed

FICA (Social Security + Medicare)

Total Tax

Take-Home Pay (annual + monthly)

Effective Tax Rate

Marginal Tax Bracket

Breakdown visual



Features específicas:



IMPORTANTE: adicionar disclaimer forte que é estimate, não replace CPA

Reference: "Brackets updated for 2026 tax year"

Comparativo: "See how your tax compares by state" (links internos pra state-specific futuras)





CALC 9: Payment Calculator

URL: /payment-calculator

Keyword primária: "payment calculator" (volume US: \~250K/mês)

Keywords secundárias: "monthly payment calculator", "loan payment calculator"

Diferença do Loan Calculator: este foca em resolver "quanto meu pagamento será" (fixando termo e calculando payment) vs "quanto posso emprestar" (fixando payment e calculando amount).

Inputs (modo A):



Loan Amount, Term, Rate → calcula Payment



Inputs (modo B — toggle):



Payment, Term, Rate → calcula Loan Amount



Outputs:

Varia por modo, mas sempre:



Valor principal calculado

Amortization visual





CALC 10: Salary Calculator

URL: /salary-calculator

Keyword primária: "salary calculator" (volume US: \~700K/mês)

Keywords secundárias: "hourly to salary", "salary to hourly", "annual salary calculator"

Inputs:



Amount (default: $25)

Pay Type (Hourly / Weekly / Biweekly / Monthly / Annual) — dropdown

Hours per Week (default: 40, só se Hourly)

Weeks per Year (default: 52)



Outputs:

Converte pra TODOS os outros formatos:



Hourly: $X

Daily: $X

Weekly: $X

Biweekly: $X

Monthly: $X

Annual: $X



Features específicas:



Toggle "Show with unpaid time off" (subtrair 2 semanas de férias, feriados)

Comparison widget: "Is $60k/year good in your state?"





PARTE 5 — CONTEÚDO TEXTUAL

5.1 Estrutura obrigatória de cada página de calculadora

Toda página tem 4 seções abaixo da ferramenta:

Seção A: "How to use this \[X] Calculator" (300-400 palavras)



Passo a passo numerado

Explicação de cada input

Exemplos práticos



Seção B: "How \[X] is calculated" / "The formula explained" (300-500 palavras)



Fórmula matemática clara

Explicação em linguagem simples

Exemplo resolvido passo a passo

Por que cada componente importa



Seção C: "Understanding your results" (200-300 palavras)



O que significa cada output

Implicações práticas

Como interpretar



Seção D: "Frequently Asked Questions" (6-8 perguntas, 50-80 palavras cada)



Perguntas REAIS do "People Also Ask" do Google

Respostas diretas (50-60 palavras = ideal pra AEO)

Schema FAQPage aplicado



5.2 Volume de conteúdo por página

PáginaPalavras mínimasPalavras ideaisHomepage600800Cada calculadora12001500-1800About600800Contact200300Privacy Policy10001500Terms10001500Disclaimer400600

Total estimado MVP: \~15.000 palavras de conteúdo original.

5.3 Disclaimer específico (importante em site financeiro)

Aparece em CADA página de calculadora, discreto mas visível:



"Results are estimates for educational purposes. Not financial advice. Consult a licensed financial advisor for decisions specific to your situation."



Além da página /disclaimer dedicada.



PARTE 6 — ESTRATÉGIA AEO/GEO APLICADA

6.1 Schema.org markup por tipo de página

Homepage:



WebSite + Organization + BreadcrumbList



Páginas de calculadora:



SoftwareApplication (categoria: FinanceApplication)

FAQPage (se tiver FAQ na página — sempre tem)

HowTo (pra seção "How to use")

BreadcrumbList



About / Contact / Legal:



AboutPage / ContactPage / WebPage



6.2 Robots.txt estratégico

User-agent: \*

Allow: /

Sitemap: https://moneymathcalc.com/sitemap.xml



\# AI crawlers EXPLICITAMENTE permitidos

User-agent: GPTBot

Allow: /



User-agent: ChatGPT-User

Allow: /



User-agent: ClaudeBot

Allow: /



User-agent: PerplexityBot

Allow: /



User-agent: Google-Extended

Allow: /



User-agent: CCBot

Allow: /



User-agent: anthropic-ai

Allow: /

6.3 Formatação AEO-friendly

Em CADA página:



H2 com pergunta → primeiro parágrafo responde em 50-60 palavras

Uso de tabelas estruturadas (fácil pra IA extrair)

Listas numeradas e bullet points em seções comparativas

Dados com números específicos (não "a lot", mas "1.1% of property value")

Fontes citadas onde possível (Freddie Mac, Bankrate, IRS)



6.4 E-E-A-T reforçado



About page robusta explicando metodologia

Cada fórmula citando fonte autoritativa (Investopedia, IRS, Federal Reserve)

Footer com disclaimer claro

Última atualização visível em cada página

"Data updated: April 2026" ou similar





PARTE 7 — MONETIZAÇÃO

7.1 AdSense (primário, 6-12 meses iniciais)

Posicionamento em páginas de calculadora:



Above-the-fold: NENHUM (usuário precisa ver ferramenta primeiro)

In-article #1: Entre calculadora e conteúdo educacional (bom CTR)

In-article #2: Entre "Understanding results" e FAQ

Bottom: Antes do footer

Sticky mobile: Anchor ad no rodapé em mobile



NÃO colocar AdSense até ter aprovação. Implementar placeholders <div class="ad-slot"> que ficam invisíveis até config AdSense.

7.2 Affiliate (fase 2, depois de 3-6 meses)

Programas sugeridos (pesquisar aprovação):



LendingTree — $20-200 por lead qualificado de mortgage/loan

Credit Karma — leads de credit score

SoFi — student loans, personal loans

Rocket Mortgage — mortgage leads



Posicionamento: seção discreta abaixo da calculadora:



"Compare real offers from top lenders → \[button]"



7.3 Email capture (opcional, não-intrusive)

Na página de resultado, botão "Email me this calculation as PDF":



Usuário digita email

Recebe PDF bonito por email

Opt-in automático pra newsletter mensal "Money Math Monthly"



IMPORTANTE: não obrigatório. Maioria vai usar sem email.



PARTE 8 — ROADMAP DE 30 DIAS

Semana 1: Foundation



Dias 1-2: Setup do projeto no Claude Code, estrutura Astro

Dias 3-4: Layout base (Header, Footer, Homepage)

Dias 5-7: Calculadora Mortgage completa (é a mais complexa)



Semana 2: Core Calculators



Dias 8-10: Loan + Auto Loan + Payment Calculators (similares, reutilizam lógica)

Dias 11-13: Compound Interest + Investment + Retirement

Dia 14: Amortization Calculator



Semana 3: Complete MVP



Dias 15-16: Income Tax Calculator (mais complexa por brackets)

Dia 17: Salary Calculator

Dias 18-19: Páginas legais (Privacy, Terms, Disclaimer, About, Contact)

Dias 20-21: Content writing (seções educacionais em cada calc)



Semana 4: Polish \& Launch



Dias 22-23: SEO final (schema, sitemap, meta tags, OG images)

Dias 24-25: Performance optimization (Lighthouse 95+)

Dia 26: Deploy production (Cloudflare Pages)

Dia 27: Submit Search Console + Bing Webmaster

Dia 28: Aplicar AdSense (se critérios atingidos)

Dias 29-30: Content marketing inicial (Reddit, Product Hunt, diretórios)





PARTE 9 — MÉTRICAS DE SUCESSO

Month 1: Foundation



Site no ar com 10 calculadoras funcionais

Lighthouse 95+ em todas as páginas

Google Search Console com sitemap submetido

AdSense aplicado



Month 3: Growth



Google indexou 100% das páginas

5.000+ pageviews/mês

Primeiros rankings top 30 em keywords long-tail

AdSense aprovado (se ainda não)



Month 6: Scaling



25.000+ pageviews/mês

$100-500 AdSense MRR

20+ keywords em top 10

Expansão: adicionar 5-10 calculadoras novas



Month 12: Maturity



100.000+ pageviews/mês

$1.500-3.000 MRR (AdSense + affiliate)

Autoridade de domínio estabelecida

Decisão: Ezoic ou continuar AdSense





PARTE 10 — CHECKLIST FINAL

Antes de executar Fase 3 (Build), confirme:



&#x20;Blueprint lido por completo

&#x20;Domínio moneymathcalc.com ativo na Cloudflare

&#x20;Pasta F:\\claude-code\\moneymathcalc\\ (ou usfinancecalc renomeada) criada

&#x20;Arquivo 01-discovery.md salvo na pasta

&#x20;Arquivo 02-blueprint.md (ESTE) salvo na pasta

&#x20;CLAUDE.md atualizado com nome real do projeto

&#x20;Paleta de cores confirmada

&#x20;10 calculadoras do MVP confirmadas





FIM DO BLUEPRINT.

