\# CLAUDE.md — MoneyMathCalc



Arquivo de contexto persistente. Claude Code lê isso automaticamente em toda sessão deste projeto.



\## Sobre este projeto



\*\*Nome:\*\* MoneyMathCalc

\*\*Domínio:\*\* moneymathcalc.com (registrado na Cloudflare, ativo)

\*\*Tagline:\*\* "Smart money calculations, made simple."

\*\*Nicho:\*\* Calculadoras financeiras US (apenas — nada de fitness, math genérico, etc)

\*\*Idioma:\*\* Inglês (mercado-alvo: US/UK/Canada)

\*\*Monetização:\*\* AdSense (primário) + Affiliate futuro + Email capture opcional

\*\*Público:\*\* Americanos fazendo cálculos financeiros do dia-a-dia (mortgage, loans, retirement, taxes, etc)



\## Posicionamento editorial



\*\*A AUTORIDADE É O SITE, não um especialista humano.\*\*



Não criar personagem "John Smith, CFP". O site é apresentado como uma plataforma independente focada em cálculos precisos, transparentes e gratuitos. Nas páginas About e Disclaimer, deixar claro:

\- "We don't offer financial advice — we offer precise calculations"

\- "Tools for educational purposes only"

\- "Consult a licensed professional for decisions specific to your situation"



\## Calculadoras do MVP (10 no total)



1\. Mortgage Calculator — /mortgage-calculator

2\. Loan Calculator — /loan-calculator

3\. Auto Loan Calculator — /auto-loan-calculator

4\. Retirement Calculator — /retirement-calculator

5\. Compound Interest Calculator — /compound-interest-calculator

6\. Investment Calculator — /investment-calculator

7\. Amortization Calculator — /amortization-calculator

8\. Income Tax Calculator — /income-tax-calculator

9\. Payment Calculator — /payment-calculator

10\. Salary Calculator — /salary-calculator



Especificação completa (inputs, outputs, fórmulas, features) está em `02-blueprint.md`.



\## Stack tecnológica (NÃO alterar sem discussão)



\- \*\*Framework:\*\* Astro 4.x

\- \*\*Styling:\*\* Tailwind CSS (exclusivamente — zero CSS custom)

\- \*\*Linguagem:\*\* TypeScript

\- \*\*Calculadoras:\*\* Vanilla JavaScript no browser (sem React, a menos que necessário)

\- \*\*Hosting:\*\* Cloudflare Pages

\- \*\*Analytics:\*\* Cloudflare Web Analytics + Google Analytics 4

\- \*\*Monetização:\*\* Google AdSense (após aprovação)



\## Identidade visual



\*\*Vibe:\*\* Clean e profissional (referências: Wise, Mint, SoFi moderno).



\*\*Paleta de cores:\*\*

\- Primary: #0052CC (azul profissional) / hover #003D99

\- Primary light: #E6F0FF (fundos sutis)

\- Accent: #00B876 (verde dinheiro) / fundos #E6F9F1

\- Text: #111827 (principal), #374151 (secundário), #6B7280 (terciário)

\- Borders: #E5E7EB

\- Background: #F9FAFB, #FFFFFF

\- Warning: #F59E0B | Danger: #EF4444



\*\*Tipografia:\*\*

\- Principal: \*\*Inter\*\* (Google Fonts) — pesos 400, 500, 600, 700

\- Números grandes em resultados: \*\*JetBrains Mono\*\*

\- Escala: Display 3rem / H1 2.25rem / H2 1.75rem / H3 1.375rem / Body 1rem



\## Tom de voz



\- Direto, prático, humano

\- Segunda pessoa (you, your)

\- Sem jargão desnecessário

\- Parágrafos curtos (2-4 frases)

\- Exemplos concretos com números reais

\- NUNCA acadêmico, NUNCA corporativo formal



\## Convenções de código



\### Arquivos

\- Componentes em `src/components/` com PascalCase (ex: `Calculator.astro`)

\- Páginas em `src/pages/`

\- Lógica em `src/lib/calculations.ts` (funções puras)

\- Dados em `src/lib/data/`



\### Style

\- Sempre TypeScript (nunca JavaScript puro em arquivos de lógica)

\- Imports organizados: Astro → libraries → components → lib → styles

\- Nomes em inglês

\- Comentários apenas se código não é autoexplicativo



\### Git

\- Mensagens de commit em inglês

\- Formato: `tipo: descrição curta`

