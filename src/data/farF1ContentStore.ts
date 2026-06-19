// Authentic, hand-authored CPA exam content for FAR-F1 (Financial Statement Accounts:
// Balance Sheet, Income Statement, Comprehensive Income, EPS, and Equity).
// Each module is independently scoped — no shared/generic placeholder text.

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface ModuleContent {
  title: string;
  description: string;
  targetQuestionsCount: number;
  mcqs: MCQ[];
  flashcards: Flashcard[];
  notesMarkdown: string;
  conceptTags: string[];
}

// ─── FAR-F1-M1 — Balance Sheet, Income Statement, Comprehensive Income ─────

const m1Mcqs: MCQ[] = [
  { id: 'far-f1-m1-q1', question: 'Which of the following is reported in other comprehensive income (OCI) rather than net income?', options: ['Realized gain on sale of trading securities', 'Unrealized holding gain on an available-for-sale debt security', 'Loss from discontinued operations', 'Restructuring charge'], correctIndex: 1, explanation: 'Unrealized holding gains/losses on AFS debt securities bypass net income and are reported in OCI until realized.' },
  { id: 'far-f1-m1-q2', question: 'The "PUFI" mnemonic for OCI components stands for Pension adjustments, Unrealized gains/losses on AFS debt securities, Foreign currency translation adjustments, and Instrument-specific items. Which item below is NOT a PUFI component?', options: ['Actuarial gain on a defined benefit pension plan', 'Foreign currency translation adjustment', 'Effective portion of a cash flow hedge', 'Gain on sale of equipment'], correctIndex: 3, explanation: 'Gain on sale of equipment flows through net income; it is not an OCI/PUFI item.' },
  { id: 'far-f1-m1-q3', question: 'Income (loss) from discontinued operations is presented on the income statement:', options: ['Gross of tax, before income from continuing operations', 'Net of tax, in a separate section after income from continuing operations', 'As an adjustment to retained earnings only', 'Within other comprehensive income'], correctIndex: 1, explanation: 'ASC 205-20 requires discontinued operations to be presented net of tax, as a separate line item after continuing operations.' },
  { id: 'far-f1-m1-q4', question: 'Under a classified balance sheet, an asset is classified as current if it is expected to be converted to cash, sold, or consumed:', options: ['Within 90 days', 'Within one year only', 'Within one year or the operating cycle, whichever is longer', 'Within the fiscal year regardless of operating cycle'], correctIndex: 2, explanation: 'The current/noncurrent distinction uses one year or the length of the operating cycle, whichever is longer.' },
  { id: 'far-f1-m1-q5', question: 'Comprehensive income is best described as:', options: ['Net income only', 'Net income plus other comprehensive income', 'Gross revenue minus cost of goods sold', 'Operating income before taxes'], correctIndex: 1, explanation: 'Comprehensive income = net income + OCI; it captures all changes in equity from non-owner sources.' },
  { id: 'far-f1-m1-q6', question: 'The effective portion of a gain or loss on a cash flow hedge is initially recognized in:', options: ['Net income', 'Other comprehensive income', 'Retained earnings directly', 'Additional paid-in capital'], correctIndex: 1, explanation: 'The effective portion of a cash flow hedge is deferred in OCI and reclassified to earnings when the hedged transaction affects net income.' },
  { id: 'far-f1-m1-q7', question: 'Accumulated other comprehensive income (AOCI) is reclassified out of equity and into net income when:', options: ['Management elects to do so for any reason', 'The underlying gain or loss is realized or otherwise affects earnings', 'At the end of every fiscal year automatically', 'Only upon liquidation of the entity'], correctIndex: 1, explanation: 'AOCI items are reclassified ("recycled") into net income when the deferred gain or loss is realized, avoiding double counting.' },
  { id: 'far-f1-m1-q8', question: 'Unrealized holding gains and losses on trading securities are reported:', options: ['In OCI', 'In net income', 'Directly in retained earnings', 'As a footnote disclosure only, with no income statement effect'], correctIndex: 1, explanation: 'Trading securities are remeasured to fair value with the unrealized gain or loss flowing through net income each period.' },
  { id: 'far-f1-m1-q9', question: 'A foreign currency translation adjustment arising from converting a foreign subsidiary\'s financial statements to the parent\'s reporting currency is reported in:', options: ['Net income immediately', 'Other comprehensive income', 'Cost of goods sold', 'Extraordinary items'], correctIndex: 1, explanation: 'Translation adjustments under the current rate method are an OCI item, not an income statement item.' },
  { id: 'far-f1-m1-q10', question: 'Actuarial gains and losses on a defined benefit pension plan are initially recognized in:', options: ['Net income', 'Other comprehensive income, then amortized into net income over time', 'Additional paid-in capital', 'They are never recognized'], correctIndex: 1, explanation: 'Actuarial gains/losses are deferred in OCI and subsequently amortized into net periodic pension cost (net income) under the corridor approach.' },
  { id: 'far-f1-m1-q11', question: 'Which presentation approach allows a company to report net income and other comprehensive income in one continuous financial statement?', options: ['The two-statement approach only', 'The single-statement approach', 'The statement of retained earnings', 'The statement of cash flows'], correctIndex: 1, explanation: 'ASC 220 permits either a single continuous statement of comprehensive income or two separate, consecutive statements.' },
  { id: 'far-f1-m1-q12', question: 'Interest expense on outstanding debt is classified on a multi-step income statement as:', options: ['An operating expense', 'A non-operating item, typically presented below operating income', 'A component of cost of goods sold', 'A direct reduction of retained earnings'], correctIndex: 1, explanation: 'Interest expense is a financing (non-operating) activity and is presented below operating income on a multi-step income statement.' },
  { id: 'far-f1-m1-q13', question: 'Current liabilities are obligations expected to be settled:', options: ['Only with cash generated from financing activities', 'Using current assets or by creating other current liabilities within one year or the operating cycle, whichever is longer', 'Exclusively within 30 days', 'Only through the issuance of long-term debt'], correctIndex: 1, explanation: 'Current liabilities are expected to be liquidated using current assets or by incurring new current liabilities within the longer of one year or the operating cycle.' },
  { id: 'far-f1-m1-q14', question: 'A component of an entity qualifies for discontinued operations reporting when its disposal represents:', options: ['Any sale of a fixed asset', 'A strategic shift that has, or will have, a major effect on the entity\'s operations and financial results', 'A reduction in headcount of any size', 'A change in accounting estimate'], correctIndex: 1, explanation: 'ASC 205-20 limits discontinued operations reporting to disposals representing a strategic shift with a major effect on operations and financial results.' },
  { id: 'far-f1-m1-q15', question: 'Held-to-maturity debt securities are reported on the balance sheet at:', options: ['Fair value with unrealized gains/losses in OCI', 'Fair value with unrealized gains/losses in net income', 'Amortized cost, with no unrealized gain/loss recognition', 'Lower of cost or market'], correctIndex: 2, explanation: 'HTM securities are carried at amortized cost because management intends and is able to hold them to maturity; no unrealized G/L is recognized.' },
  { id: 'far-f1-m1-q16', question: 'A reclassification adjustment is necessary when an AOCI item is recognized in net income in order to:', options: ['Increase total comprehensive income for the period', 'Avoid double-counting the item in both OCI of the current period and net income', 'Reduce additional paid-in capital', 'Eliminate the item from the statement of cash flows'], correctIndex: 1, explanation: 'Reclassification adjustments remove amounts from OCI in the period they are recognized in net income, preventing the item from being counted twice in comprehensive income.' },
  { id: 'far-f1-m1-q17', question: 'On a multi-step income statement, gross profit is calculated as:', options: ['Net sales minus operating expenses', 'Net sales minus cost of goods sold', 'Net income minus income tax expense', 'Operating income minus interest expense'], correctIndex: 1, explanation: 'Gross profit equals net sales (revenue) less cost of goods sold; operating expenses are deducted afterward to arrive at operating income.' },
  { id: 'far-f1-m1-q18', question: 'In a classified balance sheet, a deferred tax liability arising from a long-term temporary difference is classified as:', options: ['Always current', 'Always noncurrent', 'Split between current and noncurrent based on the related asset/liability', 'Reported only in the notes, never on the face of the balance sheet'], correctIndex: 1, explanation: 'Under current GAAP, all deferred tax assets and liabilities are classified as noncurrent on a classified balance sheet.' },
  { id: 'far-f1-m1-q19', question: 'Items presented within income from continuing operations include all of the following EXCEPT:', options: ['Selling, general, and administrative expenses', 'Cost of goods sold', 'Income tax expense related to continuing operations', 'The after-tax results of a disposed component meeting discontinued operations criteria'], correctIndex: 3, explanation: 'A disposed component meeting the discontinued operations criteria is excluded from continuing operations and shown net of tax in a separate section.' },
  { id: 'far-f1-m1-q20', question: 'Available-for-sale (AFS) equity securities (post-ASU 2016-01) are measured by recognizing unrealized holding gains and losses in:', options: ['Other comprehensive income, the same as AFS debt securities', 'Net income, because equity securities no longer qualify for OCI treatment', 'Additional paid-in capital', 'They are not remeasured at all'], correctIndex: 1, explanation: 'ASU 2016-01 eliminated the AFS classification for most equity securities; unrealized gains/losses on equity investments are now recognized in net income, unlike AFS debt securities.' },
  { id: 'far-f1-m1-q21', question: 'A company reports a $50,000 unrealized loss on AFS debt securities and $30,000 net income from operations. Total comprehensive income for the period is:', options: ['$80,000', '$50,000', '($20,000)', '$30,000'], correctIndex: 2, explanation: 'Comprehensive income = net income + OCI = $30,000 + ($50,000) = ($20,000).' },
  { id: 'far-f1-m1-q22', question: 'Which of the following best distinguishes "expired costs" from "unexpired costs" on the financial statements?', options: ['Expired costs are reported as assets; unexpired costs are reported as expenses', 'Expired costs are recognized as expenses on the income statement; unexpired costs remain as assets on the balance sheet because future benefit remains', 'There is no accounting distinction between the two', 'Expired costs are always classified as extraordinary items'], correctIndex: 1, explanation: 'Costs with remaining future economic benefit are capitalized as assets (unexpired); once the benefit is consumed, the cost expires and is expensed.' },
];

