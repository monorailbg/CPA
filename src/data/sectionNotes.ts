// Comprehensive section-level overview notes for every CPA exam section.
// These appear at the top of the Notes sidebar whenever no unit is selected,
// giving the candidate a high-level orientation before drilling into modules.

import { Note } from '@/lib/types';

// ─── FAR ────────────────────────────────────────────────────────────────────

const farOverview: Note = {
  id: 'far-section-overview',
  title: 'FAR — Section Overview',
  content: `# Financial Accounting & Reporting (FAR)

## What Is FAR?
FAR is the broadest CPA exam section. It tests your knowledge of U.S. GAAP financial reporting for for-profit entities, governmental entities, and not-for-profit organizations. It is widely considered the most content-heavy section.

## Exam Structure
- **50 MCQs** (50% of score) across two testlets
- **7 Task-Based Simulations** (50% of score) including one research TBS
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Financial Reporting | 25–35% |
| Select Balance Sheet Accounts | 10–20% |
| Select Transactions | 25–35% |
| State & Local Governments | 5–15% |

## The Six FAR Units
1. **F1 — Financial Reporting**: Balance sheet, income statement, comprehensive income, EPS, stockholders' equity
2. **F2 — Assets**: Cash, receivables, inventory, PP&E, intangibles, impairment
3. **F3 — Liabilities**: Current liabilities, bonds, leases (ASC 842), contingencies, deferred taxes
4. **F4 — Equity**: Stock issuance, treasury stock, EPS advanced, stock compensation
5. **F5 — Revenue & Special Transactions**: ASC 606, foreign currency, investments, derivatives
6. **F6 — Governmental & Not-for-Profit**: Fund accounting, GASB, NFP financial statements

## Study Strategy
- Start with **F1** to build the financial statement framework.
- Master **F2** and **F3** together — most balance sheet accounts appear in both.
- **F6** (Governmental) is distinct enough to study as a separate block. Give it 2–3 weeks.
- Use the **modified accrual basis** vs. **full accrual basis** distinction as your anchor for F6.

## Key Standards to Know
- ASC 230 (Cash Flow Statement)
- ASC 606 (Revenue Recognition)
- ASC 740 (Income Taxes)
- ASC 805 (Business Combinations)
- ASC 842 (Leases)
- GASB 34 (Government Reporting Model)`,
  markdownContent: '',
  tags: ['FAR', 'overview', 'section guide'],
  topic: 'FAR Section Overview',
};

const farKeyFormulas: Note = {
  id: 'far-key-formulas',
  title: 'FAR — Key Formulas & Rules',
  content: `# FAR — Key Formulas & Rules

## Earnings Per Share
| Formula | Notes |
|---|---|
| **Basic EPS** = (Net Income − Preferred Dividends) ÷ WASO | WASO = weighted-average shares outstanding |
| **Diluted EPS** = Adjusted NI ÷ Adjusted WASO | Add dilutive securities only if they reduce EPS |
| **Treasury Stock Method** | New shares = Options outstanding × (Exercise price ÷ Avg market price) **subtracted** |
| **If-Converted Method** | Add back after-tax interest; add bond shares to denominator |

## Inventory Costing
- **FIFO**: oldest cost → COGS; newest cost → ending inventory
- **LIFO**: newest cost → COGS; oldest cost → ending inventory (not permitted under IFRS)
- **Weighted Average**: Total cost ÷ Total units = unit cost applied to both COGS and EI
- **Lower of Cost or NRV**: NRV = Estimated selling price − Cost to complete − Selling costs

## Depreciation
| Method | Formula |
|---|---|
| Straight-Line | (Cost − Salvage) ÷ Useful Life |
| Double-Declining Balance | Book Value × (2 ÷ Useful Life); no salvage in formula |
| Sum-of-Years' Digits | (Cost − Salvage) × Remaining Life ÷ SYD |
| Units of Production | (Cost − Salvage) ÷ Total Units × Units This Period |

## Bond Amortization (Effective Interest)
- **Interest expense** = Carrying value × Market rate
- **Cash paid** = Face value × Stated rate
- **Premium amortization** = Cash paid − Interest expense
- **Discount amortization** = Interest expense − Cash paid

## Lease (ASC 842)
- **ROU Asset** = Lease liability + Initial direct costs + Prepaid lease payments − Lease incentives received
- **Lease Liability** = PV of future lease payments at the lessee's incremental borrowing rate

## Deferred Taxes (ASC 740)
- **Deferred Tax Liability**: Taxable temporary difference × Enacted future tax rate
- **Deferred Tax Asset**: Deductible temporary difference × Enacted future tax rate
- **Valuation Allowance**: Reduces DTA when it is more-likely-than-not that some portion won't be realized

## Government-Wide vs. Fund Statements
| Feature | Government-Wide | Governmental Fund |
|---|---|---|
| Basis | Accrual | Modified Accrual |
| Capital assets | Reported | Not reported |
| Long-term debt | Reported | Not reported |
| Focus | Economic resources | Current financial resources |`,
  markdownContent: '',
  tags: ['FAR', 'formulas', 'EPS', 'inventory', 'depreciation'],
  topic: 'FAR Section Overview',
};