\- Tipos: feat, fix, docs, style, refactor, chore



\## Regras críticas de SEO



1\. \*\*Toda página\*\* deve ter: title único (<60 chars), meta description única (<160 chars), canonical URL, Open Graph tags, Schema.org JSON-LD.

2\. \*\*Headings:\*\* um único H1, hierarquia correta H1>H2>H3.

3\. \*\*Internal linking:\*\* mínimo 3 links internos por página.

4\. \*\*Imagens:\*\* todas com `alt` descritivo, lazy loading exceto above-the-fold.



\## Regras críticas de AdSense



1\. Cada página de calculadora: mínimo \*\*800 palavras\*\* de conteúdo textual (além da ferramenta).

2\. Páginas legais OBRIGATÓRIAS: Privacy Policy, Terms of Use, About, Contact, Disclaimer.

3\. AdSense script NÃO deve ser adicionado até aprovação — usar placeholders.

4\. Anúncios nunca devem aparecer acima do conteúdo principal.



\## Regras de AEO/GEO (otimização pra IA search)



1\. Schema.org markup em todas páginas (SoftwareApplication, FAQPage, HowTo, BreadcrumbList)

2\. FAQs com formato: pergunta como H3 + resposta em 50-60 palavras

3\. Listas numeradas e tabelas estruturadas (IA prefere)

4\. Dados específicos com números (não "a lot", mas "1.1% of property value")

5\. Fontes citadas (Freddie Mac, Bankrate, IRS)

6\. Robots.txt permite explicitamente: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai



\## Regras de performance



\- Lighthouse score mínimo: \*\*95\*\* em todas as métricas

\- LCP < 2.5s, CLS < 0.1, FID < 100ms

\- Tamanho total da página: < 200KB (excluindo imagens)

\- JavaScript total: < 50KB minified

\- Zero bloqueio de renderização



\## UX crítico das calculadoras



1\. \*\*Sempre pré-populadas com exemplo realista\*\* ao carregar — usuário vê resultado imediatamente

2\. \*\*Botão "Calculate" visível\*\* + recalcula automaticamente ao alterar inputs (blur event)

3\. \*\*Inputs avançados ocultos por padrão\*\* (toggle "+Advanced")

4\. \*\*Resultados destacados visualmente\*\* (números grandes, monospace)

5\. \*\*Share Result\*\* via URL com querystring (sem login)

6\. \*\*Save as PDF\*\* gerado client-side (sem servidor)

7\. \*\*Amortization schedule\*\* expandable (não mostrar 360 linhas de cara)



\## O que NUNCA fazer



1\. Adicionar dependências pesadas (React, Vue, jQuery) sem justificativa forte

2\. Usar CSS inline ou CSS custom fora do Tailwind

3\. Copiar conteúdo de outros sites (duplicate content mata SEO)

4\. Gerar páginas com conteúdo quase idêntico (spam penalty)

5\. Colocar código AdSense antes da aprovação

6\. Criar personagem "especialista" falso (ex: "Written by John Smith, CFP")

7\. Prometer retornos de investimento específicos (compliance)

8\. Commitar `.env`, `node\_modules`, `dist`, `.cache`



\## Arquivos de referência (ler antes de tarefas grandes)



\- `01-discovery.md` — análise detalhada do Calculator.net (concorrente)

\- `02-blueprint.md` — \*\*documento master\*\* com toda especificação

\- `../site-factory-playbook/` — prompts, templates e checklists globais



\## Comandos úteis



```bash

npm run dev        # Servidor local em localhost:4321

npm run build      # Build de produção em /dist

npm run preview    # Preview do build local

```



\## Notas de execução pro Claude Code



\- Sempre em Plan Mode pra decisões estruturais

\- Começar em Sonnet 4.6, mudar pra Opus apenas pra decisões estratégicas complexas

\- Usar `/compact` a cada 30-40 min de trabalho

\- Preferir editar arquivos existentes a criar novos

\- Confirmar antes de deletar arquivos

\- Commits Git a cada parte completa (checkpoint de segurança)

\- Se comando demora >30s, rodar em background



\## Status atual do projeto



\*\*Fase completa:\*\*

\- \[x] Fase 1: Discovery

\- \[x] Fase 2: Blueprint

\- \[ ] Fase 3: Build (PRÓXIMO)

\- \[ ] Fase 4: Programmatic SEO

\- \[ ] Fase 5: Deploy



\*\*FIM DO CLAUDE.md\*\*