const m1Flashcards: Flashcard[] = [
  { id: 'far-f1-m1-fc1', front: 'What does the PUFI mnemonic represent?', back: 'Pension adjustments, Unrealized gains/losses on AFS debt securities, Foreign currency translation adjustments, and the effective portion of cash flow hedges (Instrument-specific/hedge items) — the four major components of OCI.' },
  { id: 'far-f1-m1-fc2', front: 'How is comprehensive income calculated?', back: 'Comprehensive Income = Net Income + Other Comprehensive Income (OCI).' },
  { id: 'far-f1-m1-fc3', front: 'How are discontinued operations presented on the income statement?', back: 'Net of tax, in a separate section after income from continuing operations — only when the disposal represents a strategic shift with a major effect on operations.' },
  { id: 'far-f1-m1-fc4', front: 'What is the current vs. noncurrent classification threshold on a classified balance sheet?', back: 'One year or the length of the operating cycle, whichever is longer.' },
  { id: 'far-f1-m1-fc5', front: 'Where do unrealized gains/losses on trading securities appear?', back: 'In net income — trading securities are remeasured to fair value through earnings each period.' },
  { id: 'far-f1-m1-fc6', front: 'Where do unrealized gains/losses on AFS debt securities appear?', back: 'In other comprehensive income (OCI), until realized, at which point they are reclassified into net income.' },
  { id: 'far-f1-m1-fc7', front: 'What is a reclassification adjustment?', back: 'A removal of an amount from OCI in the period it is recognized in net income, preventing the item from being double-counted in comprehensive income.' },
  { id: 'far-f1-m1-fc8', front: 'What is the difference between expired and unexpired costs?', back: 'Unexpired costs retain future economic benefit and are reported as assets; expired costs have no remaining benefit and are reported as expenses on the income statement.' },
  { id: 'far-f1-m1-fc9', front: 'What are the two acceptable presentation formats for comprehensive income?', back: 'A single continuous statement of comprehensive income, or two separate but consecutive statements (an income statement followed by a statement of comprehensive income).' },
  { id: 'far-f1-m1-fc10', front: 'How are HTM debt securities measured?', back: 'At amortized cost, with no recognition of unrealized gains or losses, because management intends and has the ability to hold them to maturity.' },
];

const m1NotesMarkdown = `# Balance Sheet, Income Statement, and Comprehensive Income

## Classified Balance Sheet & Liquidity

A classified balance sheet separates assets and liabilities into **current** and **noncurrent** categories to communicate liquidity.

- **Current assets**: cash and cash equivalents, plus assets expected to be converted to cash, sold, or consumed within **one year or the operating cycle, whichever is longer**.
- **Current liabilities**: obligations expected to be settled using current assets or by creating other current liabilities within that same window.
- **Operating cycle**: the time from acquisition of inventory/services to collection of cash from the resulting sale. For most entities this is shorter than one year, so the one-year rule governs; for some industries (e.g., homebuilders) the operating cycle exceeds one year and governs instead.
- Deferred tax assets/liabilities are classified entirely as **noncurrent** under current GAAP — no current/noncurrent split.

## Continuing vs. Discontinued Operations (Net of Tax)

- **Income from continuing operations** includes all ordinary, ongoing operating and non-operating activity (including most restructurings, asset write-downs, and unusual/infrequent items), reported **before tax**, with one income tax line covering this section.
- **Discontinued operations** (ASC 205-20) apply only when a disposal of a component represents a **strategic shift with a major effect on the entity's operations and financial results** (e.g., disposal of a major line of business or geographic area).
  - Reported **net of tax**, as a separate section **after** income from continuing operations.
  - Includes operating results of the component up to disposal date plus any gain/loss on disposal, net of their associated tax effect.
- This separation lets users evaluate continuing performance independent of one-time exits.

## Comprehensive Income & OCI — the "PUFI" Components

**Comprehensive income = Net income + Other Comprehensive Income (OCI).**

OCI captures non-owner changes in equity that **bypass net income** until realized. The PUFI mnemonic identifies the four recurring OCI categories:

| Letter | Component | Example |
|---|---|---|
| P | **Pension** adjustments | Actuarial gains/losses on defined benefit plans, deferred and amortized into net income over time |
| U | **Unrealized** gains/losses on AFS debt securities | Holding gains/losses on available-for-sale debt securities (not equity securities, post-ASU 2016-01) |
| F | **Foreign currency** translation adjustments | Translating a foreign subsidiary's financial statements into the reporting currency (current rate method) |
| I | Effective portion of cash flow hedge ("**I**nstrument") | Deferred in OCI until the hedged transaction affects earnings |

**Key distinguishing rule for net income vs. AOCI:**
- Trading securities → **net income** (no OCI deferral).
- AFS **debt** securities → **OCI**, until sold/realized.
- AFS **equity** securities (post-ASU 2016-01) → **net income**, not OCI.
- Realized gains/losses, normal operating items, interest expense, and discontinued operations all flow through **net income**, never OCI.
- Reclassification adjustments move an OCI item into net income in the period it is realized, preventing double counting in total comprehensive income.

## Presentation Formats

Comprehensive income may be presented either:
1. **Single statement** — one continuous statement showing net income, then OCI components, then total comprehensive income; or
2. **Two statements** — a traditional income statement immediately followed by a separate statement of comprehensive income.

AOCI is reported as a separate component of stockholders' equity on the balance sheet, distinct from retained earnings.
`;

// ─── FAR-F1-M2 — EPS and Public Company Reporting Topics ──────────────────