// ─── AUD ────────────────────────────────────────────────────────────────────

const audOverview: Note = {
  id: 'aud-section-overview',
  title: 'AUD — Section Overview',
  content: `# Auditing & Attestation (AUD)

## What Is AUD?
AUD tests your ability to apply professional standards in audit and attestation engagements. You must understand the audit process from engagement acceptance through reporting, and apply professional skepticism throughout.

## Exam Structure
- **50 MCQs** (50% of score)
- **7 Task-Based Simulations** (50% of score)
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Ethics, Independence & Professional Responsibilities | 15–25% |
| Assessing Risk & Developing a Planned Response | 20–30% |
| Performing Further Procedures & Obtaining Evidence | 30–40% |
| Forming Conclusions & Reporting | 15–25% |

## The Six AUD Units
1. **A1 — Ethics & Professional Responsibilities**: AICPA Code, independence, Circular 230, PCAOB
2. **A2 — Audit Planning**: Engagement letters, materiality, audit strategy, group audits
3. **A3 — Risk Assessment**: Audit risk model, fraud risk, analytical procedures in planning
4. **A4 — Internal Control**: COSO framework, control testing, IT controls
5. **A5 — Audit Evidence & Procedures**: Evidence types, confirmations, sampling, estimates
6. **A6 — Audit Reporting & Attestation**: Opinion types, report modifications, review/compilation

## Study Strategy
- Learn the **audit risk model** (AR = IR × CR × DR) first — it ties everything together.
- Independence rules have a lot of specifics. Focus on the **threats and safeguards** framework rather than memorizing every rule.
- Know the **5 opinion types** and the exact conditions that require each.
- Attestation vs. audit vs. review vs. compilation — know what level of assurance each provides.

## High-Yield Topics
- Independence threats and safeguards
- Fraud risk factors (the fraud triangle)
- Types of audit evidence and their reliability ranking
- Going concern reporting
- Audit sampling (attributes vs. variables)`,
  markdownContent: '',
  tags: ['AUD', 'overview', 'audit', 'section guide'],
  topic: 'AUD Section Overview',
};

