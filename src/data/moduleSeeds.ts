// Becker-style CPA Evolution curriculum outline: per-section units and their
// modules, each seeded with a compact set of real exam topics. Consumed by
// cpaDatabase.ts, which expands each module's topics into a full content
// bank (20 MCQs, flashcards, summary notes) via curriculumGenerator.ts.

import { CPASection } from '@/lib/types';

export interface ModuleSeed {
  shortName: string;
  name: string;
  description: string;
  topics: string[];
}

export interface UnitSeedSpec {
  code: string;
  name: string;
  description: string;
  modules: ModuleSeed[];
}

export type SectionSpec = Record<CPASection, UnitSeedSpec[]>;

export const curriculumOutline: SectionSpec = {
  FAR: [
    {
      code: 'F1',
      name: 'Financial Reporting',
      description: 'The financial reporting environment, required statements, and how they articulate together.',
      modules: [
        {
          shortName: 'M1',
          name: 'Balance Sheet, Income Statement & Comprehensive Income',
          description: 'Fundamental financial statement formats, asset/liability classification, operating vs. non-operating presentation, discontinued operations, and AOCI vs. net income.',
          topics: [
            'classified balance sheet presentation and asset/liability classification',
            'multi-step income statement and operating vs. non-operating items',
            'discontinued operations presented net of tax',
            'components of other comprehensive income (OCI)',
            'accumulated other comprehensive income (AOCI) vs. net income flow-through',
            'statement of comprehensive income presentation formats',
          ],
        },
        {
          shortName: 'M2',
          name: 'EPS & Public Company Reporting Topics',
          description: 'Basic and diluted EPS calculations, the treasury stock and if-converted methods, and SEC filing requirements.',
          topics: [
            'basic earnings per share calculation',
            'diluted EPS and the treasury stock method for options and warrants',
            'the if-converted method for convertible bonds and convertible preferred stock',
            'antidilutive securities and the EPS sequencing test',
            'SEC Form 10-K annual report filing requirements',
            'SEC Form 10-Q filing deadlines and accelerated filer status',
          ],
        },
        {
          shortName: 'M3',
          name: "Stockholders' Equity: Part 1",
          description: 'Issuance of common and preferred stock, treasury stock accounting, and foundational equity balances.',
          topics: [
            'issuance of common stock at par value with additional paid-in capital (APIC)',
            'issuance of preferred stock and its features',
            'treasury stock accounting under the cost method',
            'treasury stock accounting under the par value method',
            'tracking par value and APIC balances through equity transactions',
            'subscribed stock and stock issuance costs',
          ],
        },
        {
          shortName: 'M4',
          name: "Stockholders' Equity: Part 2",
          description: 'Cash and stock dividends, stock splits, retained earnings appropriations, and the statement of changes in equity.',
          topics: [
            'cash dividend declaration, record, and payment dates',
            'small stock dividends vs. large stock dividends',
            'stock splits and their effect on par value and shares outstanding',
            'retained earnings appropriations and restrictions',
            'prior period adjustments to retained earnings',
            'compiling the statement of changes in stockholders\' equity',
          ],
        },
      ],
    },
    {
      code: 'F2',
      name: 'Assets',
      description: 'Recognition, measurement, and disclosure of cash, receivables, inventory, PP&E, and intangibles.',
      modules: [
        { shortName: 'M1', name: 'Cash & Receivables', description: 'Cash classification, bank reconciliations, and receivables accounting.', topics: ['cash and cash equivalents classification', 'bank reconciliations', 'accounts receivable recognition', 'allowance for credit losses (ASC 326)', 'factoring and assignment of receivables', 'notes receivable and imputed interest'] },
        { shortName: 'M2', name: 'Inventory', description: 'Inventory costing, valuation, and estimation techniques.', topics: ['inventory costing methods (FIFO, LIFO, weighted average)', 'lower of cost or net realizable value', 'periodic vs. perpetual inventory systems', 'inventory estimation techniques (gross profit/retail method)', 'consignment inventory', 'inventory error analysis'] },
        { shortName: 'M3', name: 'Property, Plant & Equipment', description: 'PP&E initial measurement, depreciation, and subsequent costs.', topics: ['initial measurement of PP&E', 'capitalized interest', 'depreciation methods', 'nonmonetary exchanges', 'subsequent expenditures (repairs vs. improvements)', 'asset retirement obligations'] },
        { shortName: 'M4', name: 'Intangible Assets', description: 'Intangible asset recognition, amortization, and goodwill.', topics: ['intangible asset recognition and amortization', 'goodwill recognition', 'research and development costs', 'internally developed software costs', 'trademarks, patents, and copyrights', 'indefinite-lived intangible assets'] },
        { shortName: 'M5', name: 'Impairment & Asset Disposals', description: 'Impairment testing and accounting for asset disposals.', topics: ['impairment of long-lived assets held for use', 'impairment of assets held for sale', 'goodwill impairment testing', 'held-for-sale classification criteria', 'gain or loss on disposal', 'impairment reversal rules'] },
      ],
    },
    {
      code: 'F3',
      name: 'Liabilities',
      description: 'Current and long-term liabilities, leases, contingencies, and deferred taxes.',
      modules: [
        { shortName: 'M1', name: 'Current Liabilities', description: 'Recognition and classification of current liabilities.', topics: ['accounts payable and accrued liabilities', 'short-term debt classification', 'compensated absences', 'warranty obligations', 'refinancing of short-term debt', 'current portion of long-term debt'] },
        { shortName: 'M2', name: 'Bonds Payable', description: 'Bond issuance, amortization, and extinguishment.', topics: ['bond issuance at premium or discount', 'effective interest amortization', 'bond issue costs', 'early extinguishment of debt', 'convertible bonds and beneficial conversion features', 'troubled debt restructuring'] },
        { shortName: 'M3', name: 'Long-Term Liabilities', description: 'Notes payable and other long-term obligations.', topics: ['notes payable and imputed interest', 'asset retirement obligations', 'long-term purchase commitments', 'off-balance-sheet financing', 'debt covenants and classification', 'term loans and line-of-credit agreements'] },
        { shortName: 'M4', name: 'Contingencies & Commitments', description: 'Loss and gain contingencies and commitment disclosures.', topics: ['loss contingency recognition (ASC 450)', 'gain contingencies', 'litigation and warranty accruals', 'commitments disclosure', 'guarantees', 'unconditional purchase obligations'] },
        { shortName: 'M5', name: 'Leases', description: 'Lessee and lessor accounting under ASC 842.', topics: ['lease classification under ASC 842', 'lessee right-of-use asset and lease liability', 'lessor sales-type vs. operating leases', 'lease modifications', 'short-term lease exception', 'sale-leaseback transactions'] },
        { shortName: 'M6', name: 'Deferred Taxes', description: 'Temporary differences and deferred tax accounting under ASC 740.', topics: ['temporary vs. permanent differences', 'deferred tax assets and liabilities', 'valuation allowances', 'uncertain tax positions (ASC 740)', 'net operating loss carryforwards', 'intraperiod tax allocation'] },
      ],
    },
    {
      code: 'F4',
      name: 'Equity',
      description: 'Stockholders’ equity accounts, treasury stock, EPS, and stock compensation.',
      modules: [
        { shortName: 'M1', name: 'Equity Basics', description: 'Common and preferred stock issuance and equity fundamentals.', topics: ['common and preferred stock issuance', 'stock subscriptions', 'par value vs. no-par stock', 'stock splits and stock dividends', 'dividends in arrears', 'book value per share'] },
        { shortName: 'M2', name: 'Treasury Stock', description: 'Cost and par value methods of accounting for treasury stock.', topics: ['cost method for treasury stock', 'par value method for treasury stock', 'retirement of treasury shares', 'treasury stock and EPS', 'treasury stock disclosure', 'reissuance of treasury shares'] },
        { shortName: 'M3', name: 'EPS', description: 'Basic and diluted earnings per share computations.', topics: ['basic earnings per share', 'diluted earnings per share', 'the treasury stock method', 'if-converted method for convertible securities', 'antidilutive securities', 'weighted average shares outstanding'] },
        { shortName: 'M4', name: 'Stock Compensation', description: 'Share-based payment accounting under ASC 718.', topics: ['stock option fair value measurement (ASC 718)', 'restricted stock units', 'grant date and vesting conditions', 'graded vs. cliff vesting expense recognition', 'employee stock purchase plans', 'modification of stock awards'] },
        { shortName: 'M5', name: 'Statement of Equity', description: 'Statement of stockholders’ equity preparation and comprehensive income.', topics: ['statement of stockholders’ equity format', 'accumulated other comprehensive income', 'prior period adjustments in equity', 'noncontrolling interest presentation', 'comprehensive income reporting', 'equity roll-forward reconciliation'] },
      ],
    },
    {
      code: 'F5',
      name: 'Revenue & Special Transactions',
      description: 'Revenue recognition, long-term contracts, foreign currency, investments, and derivatives.',
      modules: [
        { shortName: 'M1', name: 'Revenue Recognition', description: 'The 5-step revenue recognition model under ASC 606.', topics: ['the 5-step revenue model (ASC 606)', 'identifying performance obligations', 'determining transaction price', 'variable consideration', 'contract assets and contract liabilities', 'principal vs. agent considerations'] },
        { shortName: 'M2', name: 'Long-Term Contracts', description: 'Revenue recognition over time for long-term construction-type contracts.', topics: ['revenue recognition over time vs. point in time', 'percentage-of-completion measures of progress', 'contract modifications', 'losses on long-term contracts', 'costs to fulfill a contract', 'construction-type contract disclosures'] },
        { shortName: 'M3', name: 'Foreign Currency', description: 'Foreign currency transactions, remeasurement, and translation.', topics: ['foreign currency transaction gains and losses', 'foreign currency translation (functional currency)', 'remeasurement vs. translation', 'hedges of foreign currency exposure', 'the temporal method', 'translation adjustments in OCI'] },
        { shortName: 'M4', name: 'Investments', description: 'Accounting for debt and equity investments.', topics: ['held-to-maturity debt securities', 'trading and available-for-sale securities', 'the equity method of accounting', 'fair value option for investments', 'other-than-temporary impairment', 'investments in joint ventures'] },
        { shortName: 'M5', name: 'Derivatives & Hedging', description: 'Derivative recognition and hedge accounting under ASC 815.', topics: ['recognition and measurement of derivatives (ASC 815)', 'fair value hedges', 'cash flow hedges', 'hedge effectiveness documentation', 'embedded derivatives', 'net investment hedges'] },
        { shortName: 'M6', name: 'Other Special Transactions', description: 'Nonmonetary exchanges, restructurings, and business combination basics.', topics: ['nonmonetary exchanges with commercial substance', 'troubled debt restructurings', 'business combinations overview (ASC 805)', 'noncontrolling interests in consolidation', 'spin-offs and divestitures', 'related party transactions'] },
      ],
    },
    {
      code: 'F6',
      name: 'Governmental & Not-for-Profit',
      description: 'Governmental fund accounting and not-for-profit financial reporting.',
      modules: [
        { shortName: 'M1', name: 'Government Accounting Fundamentals', description: 'Fund structure, measurement focus, and the modified accrual basis.', topics: ['fund accounting structure', 'the modified accrual basis', 'budgetary accounting and encumbrances', 'measurement focus by fund type', 'interfund transactions', 'GASB conceptual framework'] },
        { shortName: 'M2', name: 'Government Funds', description: 'Governmental fund types and fund balance classification.', topics: ['the general fund', 'special revenue funds', 'capital projects funds', 'debt service funds', 'permanent funds', 'fund balance classifications'] },
        { shortName: 'M3', name: 'Government-Wide Statements', description: 'Government-wide financial statements and fund reconciliation.', topics: ['the statement of net position', 'the statement of activities', 'reconciliation from fund to government-wide statements', 'infrastructure and capital asset reporting', 'long-term debt in government-wide statements', 'component units and the reporting entity'] },
        { shortName: 'M4', name: 'Not-for-Profit Accounting', description: 'Net asset classification and contribution accounting for NFPs.', topics: ['net assets with and without donor restrictions', 'contributions and unconditional promises to give', 'conditional contributions', 'donated services and gifts-in-kind', 'endowment accounting', 'functional expense classification'] },
        { shortName: 'M5', name: 'NFP Financial Statements', description: 'Required not-for-profit financial statements and disclosures.', topics: ['the statement of financial position for NFPs', 'the statement of activities for NFPs', 'the statement of cash flows for NFPs', 'statement of functional expenses', 'liquidity and availability disclosures', 'NFP revenue recognition for exchange transactions'] },
      ],
    },
  ],
  AUD: [
    { code: 'A1', name: 'Ethics & Professional Responsibilities', description: 'The AICPA Code of Professional Conduct, independence, and professional responsibilities.', modules: [{ shortName: 'M1', name: 'Ethics & Professional Responsibilities', description: 'AICPA Code of Professional Conduct, independence, and ethics rules governing CPAs.', topics: ['the AICPA Code of Professional Conduct framework', 'independence rules for attest engagements', 'threats and safeguards to independence', 'Circular 230 and tax practice', 'PCAOB independence requirements', 'acts discreditable to the profession'] }] },
    { code: 'A2', name: 'Audit Planning', description: 'Engagement acceptance, understanding the entity, and developing the audit strategy.', modules: [{ shortName: 'M1', name: 'Audit Planning', description: 'Engagement letters, materiality, and audit strategy development.', topics: ['engagement letters and preconditions for an audit', 'understanding the entity and its environment', 'materiality and performance materiality', 'audit strategy and the audit plan', 'group audit considerations', 'using the work of internal auditors'] }] },
    { code: 'A3', name: 'Risk Assessment', description: 'The audit risk model, fraud risk, and risk assessment procedures.', modules: [{ shortName: 'M1', name: 'Risk Assessment', description: 'Audit risk model components and fraud risk assessment.', topics: ['the audit risk model (AR = IR × CR × DR)', 'inherent risk factors', 'fraud risk factors and the fraud triangle', 'risk assessment procedures', 'analytical procedures in planning', 'assessing risk of material misstatement'] }] },
    { code: 'A4', name: 'Internal Control', description: 'The COSO framework and evaluating internal control.', modules: [{ shortName: 'M1', name: 'Internal Control', description: 'COSO internal control components and control testing.', topics: ['COSO internal control framework components', 'the control environment', 'control activities and segregation of duties', 'information and communication systems', 'monitoring activities', 'walkthroughs and tests of controls'] }] },
    { code: 'A5', name: 'Audit Evidence & Procedures', description: 'Gathering sufficient appropriate audit evidence and sampling.', modules: [{ shortName: 'M1', name: 'Audit Evidence & Procedures', description: 'Evidence types, confirmations, and audit sampling techniques.', topics: ['types of audit evidence', 'external confirmations', 'substantive analytical procedures', 'audit sampling for attributes and variables', 'auditing accounting estimates and fair value', 'auditing related party transactions'] }] },
    { code: 'A6', name: 'Audit Reporting & Attestation', description: 'Audit opinions, report modifications, and attestation engagements.', modules: [{ shortName: 'M1', name: 'Audit Reporting & Attestation', description: 'Audit opinion types and attestation/review engagement reporting.', topics: ['the unmodified audit opinion', 'qualified, adverse, and disclaimer opinions', 'emphasis-of-matter and other-matter paragraphs', 'going concern reporting', 'SSARS compilation and review engagements', 'attestation and agreed-upon procedures engagements'] }] },
  ],
  REG: [
    { code: 'R1', name: 'Federal Tax Procedures', description: 'Practice before the IRS, preparer penalties, and procedural rules.', modules: [{ shortName: 'M1', name: 'Federal Tax Procedures', description: 'Circular 230, preparer penalties, and IRS procedure.', topics: ['Circular 230 practice requirements', 'tax return preparer penalties (IRC §6694)', 'statute of limitations for assessment', 'IRS examination and appeals process', 'offers in compromise and installment agreements', 'accuracy-related and civil fraud penalties'] }] },
    { code: 'R2', name: 'Individual Taxation', description: 'Individual gross income, deductions, credits, and AMT.', modules: [{ shortName: 'M1', name: 'Individual Taxation', description: 'Individual income, deductions, credits, and alternative minimum tax.', topics: ['gross income inclusions and exclusions', 'above-the-line and itemized deductions', 'the qualified business income deduction (§199A)', 'individual tax credits', 'alternative minimum tax for individuals', 'filing status and dependency rules'] }] },
    { code: 'R3', name: 'Entity Taxation', description: 'C corporation, partnership, and S corporation taxation.', modules: [{ shortName: 'M1', name: 'Entity Taxation', description: 'Corporate, partnership, and S corporation tax fundamentals.', topics: ['C corporation taxable income computation', 'the dividends received deduction', 'partnership inside vs. outside basis', 'S corporation eligibility and pass-through income', 'partnership and S corp distributions', 'consolidated tax return eligibility'] }] },
    { code: 'R4', name: 'Property Transactions', description: 'Gain/loss recognition, basis, and depreciation recapture.', modules: [{ shortName: 'M1', name: 'Property Transactions', description: 'Realized/recognized gains, basis rules, and recapture.', topics: ['realized vs. recognized gain or loss', 'like-kind exchanges (§1031)', 'basis of gifted and inherited property', '§1245 and §1250 depreciation recapture', '§1231 property netting', 'installment sale reporting'] }] },
    { code: 'R5', name: 'Business Law', description: 'Contracts, agency, secured transactions, and bankruptcy.', modules: [{ shortName: 'M1', name: 'Business Law', description: 'Contract law, agency, secured transactions, and bankruptcy basics.', topics: ['contract formation and the Statute of Frauds', 'UCC Article 2 sale of goods', 'agency formation and principal liability', 'secured transactions and perfection (UCC Article 9)', 'business entity formation and liability', 'bankruptcy Chapter 7 and Chapter 11'] }] },
    { code: 'R6', name: 'Ethics & Professional Responsibilities', description: 'Tax practice ethics, due diligence, and disciplinary rules.', modules: [{ shortName: 'M1', name: 'Ethics & Professional Responsibilities', description: 'Tax practitioner ethics, due diligence, and disclosure rules.', topics: ['the AICPA Code of Professional Conduct in tax practice', 'tax preparer due diligence requirements', 'privileged communications and disclosure of taxpayer information', 'licensing and disciplinary actions by state boards', 'independence considerations in tax engagements', 'Treasury Circular 230 sanctions'] }] },
  ],
  BAR: [
    { code: 'B1', name: 'Financial Statement Analysis', description: 'Ratio analysis and evaluating financial statement performance.', modules: [{ shortName: 'M1', name: 'Financial Statement Analysis', description: 'Liquidity, solvency, and profitability ratio analysis.', topics: ['liquidity and solvency ratio analysis', 'profitability and efficiency ratios', 'DuPont analysis', 'common-size and trend analysis', 'earnings quality and non-GAAP measures', 'segment reporting analysis'] }] },
    { code: 'B2', name: 'Planning, Budgeting & Forecasting', description: 'Budgeting processes, variance analysis, and capital budgeting.', modules: [{ shortName: 'M1', name: 'Planning, Budgeting & Forecasting', description: 'Master budgets, variance analysis, and capital budgeting techniques.', topics: ['the master budget and budgeting process', 'flexible budgets and standard costing', 'variance analysis (price and volume)', 'financial forecasting methods', 'capital budgeting (NPV and IRR)', 'working capital management techniques'] }] },
    { code: 'B3', name: 'Performance Management', description: 'Balanced scorecard, EVA, and performance measurement systems.', modules: [{ shortName: 'M1', name: 'Performance Management', description: 'Balanced scorecard, EVA, KPIs, and costing for performance evaluation.', topics: ['the balanced scorecard framework', 'economic value added (EVA)', 'responsibility accounting and segment reporting', 'key performance indicators', 'activity-based costing', 'transfer pricing methods'] }] },
    { code: 'B4', name: 'Advanced Reporting', description: 'Business combinations, consolidations, and advanced reporting topics.', modules: [{ shortName: 'M1', name: 'Advanced Reporting', description: 'Business combinations, consolidation, and SEC reporting.', topics: ['business combinations under ASC 805', 'consolidation and noncontrolling interests', 'equity method investments', 'foreign currency translation in consolidation', 'variable interest entities', 'SEC reporting requirements'] }] },
    { code: 'B5', name: 'Government Accounting', description: 'Government-wide and fund-level reporting for the BAR discipline.', modules: [{ shortName: 'M1', name: 'Government Accounting', description: 'GASB reporting model and government financial statement preparation.', topics: ['government-wide vs. fund financial statements', 'GASB 34 reporting model', 'budgetary comparison schedules', 'capital asset and infrastructure reporting', 'fiduciary fund reporting', 'component units in government reporting'] }] },
  ],
  ISC: [
    { code: 'I1', name: 'Information Systems', description: 'IT governance and the systems development life cycle.', modules: [{ shortName: 'M1', name: 'Information Systems', description: 'IT governance frameworks and the systems development life cycle.', topics: ['IT governance frameworks (COBIT)', 'the systems development life cycle', 'IT general controls', 'application controls vs. general controls', 'change management controls', 'enterprise resource planning (ERP) systems'] }] },
    { code: 'I2', name: 'Data Management', description: 'Data governance, integrity, and analytics.', modules: [{ shortName: 'M1', name: 'Data Management', description: 'Data classification, governance, and analytics in financial reporting.', topics: ['data classification and data governance', 'database management systems', 'data integrity and validation controls', 'data analytics in financial reporting', 'master data management', 'data lifecycle management'] }] },
    { code: 'I3', name: 'Cybersecurity', description: 'Cybersecurity frameworks, network security, and incident response.', modules: [{ shortName: 'M1', name: 'Cybersecurity', description: 'Cybersecurity frameworks, network security, and incident response planning.', topics: ['cybersecurity frameworks (NIST CSF)', 'network security fundamentals (firewalls, encryption)', 'incident response planning', 'business continuity and disaster recovery', 'identity and access management', 'phishing and social engineering risks'] }] },
    { code: 'I4', name: 'Governance, Risk & Controls', description: 'Enterprise risk management and IT-related governance and controls.', modules: [{ shortName: 'M1', name: 'Governance, Risk & Controls', description: 'COSO ERM, IT risk assessment, and SOC reporting.', topics: ['the COSO ERM framework', 'IT risk assessment', 'SOC 1 vs. SOC 2 vs. SOC 3 reports', 'segregation of duties in IT environments', 'third-party vendor risk management', 'regulatory compliance (GDPR, CCPA)'] }] },
  ],
  TCP: [
    { code: 'T1', name: 'Individual Tax Compliance', description: 'Individual filing requirements and compliance procedures.', modules: [{ shortName: 'M1', name: 'Individual Tax Compliance', description: 'Individual filing requirements, estimated payments, and amended returns.', topics: ['individual tax return filing requirements', 'estimated tax payment rules', 'self-employment tax compliance', 'retirement plan distribution rules', 'net investment income tax compliance', 'amended return procedures'] }] },
    { code: 'T2', name: 'Entity Tax Compliance', description: 'Corporate, partnership, and S corporation filing compliance.', modules: [{ shortName: 'M1', name: 'Entity Tax Compliance', description: 'Entity-level filing requirements and elections.', topics: ['corporate tax return filing requirements', 'partnership return filing and Schedule K-1 reporting', 'S corporation compliance requirements', 'estimated tax payments for corporations', 'consolidated return filing requirements', 'entity-level tax elections'] }] },
    { code: 'T3', name: 'Tax Planning', description: 'Entity choice, retirement, and charitable giving tax planning strategies.', modules: [{ shortName: 'M1', name: 'Tax Planning', description: 'Entity choice, retirement, and estate planning strategies.', topics: ['entity choice tax planning', 'retirement and Roth conversion planning strategies', 'charitable giving strategies', 'estate and gift tax planning fundamentals', 'multi-state tax planning', 'timing strategies for income and deductions'] }] },
    { code: 'T4', name: 'Property Transactions', description: 'Advanced planning for property dispositions and depreciation.', modules: [{ shortName: 'M1', name: 'Property Transactions', description: 'Like-kind exchange, installment sale, and depreciation planning.', topics: ['like-kind exchange planning opportunities', 'installment sale planning', 'depreciation planning (§179 and bonus depreciation)', 'qualified opportunity zone investments', 'capital gain and loss planning', 'basis planning for gifted and inherited property'] }] },
    { code: 'T5', name: 'Advanced Tax Topics', description: 'International tax, trusts, and advanced planning topics.', modules: [{ shortName: 'M1', name: 'Advanced Tax Topics', description: 'International tax, trusts, and stock compensation planning.', topics: ['international tax considerations', 'qualified small business stock exclusion (§1202)', 'generation-skipping transfer tax', 'trusts in tax and estate planning', 'stock compensation tax planning', 'tax consequences of divorce and separation'] }] },
  ],
};