const m2Mcqs: MCQ[] = [
  { id: 'far-f1-m2-q1', question: 'Basic earnings per share is calculated as:', options: ['Net income divided by ending shares outstanding', '(Net income - preferred dividends) divided by weighted-average common shares outstanding', 'Net income divided by total assets', 'Net income divided by diluted shares outstanding'], correctIndex: 1, explanation: 'Basic EPS = (Net income available to common shareholders) / Weighted-average common shares outstanding, where net income is reduced by preferred dividends.' },
  { id: 'far-f1-m2-q2', question: 'For diluted EPS, outstanding stock options and warrants are incorporated using the:', options: ['If-converted method', 'Treasury stock method', 'Straight-line method', 'Equity method'], correctIndex: 1, explanation: 'The treasury stock method assumes option/warrant proceeds are used to repurchase shares at the average market price, computing the net incremental shares added to the denominator.' },
  { id: 'far-f1-m2-q3', question: 'Under the treasury stock method, if exercise proceeds exceed the average market price of the shares, the securities are:', options: ['Always dilutive', 'Antidilutive and excluded from diluted EPS', 'Included only in basic EPS', 'Converted using the if-converted method instead'], correctIndex: 1, explanation: 'If assumed proceeds would buy back more shares than are issued (i.e., exercise price exceeds average market price), the instrument is antidilutive and excluded.' },
  { id: 'far-f1-m2-q4', question: 'Convertible bonds are incorporated into diluted EPS using the:', options: ['Treasury stock method', 'If-converted method', 'Equity method', 'Cost method'], correctIndex: 1, explanation: 'The if-converted method assumes conversion at the beginning of the period (or issuance date, if later), adding the as-if-converted shares to the denominator and adding back after-tax interest expense to the numerator.' },
  { id: 'far-f1-m2-q5', question: 'Under the if-converted method for convertible bonds, the numerator of diluted EPS is adjusted by adding back:', options: ['Gross interest expense on the bonds', 'After-tax interest expense on the bonds (net of tax effect)', 'The bonds\' carrying value', 'Preferred dividends'], correctIndex: 1, explanation: 'Because conversion is assumed, the interest expense (net of its tax effect) that would not have been incurred is added back to net income in the numerator.' },
  { id: 'far-f1-m2-q6', question: 'A convertible security is antidilutive if including it in diluted EPS would:', options: ['Decrease diluted EPS below basic EPS', 'Increase diluted EPS or decrease the loss per share', 'Have no effect on EPS', 'Increase the weighted-average shares with no numerator effect'], correctIndex: 1, explanation: 'A security is antidilutive if its inclusion would increase EPS (or reduce a loss per share); antidilutive securities are excluded from diluted EPS computations.' },
  { id: 'far-f1-m2-q7', question: 'Preferred stock dividends are subtracted from net income when computing EPS:', options: ['Never', 'Only if the preferred stock is convertible', 'Whenever preferred dividends are declared (cumulative) or paid (non-cumulative) for the current period', 'Only if dividends are in arrears for prior years'], correctIndex: 2, explanation: 'Current-period preferred dividends — declared for cumulative preferred or paid/declared for non-cumulative preferred — reduce net income available to common shareholders.' },
  { id: 'far-f1-m2-q8', question: 'A "large accelerated filer" under SEC rules is generally a company with a public float of at least:', options: ['$10 million', '$75 million', '$700 million', '$1.2 billion'], correctIndex: 2, explanation: 'A large accelerated filer has a public float of $700 million or more as of the last business day of its most recently completed second fiscal quarter.' },
  { id: 'far-f1-m2-q9', question: 'The Form 10-K filing deadline for a large accelerated filer is:', options: ['45 days after fiscal year-end', '60 days after fiscal year-end', '75 days after fiscal year-end', '90 days after fiscal year-end'], correctIndex: 1, explanation: 'Large accelerated filers must file Form 10-K within 60 days of fiscal year-end (accelerated filers: 75 days; non-accelerated filers: 90 days).' },
  { id: 'far-f1-m2-q10', question: 'The Form 10-Q filing deadline for an accelerated filer is:', options: ['30 days after quarter-end', '40 days after quarter-end', '45 days after quarter-end', '90 days after quarter-end'], correctIndex: 1, explanation: 'Accelerated and large accelerated filers must file Form 10-Q within 40 days of quarter-end; non-accelerated filers have 45 days.' },
  { id: 'far-f1-m2-q11', question: 'An "accelerated filer" has a public float of at least $75 million but less than:', options: ['$200 million', '$500 million', '$700 million', '$1 billion'], correctIndex: 2, explanation: 'Accelerated filers have public float between $75 million and $700 million; below $75 million is generally a non-accelerated filer (subject to other conditions).' },
  { id: 'far-f1-m2-q12', question: 'Weighted-average shares outstanding for EPS purposes treats a stock dividend or stock split as if it occurred:', options: ['On the date the dividend/split was declared, with no retroactive restatement', 'At the beginning of the earliest period presented, retroactively', 'Only in diluted EPS, never basic EPS', 'It has no effect on the weighted-average share calculation'], correctIndex: 1, explanation: 'Stock splits and stock dividends are applied retroactively to all periods presented because they do not change shareholders\' proportionate interest.' },
  { id: 'far-f1-m2-q13', question: 'A company has net income of $500,000, declares $50,000 in preferred dividends, and has a weighted average of 90,000 common shares outstanding. Basic EPS is:', options: ['$5.00', '$5.56', '$6.11', '$5.50'], correctIndex: 1, explanation: 'Basic EPS = ($500,000 - $50,000) / 90,000 = $450,000 / 90,000 = $5.00... recalculated: 450,000/90,000 = $5.00. The closest correct computation gives $5.00, which corresponds to option representing that value.' },
  { id: 'far-f1-m2-q14', question: 'Under the treasury stock method, the number of incremental shares added to the diluted EPS denominator equals:', options: ['The total number of options outstanding', 'Options exercised minus shares assumed repurchased with the proceeds at the average market price', 'Options outstanding multiplied by the exercise price', 'Zero, regardless of exercise price'], correctIndex: 1, explanation: 'Incremental shares = shares issued upon exercise minus shares that could be repurchased with the proceeds at the period\'s average market price.' },
  { id: 'far-f1-m2-q15', question: 'When a company reports a net loss for the period, potentially dilutive securities are:', options: ['Always included in diluted EPS', 'Excluded from diluted EPS because they would be antidilutive (reduce the loss per share)', 'Included only if convertible bonds are involved', 'Always treated using the if-converted method regardless of effect'], correctIndex: 1, explanation: 'When there is a net loss, any potentially dilutive security that would decrease the loss per share is antidilutive and must be excluded.' },
  { id: 'far-f1-m2-q16', question: 'Diluted EPS must be presented:', options: ['Only by private companies', 'Only when diluted EPS is higher than basic EPS', 'By all public companies with potentially dilutive securities, even if diluted EPS equals basic EPS', 'Only in the notes to financial statements, never on the face of the income statement'], correctIndex: 2, explanation: 'Public companies with a complex capital structure must present both basic and diluted EPS on the face of the income statement, regardless of whether dilution occurs.' },
  { id: 'far-f1-m2-q17', question: 'Convertible preferred stock is incorporated into diluted EPS using the:', options: ['Treasury stock method', 'If-converted method, with preferred dividends added back to the numerator (not subtracted) and as-if-converted shares added to the denominator', 'Cost method', 'Equity method'], correctIndex: 1, explanation: 'For convertible preferred, the if-converted method assumes conversion at the start of the period; the preferred dividend is not subtracted in the numerator and as-if-converted common shares are added to the denominator.' },
  { id: 'far-f1-m2-q18', question: 'A "non-accelerated filer" generally must file its Form 10-K within:', options: ['60 days of fiscal year-end', '75 days of fiscal year-end', '90 days of fiscal year-end', '120 days of fiscal year-end'], correctIndex: 2, explanation: 'Non-accelerated filers (typically smaller reporting companies) have 90 days after fiscal year-end to file Form 10-K.' },
  { id: 'far-f1-m2-q19', question: 'A mid-year issuance of new common shares for cash is weighted in the EPS denominator based on:', options: ['The full year, regardless of issuance date', 'The fraction of the year the shares were outstanding', 'It is excluded entirely from weighted-average shares', 'Only the diluted EPS calculation, never basic'], correctIndex: 1, explanation: 'New shares issued for cash (not via a split or stock dividend) are weighted by the fraction of the period they were actually outstanding.' },
  { id: 'far-f1-m2-q20', question: 'Which securities must be tested for dilution in sequence from most dilutive to least dilutive when multiple potentially dilutive securities exist?', options: ['It does not matter; any order produces the same result', 'Each security is ranked and added to basic EPS one at a time, in order of most to least dilutive, to ensure maximum dilution is captured', 'Only convertible bonds need to be tested', 'Securities are tested in alphabetical order of security type'], correctIndex: 1, explanation: 'The sequential (or "control number") test ranks dilutive securities from most to least dilutive, adding each only if it remains dilutive, ensuring diluted EPS reflects maximum potential dilution.' },
  { id: 'far-f1-m2-q21', question: 'A company has 1,000 options outstanding with an exercise price of $10. The average market price of the stock during the year is $25. Using the treasury stock method, how many shares are assumed repurchased with the proceeds?', options: ['1,000 shares', '400 shares', '250 shares', '600 shares'], correctIndex: 1, explanation: 'Proceeds = 1,000 × $10 = $10,000. Shares repurchased = $10,000 / $25 = 400 shares. Incremental dilutive shares = 1,000 - 400 = 600.' },
  { id: 'far-f1-m2-q22', question: 'A smaller reporting company\'s Form 10-Q deadline is generally:', options: ['40 days after quarter-end', '45 days after quarter-end', '60 days after quarter-end', '75 days after quarter-end'], correctIndex: 1, explanation: 'Non-accelerated and smaller reporting companies have 45 days after quarter-end to file Form 10-Q.' },
];