const audKeyRules: Note = {
  id: 'aud-key-rules',
  title: 'AUD — Key Rules & Frameworks',
  content: `# AUD — Key Rules & Frameworks

## The Audit Risk Model
**AR = IR × CR × DR**
- **AR** (Audit Risk): Risk of issuing wrong opinion — auditor sets this LOW
- **IR** (Inherent Risk): Risk of material misstatement ignoring internal controls
- **CR** (Control Risk): Risk that internal controls won't prevent/detect misstatement
- **DR** (Detection Risk): Risk that auditor's procedures won't catch remaining misstatements
- **Key**: DR is the only risk the auditor **controls** by varying procedures

## Types of Audit Opinions
| Opinion | When Used |
|---|---|
| Unmodified (Clean) | FS present fairly in all material respects |
| Qualified | Material but not pervasive misstatement or scope limitation |
| Adverse | Misstatements are material AND pervasive |
| Disclaimer | Cannot obtain sufficient appropriate evidence; pervasive |
| Emphasis of Matter | Going concern, change in accounting principle (opinion unchanged) |

## Levels of Assurance
| Engagement | Assurance | Standard |
|---|---|---|
| Audit | High (reasonable) | GAAS / PCAOB |
| Review | Limited (negative assurance) | SSARS AR-C 90 |
| Compilation | None | SSARS AR-C 80 |
| Agreed-Upon Procedures | None (findings only) | AT-C 215 |

## Independence: Threats & Safeguards
**Threats**: Self-interest, Self-review, Advocacy, Familiarity, Intimidation, Undue influence
**Safeguards**: Firm policies, Engagement quality review, Client acceptance procedures, Professional standards

## The Fraud Triangle
1. **Incentive / Pressure**: Financial stress, bonus targets, analyst expectations
2. **Opportunity**: Weak internal controls, poor oversight
3. **Rationalization**: "I'll pay it back," "I deserve it"

## Audit Evidence Reliability Hierarchy
Most reliable → Least reliable:
1. Auditor's direct observation
2. External confirmations
3. Documents obtained directly from external sources
4. Client documents with external verification
5. Client-generated documents (internal only)
6. Oral representations`,
  markdownContent: '',
  tags: ['AUD', 'audit risk', 'opinions', 'independence', 'fraud'],
  topic: 'AUD Section Overview',
};

// ─── REG ────────────────────────────────────────────────────────────────────

const regOverview: Note = {
  id: 'reg-section-overview',
  title: 'REG — Section Overview',
  content: `# Taxation & Regulation (REG)

## What Is REG?
REG tests federal taxation for individuals, entities, and property transactions, plus business law fundamentals. It is calculation-heavy and requires knowing the tax code in detail.

## Exam Structure
- **50 MCQs** (50% of score)
- **7 Task-Based Simulations** (50% of score)
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Ethics & Professional Responsibilities in Tax Practice | 10–20% |
| Business Law | 10–20% |
| Federal Tax Procedures | 10–20% |
| Individual Taxation | 15–25% |
| Entity Taxation | 20–30% |

## The Six REG Units
1. **R1 — Federal Tax Procedures**: Circular 230, preparer penalties, SOL, IRS process
2. **R2 — Individual Taxation**: Gross income, deductions, credits, AMT, filing status
3. **R3 — Entity Taxation**: C corps, partnerships, S corps, consolidated returns
4. **R4 — Property Transactions**: Realized/recognized gain, basis, §1231/§1245/§1250
5. **R5 — Business Law**: Contracts, UCC, agency, secured transactions, bankruptcy
6. **R6 — Ethics & Professional Responsibilities**: Tax ethics, due diligence, disclosure

## Study Strategy
- Build individual taxation first (R2) — entity rules layer on top of individual rules.
- §1031 like-kind exchanges and the §199A QBI deduction are high-frequency topics.
- For business law, focus on **contracts** (formation, Statute of Frauds) and **secured transactions** (perfection under UCC Article 9).
- Memorize key thresholds: standard deduction amounts, AMT exemptions, SOL periods.

## High-Yield Topics
- Gross income inclusions and exclusions
- §199A qualified business income deduction
- Partnership inside vs. outside basis
- S corporation eligibility and built-in gains tax
- §1231 netting rules and recapture (§1245, §1250)
- Contract formation and the Statute of Frauds`,
  markdownContent: '',
  tags: ['REG', 'overview', 'tax', 'section guide'],
  topic: 'REG Section Overview',
};