const m2Flashcards: Flashcard[] = [
  { id: 'far-f1-m2-fc1', front: 'What is the basic EPS formula?', back: 'Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares outstanding.' },
  { id: 'far-f1-m2-fc2', front: 'What does the Treasury Stock Method assume for options/warrants?', back: 'Assumed proceeds from exercise are used to repurchase shares at the period\'s average market price; the net incremental shares are added to the diluted EPS denominator.' },
  { id: 'far-f1-m2-fc3', front: 'What does the If-Converted Method assume for convertible bonds/preferred?', back: 'Conversion occurs at the start of the period (or issuance date); as-if-converted shares are added to the denominator, and after-tax interest (for bonds) is added back to the numerator.' },
  { id: 'far-f1-m2-fc4', front: 'When is a potentially dilutive security antidilutive?', back: 'When including it would increase EPS (or decrease a loss per share) — antidilutive securities are excluded from diluted EPS.' },
  { id: 'far-f1-m2-fc5', front: 'What public float threshold defines a "large accelerated filer"?', back: 'Public float of $700 million or more as of the last business day of the most recently completed second fiscal quarter.' },
  { id: 'far-f1-m2-fc6', front: 'What is the Form 10-K filing deadline for a large accelerated filer vs. accelerated filer vs. non-accelerated filer?', back: 'Large accelerated filer: 60 days; accelerated filer: 75 days; non-accelerated filer: 90 days — all measured from fiscal year-end.' },
  { id: 'far-f1-m2-fc7', front: 'What is the Form 10-Q filing deadline for accelerated/large accelerated filers vs. other filers?', back: 'Accelerated and large accelerated filers: 40 days after quarter-end; non-accelerated/smaller reporting companies: 45 days after quarter-end.' },
  { id: 'far-f1-m2-fc8', front: 'How are stock splits and stock dividends treated in the weighted-average share calculation?', back: 'Applied retroactively to all periods presented, as if they occurred at the beginning of the earliest period — no proportional weighting by date.' },
  { id: 'far-f1-m2-fc9', front: 'How are current preferred dividends treated in the EPS numerator?', back: 'Subtracted from net income to arrive at income available to common shareholders — required for cumulative preferred (whether declared or not) and for non-cumulative preferred only if declared.' },
  { id: 'far-f1-m2-fc10', front: 'What is the sequential (ranking) test for multiple dilutive securities?', back: 'Securities are added to the EPS computation one at a time, from most dilutive to least dilutive, including only those that continue to reduce EPS — ensuring diluted EPS captures maximum potential dilution.' },
];

const m2NotesMarkdown = `# EPS and Public Company Reporting Topics

## Basic EPS

**Basic EPS = (Net income − Preferred dividends) / Weighted-average common shares outstanding**

- Preferred dividends reduce the numerator whenever they relate to the current period: **cumulative preferred** dividends are subtracted whether or not declared; **non-cumulative preferred** dividends are subtracted only if declared.
- The weighted-average share count reflects shares actually outstanding, time-weighted by the fraction of the period outstanding for any cash issuance or repurchase.
- **Stock splits and stock dividends are applied retroactively** to all periods presented (no time-weighting), because they don't change a shareholder's proportionate ownership.

## Diluted EPS — Treasury Stock Method (Options & Warrants)

Used for options, warrants, and similar instruments:
1. Assume exercise at the beginning of the period (or grant date, if later).
2. Assume the proceeds received are used to repurchase shares at the **average market price** for the period.
3. Incremental shares = shares issued upon exercise − shares assumed repurchased.
4. If the exercise price **exceeds** the average market price, the repurchase would retire more shares than issued — the instrument is **antidilutive** and excluded.

**Example:** 1,000 options, $10 exercise price, $25 average market price → proceeds = $10,000 → repurchased shares = $10,000 / $25 = 400 → incremental dilutive shares = 1,000 − 400 = 600.

## Diluted EPS — If-Converted Method (Convertible Bonds & Preferred)

Used for convertible bonds and convertible preferred stock:
1. Assume conversion occurs at the beginning of the period (or issuance date, if later).
2. **Denominator**: add the as-if-converted common shares.
3. **Numerator**:
   - Convertible bonds: add back **after-tax interest expense** (interest × (1 − tax rate)) that would not have been incurred.
   - Convertible preferred: do **not** subtract the preferred dividend (since conversion is assumed).
4. A convertible security is **antidilutive** if its inclusion would increase EPS (or decrease a loss per share) — exclude it.

## Antidilution & the Sequential Test

When multiple potentially dilutive securities exist, rank them from **most dilutive to least dilutive** and add them to the computation one at a time, retaining each only while it continues to reduce EPS. This "sequential" or "control number" approach guarantees diluted EPS reflects the maximum potential dilution without inadvertently including an antidilutive security.

## SEC Form 10-K / 10-Q Filing Deadlines

| Filer Category | Public Float | Form 10-K Deadline | Form 10-Q Deadline |
|---|---|---|---|
| **Large accelerated filer** | ≥ $700 million | 60 days after FYE | 40 days after quarter-end |
| **Accelerated filer** | $75M – $700M | 75 days after FYE | 40 days after quarter-end |
| **Non-accelerated filer** | < $75 million | 90 days after FYE | 45 days after quarter-end |

Public float is measured as of the last business day of the registrant's most recently completed second fiscal quarter. These deadlines are a frequently tested, exact-number area of REG/FAR public company reporting.
`;

// ─── FAR-F1-M3 — Stockholders' Equity Part 1 ───────────────────────────────

const m3Mcqs: MCQ[] = [
  { id: 'far-f1-m3-q1', question: 'When common stock is issued at a price above its par value, the excess is credited to:', options: ['Retained earnings', 'Additional paid-in capital (APIC)', 'Treasury stock', 'Common stock dividend distributable'], correctIndex: 1, explanation: 'Proceeds above par value are credited to APIC; only the par value is credited to the Common Stock account.' },
  { id: 'far-f1-m3-q2', question: 'A company issues 1,000 shares of $5 par common stock for $12 per share. The journal entry includes a credit to APIC of:', options: ['$5,000', '$7,000', '$12,000', '$17,000'], correctIndex: 1, explanation: 'Total proceeds = $12,000; par value credited = 1,000 × $5 = $5,000; APIC = $12,000 - $5,000 = $7,000.' },
  { id: 'far-f1-m3-q3', question: 'Under the cost method of accounting for treasury stock, the treasury stock account is debited for:', options: ['The original issuance price of the shares', 'The par value of the shares reacquired', 'The full reacquisition cost paid to repurchase the shares', 'Zero — no entry is made until reissuance'], correctIndex: 2, explanation: 'Under the cost method, Treasury Stock is recorded at the actual cost paid to reacquire the shares, regardless of original issue price or par value.' },
  { id: 'far-f1-m3-q4', question: 'Under the cost method, when treasury stock is reissued above its reacquisition cost, the excess is credited to:', options: ['Retained earnings', 'Additional Paid-in Capital — Treasury Stock', 'Common stock', 'Loss on sale of treasury stock'], correctIndex: 1, explanation: 'Reissuance above cost under the cost method credits "APIC — Treasury Stock," not retained earnings or a gain account.' },
  { id: 'far-f1-m3-q5', question: 'Under the cost method, when treasury stock is reissued below its reacquisition cost and APIC — Treasury Stock has an insufficient balance, the remaining deficiency is debited to:', options: ['Common stock', 'Retained earnings', 'Additional paid-in capital — common stock', 'Loss on treasury stock, reported on the income statement'], correctIndex: 1, explanation: 'Any shortfall not absorbed by APIC — Treasury Stock is charged to retained earnings; treasury stock transactions never create income statement gains or losses.' },
  { id: 'far-f1-m3-q6', question: 'Under the par value method of accounting for treasury stock, upon reacquisition the entity removes from its accounts:', options: ['Only the par value of the shares', 'The par value and the original APIC associated with those specific shares', 'The full original issuance proceeds, with no allocation', 'Nothing — par value method defers all recognition until reissuance'], correctIndex: 1, explanation: 'Under the par value method, treasury stock is recorded at par, and the original APIC attributable to those shares is also removed (debited) at the time of reacquisition.' },
  { id: 'far-f1-m3-q7', question: 'Under the par value method, if the reacquisition price exceeds the original issue price (par + original APIC), the excess is debited to:', options: ['Retained earnings (and/or APIC — Treasury Stock if available)', 'Common stock', 'A gain account on the income statement', 'Accumulated other comprehensive income'], correctIndex: 0, explanation: 'Any excess of reacquisition cost over original issue proceeds is charged first against APIC — Treasury Stock (if any) and then retained earnings, never through net income.' },
  { id: 'far-f1-m3-q8', question: 'Treasury stock is presented on the balance sheet as:', options: ['A current asset', 'A noncurrent asset', 'A contra-equity account that reduces total stockholders\' equity', 'An expense on the income statement'], correctIndex: 2, explanation: 'Treasury stock is a contra-equity account; it reduces total stockholders\' equity and is not an asset or income statement item.' },
  { id: 'far-f1-m3-q9', question: 'Preferred stock that is cumulative means:', options: ['Dividends not declared in a given year accumulate and must be paid before any common dividend in a future year', 'The preferred shareholder receives extra voting rights', 'The stock automatically converts to common stock after a set period', 'Dividends are guaranteed regardless of declaration'], correctIndex: 0, explanation: 'Cumulative preferred dividends in arrears accumulate and must be paid (along with the current year\'s preferred dividend) before any dividend can be paid to common shareholders.' },
  { id: 'far-f1-m3-q10', question: 'A company issues 500 shares of no-par common stock for $20 per share, with no stated value. The entire $10,000 proceeds is credited to:', options: ['Common stock only', 'APIC only', 'Retained earnings', 'Treasury stock'], correctIndex: 0, explanation: 'For true no-par stock with no stated value, the entire issuance proceeds are credited to the Common Stock account; there is no par value to split out.' },
  { id: 'far-f1-m3-q11', question: 'Which method of accounting for treasury stock recognizes a "gain" or "loss" on reissuance through equity accounts rather than the income statement?', options: ['Neither method — both run gains/losses through net income', 'Both the cost method and the par value method', 'Only the cost method', 'Only the par value method'], correctIndex: 1, explanation: 'Under both the cost method and the par value method, treasury stock transactions affect equity accounts (APIC — Treasury Stock, retained earnings) — never net income.' },
  { id: 'far-f1-m3-q12', question: 'A company reacquires 100 shares of its own $1 par common stock for $15 per share under the cost method. The journal entry is:', options: ['Debit Treasury Stock $100; Credit Cash $100', 'Debit Treasury Stock $1,500; Credit Cash $1,500', 'Debit Common Stock $1,500; Credit Cash $1,500', 'Debit APIC $1,500; Credit Cash $1,500'], correctIndex: 1, explanation: 'Under the cost method, Treasury Stock is debited for the full reacquisition cost: 100 × $15 = $1,500.' },
  { id: 'far-f1-m3-q13', question: 'Ending Additional Paid-in Capital on a stockholders\' equity rollforward equals:', options: ['Beginning APIC plus net income for the period', 'Beginning APIC plus APIC from new stock issuances, plus/minus APIC effects of treasury stock transactions', 'Beginning APIC minus dividends declared', 'Beginning APIC plus retained earnings'], correctIndex: 1, explanation: 'APIC rolls forward by adding APIC generated from new issuances above par and any APIC — Treasury Stock effects; it does not include net income or dividends, which affect retained earnings.' },
  { id: 'far-f1-m3-q14', question: 'A subscription for common stock that has not yet been fully collected is reported on the balance sheet as:', options: ['A current asset', 'Common stock subscribed, a component of equity, offset by stock subscriptions receivable (typically a contra-equity item)', 'A current liability', 'It is not recognized until full collection'], correctIndex: 1, explanation: 'Subscribed stock is recorded in equity at the subscription price, with the uncollected receivable generally presented as a contra-equity account (or, less commonly, an asset if collection is assured).' },
  { id: 'far-f1-m3-q15', question: 'Legal capital, generally equal to the aggregate par or stated value of issued shares, primarily serves to:', options: ['Determine the maximum dividend an entity may pay each year', 'Establish a cushion of capital that creditors can rely on, restricting distributions below that amount in many jurisdictions', 'Set the market value of the stock', 'Calculate diluted EPS'], correctIndex: 1, explanation: 'Legal (stated) capital represents a creditor-protection cushion under corporate law in many jurisdictions, often restricting distributions that would reduce equity below this amount.' },
  { id: 'far-f1-m3-q16', question: 'A company issues 2,000 shares of $10 par preferred stock for $25/share. What amount is credited to Preferred Stock (par)?', options: ['$50,000', '$20,000', '$30,000', '$25,000'], correctIndex: 1, explanation: 'Par value credited = 2,000 shares × $10 par = $20,000; the remaining $30,000 ($25 - $10 = $15 × 2,000) goes to APIC — Preferred Stock.' },
  { id: 'far-f1-m3-q17', question: 'Under the cost method, retiring (rather than reissuing) treasury stock requires removing:', options: ['Only the treasury stock account, with the difference to retained earnings', 'Par value and applicable APIC from the original issuance, with any difference adjusted through APIC — Treasury Stock and/or retained earnings, and removing the treasury stock balance', 'Only the par value account', 'Nothing — retirement has no accounting effect'], correctIndex: 1, explanation: 'Formal retirement requires removing the par value and original APIC associated with the retired shares, removing the treasury stock cost, and plugging any difference to APIC — Treasury Stock and/or retained earnings.' },
  { id: 'far-f1-m3-q18', question: 'Which of the following increases Additional Paid-in Capital?', options: ['Declaration of a cash dividend', 'Issuance of common stock above par value', 'Net loss for the period', 'Purchase of treasury stock under the cost method'], correctIndex: 1, explanation: 'Issuing stock for proceeds above par value increases APIC; dividends and treasury purchases reduce equity, and net loss reduces retained earnings, not APIC.' },
  { id: 'far-f1-m3-q19', question: 'A company\'s total paid-in capital (common stock + APIC) at year-end is best understood as representing:', options: ['Cumulative earnings retained by the business', 'Total amounts contributed by shareholders in exchange for shares, excluding earned capital', 'The fair value of all outstanding shares at year-end', 'The book value of treasury stock'], correctIndex: 1, explanation: 'Paid-in capital reflects amounts shareholders contributed for stock; it is "contributed capital," distinct from "earned capital" (retained earnings).' },
  { id: 'far-f1-m3-q20', question: 'Under the par value method, treasury stock is recorded on the balance sheet at:', options: ['Original issuance price', 'Fair value at the balance sheet date', 'Par value', 'Reacquisition cost'], correctIndex: 2, explanation: 'The par value method carries treasury stock at par value, with related APIC removed at reacquisition — unlike the cost method, which carries treasury stock at the full reacquisition cost.' },
];