const regKeyRules: Note = {
  id: 'reg-key-rules',
  title: 'REG — Key Tax Rules & Formulas',
  content: `# REG — Key Tax Rules & Formulas

## Individual Tax Formula
1. Gross Income (all income from whatever source)
2. − Above-the-line deductions (AGI adjustments)
3. = **Adjusted Gross Income (AGI)**
4. − Greater of standard deduction or itemized deductions
5. − QBI deduction (§199A, up to 20% of QBI)
6. = **Taxable Income**
7. × Tax rate → Gross Tax
8. − Credits
9. = **Tax Liability**

## Key Gross Income Exclusions
- Life insurance proceeds (death benefit)
- Gifts and inheritances
- Municipal bond interest
- Workers' compensation
- Up to $250,000 ($500,000 MFJ) of §121 home sale gain

## §1231 / §1245 / §1250 Netting
- **§1231 assets**: depreciable business property held >1 year
- **§1231 gain** → capital gain (if net gain); ordinary loss (if net loss)
- **§1245 recapture**: ordinary income to the extent of depreciation taken (personal property)
- **§1250 recapture**: ordinary income to the extent of excess depreciation (real property)

## Partnership Basis
- **Inside basis**: Partnership's basis in assets
- **Outside basis**: Partner's basis in partnership interest
- Outside basis increases with: income allocations, additional contributions
- Outside basis decreases with: loss allocations, distributions

## S Corporation Key Rules
- Max **100 shareholders**, only **one class of stock**
- No corporate shareholders (except certain trusts)
- Income/loss flows through to shareholders (no entity-level tax generally)
- Built-in gains tax applies within 5 years of S election if converted from C corp

## Statute of Limitations (Assessment)
| Situation | SOL |
|---|---|
| Standard | 3 years from later of return due date or filing |
| >25% understatement of gross income | 6 years |
| Fraud or no return filed | Unlimited |`,
  markdownContent: '',
  tags: ['REG', 'tax formula', 'individual', 'partnership', 'S corp'],
  topic: 'REG Section Overview',
};

// ─── BAR ────────────────────────────────────────────────────────────────────

const barOverview: Note = {
  id: 'bar-section-overview',
  title: 'BAR — Section Overview',
  content: `# Business Analysis & Reporting (BAR)

## What Is BAR?
BAR is one of the three CPA discipline sections (you choose one of BAR, TCP, or ISC). It tests financial statement analysis, planning & budgeting, performance management, advanced reporting (consolidations, business combinations), and governmental accounting.

## Exam Structure
- **50 MCQs** (50% of score)
- **7 Task-Based Simulations** (50% of score)
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Business Analysis | 40–50% |
| Technical Accounting & Reporting | 35–45% |
| State & Local Governments | 10–20% |

## The Five BAR Units
1. **B1 — Financial Statement Analysis**: Ratio analysis, DuPont, common-size, earnings quality
2. **B2 — Planning, Budgeting & Forecasting**: Master budgets, variance analysis, capital budgeting
3. **B3 — Performance Management**: Balanced scorecard, EVA, ABC costing, transfer pricing
4. **B4 — Advanced Reporting**: Business combinations (ASC 805), consolidations, VIEs, foreign currency
5. **B5 — Government Accounting**: GASB 34 model, fund vs. government-wide statements

## Study Strategy
- If you passed FAR, B4 (Advanced Reporting) and B5 (Government) will feel familiar — reinforce rather than relearn.
- B1–B3 (business analysis) may be new territory. Focus on **ratio families** and **variance analysis** formulas.
- Capital budgeting (NPV, IRR, payback) is high-frequency in B2.
- Know the **consolidation worksheet** mechanics for B4.

## High-Yield Topics
- Liquidity, solvency, and profitability ratios
- Flexible budget variance (price vs. volume)
- NPV and IRR capital budgeting
- ASC 805 business combination — purchase price allocation, goodwill
- Fund balance classifications (nonspendable, restricted, committed, assigned, unassigned)`,
  markdownContent: '',
  tags: ['BAR', 'overview', 'business analysis', 'section guide'],
  topic: 'BAR Section Overview',
};

// ─── TCP ────────────────────────────────────────────────────────────────────

const tcpOverview: Note = {
  id: 'tcp-section-overview',
  title: 'TCP — Section Overview',
  content: `# Tax Compliance & Planning (TCP)

## What Is TCP?
TCP is one of the three discipline sections. It goes deeper into individual and entity tax compliance, tax planning strategies, and advanced property transaction topics beyond what REG covers.

## Exam Structure
- **50 MCQs** (50% of score)
- **7 Task-Based Simulations** (50% of score)
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Tax Compliance & Planning for Individuals | 30–40% |
| Tax Compliance & Planning for Entities | 30–40% |
| Property Transactions (Advanced) | 10–20% |
| Advanced Tax Topics | 10–20% |

## The Five TCP Units
1. **T1 — Individual Tax Compliance**: Filing requirements, estimated payments, self-employment, NII tax
2. **T2 — Entity Tax Compliance**: Corporate, partnership, S corp filings and elections
3. **T3 — Tax Planning**: Entity choice, retirement, Roth conversions, charitable giving, estate planning
4. **T4 — Property Transactions**: Like-kind exchanges, installment sales, §179/bonus depreciation, QOZ
5. **T5 — Advanced Tax Topics**: International tax, §1202 QSBS, GST, trusts, stock compensation

## Study Strategy
- Build on REG knowledge — TCP is a deeper dive, not a restart.
- **Entity choice planning** (T3) is the core planning skill — compare effective tax rates across entity types.
- §1031 like-kind exchange planning appears in both REG and TCP; master the boot rules.
- **Retirement planning** (Roth conversions, RMDs, plan contribution limits) is uniquely TCP-heavy.

## High-Yield Topics
- Net investment income tax (§1411) — 3.8% on passive investment income
- Self-employment tax and SE income deduction
- §179 expensing and bonus depreciation interaction
- Qualified Opportunity Zone (QOZ) investment tax incentives
- Generation-skipping transfer tax
- Trust taxation and distributable net income`,
  markdownContent: '',
  tags: ['TCP', 'overview', 'tax planning', 'section guide'],
  topic: 'TCP Section Overview',
};

// ─── ISC ────────────────────────────────────────────────────────────────────

const iscOverview: Note = {
  id: 'isc-section-overview',
  title: 'ISC — Section Overview',
  content: `# Information Systems & Controls (ISC)

## What Is ISC?
ISC is the third discipline section. It tests IT governance, data management, cybersecurity, and enterprise risk management with a focus on how these topics affect financial reporting and audit engagements.

## Exam Structure
- **50 MCQs** (50% of score)
- **7 Task-Based Simulations** (50% of score)
- **Time limit**: 4 hours

## Content Areas & Weights
| Area | Weight |
|---|---|
| Information Systems & Data Management | 35–45% |
| Security, Confidentiality & Privacy | 35–45% |
| Considerations for System and Organization Controls (SOC) Engagements | 15–25% |

## The Four ISC Units
1. **I1 — Information Systems**: IT governance (COBIT), SDLC, IT general controls, ERP systems
2. **I2 — Data Management**: Data classification, databases, analytics, data integrity controls
3. **I3 — Cybersecurity**: NIST CSF, network security, incident response, BCP/DR
4. **I4 — Governance, Risk & Controls**: COSO ERM, IT risk, SOC reports, third-party vendor risk

## Study Strategy
- If you have an audit background, the SOC reporting content (I4) will be the most familiar.
- Focus on **COSO ERM** vs. **COSO Internal Control** — both appear and they have different components.
- Know the three **SOC report types** (SOC 1, SOC 2, SOC 3) and their distinct purposes cold.
- Cybersecurity (I3) emphasizes frameworks and controls — you don't need deep technical IT knowledge.

## High-Yield Topics
- COBIT IT governance framework
- IT general controls vs. application controls
- SOC 1 (ICFR) vs. SOC 2 (Trust Service Criteria) vs. SOC 3 (public)
- The NIST Cybersecurity Framework (Identify → Protect → Detect → Respond → Recover)
- Business continuity vs. disaster recovery
- Segregation of duties in IT environments
- GDPR and CCPA key principles`,
  markdownContent: '',
  tags: ['ISC', 'overview', 'IT', 'cybersecurity', 'section guide'],
  topic: 'ISC Section Overview',
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export const SECTION_NOTES: Record<string, Note[]> = {
  FAR: [farOverview, farKeyFormulas],
  AUD: [audOverview, audKeyRules],
  REG: [regOverview, regKeyRules],
  BAR: [barOverview],
  TCP: [tcpOverview],
  ISC: [iscOverview],
};