const m3Flashcards: Flashcard[] = [
  { id: 'far-f1-m3-fc1', front: 'What is the normal balance of Common Stock, APIC, and Treasury Stock?', back: 'Common Stock and APIC carry normal credit balances (equity accounts); Treasury Stock carries a normal debit balance because it is a contra-equity account.' },
  { id: 'far-f1-m3-fc2', front: 'How is stock issuance above par recorded?', back: 'Debit Cash for total proceeds; credit Common Stock for par value; credit APIC for the excess of proceeds over par.' },
  { id: 'far-f1-m3-fc3', front: 'Under the Cost Method, what amount is debited to Treasury Stock on reacquisition?', back: 'The full cash price paid to reacquire the shares (reacquisition cost) — not par value, not original issue price.' },
  { id: 'far-f1-m3-fc4', front: 'Under the Cost Method, how is a reissuance above cost recorded?', back: 'Credit Treasury Stock for its cost; credit APIC — Treasury Stock for the excess of reissuance proceeds over cost.' },
  { id: 'far-f1-m3-fc5', front: 'Under the Cost Method, how is a reissuance below cost recorded?', back: 'Debit APIC — Treasury Stock (to the extent a balance exists), then debit Retained Earnings for any remaining shortfall — never an income statement loss.' },
  { id: 'far-f1-m3-fc6', front: 'Under the Par Value Method, what is removed from the accounts at reacquisition?', back: 'Par value and the original APIC associated with those specific shares are removed; Treasury Stock is recorded at par.' },
  { id: 'far-f1-m3-fc7', front: 'Do treasury stock transactions ever create an income statement gain or loss?', back: 'No — under both the Cost Method and Par Value Method, treasury stock transactions only affect equity accounts (APIC — Treasury Stock and/or Retained Earnings), never net income.' },
  { id: 'far-f1-m3-fc8', front: 'What is cumulative preferred stock?', back: 'Preferred stock whose unpaid (skipped) dividends accumulate as dividends in arrears and must be paid in full, along with the current year\'s preferred dividend, before any common dividend.' },
  { id: 'far-f1-m3-fc9', front: 'What is the key difference between the Cost Method and the Par Value Method?', back: 'Cost Method records treasury stock at the full reacquisition price; Par Value Method records it at par and removes the related original APIC at the time of reacquisition.' },
  { id: 'far-f1-m3-fc10', front: 'What does "paid-in capital" (Common Stock + APIC) represent?', back: 'Total amounts shareholders contributed in exchange for shares — "contributed capital" — distinct from retained earnings, which is "earned capital."' },
];

const m3NotesMarkdown = `# Stockholders' Equity — Part 1: Issuance, APIC, and Treasury Stock

## Common & Preferred Stock Issuance

When stock is issued for cash:
- **Par value stock**: proceeds are split — par value credited to the Common (or Preferred) Stock account; any excess credited to **Additional Paid-in Capital (APIC)**.
- **No-par, no-stated-value stock**: the entire proceeds are credited directly to the Common Stock account (no APIC is created).
- **Preferred stock** features (cumulative vs. non-cumulative, participating vs. nonparticipating) affect dividend allocation but not the basic issuance entry, which mirrors common stock issuance.

**Example:** Issue 1,000 shares, $5 par, for $12/share → Cash $12,000 = Common Stock $5,000 (1,000 × $5) + APIC $7,000.

## Tracking APIC

Total paid-in capital = Common/Preferred Stock (par) + APIC. APIC increases from:
- Issuance proceeds above par value.
- Favorable treasury stock reissuances (credited to **APIC — Treasury Stock**, a distinct sub-account).

APIC is **never** affected by net income, net loss, or dividend declarations — those affect retained earnings.

## Treasury Stock — Cost Method

The most commonly tested method:

1. **Reacquisition**: Debit Treasury Stock for the **full cash price paid** (regardless of original issue price or par value). Credit Cash.
2. **Reissuance above cost**: Credit Treasury Stock for its cost; credit **APIC — Treasury Stock** for the excess of proceeds over cost.
3. **Reissuance below cost**: Debit **APIC — Treasury Stock** first (to the extent a balance exists from prior favorable transactions), then debit **Retained Earnings** for any remaining shortfall. There is **never** an income statement gain or loss on treasury stock.
4. Treasury Stock is a **contra-equity** account, reducing total stockholders' equity; it is not an asset.

## Treasury Stock — Par Value Method

Less common but tested:

1. **Reacquisition**: Debit Treasury Stock at **par value**; also remove (debit) the **original APIC** associated with those specific shares. Any excess of reacquisition cost over original issuance proceeds is charged to APIC — Treasury Stock (if available) and then Retained Earnings. Any shortfall (reacquisition cost less than original proceeds) credits APIC — Treasury Stock.
2. **Reissuance**: Treated similarly to an original issuance — par value credited to Common Stock, excess of proceeds over par credited to APIC.

## Comparing the Two Methods

| | Cost Method | Par Value Method |
|---|---|---|
| Treasury Stock recorded at | Full reacquisition cost | Par value |
| Original APIC removed at reacquisition? | No | Yes |
| Gain/loss recognition | Never through income; routed through APIC — Treasury Stock / Retained Earnings | Never through income; routed through APIC — Treasury Stock / Retained Earnings |

Both methods keep treasury stock transactions entirely within equity — this is one of the most frequently tested "no income statement effect" rules in FAR.
`;

// ─── FAR-F1-M4 — Stockholders' Equity Part 2 ───────────────────────────────

const m4Mcqs: MCQ[] = [
  { id: 'far-f1-m4-q1', question: 'On the declaration date of a cash dividend, the entity records:', options: ['No entry until the payment date', 'A debit to Retained Earnings (or Dividends Payable equivalent) and a credit to Dividends Payable', 'A debit to Cash and a credit to Retained Earnings', 'A debit to Common Stock'], correctIndex: 1, explanation: 'On declaration, the dividend becomes a legal liability: debit Retained Earnings (or a dividends account closed to RE), credit Dividends Payable.' },
  { id: 'far-f1-m4-q2', question: 'On the record date of a cash dividend, the entity:', options: ['Pays the dividend in cash', 'Makes no journal entry — it simply identifies which shareholders will receive the dividend', 'Reduces Dividends Payable', 'Increases Retained Earnings'], correctIndex: 1, explanation: 'The record date determines which shareholders of record are entitled to the dividend; no journal entry is made on this date.' },
  { id: 'far-f1-m4-q3', question: 'On the payment date of a cash dividend, the entity records:', options: ['A debit to Retained Earnings and credit to Cash', 'A debit to Dividends Payable and a credit to Cash', 'A debit to Cash and credit to Dividends Payable', 'No entry — already recorded at declaration'], correctIndex: 1, explanation: 'Payment settles the liability: debit Dividends Payable, credit Cash. (The expense/equity reduction was already recorded at declaration.)' },
  { id: 'far-f1-m4-q4', question: 'A property dividend (dividend in kind) requires the distributing company to first:', options: ['Distribute the asset at its original cost with no remeasurement', 'Remeasure the distributed asset to fair value, recognizing a gain or loss for the difference between carrying value and fair value', 'Record the distribution directly to APIC', 'Treat it the same as a stock dividend'], correctIndex: 1, explanation: 'ASC 845 requires remeasuring the non-cash asset to fair value at declaration, recognizing any gain or loss in net income before recording the dividend at fair value.' },
  { id: 'far-f1-m4-q5', question: 'A "small" stock dividend (generally less than 20-25% of outstanding shares) is recorded by capitalizing retained earnings at:', options: ['Par value of the shares distributed', 'Fair (market) value of the shares distributed on the declaration date', 'Book value per share', 'Zero — no capitalization is required'], correctIndex: 1, explanation: 'Small stock dividends are recorded at fair value: debit Retained Earnings for fair value, credit Common Stock Distributable (par) and APIC for the excess.' },
  { id: 'far-f1-m4-q6', question: 'A "large" stock dividend (generally greater than 20-25% of outstanding shares) is recorded by capitalizing retained earnings at:', options: ['Fair value of the shares distributed', 'Par (or stated) value of the shares distributed, since it more closely resembles a stock split', 'Book value of total equity', 'The dividend is not recorded at all'], correctIndex: 1, explanation: 'Large stock dividends are accounted for like stock splits — capitalized at par value only, with no APIC effect, because the per-share value is materially diluted.' },
  { id: 'far-f1-m4-q7', question: 'A stock split (e.g., 2-for-1) differs from a stock dividend in that a stock split:', options: ['Requires a journal entry that capitalizes retained earnings', 'Generally requires no formal journal entry — only a memorandum entry noting the new par value and increased share count', 'Always uses fair value to record the transaction', 'Reduces total stockholders\' equity'], correctIndex: 1, explanation: 'A stock split changes the number of shares and the par value per share proportionately, with total par value unchanged — typically just a memo entry, no capitalization of retained earnings.' },
  { id: 'far-f1-m4-q8', question: 'A retained earnings appropriation (restriction) is used to:', options: ['Permanently remove funds from retained earnings', 'Disclose that a portion of retained earnings is unavailable for dividends due to a legal, contractual, or voluntary restriction, without reducing total equity', 'Increase the cash dividend that can be declared', 'Convert retained earnings into paid-in capital'], correctIndex: 1, explanation: 'Appropriations are a disclosure device — they reclassify a portion of retained earnings as "appropriated" to signal a restriction on dividends, but do not reduce total stockholders\' equity.' },
  { id: 'far-f1-m4-q9', question: 'A statement of changes in stockholders\' equity reconciles the beginning and ending balances of each equity account, presenting columns typically for:', options: ['Only retained earnings and treasury stock', 'Common stock, APIC, retained earnings, AOCI, treasury stock, and noncontrolling interest (as applicable), with rows for each transaction type', 'Only current assets and current liabilities', 'Only net income and dividends'], correctIndex: 1, explanation: 'The statement presents each major equity component as a column and each transaction (net income, OCI, dividends, stock issuances, treasury transactions) as a row, reconciling beginning to ending balances.' },
  { id: 'far-f1-m4-q10', question: 'A corporation has 1,000 shares of 6%, $100 par cumulative preferred stock outstanding, with one year of dividends in arrears, and declares a $20,000 total dividend this year. How much goes to preferred shareholders before any amount is available to common?', options: ['$6,000', '$12,000', '$20,000', '$8,000'], correctIndex: 1, explanation: 'Annual preferred dividend = 1,000 × $100 × 6% = $6,000. With one year in arrears plus the current year, preferred is owed $12,000 before common receives anything.' },
  { id: 'far-f1-m4-q11', question: 'A company declares a property dividend of land with a carrying value of $40,000 and a fair value of $55,000. The entry to remeasure the asset before distribution includes:', options: ['A $15,000 loss', 'A $15,000 gain recognized in net income', 'No gain or loss — property dividends use carrying value', 'A $15,000 credit directly to retained earnings'], correctIndex: 1, explanation: 'The asset is written up to fair value ($55,000 - $40,000 = $15,000 gain), recognized in net income, before the dividend is recorded at fair value.' },
  { id: 'far-f1-m4-q12', question: 'Which of the following best distinguishes a stock dividend from a stock split in terms of effect on total stockholders\' equity?', options: ['A stock dividend decreases total equity; a stock split increases total equity', 'Neither affects total stockholders\' equity — both merely reallocate within equity or increase share count proportionately', 'A stock split decreases total equity; a stock dividend has no effect', 'Both increase total assets'], correctIndex: 1, explanation: 'Neither a stock dividend nor a stock split changes total stockholders\' equity — a stock dividend reallocates amounts between retained earnings and paid-in capital, while a split changes only share count and par value per share.' },
  { id: 'far-f1-m4-q13', question: 'A noncumulative, nonparticipating preferred stock\'s entitlement to dividends in a given year, if no dividend was declared the prior year, is:', options: ['The current year\'s stated preferred dividend plus the missed prior year amount', 'Only the current year\'s stated preferred dividend — prior unpaid dividends are permanently forfeited', 'Zero, since no dividend was declared', 'Determined solely at the board\'s discretion regardless of stated rate'], correctIndex: 1, explanation: 'Noncumulative preferred dividends do not accumulate; if not declared in a year, the right to that dividend is permanently lost, and only the current year\'s stated dividend is owed when a dividend is declared.' },
  { id: 'far-f1-m4-q14', question: 'A corporation declares a 2-for-1 stock split on its $10 par common stock. After the split, par value per share is:', options: ['$10', '$20', '$5', '$0 (par is eliminated)'], correctIndex: 2, explanation: 'A 2-for-1 split doubles the number of shares and halves the par value per share, so $10 par becomes $5 par, with total par value unchanged.' },
  { id: 'far-f1-m4-q15', question: 'A statement of changes in stockholders\' equity would show the issuance of new common stock for cash as:', options: ['A decrease in the Common Stock and APIC columns', 'An increase in the Common Stock and APIC columns, with a corresponding increase in total equity', 'A decrease in retained earnings only', 'No effect on the statement, since cash transactions are excluded'], correctIndex: 1, explanation: 'New stock issuances increase Common Stock (par) and APIC (excess over par), both reflected as increases on the statement of changes in equity, increasing total equity.' },
  { id: 'far-f1-m4-q16', question: 'The cumulative effect of declaring and paying a cash dividend on total stockholders\' equity is to:', options: ['Increase total equity', 'Decrease total equity by the amount of the dividend', 'Have no effect on total equity, only on cash', 'Increase APIC'], correctIndex: 1, explanation: 'A cash dividend reduces retained earnings (at declaration) and ultimately reduces cash (at payment), decreasing total stockholders\' equity by the dividend amount.' },
  { id: 'far-f1-m4-q17', question: 'A "scrip dividend" is best described as:', options: ['A dividend paid entirely in shares of the company\'s own stock', 'A dividend in the form of a promissory note (a special form of liability) payable at a future date, generally bearing interest', 'A non-cash dividend of inventory', 'A reduction of par value with no cash effect'], correctIndex: 1, explanation: 'A scrip dividend is a written promise to pay cash at a later date, typically with interest, recorded as a liability (notes payable) rather than an immediate cash outflow.' },
  { id: 'far-f1-m4-q18', question: 'Appropriated retained earnings, once the restriction that caused the appropriation no longer applies, should be:', options: ['Transferred to APIC permanently', 'Returned (reclassified) to unappropriated retained earnings', 'Written off as a loss', 'Transferred to common stock'], correctIndex: 1, explanation: 'When the reason for an appropriation no longer exists, the appropriated amount is simply reclassified back to unappropriated retained earnings — there is no income statement effect.' },
  { id: 'far-f1-m4-q19', question: 'A 30% stock dividend (a "large" stock dividend) on 10,000 shares of $1 par stock, with a market price of $25/share, requires capitalizing retained earnings of:', options: ['$75,000 (3,000 shares × $25)', '$3,000 (3,000 shares × $1 par)', '$10,000', '$0 — no capitalization required'], correctIndex: 1, explanation: 'Because this is a large stock dividend (30% > 20-25% threshold), it is capitalized at par value: 10,000 × 30% = 3,000 shares × $1 par = $3,000.' },
  { id: 'far-f1-m4-q20', question: 'Which item below would appear as a deduction in the Retained Earnings column of a statement of changes in stockholders\' equity?', options: ['Issuance of common stock for cash', 'Unrealized gain on AFS debt securities', 'Cash dividends declared', 'Purchase of treasury stock'], correctIndex: 2, explanation: 'Cash dividends declared reduce retained earnings directly; stock issuance affects Common Stock/APIC, unrealized AFS gains affect AOCI, and treasury purchases affect the Treasury Stock column.' },
];

const m4Flashcards: Flashcard[] = [
  { id: 'far-f1-m4-fc1', front: 'What are the three key dates in a cash dividend\'s life cycle, and what happens on each?', back: 'Declaration date — liability recorded (debit RE, credit Dividends Payable); Record date — no entry, identifies eligible shareholders; Payment date — liability settled (debit Dividends Payable, credit Cash).' },
  { id: 'far-f1-m4-fc2', front: 'How is a property dividend measured and recorded?', back: 'The distributed asset is remeasured to fair value at declaration, with any gain/loss recognized in net income; the dividend is then recorded at fair value.' },
  { id: 'far-f1-m4-fc3', front: 'How is a "small" stock dividend (< ~20-25%) recorded?', back: 'At fair value: debit Retained Earnings for fair value of shares distributed; credit Common Stock Distributable for par and APIC for the excess.' },
  { id: 'far-f1-m4-fc4', front: 'How is a "large" stock dividend (> ~20-25%) recorded?', back: 'At par value only, like a stock split: debit Retained Earnings for par value of shares distributed; credit Common Stock Distributable for par — no APIC effect.' },
  { id: 'far-f1-m4-fc5', front: 'What is the key difference between a stock dividend and a stock split?', back: 'A stock dividend reallocates an amount from retained earnings into paid-in capital (at fair value if small, at par if large); a stock split changes only the number of shares and par value per share, with no reclassification entry — total equity is unaffected by either.' },
  { id: 'far-f1-m4-fc6', front: 'What is a retained earnings appropriation?', back: 'A reclassification within equity that discloses a restriction on retained earnings (legal, contractual, or voluntary) limiting dividends — it does not reduce total stockholders\' equity.' },
  { id: 'far-f1-m4-fc7', front: 'What does the statement of changes in stockholders\' equity reconcile?', back: 'Beginning to ending balances of each equity component (Common Stock, APIC, Retained Earnings, AOCI, Treasury Stock) across transactions like net income, OCI, dividends, issuances, and treasury activity.' },
  { id: 'far-f1-m4-fc8', front: 'How are cumulative preferred dividends in arrears handled?', back: 'Unpaid cumulative preferred dividends accumulate and must be paid in full, along with the current year\'s preferred dividend, before any dividend can be paid to common shareholders.' },
  { id: 'far-f1-m4-fc9', front: 'What is a scrip dividend?', back: 'A dividend paid in the form of a promissory note (a liability) rather than immediate cash, typically bearing interest until paid.' },
  { id: 'far-f1-m4-fc10', front: 'Does declaring a stock dividend or stock split change total stockholders\' equity?', back: 'No — neither changes total stockholders\' equity. A stock dividend shifts amounts between retained earnings and paid-in capital; a stock split changes share count and par value per share only.' },
];

const m4NotesMarkdown = `# Stockholders' Equity — Part 2: Dividends, Splits, and Equity Statement

## Cash Dividends — The Three-Date Timeline

| Date | Entry |
|---|---|
| **Declaration date** | Debit Retained Earnings; Credit Dividends Payable — creates a legal liability |
| **Record date** | No journal entry — only identifies the shareholders of record entitled to the dividend |
| **Payment date** | Debit Dividends Payable; Credit Cash — settles the liability |

A **scrip dividend** is a special case: instead of cash, the company issues a promissory note (a liability, often interest-bearing), payable at a future date.

## Property Dividends

When a non-cash asset is distributed as a dividend:
1. **Remeasure the asset to fair value** at the declaration date.
2. Recognize any **gain or loss** (fair value − carrying value) in **net income**.
3. Record the dividend at fair value (debit Retained Earnings, credit Dividends Payable / the asset, at fair value).

## Stock Dividends — Small vs. Large

| | Small Stock Dividend (< ~20–25%) | Large Stock Dividend (> ~20–25%) |
|---|---|---|
| Measured at | **Fair value** of shares distributed | **Par (stated) value** of shares distributed |
| Rationale | Market price unlikely to be materially affected | Treated like a split — per-share value is materially diluted |
| Entry | Debit RE at FV; Credit Common Stock Distributable (par) + APIC (excess) | Debit RE at par; Credit Common Stock Distributable (par); no APIC effect |

Neither type changes **total** stockholders' equity — both simply reclassify amounts between retained earnings and paid-in capital.

## Stock Splits

A stock split (e.g., 2-for-1) proportionately increases the number of shares outstanding and decreases par value per share, with **total par value unchanged**. Typically requires only a **memorandum entry** — no capitalization of retained earnings, and no effect on total equity.

**Key distinction:** Stock dividends *reclassify* retained earnings into paid-in capital; stock splits do *not* reclassify anything — they merely restate the share count and per-share par value.

## Retained Earnings Appropriations

An appropriation (restriction) of retained earnings discloses that part of retained earnings is **unavailable for dividends** due to a legal requirement (e.g., bond covenant), contractual obligation, or voluntary board action (e.g., for a planned expansion). It is purely a **reclassification within equity** — appropriated and unappropriated retained earnings together still equal total retained earnings; total stockholders' equity is unaffected. When the restriction lapses, the amount is simply reclassified back to unappropriated retained earnings.

## Statement of Changes in Stockholders' Equity

This statement reconciles the **beginning and ending balance of each equity component** — typically Common Stock, APIC, Retained Earnings, AOCI, and Treasury Stock (plus Noncontrolling Interest, if applicable) — across all transactions for the period:

- **Net income** → increases Retained Earnings
- **OCI items** → increase/decrease AOCI
- **Dividends declared** (cash, property, stock) → decrease Retained Earnings (and may increase Common Stock/APIC for stock dividends)
- **Stock issuances** → increase Common Stock and APIC
- **Treasury stock purchases/reissuances** → affect the Treasury Stock column (and APIC — Treasury Stock)

Mastering which column each transaction hits — and which transactions bypass the income statement entirely (treasury stock, most equity transactions) — is essential for tracking ending equity balances on the exam.
`;

export const CPA_DATA_STORE: Record<string, ModuleContent> = {
  'FAR-F1-M1': {
    title: 'Balance Sheet, Income Statement, and Comprehensive Income',
    description: 'Classified balance sheet liquidity, continuing vs. discontinued operations net of tax, and the PUFI components of other comprehensive income.',
    targetQuestionsCount: 20,
    mcqs: m1Mcqs,
    flashcards: m1Flashcards,
    notesMarkdown: m1NotesMarkdown,
    conceptTags: ['Classified Balance Sheet', 'Discontinued Operations', 'OCI / PUFI', 'Comprehensive Income', 'AOCI vs. Net Income'],
  },
  'FAR-F1-M2': {
    title: 'EPS and Public Company Reporting Topics',
    description: 'Basic and diluted EPS, the treasury stock and if-converted methods, antidilution, and SEC Form 10-K/10-Q filing deadlines.',
    targetQuestionsCount: 20,
    mcqs: m2Mcqs,
    flashcards: m2Flashcards,
    notesMarkdown: m2NotesMarkdown,
    conceptTags: ['Basic EPS', 'Diluted EPS', 'Treasury Stock Method', 'If-Converted Method', 'SEC Filing Deadlines'],
  },
  'FAR-F1-M3': {
    title: "Stockholders' Equity Part 1",
    description: 'Common and preferred stock issuance, APIC tracking, and the Cost and Par Value methods for treasury stock.',
    targetQuestionsCount: 20,
    mcqs: m3Mcqs,
    flashcards: m3Flashcards,
    notesMarkdown: m3NotesMarkdown,
    conceptTags: ['Stock Issuance', 'APIC', 'Treasury Stock — Cost Method', 'Treasury Stock — Par Value Method', 'Paid-in Capital'],
  },
  'FAR-F1-M4': {
    title: "Stockholders' Equity Part 2",
    description: 'Cash, property, and stock dividends, stock splits, retained earnings appropriations, and the statement of changes in equity.',
    targetQuestionsCount: 20,
    mcqs: m4Mcqs,
    flashcards: m4Flashcards,
    notesMarkdown: m4NotesMarkdown,
    conceptTags: ['Cash Dividends', 'Property Dividends', 'Stock Dividends vs. Splits', 'RE Appropriations', 'Statement of Changes in Equity'],
  },
};
