// Real, substantive CPA exam notes for every module.
// Keyed by moduleId (e.g. 'far-f2-m4'). Each value is the markdown string
// used as the primary Summary Note for that module.

export const MODULE_NOTES_CONTENT: Record<string, string> = {

// ═══════════════════════════════════════════════════════════════════════════
// FAR — F2: Assets
// ═══════════════════════════════════════════════════════════════════════════

'far-f2-m1': `# Cash & Receivables

## Cash and Cash Equivalents
**Cash equivalents** are short-term, highly liquid investments that are:
- Readily convertible to known amounts of cash
- So close to maturity (≤ 3 months from acquisition date) that interest rate risk is insignificant

Examples: T-bills, money market funds, commercial paper, CDs maturing within 3 months.

**Not** cash equivalents: equity securities, long-term CDs, restricted cash (shown separately).

## Bank Reconciliation
Reconcile **book balance** to **bank balance**:

| Book Adjustments | Bank Adjustments |
|---|---|
| + Bank credits not yet recorded (e.g., interest earned) | + Deposits in transit |
| − Bank debits not yet recorded (e.g., NSF check, bank fee) | − Outstanding checks |
| ± Errors in book | ± Errors on bank statement |

**True (adjusted) cash** = both sides converge to the same number. Adjustments to the book balance require journal entries.

## Accounts Receivable Recognition
Recognized when **revenue is earned** and collection is probable. Initially measured at **transaction price** (gross amount owed).

**Allowance for Credit Losses (ACL) — ASC 326 (CECL)**
The Current Expected Credit Loss model replaced the "incurred loss" model. Under CECL:
- Estimate **lifetime expected credit losses** at origination, not just when a loss is probable
- Use historical data, current conditions, and **reasonable/supportable forecasts**

Journal entries:
- **Establish allowance**: Dr Bad Debt Expense / Cr Allowance for Credit Losses
- **Write off specific account**: Dr Allowance / Cr A/R
- **Recover written-off account**: Dr A/R / Cr Allowance; then Dr Cash / Cr A/R

## Factoring and Assignment of Receivables
**Factoring** = selling receivables to a third party (factor).
- **Without recourse**: seller transfers risk of uncollectibility → treated as a **sale**
- **With recourse**: seller retains risk → may be a sale or borrowing depending on conditions (ASC 860)

**Assignment**: pledging specific receivables as collateral for a loan. A/R stays on the books.

## Notes Receivable and Imputed Interest
If a note receivable carries **no stated interest** or a **below-market rate**, impute interest using the **market rate** at issuance.
- Recognize interest income using the **effective interest method** over the note's life
- A note received for goods/services: discount at market rate; recognize the difference as unearned revenue or discount on note`,

'far-f2-m2': `# Inventory

## Inventory Cost Inclusion
Include in inventory cost: **purchase price + freight-in + handling + import duties**.
Exclude: freight-out (selling expense), storage after completion, abnormal spoilage.

## Cost Flow Assumptions
| Method | COGS | Ending Inventory | Rising Prices |
|---|---|---|---|
| **FIFO** | Oldest costs | Newest costs | Lowest COGS, highest NI |
| **LIFO** | Newest costs | Oldest costs | Highest COGS, lowest NI |
| **Weighted Average** | Average cost | Average cost | Between FIFO and LIFO |

**LIFO is prohibited under IFRS.** Under U.S. GAAP, companies using LIFO must disclose the **LIFO reserve** (difference between LIFO and FIFO inventory) so readers can convert to FIFO.

## Periodic vs. Perpetual Systems
- **Periodic**: COGS calculated at period-end (Beg. Inventory + Purchases − End Inventory)
- **Perpetual**: COGS updated with each sale in real time

Under **LIFO** and **weighted average**, periodic and perpetual produce different results.

## Lower of Cost or Net Realizable Value (LCM / LCNRV)
**NRV = Estimated selling price − Estimated completion costs − Estimated selling costs**

Write inventory down to NRV if NRV < cost. The write-down goes to COGS or a separate loss line. **Cannot write back up** under U.S. GAAP (IFRS allows reversal).

## Inventory Estimation Techniques
**Gross Profit Method** (for interim periods or when records are lost):
1. Estimate COGS = Net Sales × (1 − Gross Profit %)
2. Estimate End Inventory = Beg. Inventory + Purchases − Estimated COGS

**Retail Inventory Method**:
- Track goods at both cost and retail
- Cost-to-retail ratio = Cost ÷ Retail (for average cost method)
- Estimated EI at cost = EI at retail × Cost-to-retail ratio

## Consignment Inventory
**Consignor** (owner) keeps inventory on its balance sheet until sold; **consignee** does not record it as inventory. Revenue recognized when consignee sells to end customer.

## Inventory Errors
| Error | Effect on COGS | Effect on Net Income |
|---|---|---|
| Understated ending inventory | Overstated | Understated |
| Overstated ending inventory | Understated | Overstated |
Errors **self-correct** over two periods but each period's income is misstated.`,

'far-f2-m3': `# Property, Plant & Equipment

## Initial Measurement
Record PP&E at **cost**: all expenditures necessary to bring the asset to its **intended location and condition for use**.

Includes: purchase price, sales taxes, installation, site preparation, freight, professional fees. Excludes: financing costs (generally), training, post-acquisition costs.

**Land**: never depreciated. Cost includes purchase price, back taxes paid, demolition costs (net of salvage from demolished building), surveys, grading.

## Capitalized Interest (ASC 835-20)
Interest on **self-constructed** assets is capitalized during the construction period.
- **Avoidable interest** = Weighted-average accumulated expenditures × Appropriate interest rate
- Capitalize the **lesser** of avoidable interest or actual interest incurred

## Depreciation Methods
All methods use: **Cost − Salvage Value = Depreciable Base**

| Method | Annual Depreciation |
|---|---|
| **Straight-Line** | Depreciable Base ÷ Useful Life |
| **Double-Declining Balance** | Book Value × (2 ÷ Useful Life) — ignore salvage until BV approaches it |
| **Sum-of-Years' Digits** | Depreciable Base × (Remaining Life ÷ SYD) |
| **Units of Production** | (Depreciable Base ÷ Total Estimated Units) × Units This Period |

DDB and SYD are **accelerated** methods — higher expense in early years.

## Subsequent Expenditures
- **Capitalize** (extend useful life, add capacity, improve quality): betterments, improvements, replacements of major components
- **Expense** (maintain current condition): ordinary repairs and maintenance

## Nonmonetary Exchanges (ASC 845)
- **Has commercial substance**: recognize gain or loss; record new asset at **fair value** of asset given up (or received if more clearly evident)
- **Lacks commercial substance**: no gain recognized; loss recognized immediately; new asset recorded at book value of old asset (adjusted for any cash paid/received)

## Asset Retirement Obligations (ARO)
When a legal obligation exists to retire an asset (e.g., decommission a nuclear plant):
1. **Record ARO** at PV of estimated future retirement costs (credit ARO liability, debit asset cost)
2. **Accrete** the ARO each period (Dr Accretion Expense / Cr ARO Liability) using the credit-adjusted risk-free rate
3. **Depreciate** the additional asset cost over the asset's life`,

'far-f2-m4': `# Intangible Assets

## What Are Intangible Assets?
Intangible assets lack physical substance. They include patents, copyrights, trademarks, customer lists, franchises, licenses, and goodwill. Recognition requires the asset to be **identifiable** (separable from the entity or arising from contractual/legal rights) and controlled by the entity.

## Purchased vs. Internally Developed
| | Purchased | Internally Developed |
|---|---|---|
| **Capitalize?** | Yes — at cost | Generally **no** (expense R&D) |
| **Goodwill** | Capitalized (business combination only) | Never capitalized |
| **Patents, trademarks** | Capitalize purchase price | Only registration/legal costs |

## Research and Development (ASC 730)
**R&D costs are expensed as incurred.** This is one of the most tested rules on the CPA exam.

Exceptions (capitalize):
- Materials, equipment, or facilities **with alternative future uses** (depreciate over useful life)
- R&D **acquired in a business combination** (recognize at fair value as an asset)

## Internally Developed Software (ASC 350-40)
Three stages — treatment differs by stage:
1. **Preliminary project stage**: Expense (like R&D)
2. **Application development stage**: **Capitalize** (coding, testing)
3. **Post-implementation stage**: Expense (training, maintenance)

For **website development costs**: content development costs are expensed; infrastructure and application costs follow the software model.

## Finite-Lived vs. Indefinite-Lived Intangibles
| | Finite-Lived | Indefinite-Lived |
|---|---|---|
| **Amortize?** | Yes, over useful life | **No** |
| **Impairment test** | Only when events indicate | **Annually** (or more often if events indicate) |
| **Examples** | Patents (legal life), licenses with expiration | Trademarks with indefinite renewal, goodwill |

Amortization method: **straight-line** unless another systematic method better reflects pattern of use.

## Goodwill
Goodwill arises **only in a business combination** (ASC 805):
**Goodwill = Purchase Price − Fair Value of Net Identifiable Assets Acquired**

- **Not amortized** (under public entity GAAP; private companies may elect to amortize over 10 years under ASC 350-20)
- Tested for impairment **annually at the reporting unit level**
- Impairment loss = Carrying value of reporting unit − Fair value of reporting unit (if CV > FV)
- **Goodwill impairment cannot be reversed**

## Trademarks, Patents, Copyrights
- **Patent**: legal life 20 years; amortize over **shorter of legal or useful life**
- **Copyright**: life of creator + 70 years; amortize over economic useful life
- **Trademark**: potentially indefinite if renewed; test impairment annually
- **Franchise**: amortize over franchise agreement term`,

'far-f2-m5': `# Impairment & Asset Disposals

## Impairment of Long-Lived Assets Held for Use (ASC 360)
**Two-step process:**

**Step 1 — Recoverability Test**: Compare the asset's **carrying value** to the **sum of undiscounted expected future cash flows**.
- If carrying value ≤ undiscounted cash flows → **No impairment** (stop here)
- If carrying value > undiscounted cash flows → **Go to Step 2**

**Step 2 — Measure Impairment**: Impairment loss = Carrying value − **Fair value**
- Dr Impairment Loss / Cr Accumulated Impairment (or directly to asset)
- Under U.S. GAAP: **cannot reverse** impairment on assets held for use (IFRS allows reversal)

## Assets Held for Sale (ASC 360-10-45)
Criteria (must meet **all six**):
1. Management commits to a plan to sell
2. Asset is available for immediate sale in its present condition
3. Active program to locate a buyer
4. Sale is probable within **12 months**
5. Being marketed at a reasonable price
6. Unlikely that plan will change significantly

Once classified as held for sale:
- **Stop depreciating**
- Measure at **lower of carrying value or fair value less costs to sell (FVLCTS)**
- Present separately on balance sheet (current if sale expected within 12 months)
- **Can reverse** impairment write-downs (up to cumulative amount) if value recovers

## Goodwill Impairment Testing
1. Optional qualitative assessment ("Step 0"): assess if it's more-likely-than-not that fair value of reporting unit is below carrying value. If not probable → stop.
2. **Quantitative test**: Compare FV of reporting unit to its carrying value (including goodwill).
   - If FV > CV → no impairment
   - If FV < CV → impairment = CV − FV (limited to goodwill balance; cannot create negative goodwill)

## Gain or Loss on Disposal
**Gain or Loss = Net Proceeds − Book Value**
- Book value = Cost − Accumulated Depreciation
- Update depreciation to disposal date first
- Present gain/loss in **income from continuing operations** (unless it qualifies as discontinued operations)

## Discontinued Operations (ASC 230 / ASC 205-20)
Qualifies if disposal represents a **strategic shift** with a major effect on operations/financial results (separate major line of business or geographic area).
- Present results **net of tax** as a separate line below income from continuing operations
- Prior periods **restated** for comparability`,

// ═══════════════════════════════════════════════════════════════════════════
// FAR — F3: Liabilities
// ═══════════════════════════════════════════════════════════════════════════

'far-f3-m1': `# Current Liabilities

## Definition and Classification
A liability is **current** if it is expected to be settled within **one year or the operating cycle**, whichever is longer, or if it is payable on demand.

## Common Current Liabilities

**Accounts Payable**: Amounts owed to suppliers for goods/services received. Recognized when the obligation arises (not when payment is made).

**Accrued Liabilities**: Expenses incurred but not yet paid at period-end (wages payable, interest payable, taxes payable). Recognized via adjusting entries.

**Unearned Revenue**: Cash received before performance. Recognized as a liability until the performance obligation is satisfied. Examples: gift cards, subscriptions, deposits.

**Sales Tax Payable**: Collected on behalf of the government — a liability until remitted, not revenue.

## Short-Term Debt and Reclassification
Short-term debt **may be reclassified as long-term** if, before the balance sheet is issued (or available to be issued), the company:
1. Refinances the obligation on a long-term basis, **OR**
2. Has a **firm, non-cancelable agreement** to refinance it on a long-term basis

## Compensated Absences (Sick Leave & Vacation)
Accrue a liability for compensated absences when:
- The obligation is attributable to past services
- The rights vest or accumulate
- Payment is probable
- Amount is estimable

**Vacation pay**: accrued (vests). **Sick pay**: accrue only if it vests (can be paid out); if it only accumulates (use-it-or-lose-it), accrue only when payment is probable.

## Warranty Obligations
**Expense warranty costs in the period of sale** (matching principle), even though cash is paid later.
- Dr Warranty Expense / Cr Warranty Liability (at time of sale, based on estimate)
- Dr Warranty Liability / Cr Cash/Parts/Labor (when warranty work is performed)

## Current Portion of Long-Term Debt
The portion of long-term debt due within the next 12 months is **reclassified to current**. The remaining balance stays long-term.`,

'far-f3-m2': `# Bonds Payable

## Bond Pricing
Bonds are priced at the **present value of future cash flows** (coupon payments + par value), discounted at the **market (effective) interest rate** at issuance.

| Stated Rate vs. Market Rate | Issue Price | Classification |
|---|---|---|
| Stated > Market | Above par | **Premium** |
| Stated < Market | Below par | **Discount** |
| Stated = Market | At par | Neither |

## Effective Interest Amortization
Each period:
- **Interest Expense** = Carrying Value × Market Rate
- **Cash Paid** = Face Value × Stated Rate
- **Premium Amortization** = Cash Paid − Interest Expense
- **Discount Amortization** = Interest Expense − Cash Paid

The carrying value **moves toward par** over the bond's life.

## Bond Issue Costs
Under current U.S. GAAP (ASC 835-30): bond issuance costs are presented as a **direct deduction from the carrying value** of the bond (like a discount), not as a separate asset. Amortized using the effective interest method.

## Early Extinguishment of Debt
**Gain or loss = Net Carrying Value − Reacquisition Price**
- Net carrying value = Face value ± unamortized premium/discount − unamortized issue costs
- Reacquisition price = cash paid to retire the bonds
- Report gain/loss in **income from continuing operations** (not extraordinary items under current GAAP)

## Convertible Bonds
Under U.S. GAAP (ASC 470-20): for most convertible instruments, the **entire proceeds are allocated to the debt**; no equity component is bifurcated (unless there is a cash conversion feature requiring bifurcation).

Upon conversion (book value method):
- Dr Bonds Payable + Dr Unamortized Premium/Discount
- Cr Common Stock (at par) + Cr APIC (plug)
- No gain or loss recognized

## Troubled Debt Restructuring (TDR)
When a creditor, for economic or legal reasons, grants a concession to a debtor in financial difficulty.
- **Modification of terms**: If total future cash flows ≥ carrying value → no gain/loss; adjust effective rate
- **Settlement of debt for assets or equity**: Debtor recognizes gain = excess of carrying value over FV of assets transferred`,

'far-f3-m3': `# Long-Term Liabilities

## Notes Payable
Similar accounting to bonds. If a note carries **no interest** or a below-market rate, the note is discounted to present value using the **market rate at issuance** (imputed interest). The difference between face value and PV is recorded as a discount and amortized using the effective interest method.

## Asset Retirement Obligations (ARO)
A **legal obligation** associated with retiring a long-lived asset (e.g., environmental cleanup, nuclear decommissioning):
1. Recognize at the **PV of estimated future cash flows** to settle the obligation
2. Debit the **asset** for the same amount (adds to depreciable cost)
3. Each period: **accrete** the ARO (interest expense-like) and **depreciate** the additional asset cost

Rate used = **credit-adjusted risk-free rate** (higher rates = lower initial ARO, but more accretion)

## Long-Term Purchase Commitments
If a company has an **unconditional purchase obligation** (e.g., a take-or-pay contract) that is not recognized on the balance sheet, it must **disclose**:
- Nature and term of the obligation
- Total fixed and determinable amount
- Amount for each of the next five years

If a **loss is probable and estimable** (prices fall below commitment price), accrue the loss.

## Debt Covenants
Covenants are agreements between borrower and lender requiring the borrower to maintain certain financial metrics (current ratio, debt-to-equity, etc.).

**Violation effect**: If a covenant is violated, the debt may become **immediately callable** → reclassify from long-term to **current**, unless:
- The lender grants a **waiver** before the balance sheet is issued, OR
- A grace period exists and the violation is expected to be cured within the grace period

## Off-Balance-Sheet Financing
Arrangements designed to keep debt off the balance sheet. Current standards (especially ASC 842 for leases and ASC 810 for VIEs) have greatly reduced these opportunities. The substance-over-form principle governs.`,

'far-f3-m4': `# Contingencies & Commitments

## Loss Contingencies (ASC 450)
A contingency is an existing condition with an **uncertain outcome** depending on a future event.

**Accrual criteria — both must be met:**
1. It is **probable** (likely to occur) that a liability has been incurred
2. The amount can be **reasonably estimated**

If only one criterion is met, or the loss is **reasonably possible**, disclose in the notes (but do not accrue).
If the loss is **remote** — neither accrue nor disclose (generally).

| Likelihood | Accrue? | Disclose? |
|---|---|---|
| Probable + estimable | **Yes** | Yes |
| Probable + not estimable | No | Yes |
| Reasonably possible | No | **Yes** |
| Remote | No | No |

## Range of Loss Estimates
If a range of loss is reasonably estimated and **no amount within the range is a better estimate** than another, accrue the **minimum** of the range and disclose the maximum.

## Gain Contingencies
**Do not accrue** gain contingencies. Disclose only if the gain is probable. This reflects conservatism.

## Litigation
- **Pending litigation**: accrue if probable and estimable; disclosure of unaccrued amounts if reasonably possible
- **Actual or possible** claims by others: disclose before formal litigation if the claim is filed and an unfavorable outcome is at least reasonably possible

## Warranties (revisit)
Product warranties meet both criteria (probable and estimable) → accrue at time of sale.

## Guarantees (ASC 460)
A guarantor must recognize a **liability at fair value** for the stand-ready obligation at inception of the guarantee, even if the loss is not probable. This is different from general contingency accrual rules.

## Unconditional Purchase Obligations
Fixed-price purchase contracts (take-or-pay): disclosed in notes, including future payments for next five years and total thereafter.`,

'far-f3-m5': `# Leases (ASC 842)

## Lessee Classification
| Test (any one met = Finance Lease) | Finance Lease | Operating Lease |
|---|---|---|
| Ownership transfer at end | ✓ | — |
| Bargain purchase option likely | ✓ | — |
| Lease term ≥ 75% of economic life | ✓ | — |
| PV of payments ≥ 90% of FV of asset | ✓ | — |
| Asset is specialized with no alternative use | ✓ | — |

## Lessee Accounting
**Both lease types**: recognize **Right-of-Use (ROU) Asset** and **Lease Liability** on the balance sheet.

**ROU Asset = PV of lease payments + Initial direct costs + Prepaid payments − Lease incentives received**

**Lease Liability = PV of future lease payments** (discount at lessee's **incremental borrowing rate**, or implicit rate if known and lower)

| | Finance Lease | Operating Lease |
|---|---|---|
| **Amortization** | Amortize ROU separately (often straight-line) | Single straight-line lease expense (combines amortization + interest) |
| **Interest** | Recognized separately (front-loaded) | Not shown separately |
| **Income statement** | Amortization + Interest expense | Single operating expense |
| **Cash flow** | Principal = financing; Interest = operating or financing | All payments = operating |

**Short-term lease exception**: Leases ≤ 12 months (with no purchase option likely to be exercised) may use straight-line operating expense; no ROU asset/liability required.

## Lessor Accounting
| Lessor Type | Revenue Recognition |
|---|---|
| **Sales-type** (transfers risks/rewards) | Derecognize asset; recognize selling profit + interest income over lease term |
| **Direct financing** (no profit at inception) | No selling profit; only interest income over term |
| **Operating** | Keep asset on books; straight-line lease income |

## Sale-Leaseback
Seller-lessee must evaluate whether the transfer qualifies as a **sale** under ASC 606. If yes:
- Recognize gain on sale (limited to retained interest)
- Recognize ROU asset and lease liability for leaseback
If not a sale: financing transaction; no derecognition.

## Lease Modifications
- Increases scope + commensurate increase in price → **new separate lease** (remeasure)
- Other changes → remeasure using revised rate at modification date`,

'far-f3-m6': `# Deferred Taxes (ASC 740)

## Temporary vs. Permanent Differences
**Temporary differences**: items included in taxable income in a different period than book income. They **create deferred taxes** that reverse.
- Examples: depreciation (MACRS vs. GAAP), installment sales, warranty accruals, bad debt allowances

**Permanent differences**: items recognized in book income but **never** in taxable income (or vice versa). **No deferred tax** created.
- Examples: municipal bond interest (book income, not taxable), meals/entertainment 50% disallowance, life insurance proceeds

## Deferred Tax Assets and Liabilities
| Difference | Creates |
|---|---|
| Taxable temporary difference (future taxable > future book) | **Deferred Tax Liability (DTL)** |
| Deductible temporary difference (future deductible > future taxable) | **Deferred Tax Asset (DTA)** |

**DTL Example**: Book depreciation < Tax depreciation in early years → More taxable income in future → DTL

**DTA Example**: Warranty expense accrued for book, deducted for tax only when paid → Future tax deduction → DTA

## Measurement
Use the **enacted tax rate** expected to be in effect when the temporary difference reverses. Not the current rate if new rates are enacted.

## Valuation Allowance
Reduce DTA by a **valuation allowance** if it is **more-likely-than-not** (>50%) that some or all of the DTA will not be realized.

Sources of taxable income that can support a DTA:
1. Future reversals of existing taxable temporary differences
2. Future taxable income (based on projections)
3. Tax planning strategies
4. Carryback opportunities

## Net Operating Loss (NOL) Carryforwards
Under current law (post-TCJA): NOL **carryforward indefinitely**, limited to 80% of taxable income per year. No carryback.
NOL carryforwards create a **DTA**; assess for valuation allowance.

## Intraperiod Tax Allocation
Allocate total tax expense among components:
- Continuing operations
- Discontinued operations
- Other comprehensive income
- Equity (e.g., prior period adjustments)

## Uncertain Tax Positions (ASC 740-10)
Two-step process:
1. **Recognition**: More-likely-than-not that position will be sustained on technical merits
2. **Measurement**: Largest amount with >50% cumulative probability of being sustained`,

// ═══════════════════════════════════════════════════════════════════════════
// FAR — F4: Equity
// ═══════════════════════════════════════════════════════════════════════════

'far-f4-m1': `# Equity Basics

## Components of Stockholders' Equity
1. **Common Stock** — par value × shares issued
2. **Additional Paid-in Capital (APIC)** — proceeds above par value
3. **Retained Earnings** — cumulative net income minus cumulative dividends declared
4. **Accumulated Other Comprehensive Income (AOCI)** — unrealized gains/losses bypassing net income
5. **Treasury Stock** — cost of repurchased shares (contra equity)
6. **Noncontrolling Interest** — if consolidated statements

## Stock Issuance
Journal entry: Dr Cash / Cr Common Stock (par) + Cr APIC (plug)

**Par value** is the legal minimum per share, rarely reflects market value. **No-par stock**: entire proceeds credited to Common Stock (or split between Common Stock and APIC per state law).

## Stock Subscriptions
Shares are sold under a subscription agreement; cash is received in installments.
- Dr Subscriptions Receivable / Cr Common Stock Subscribed / Cr APIC
- On receipt of installments: Dr Cash / Cr Subscriptions Receivable
- When fully paid: Dr Common Stock Subscribed / Cr Common Stock

## Preferred Stock
Preferred shareholders have priority over common shareholders for **dividends** and **liquidation proceeds**.

Key features:
- **Cumulative**: unpaid dividends accumulate as **dividends in arrears** (not a liability until declared; disclosed in notes)
- **Participating**: share in dividends beyond the stated rate
- **Convertible**: can be exchanged for common shares
- **Callable/Redeemable**: issuer or holder can force redemption (mandatorily redeemable preferred = classified as **liability** under ASC 480)

## Book Value Per Share
**BV per Common Share = (Total Equity − Preferred Liquidation Value) ÷ Common Shares Outstanding**

Outstanding shares = Issued shares − Treasury shares`,

'far-f4-m2': `# Treasury Stock

## Definition
Treasury stock is a company's **own stock that has been reacquired** (bought back) but not canceled or reissued. It is a **contra equity** account — reduces total stockholders' equity.

Treasury stock has **no voting rights, no dividend rights**, and is not included in EPS denominator calculations.

## Cost Method (Most Common)
**Repurchase**: Dr Treasury Stock (at cost) / Cr Cash

**Reissuance above cost**:
- Dr Cash
- Cr Treasury Stock (at cost)
- Cr APIC — Treasury Stock (excess)

**Reissuance below cost**:
- Dr Cash
- Dr APIC — Treasury Stock (reduce first, then...)
- Dr Retained Earnings (if APIC — TS is exhausted)
- Cr Treasury Stock (at cost)

**Retirement of treasury shares**:
- Dr Common Stock (at par)
- Dr APIC (original issue amount)
- Dr Retained Earnings (if price > original issue) OR Cr APIC — Retirement (if price < original issue)
- Cr Treasury Stock (at cost)

## Par Value Method
Treasury stock is recorded at **par value** at repurchase, with APIC reduced for the original issue price. Gains/losses recognized at repurchase, not reissuance.

## Effect on EPS
Treasury shares are **excluded** from the weighted-average shares outstanding calculation. Share buybacks reduce the denominator and therefore **increase EPS**.

## Donated Treasury Stock
If shareholders donate shares back to the company, record at **fair value** at the date of donation. No effect on cash; credit to Donated Capital (a form of APIC).`,

'far-f4-m3': `# Earnings Per Share (Advanced)

## Basic EPS
**Basic EPS = (Net Income − Preferred Dividends) ÷ Weighted-Average Shares Outstanding (WASO)**

- **Preferred dividends**: subtract cumulative preferred dividends for the period (whether or not declared); subtract noncumulative preferred dividends only if **declared**
- **WASO**: weight shares by the fraction of year outstanding
  - Stock splits and stock dividends: **retroactively adjust** all prior periods (as if outstanding from the beginning)

## Diluted EPS
Assumes all **dilutive** potential common shares are converted/exercised at the most advantageous time (beginning of period or issuance date if later).

**Treasury Stock Method** (options, warrants, rights):
- Assume exercise → proceeds = Options outstanding × Exercise price
- Proceeds used to buy back shares at **average market price** (treasury stock)
- Net new shares = Options outstanding − Shares repurchased
- These net new shares are added to WASO denominator

**If-Converted Method** (convertible bonds, convertible preferred):
- Assume conversion at beginning of period
- Add back after-tax interest (for convertible debt) to numerator
- Add converted shares to denominator
- Compare "per-share effect" to basic EPS:
  - If conversion reduces EPS → **dilutive** (include)
  - If conversion increases EPS → **antidilutive** (exclude)

## Antidilution Sequencing
When multiple dilutive instruments exist, rank them by per-share effect (most dilutive first). Include each in order until the next instrument would be antidilutive.

## Disclosure Requirements
- Present Basic and Diluted EPS on the **face of the income statement** for all periods presented
- Reconcile numerator and denominator from basic to diluted in the notes`,

'far-f4-m4': `# Stock-Based Compensation (ASC 718)

## Overview
Companies grant employees equity-based awards as compensation. ASC 718 requires recognition of **compensation expense** based on the **grant-date fair value** of the award, spread over the **requisite service period (vesting period)**.

## Stock Options
**Measurement**: Fair value at **grant date** using an option-pricing model (e.g., Black-Scholes). Inputs: stock price, exercise price, expected term, volatility, risk-free rate, dividends.

**Recognition**: Straight-line over the vesting period (or graded vesting if elected).

**Journal entry (each period)**:
Dr Compensation Expense / Cr Additional Paid-in Capital — Stock Options

**Upon exercise**:
Dr Cash (exercise price × shares) + Dr APIC — Stock Options / Cr Common Stock (par) + Cr APIC

**Upon expiration**: Dr APIC — Stock Options / Cr APIC — Expired Options (stays in equity; no income)

## Restricted Stock Units (RSUs)
Fair value = stock price at grant date (no option-pricing model needed).
Vesting conditions:
- **Service condition**: employee must remain employed for X years
- **Performance condition**: tied to achieving a metric (EPS, revenue); estimate probability of achievement
- **Market condition**: tied to stock price (e.g., TSR); reflected in grant-date fair value; never adjusted

## Vesting Schedules
- **Cliff vesting**: all shares vest at once at end of period → straight-line expense
- **Graded vesting**: tranches vest at different dates → either straight-line over longest term OR expense each tranche separately (accelerated method)

## Forfeitures
Estimate expected forfeitures and reduce compensation expense. **Adjust** in the period when actual forfeitures become known (no catch-up in one period).

## Modifications
If grant-date fair value increases at modification date → recognize **incremental** compensation cost (new FV − original FV) over remaining service period.`,

'far-f4-m5': `# Statement of Stockholders' Equity

## Format
A columnar reconciliation showing changes in each equity component during the period:

| | Common Stock | APIC | Retained Earnings | AOCI | Treasury Stock | Total |
|---|---|---|---|---|---|---|
| Beginning balance | | | | | | |
| Net income | | | ✓ | | | |
| Other comprehensive income | | | | ✓ | | |
| Dividends declared | | | (✓) | | | |
| Stock issuances | ✓ | ✓ | | | | |
| Treasury stock repurchased | | | | | (✓) | |
| Ending balance | | | | | | |

## Accumulated Other Comprehensive Income (AOCI)
AOCI captures items that **bypass net income** but affect total equity. Major components (PUFI):
- **P**ension liability adjustments
- **U**nrealized gains/losses on available-for-sale debt securities
- **F**oreign currency translation adjustments
- Cash flow hedge gains/losses (**I**nstruments)

When these items are "reclassified" into net income (realized), they are removed from AOCI.

## Prior Period Adjustments
Errors discovered after financial statements are issued require **retroactive restatement**:
- Adjust the **beginning balance of retained earnings** for the earliest period presented
- Restate comparative financial statements
- Disclose the nature and effect of the error correction

Prior period adjustments bypass the current income statement — they go directly to retained earnings.

## Noncontrolling Interest (NCI)
In consolidated statements, NCI represents the ownership interest in a subsidiary **not owned by the parent**. Presented within equity (not mezzanine) in consolidated balance sheet.

Comprehensive income is allocated to both the parent and NCI based on ownership percentages.`,

// ═══════════════════════════════════════════════════════════════════════════
// FAR — F5: Revenue & Special Transactions
// ═══════════════════════════════════════════════════════════════════════════

'far-f5-m1': `# Revenue Recognition (ASC 606)

## The 5-Step Model
**Step 1: Identify the contract** — written or oral; must have commercial substance, collectibility probable, approved by both parties, with identifiable rights and payment terms.

**Step 2: Identify performance obligations (POs)** — each distinct good or service is a separate PO. "Distinct" means the customer can benefit from it on its own AND it is separately identifiable from other promises in the contract.

**Step 3: Determine transaction price** — amount of consideration expected. Includes:
- **Variable consideration** (estimate using expected value or most likely amount; constrained by significant revenue reversal constraint)
- **Significant financing component** (adjust for time value if payment timing differs significantly from delivery)
- **Noncash consideration** (measured at fair value at contract inception)

**Step 4: Allocate transaction price** — allocate to each PO based on **standalone selling prices (SSP)**. If SSP is not directly observable, estimate using adjusted market assessment, expected cost plus margin, or residual approach.

**Step 5: Recognize revenue** — recognize when (or as) each PO is satisfied:
- **Over time**: if customer simultaneously receives and consumes benefits, entity's performance creates/enhances an asset the customer controls, or asset has no alternative use and entity has right to payment
- **Point in time**: otherwise (control transfers at delivery, acceptance, etc.)

## Contract Assets vs. Contract Liabilities
- **Contract asset**: entity has performed but doesn't yet have an unconditional right to payment (conditional on further performance)
- **Contract liability** (deferred revenue): customer paid before entity performs
- **Accounts receivable**: unconditional right to payment

## Principal vs. Agent
**Principal**: controls the good/service before transfer to customer → recognize **gross revenue**
**Agent**: arranges for another party to provide the good/service → recognize **net revenue (commission)**

Key indicator: who controls the good/service before transfer?`,

'far-f5-m2': `# Long-Term Contracts

## Revenue Over Time vs. Point in Time
Revenue is recognized **over time** when at least one of these is met:
1. Customer **simultaneously receives and consumes** benefits as entity performs
2. Entity's performance **creates or enhances an asset** the customer controls
3. Entity's performance creates an asset **with no alternative use** AND entity has a right to payment for performance to date

Construction contracts typically qualify because the customer controls the work in progress.

## Measuring Progress
Methods to measure progress toward satisfying a PO:
- **Input methods**: costs incurred ÷ total estimated costs (cost-to-cost method) — most common on CPA exam
- **Output methods**: units delivered, milestones reached, surveys of performance

**Cost-to-Cost Method**:
- % Complete = Costs Incurred to Date ÷ Total Estimated Costs
- Revenue Recognized = % Complete × Total Contract Price
- Gross Profit = Revenue − Costs Incurred

## Contract Modifications
- If adds distinct goods at SSP → treat as a **separate contract** (no cumulative catch-up)
- If not at SSP or not distinct → may be a **modification of existing contract** (catch-up adjustment in current period)

## Losses on Long-Term Contracts
If a contract becomes **onerous** (total estimated costs > total contract price), recognize the **entire anticipated loss immediately**, regardless of percentage complete.

Dr Loss on Long-Term Contract / Cr Provision for Loss on Contract

This is a key exam point — losses are front-loaded, not spread over the project.

## Contract Costs
- **Costs to obtain a contract** (e.g., sales commissions): capitalize if recoverable and expected to be recovered; amortize over performance period. Practical expedient: expense if amortization period ≤ 1 year.
- **Costs to fulfill a contract**: capitalize if directly related to contract, generate resources used in satisfying obligations, and expected to be recovered.`,

'far-f5-m3': `# Foreign Currency

## Foreign Currency Transactions
A **foreign currency transaction** occurs when a U.S. company has a receivable or payable denominated in a **foreign currency**.

**Two-transaction method**: at each transaction date and balance sheet date:
1. Record at the **spot rate** on the **transaction date**
2. Remeasure the monetary balance at the **spot rate on the balance sheet date**
3. Recognize **exchange gain or loss** in **current period net income**

Example: U.S. company sells goods for €100,000 when €1 = $1.10. Records A/R at $110,000. At year-end, €1 = $1.05. Remeasure A/R to $105,000 → **Foreign Exchange Loss of $5,000**.

## Translation vs. Remeasurement
| | **Translation** | **Remeasurement** |
|---|---|---|
| **When used** | Functional currency = local currency | Functional currency = parent's reporting currency |
| **Balance sheet** | Current rate for all assets/liabilities | Historical rate for nonmonetary; current for monetary |
| **Income statement** | Average rate | Historical for COGS/depreciation; average for others |
| **Adjustment** | **AOCI** (OCI, not income) | **Net Income** (current period gain/loss) |

**Functional currency** = currency of the primary economic environment in which the entity operates. Determined by management judgment based on cash flows, sales, expenses.

## Current Rate Method (Translation)
- Assets/Liabilities → **Current rate** (at balance sheet date)
- Equity → **Historical rates** (when contributed or earned)
- Revenues/Expenses → **Average rate** for the period
- Translation adjustment → **AOCI** (other comprehensive income)

## Temporal Method (Remeasurement)
- Monetary items (cash, receivables, payables) → **Current rate**
- Nonmonetary items (inventory at cost, PP&E, intangibles) → **Historical rate**
- Remeasurement gain/loss → **Net income**`,

'far-f5-m4': `# Investments in Securities

## Held-to-Maturity (HTM) — Debt Only
- **Intent and ability** to hold to maturity
- Measured at **amortized cost** (using effective interest method)
- No fair value adjustments; unrealized gains/losses not recognized
- Impairment: recognize credit loss through the ACL; non-credit loss in OCI

## Available-for-Sale (AFS) — Debt Only
- Not HTM and not trading
- Measured at **fair value**; unrealized gains/losses → **AOCI** (bypass income)
- When sold: reclassify cumulative OCI amount into net income (realized gain/loss)
- Impairment: credit loss portion → net income via ACL; non-credit loss → OCI

## Trading Securities — Debt
- Bought and sold **frequently**
- Measured at **fair value**; all unrealized gains/losses → **net income**

## Equity Securities (ASC 321)
- Measured at **fair value through net income** (most equity securities)
- Exception: equity method investments (≥20% ownership/significant influence)
- Exception: investments in private companies may use **measurement alternative** (cost less impairment + observable price changes)

## Equity Method (ASC 323)
Used when investor has **significant influence** (generally 20–50% ownership).
- Record investment at cost
- Each period: Dr Investment / Cr Investment Income = investor's share of investee's **net income**
- Each period: Dr Cash / Cr Investment = dividends received (return of investment, not income)
- Investor's share of investee **losses** reduce investment to **zero** (then stop unless guarantees exist)

## Impairment of Equity Method Investments
Test for **other-than-temporary impairment** if fair value < carrying value. If impaired, write down to fair value; the new carrying value becomes the new cost basis.`,

'far-f5-m5': `# Derivatives & Hedge Accounting (ASC 815)

## Definition of a Derivative
A contract with:
1. **Underlying** (price, rate, index) AND **Notional amount** (face amount)
2. Little or **no initial net investment**
3. Can be **net settled**

Examples: forwards, futures, options, swaps, caps, floors.

## Recognition
All derivatives recognized on the balance sheet at **fair value**. Changes in fair value flow to income **unless** hedge accounting is elected.

## Hedge Accounting — Three Types

**Fair Value Hedge**: hedges exposure to changes in **fair value** of a recognized asset/liability or firm commitment.
- Both the hedging instrument AND the hedged item are measured at fair value each period
- Changes in both go to **net income**; effective portion offsets (approximately)
- Ineffectiveness → net income

**Cash Flow Hedge**: hedges exposure to **variability in cash flows** (e.g., variable rate debt, forecasted transaction).
- Changes in FV of derivative → **AOCI** (effective portion)
- Reclassified from AOCI to income in the **same period** the hedged cash flow affects income
- Ineffectiveness → net income immediately

**Net Investment Hedge**: hedges FX risk of a net investment in a **foreign operation**.
- Effective portion → **AOCI** (stays until the foreign operation is sold/liquidated)

## Hedge Effectiveness
Must be **highly effective** (changes in FV/cash flows offset 80–125%). Document at inception: the hedging relationship, risk management objective, hedged item, hedging instrument, and method of assessing effectiveness.

## Embedded Derivatives
A derivative **embedded in a host contract** must be bifurcated and accounted for separately if:
1. Not clearly/closely related to the host
2. The hybrid instrument is not measured at fair value through income
3. A separate instrument with the same terms would be a derivative`,

'far-f5-m6': `# Special Transactions

## Nonmonetary Exchanges (ASC 845)
Exchanges of nonmonetary assets for other nonmonetary assets.

**With commercial substance** (future cash flows change significantly):
- Record new asset at **fair value** of asset given up (or received if more clearly evident)
- Recognize **gain or loss** on exchange

**Without commercial substance**:
- Record new asset at **book value** of old asset (adjusted for boot)
- **No gain recognized** (loss is recognized immediately)

**Boot (cash) in an exchange**:
- Receiving party recognizes proportional gain (boot ÷ total consideration)
- Paying party defers the remaining gain

## Business Combinations (ASC 805) — Overview
**Acquisition method** required for all business combinations:
1. Identify the acquirer
2. Determine the acquisition date
3. Recognize and measure identifiable assets acquired and liabilities assumed at **fair value**
4. Recognize goodwill or a bargain purchase gain

**Goodwill** = Consideration transferred + NCI FV + Previously held equity interest FV − FV of net identifiable assets

**Bargain purchase** (negative goodwill): FV of net assets > consideration → recognize as a **gain** in income.

## Consolidation Basics
Parent + subsidiary combined line-by-line. Eliminate:
- Intercompany investments (parent's Investment account vs. subsidiary's equity)
- Intercompany transactions (sales, loans, dividends)
- Unrealized intercompany profits (on inventory or assets not yet sold to third parties)

## Related Party Transactions
Disclosed at amounts paid/agreed upon. If no price was set, disclose that. Related parties: affiliates, owners/management, immediate family of management.

## Spin-offs and Divestitures
**Spin-off**: distribution of subsidiary shares to existing shareholders. If pro-rata to all shareholders, treated as a **dividend** (at fair value). If qualifies as discontinued operation, present separately.`,

// ═══════════════════════════════════════════════════════════════════════════
// FAR — F6: Governmental & Not-for-Profit
// ═══════════════════════════════════════════════════════════════════════════

'far-f6-m1': `# Government Accounting Fundamentals

## Fund Accounting
Governments use **fund accounting** to segregate resources for specific purposes. A **fund** is a self-balancing set of accounts.

Three categories of funds:
| Category | Funds | Basis |
|---|---|---|
| **Governmental** | General, Special Revenue, Capital Projects, Debt Service, Permanent | Modified accrual |
| **Proprietary** | Enterprise, Internal Service | Accrual |
| **Fiduciary** | Pension Trust, Investment Trust, Private-Purpose Trust, Custodial | Accrual |

## Modified Accrual Basis
Used by **governmental funds**:
- **Revenues**: recognized when **measurable and available** (available = collectible within 60 days of year-end)
- **Expenditures**: recognized when the **liability is incurred** (same as accrual for most items; exception: principal/interest on long-term debt recognized when due)

Capital assets and long-term debt are **NOT reported** in governmental fund financial statements — only in government-wide statements.

## Budgetary Accounting
Governments legally adopt budgets. Budgetary accounts are integrated into the accounting system:
- **Estimated Revenues** (debit — budgeted inflows)
- **Appropriations** (credit — authorized spending)
- **Encumbrances** (reserve for future expenditures when purchase orders are issued)
- **Budgetary Fund Balance** (plug)

**Encumbrance** entry when PO issued: Dr Encumbrances / Cr Reserve for Encumbrances
**Reverse encumbrance, record expenditure** when goods received: reverse encumbrance; Dr Expenditures / Cr Vouchers Payable

## GASB Conceptual Framework
GASB (not FASB) sets standards for state and local governments. Government-wide statements follow **full accrual** accounting. Fund statements use the **measurement focus and basis of accounting** appropriate to each fund type.`,

'far-f6-m2': `# Governmental Fund Types

## General Fund
- Accounts for **all financial resources not accounted for in another fund**
- The most important and largest governmental fund
- Revenues: taxes, licenses, fines, grants
- Expenditures: general government, public safety, education, health

## Special Revenue Funds
- Revenues legally **restricted or committed** to specific purposes
- Examples: federal grants with specific use requirements, state gasoline tax for roads

## Capital Projects Funds
- Accounts for **acquisition or construction of major capital assets**
- Sources: bond proceeds, grants, transfers from other funds
- Does NOT report the capital asset itself (appears only in government-wide statements)

## Debt Service Funds
- Accumulates resources for **payment of principal and interest** on long-term debt
- Expenditures for debt service recognized when **due** (not when incurred under modified accrual)

## Permanent Funds
- Resources are **legally restricted** such that only **earnings** may be spent (principal is endowed)
- Example: cemetery maintenance fund where principal is preserved

## Fund Balance Classifications (GASB 54)
In governmental funds, net resources are classified as:
1. **Nonspendable** — not in spendable form (prepaid items, inventories, long-term loans)
2. **Restricted** — externally imposed constraints (creditors, grantors, law)
3. **Committed** — self-imposed by highest level of government (formal resolution/ordinance)
4. **Assigned** — intended for specific purpose by management
5. **Unassigned** — residual (only in General Fund can be positive; other funds show negative if overspent)

Expenditures reduce fund balance in this order: restricted → committed → assigned → unassigned (unless specified otherwise).`,

'far-f6-m3': `# Government-Wide Financial Statements

## Two Required Government-Wide Statements
1. **Statement of Net Position** — similar to a balance sheet; shows assets, deferred outflows, liabilities, deferred inflows, and net position
2. **Statement of Activities** — shows revenues and expenses by function; similar to income statement

Both use **full accrual accounting** and **economic resources measurement focus** — capital assets and long-term debt ARE reported here.

## Net Position Components
- **Net Investment in Capital Assets**: capital assets − accumulated depreciation − related debt outstanding
- **Restricted Net Position**: resources with external constraints
- **Unrestricted Net Position**: residual

## Statement of Activities Format
Unique format: program revenues are **netted against program expenses** first to show net cost (revenue) of each function. General revenues fill the remainder.

| Function/Program | Expenses | Program Revenues | Net (Cost)/Revenue |
|---|---|---|---|
| General government | $(X) | Charges for services, grants | $(X) or $X |
| Public safety | $(X) | | $(X) |
| **Net cost of government** | | | **$(Total)** |
| General revenues (taxes, etc.) | | | $X |
| **Change in Net Position** | | | $X or $(X) |

## Reconciliation: Fund to Government-Wide
Governmental fund statements must be **reconciled** to government-wide statements. Key differences:
- Capital outlay expenditures → become capital assets (add back)
- Depreciation → deducted in government-wide, not in funds
- Debt proceeds → not revenue in government-wide; create a liability
- Debt principal payments → eliminate liability in government-wide, not expenditure

## Component Units
Legally separate entities whose **economic resources** or **financial burden** is closely related to the primary government. Included in the reporting entity:
- **Blended**: reported as if part of the primary government
- **Discretely presented**: shown in a separate column`,

'far-f6-m4': `# Not-for-Profit Accounting

## Net Asset Classification (ASU 2016-14)
NFPs classify net assets into **two classes**:
1. **Net assets without donor restrictions** — available for general use by management
2. **Net assets with donor restrictions** — subject to donor-imposed stipulations (purpose or time)

(Prior to ASU 2016-14: three classes — unrestricted, temporarily restricted, permanently restricted)

## Contributions (ASC 958-605)
**Unconditional contributions**: recognized as revenue when received (or unconditional promise received).
- Cash donations, pledges, in-kind gifts → recognize at fair value

**Conditional contributions**: not recognized until the **condition is substantially met**. The condition must be a barrier (not just a donor preference) and a right of return/release exists.

**In-kind contributions (gifts-in-kind)**:
- Donated services: recognize only if (1) creates or enhances a **nonfinancial asset**, OR (2) requires **specialized skills** that the NFP would otherwise purchase
- Donated goods: recognize at fair value

## Promises to Give (Pledges)
Unconditional multi-year pledges → recognize at **present value** of future payments using a risk-adjusted discount rate. Subsequent periods: amortize discount into contribution revenue.

## Endowments
**Permanent endowment**: donor restricts principal indefinitely; only income/gains may be spent.
**Term endowment**: restrictions lapse after time.
**Board-designated endowment**: quasi-endowment; board sets aside funds but has discretion to release — classified as **without donor restrictions**.

Under the Uniform Prudent Management of Institutional Funds Act (UPMIFA): NFPs can spend from underwater endowments if prudent.

## Functional Expense Reporting
NFPs must present expenses by **both function and nature** (either on the face of the statement or in the notes):
- **Program services**: directly further the mission
- **Management & general**: administration
- **Fundraising**: solicitation activities`,

'far-f6-m5': `# NFP Financial Statements

## Required Financial Statements for NFPs (ASC 958)
1. **Statement of Financial Position** (balance sheet equivalent)
2. **Statement of Activities** (income statement equivalent)
3. **Statement of Cash Flows**
4. **Statement of Functional Expenses** (required for voluntary health and welfare organizations; others may provide)

## Statement of Financial Position
Assets − Liabilities = **Net Assets** (not equity)
- Net assets separated into: with donor restrictions / without donor restrictions
- Assets need not be classified as current/noncurrent (but many NFPs do for clarity)

## Statement of Activities
Shows **all changes in net assets** for the period:
- Revenues and gains → increase net assets
- Expenses and losses → decrease net assets
- Reclassifications → move amounts between net asset classes (when restrictions are satisfied)

Format: show revenues by class, expenses (total; all expenses shown as reductions in **without restriction** class), and net change for each class.

**Net assets released from restrictions**: when purpose restriction is met (or time restriction lapses), reclassify from "with donor restrictions" to "without donor restrictions."

## Statement of Cash Flows
NFPs may use **direct or indirect method** (like for-profit entities). Classify:
- **Operating**: program receipts, contributions for operating purposes, payments to employees/vendors
- **Investing**: PP&E purchases, investment purchases/sales
- **Financing**: contributions restricted for long-term purposes (endowments, capital), borrowings

## Liquidity and Availability Disclosures (ASU 2016-14)
NFPs must disclose:
1. Qualitative information about how liquid financial assets are managed
2. Quantitative information: financial assets available within **one year** of the balance sheet date, less amounts not available (donor-restricted, board-designated)

## NFP Revenue Recognition
Exchange transactions (fees for services): apply ASC 606.
Contributions: apply ASC 958-605.
Government grants: analyze as contribution vs. exchange transaction.`,

// ═══════════════════════════════════════════════════════════════════════════
// AUD — A1–A6
// ═══════════════════════════════════════════════════════════════════════════

'aud-a1-m1': `# Ethics & Professional Responsibilities

## AICPA Code of Professional Conduct
The Code is organized around **principles** (aspirational) and **rules** (enforceable):
- **Integrity**: honest and candid
- **Objectivity**: free from conflicts of interest
- **Independence**: for attest engagements — in fact and in appearance
- **Due Care**: exercise professional competence and diligence

## Independence — The Threats and Safeguards Framework
**Threats** that impair independence:
| Threat | Description |
|---|---|
| **Self-interest** | Financial interest in the client |
| **Self-review** | Reviewing your own prior work |
| **Advocacy** | Promoting the client's position |
| **Familiarity** | Close relationship with client personnel |
| **Intimidation** | Pressure from client management |
| **Undue influence** | Gifts, hospitality, or employment offers |

**Safeguards** to mitigate threats:
- Firm-wide policies (rotation, quality control, peer review)
- Engagement-specific (separate engagement team, independent review)
- Client's own governance (audit committee oversight)

## Financial Interests in Attest Clients
- **Direct financial interest** (owning stock in audit client): always impairs independence if material
- **Indirect financial interest** (investment through mutual fund): generally not impairing unless the CPA controls the fund or the interest is material

## PCAOB Independence Rules
More stringent than AICPA for **public company audits**:
- Partner rotation required (lead partner: 5-year max; all partners: 7-year max)
- Cooling-off period before auditor can take senior financial role at client (1 year)
- Audit committee pre-approval of all audit and non-audit services

## Circular 230
Governs **tax practice** before the IRS. Key rules:
- Competence: only practice in areas of competence
- Prompt disposition: don't delay proceedings unnecessarily
- No false statements: don't make false representations to the IRS
- Return of records: return client's records on request (even if fees unpaid)

## Acts Discreditable
A CPA must not commit acts discreditable to the profession, including:
- Discrimination or harassment in employment
- Failure to file their own tax return
- Retention of client records as leverage for unpaid fees`,

'aud-a2-m1': `# Audit Planning

## Preconditions for Accepting an Audit Engagement
Before accepting:
1. Determine the **acceptable financial reporting framework** is being used
2. Obtain **management's acknowledgment** of responsibility for the financial statements, internal controls, and providing the auditor with needed access
3. Perform **client acceptance procedures** (evaluate management integrity, assess firm capabilities)

**Engagement letter**: formalizes the agreement. Contents include: objective/scope of the audit, auditor's responsibilities, management's responsibilities, applicable framework, fees, and form of communication.

## Materiality
**Materiality**: the magnitude of an omission or misstatement that, individually or in aggregate, could influence economic decisions.

- **Overall (planning) materiality**: set at beginning using judgment (typically 5% of pre-tax income, 0.5–1% of total assets, 1–2% of revenues — benchmarks vary)
- **Performance materiality**: lower threshold used during the audit to reduce risk that aggregate uncorrected misstatements exceed overall materiality (typically 50–75% of overall materiality)
- **Trivial (clearly inconsequential) threshold**: below which misstatements are not accumulated

Materiality is **quantitative and qualitative**. A small misstatement can be material if it affects key ratios, violates covenants, converts a loss to a profit, etc.

## Understanding the Entity and Its Environment
Auditors must understand:
- Industry, regulatory, and external factors
- Nature of entity (operations, ownership, governance)
- Accounting policies and changes
- Objectives, strategies, and related business risks
- Financial performance measurement

## Audit Strategy and Audit Plan
**Audit strategy**: overall scope, timing, and direction. Documents the approach: primarily controls-based vs. substantive.
**Audit plan**: more detailed, listing the nature, timing, and extent of planned audit procedures.

## Group Audits
When the entity has components (subsidiaries, divisions) with separate auditors:
- The **group engagement partner** is responsible for the **entire group audit opinion**
- Must understand the work of **component auditors** and determine involvement needed
- Significant components require direct involvement or instructions to component auditors`,

'aud-a3-m1': `# Risk Assessment

## The Audit Risk Model
**AR = IR × CR × DR**

- **Audit Risk (AR)**: the risk the auditor expresses an inappropriate opinion. Set very low (e.g., 5%).
- **Inherent Risk (IR)**: susceptibility of an assertion to material misstatement, ignoring controls. High for complex estimates, related parties, non-routine transactions.
- **Control Risk (CR)**: risk that controls won't prevent or detect misstatement. Assessed based on design and operating effectiveness of controls.
- **Detection Risk (DR)**: risk that substantive procedures won't detect material misstatement. **The only risk the auditor directly controls** by adjusting the nature, timing, and extent of procedures.

**If IR and CR are high → DR must be set low → more/stronger substantive procedures required**

**Risk of Material Misstatement (RMM) = IR × CR** — often assessed at the assertion level.

## Risk Assessment Procedures
Performed to understand the entity and identify RMM:
- **Inquiries** of management and others (least reliable)
- **Analytical procedures** (compare relationships to expectations)
- **Observation and inspection** (physical observation of assets, review of documents)

## Fraud Risk Assessment (AU-C 240)
Every audit requires consideration of fraud. Two types:
- **Fraudulent financial reporting**: intentional misstatement (revenue manipulation is the most common)
- **Misappropriation of assets**: theft by employees

**The Fraud Triangle**: Incentive/Pressure + Opportunity + Rationalization

**Required fraud discussion**: engagement team must discuss the potential for fraud in the audit, separately from risk assessment discussions.

**Responses to fraud risk**: make unpredictable audit procedures, involve more senior personnel, increase skepticism, expand substantive testing.

## Analytical Procedures in Planning
Used to **identify unusual fluctuations** or relationships that may indicate material misstatements or fraud.
- Compare current-year financials to prior years, industry, and budget
- Calculate key ratios and investigate unexpected changes
- Help focus audit attention on high-risk areas`,

'aud-a4-m1': `# Internal Control

## COSO Internal Control Framework (5 Components)
1. **Control Environment**: tone at the top — management's integrity, ethical values, competence, organizational structure
2. **Risk Assessment**: entity-level process for identifying and analyzing risks to achieving objectives
3. **Control Activities**: specific policies and procedures (authorizations, reconciliations, segregation of duties, physical controls, IT controls)
4. **Information & Communication**: systems to capture and communicate information relevant to financial reporting
5. **Monitoring**: ongoing and periodic evaluations of controls' design and operation

## Segregation of Duties
Separate three incompatible functions:
- **Authorization**: approving transactions
- **Recording**: maintaining accounting records
- **Custody**: physical control of assets

No individual should handle two or more of these for the same transaction.

## IT General Controls vs. Application Controls
| | IT General Controls | Application Controls |
|---|---|---|
| **Scope** | All IT operations | Specific applications/processes |
| **Examples** | Access controls, change management, data center security | Input validation, batch totals, reconciliations |
| **Effect** | Pervasive — affect many applications | Specific transaction controls |

## Walkthroughs
Tracing **one transaction** from initiation to recording. Purpose: confirm the auditor's understanding of the system and assess whether controls as designed prevent/detect misstatements.

## Types of Control Testing
- **Inquiry**: least persuasive alone; must be corroborated
- **Observation**: effective for procedures that leave no documentary evidence, but only for the moment observed
- **Inspection of documents**: testing compliance with documented procedures
- **Re-performance**: most persuasive — auditor re-executes the control

## Deficiency Classification
| Level | Definition |
|---|---|
| **Control deficiency** | Design or operating weakness; less severe |
| **Significant deficiency** | Deficiency or combination that warrants audit committee attention |
| **Material weakness** | Reasonable possibility that a material misstatement won't be prevented/detected |

Material weaknesses must be **communicated in writing** to management and those charged with governance.`,

'aud-a5-m1': `# Audit Evidence & Procedures

## Sufficient Appropriate Audit Evidence
- **Sufficient**: enough quantity to support the audit conclusion
- **Appropriate**: relevant and reliable

Evidence reliability hierarchy:
1. Auditor's **direct personal knowledge** (observation, re-performance, computation) — most reliable
2. **External** evidence (bank confirmations, attorney letters)
3. **Internal** evidence with external corroboration
4. **Internal** evidence (client-generated documents) — least reliable

## Types of Substantive Procedures
**Tests of details**: directly test individual transactions, account balances, or disclosures
**Substantive analytical procedures**: plausibility tests; analyze relationships and explanations

Analytical procedures are **more efficient** but less reliable alone; most effective for **high-volume, predictable** transactions (utilities expense, payroll).

## External Confirmations
Written responses from **third parties** confirming information. Highly reliable because external.
- **Positive confirmation**: ask addressee to respond whether they agree or disagree (used for individual large balances)
- **Negative confirmation**: ask addressee to respond **only** if they disagree (used for many small balances when risk is low)

If management refuses to allow confirmations → auditor should **qualify or disclaim** opinion on scope limitation.

## Audit Sampling
**Attribute sampling** (tests of controls): estimate rate of deviation; compare to tolerable deviation rate
**Variables sampling** (substantive tests): estimate dollar amount of misstatement in a population

**Sampling risk**: the risk that the sample result differs from the true population result.
- **Type I risk** (risk of incorrect rejection / alpha): over-auditing
- **Type II risk** (risk of incorrect acceptance / beta): under-auditing — more serious

Increasing **sample size** reduces sampling risk. Non-sampling risk (human error) is not reduced by larger samples.

## Auditing Estimates
Estimates (fair value, allowances, warranties) require:
- Understanding management's estimation process
- Testing the data/assumptions management used
- Developing an independent estimate for comparison
- Evaluating bias: Is there a pattern of overly optimistic assumptions?

## Related Party Transactions
Not inherently improper but present **elevated risk**. Auditor must:
- Understand management's process for identifying related parties
- Inspect underlying documentation
- Evaluate whether disclosed appropriately in the financial statements`,

'aud-a6-m1': `# Audit Reporting & Attestation

## The Standard (Unmodified) Audit Report
Key elements of GAAS report (AU-C 700):
1. Title (including "independent")
2. Addressee
3. Opinion paragraph (first): FS present fairly in all material respects
4. Basis for opinion: conducted per GAAS; auditor is independent
5. Going concern (if applicable)
6. Key audit matters (for listed entities)
7. Management's and auditor's responsibilities
8. Signature, city, date

## Modified Opinions
| Opinion | Condition |
|---|---|
| **Qualified ("except for")** | Material misstatement OR scope limitation that is **not pervasive** |
| **Adverse** | Misstatements that are **material and pervasive** |
| **Disclaimer** | Scope limitation so significant that auditor can't express an opinion (pervasive) |

**Pervasive** = affects multiple elements or is fundamental to users' understanding.

## Emphasis-of-Matter and Other-Matter Paragraphs
- **Emphasis-of-matter**: draws attention to a matter already disclosed in the FS (going concern, change in accounting principle). Does NOT modify the opinion.
- **Other-matter**: refers to a matter not in the FS but relevant to users (e.g., prior period not audited).

## Going Concern
If substantial doubt about going concern exists, auditor adds an **emphasis-of-matter paragraph** (if management's plans are deemed adequate) or **qualifies/disclaims** (if plans are not adequate or information is insufficient).

## SSARS — Compilation and Review
| Engagement | Assurance | Report Content |
|---|---|---|
| **Compilation** | None | Accountant has compiled the FS; no assurance provided |
| **Review** | Limited (negative assurance) | "Nothing came to our attention" that would indicate material modifications needed |

## Attestation Standards (AT-C)
Practitioner expresses a conclusion about subject matter or an assertion. Types:
- **Examination**: positive/reasonable assurance
- **Review**: limited assurance
- **Agreed-upon procedures**: no assurance; just report findings

**SOC 1 (AT-C 320)**: controls at a service organization relevant to user entities' ICFR
**SOC 2 (AT-C 105)**: controls relevant to Trust Service Criteria (security, availability, processing integrity, confidentiality, privacy)`,

// ═══════════════════════════════════════════════════════════════════════════
// REG — R1–R6
// ═══════════════════════════════════════════════════════════════════════════

'reg-r1-m1': `# Federal Tax Procedures

## Practice Before the IRS (Circular 230)
**Who may practice**: CPAs, attorneys, enrolled agents, enrolled actuaries, and others in limited capacities.

Key duties under Circular 230:
- **Competence**: only practice in areas of competence; associate with competent colleagues if needed
- **Prompt disposition**: don't unnecessarily delay proceedings
- **Supervisory responsibility**: practitioners must supervise subordinates
- **No false statements**: never make false representations to the IRS
- **Records**: return all client records promptly upon request, even if fees are unpaid (firm can keep copies)
- **Conflicts**: disclose conflicts of interest; obtain informed consent to proceed

## Return Preparer Penalties (IRC §6694)
- **Unreasonable position** (§6694(a)): preparer failed to disclose or had no reasonable basis → penalty = greater of $1,000 or 50% of fee derived
- **Willful/reckless** (§6694(b)): penalty = greater of $5,000 or 75% of fee derived

**Accuracy-related penalty** (§6662): 20% of underpayment attributable to negligence, substantial understatement, or valuation misstatement

**Civil fraud penalty** (§6663): 75% of underpayment attributable to fraud

## Statute of Limitations for Assessment
| Situation | Period |
|---|---|
| Standard | **3 years** from later of return due date or actual filing |
| Substantial omission (>25% of gross income) | **6 years** |
| Fraud or no return filed | **Unlimited** |
| Amended return | 3 years from amended return or 3 years from original, whichever is later |

## IRS Examination and Appeals
1. **Correspondence audit**: simple issues resolved by mail
2. **Office audit**: taxpayer comes to IRS office
3. **Field audit**: IRS agents visit the taxpayer
4. **Appeals Office**: taxpayer may request IRS Appeals
5. **Tax Court, District Court, Court of Claims**: if Appeals fails, taxpayer can litigate

## Offers in Compromise (OIC)
Allows settling tax liability for less than the full amount owed. Bases:
- **Doubt as to collectibility**: taxpayer cannot pay full amount
- **Doubt as to liability**: genuine dispute about the tax owed
- **Effective tax administration**: exceptional hardship

## Installment Agreements
Taxpayer can pay a liability over time if unable to pay in full. IRS must allow if liability is ≤$10,000 (automatically) under certain conditions.`,

'reg-r2-m1': `# Individual Taxation

## The Individual Tax Formula
1. **Gross Income** (all income from any source unless excluded)
2. − Above-the-line deductions (AGI adjustments)
3. = **Adjusted Gross Income (AGI)**
4. − Greater of: Standard Deduction OR Itemized Deductions
5. − Qualified Business Income (QBI) Deduction (§199A)
6. = **Taxable Income**
7. × Tax rate → Gross Tax
8. − Tax Credits
9. = **Net Tax Liability**

## Gross Income — Key Inclusions
Wages, salaries, tips, bonuses, alimony (pre-2019 divorces), business income, interest, dividends, rents, royalties, gambling winnings, prizes, awards.

## Key Exclusions from Gross Income
- Life insurance death proceeds
- Gifts and inheritances
- Municipal bond interest
- Up to **$250,000 ($500,000 MFJ)** home sale gain (§121; must own/use as principal residence 2 of 5 years)
- Workers' compensation
- Health insurance premiums paid by employer
- Meals and lodging on employer's premises for employer's convenience
- Qualified scholarship (tuition, fees, required books)

## Above-the-Line Deductions
- Alimony paid (pre-2019 divorce agreements only)
- Business expenses (self-employed)
- Half of self-employment tax
- Contributions to traditional IRA (if deductible)
- Student loan interest (up to $2,500; phased out at higher incomes)
- Health insurance premiums (self-employed)

## Itemized Deductions (Schedule A)
- **SALT**: state/local income or sales taxes + property taxes → **capped at $10,000**
- **Mortgage interest**: on up to $750,000 of acquisition debt ($1M for pre-2018 debt)
- **Charitable contributions**: cash up to 60% AGI; appreciated property up to 30% AGI
- **Medical expenses**: excess over **7.5% AGI**
- **Casualty losses**: only federally declared disasters; excess over $100 and 10% AGI

## §199A QBI Deduction
Non-corporate taxpayers may deduct up to **20% of qualified business income (QBI)** from pass-through entities.
- Subject to W-2 wages/capital limitations at higher income levels
- Specified service trades or businesses (SSTBs) have additional limitations`,

'reg-r3-m1': `# Entity Taxation

## C Corporation Tax Formula
Gross Income − Deductions = **Taxable Income** × 21% flat rate = Tax (post-TCJA)

Key C corp deductions:
- **Dividends Received Deduction (DRD)**: reduces double-taxation on inter-corporate dividends
  - ≥80% ownership: 100% DRD
  - 20–79% ownership: 65% DRD
  - <20% ownership: 50% DRD
- **Charitable contributions**: limited to **10% of taxable income** (before the deduction); excess carried forward 5 years
- Net operating loss: carryforward indefinitely (limited to 80% of taxable income)

## Partnership Taxation
Partnerships are **flow-through** entities — not taxed at entity level.
- Partners receive Schedule K-1 reporting their share of income, deductions, credits
- **Inside basis**: partnership's basis in assets
- **Outside basis**: partner's basis in partnership interest
  - Increases: contributions, income allocations, increase in partner's share of debt
  - Decreases: distributions, loss allocations, decrease in share of debt
- Losses deductible only to the extent of outside basis; excess suspended until basis restored

## S Corporation Rules
Eligibility:
- Max **100 shareholders** (certain family members count as 1)
- All shareholders must be **U.S. citizens or residents** (or certain trusts/estates)
- **One class of stock only** (voting vs. nonvoting OK; economic differences not OK)
- No corporate or partnership shareholders (except certain trusts and tax-exempt orgs)

Flow-through similar to partnerships: income, deductions, credits pass to shareholders via K-1.
**Basis**: shareholder's basis = stock basis + debt basis. Losses limited to combined basis.
**Built-in gains tax**: if former C corp converts to S corp and sells assets within 5 years at a gain, the gain recognized at the corporate level to the extent of built-in gain at conversion date.

## Consolidated Returns
C corporations (80%+ owned) may file consolidated return:
- Eliminate intercompany transactions
- Losses of one member offset income of another
- Separate return limitation year (SRLY) limits use of pre-affiliation losses`,

'reg-r4-m1': `# Property Transactions

## Realized vs. Recognized Gain or Loss
**Realized gain/loss** = Amount Realized − Adjusted Basis
- Amount Realized = Cash + FMV of property received + Debt relieved + Boot
- Adjusted Basis = Original cost + Capital improvements − Depreciation taken

**Recognized gain/loss** = amount included in taxable income. May differ from realized due to nonrecognition rules.

## Like-Kind Exchanges (§1031)
- **Nonrecognition** of gain/loss on exchange of **real property** for other real property used in business or investment (after TCJA, limited to real property only; personal property no longer qualifies)
- **Boot received** (cash or non-like-kind property): gain recognized up to the FMV of boot
- Loss: **never recognized** in a like-kind exchange (even if boot received)
- **Basis of new property** = Basis of old property − Boot received + Gain recognized

## Basis of Gifted Property
- **Gain basis** (if selling at a gain): donor's adjusted basis
- **Loss basis** (if selling at a loss): lower of donor's basis OR FMV on gift date
- Holding period: **tacks on** from donor (for gain property)

## Basis of Inherited Property
- **Stepped-up (or stepped-down) basis** = FMV at date of death
- Holding period: always **long-term**, regardless of how long actually held

## §1231 Netting
§1231 assets = depreciable property and real property **used in a trade or business** (held >1 year)
1. Net all §1231 gains and losses
2. **Net §1231 gain** → treated as **long-term capital gain** (preferential rates)
3. **Net §1231 loss** → treated as **ordinary loss** (deductible in full against ordinary income)
4. **§1231 lookback rule**: prior ordinary §1231 losses (within 5 years) convert current §1231 gain to ordinary income

## Depreciation Recapture
- **§1245** (personal property): Gain is ordinary income to the extent of total depreciation taken
- **§1250** (real property): Gain is ordinary income only to extent of **excess** depreciation (amount over straight-line); remaining gain is **unrecaptured §1250 gain** taxed at max 25% rate

## Installment Sale Reporting
Recognize gain as payments are received: **Gross Profit % = Gross Profit ÷ Contract Price**; apply to each payment received.
Cannot use for: dealer sales, sales of publicly traded stock, losses.`,

'reg-r5-m1': `# Business Law

## Contract Formation
**Essential elements**:
1. **Offer**: definite terms, communicated to offeree
2. **Acceptance**: unequivocal, mirror image of offer (common law); any reasonable manner (UCC)
3. **Consideration**: something of legal value given by each party; must be bargained-for exchange
4. **Legal capacity**: parties must be competent (not minors, intoxicated, or mentally incapacitated)
5. **Legal purpose**: contract cannot be for an illegal objective

## Statute of Frauds (Must Be in Writing)
Contracts that must be evidenced by a writing signed by the party to be charged:
- **M**arriage: contracts in consideration of marriage
- **Y**ear: contracts not performable within one year
- **L**and: contracts for the sale/lease of real property (leases >1 year)
- **E**xecutor/Administrator: promise to pay estate debts from personal funds
- **G**oods: sales of goods ≥$500 (UCC §2-201)
- **S**uretyship: promise to answer for another's debt

## UCC Article 2 — Sale of Goods
Applies to **transactions in goods** (movable, tangible personal property). Key differences from common law:
- **Battle of forms** (§2-207): acceptance with additional/different terms is valid; new terms become part of the contract between merchants unless the offer limits acceptance or materially alter
- **Firm offer**: merchant's signed written offer to buy/sell; irrevocable for stated period (up to 3 months) without consideration
- **Perfect tender rule**: buyer may reject goods that **fail in any respect** to conform to the contract; seller has right to **cure** in certain circumstances

## Agency
**Formation**: actual authority (express or implied), apparent authority (principal leads third party to believe agent has authority), ratification
**Principal's liability**: principal is liable for agent's torts within scope of employment (respondeat superior); liable for agent's authorized contracts
**Agent's duties**: loyalty, obedience, reasonable care, accounting, notification

## Secured Transactions (UCC Article 9)
**Attachment** (creates enforceable security interest in collateral): security agreement + value given + debtor has rights in collateral
**Perfection** (establishes priority against third parties): filing a financing statement (UCC-1) in appropriate state office; automatic for PMSIs in consumer goods

**Priority**: perfected > unperfected; first to file/perfect wins if multiple creditors; PMSI in inventory has special super-priority requirements

## Bankruptcy
**Chapter 7** (Liquidation): trustee sells non-exempt assets, distributes to creditors; debtor receives discharge
**Chapter 11** (Reorganization): debtor in possession proposes a plan; creditors vote; court confirms
**Chapter 13** (Individual repayment plan): individuals with regular income; keep property while repaying over 3–5 years`,

'reg-r6-m1': `# Ethics & Professional Responsibilities in Tax Practice

## AICPA Statements on Standards for Tax Services (SSTSs)
The SSTSs govern CPAs' conduct in tax engagements:

**SSTS No. 1 — Tax Return Positions**
A CPA may recommend a position if it has a **realistic possibility of success** if challenged (>1 in 3 chance). If not that strong, may still recommend if not frivolous AND disclosed on return. Never recommend a position known to be frivolous.

**SSTS No. 2 — Answers to Questions on Returns**
Make reasonable effort to obtain information to answer all questions. If unknown, explain why in the return.

**SSTS No. 3 — Certain Procedural Aspects**
CPA may rely on client-provided information without independent verification, but must apply reasonable judgment for obvious errors or inconsistencies.

**SSTS No. 4 — Use of Estimates**
Permitted when records are not available and the use of estimates is not prohibited. Disclose where required.

**SSTS No. 5 — Departure from a Position of a Prior Year**
No obligation to follow prior-year position if CPA concludes it was in error or circumstances have changed. Explain changes that may affect the client.

**SSTS No. 6 — Knowledge of Error**
If CPA learns of an error in a previously filed return: notify the client and recommend correction. CPA **cannot notify the IRS without client consent** (except disclosure required by law). If client refuses to correct a material error, CPA should consider withdrawing from the engagement.

## Due Diligence in Tax Practice
For EITC, CTC/ACTC, AOTC, and Head of Household claims: preparers must complete **Form 8867** (Due Diligence Checklist) and document that they made reasonable inquiries when information seems incorrect, inconsistent, or incomplete.

Penalty for failure to comply: **$600 per failure** per return (2024 amount, inflation-adjusted).

## Privileged Communications
Communications between a **tax practitioner and client** related to **civil tax matters** are privileged (not criminal matters, not state taxes). The privilege is similar to attorney-client privilege but narrower.

## Independence in Tax Engagements
Independence is **not required** for tax return preparation or tax planning services (only for attest engagements). However, the CPA must remain objective and must not subordinate professional judgment to client pressure.`,

// ═══════════════════════════════════════════════════════════════════════════
// BAR — B1–B5
// ═══════════════════════════════════════════════════════════════════════════

'bar-b1-m1': `# Financial Statement Analysis

## Liquidity Ratios (Short-term ability to pay)
| Ratio | Formula | Interpretation |
|---|---|---|
| **Current Ratio** | Current Assets ÷ Current Liabilities | >1 preferred; too high may signal idle assets |
| **Quick Ratio** | (Cash + S-T Investments + Net Receivables) ÷ Current Liabilities | Excludes inventory; stricter test |
| **Cash Ratio** | Cash + Cash Equivalents ÷ Current Liabilities | Most conservative |

## Solvency Ratios (Long-term ability to pay)
| Ratio | Formula |
|---|---|
| **Debt-to-Equity** | Total Debt ÷ Total Equity |
| **Debt-to-Assets** | Total Debt ÷ Total Assets |
| **Interest Coverage** | EBIT ÷ Interest Expense |
| **Times Interest Earned** | Operating Income ÷ Interest Expense |

## Profitability Ratios
| Ratio | Formula |
|---|---|
| **Gross Profit Margin** | Gross Profit ÷ Net Sales |
| **Operating Profit Margin** | Operating Income ÷ Net Sales |
| **Net Profit Margin** | Net Income ÷ Net Sales |
| **Return on Assets (ROA)** | Net Income ÷ Average Total Assets |
| **Return on Equity (ROE)** | Net Income ÷ Average Shareholders' Equity |

## DuPont Analysis
**ROE = Net Profit Margin × Asset Turnover × Equity Multiplier**
- Net Profit Margin = Net Income ÷ Sales (profitability)
- Asset Turnover = Sales ÷ Avg. Total Assets (efficiency)
- Equity Multiplier = Total Assets ÷ Avg. Equity (leverage)

DuPont reveals the **drivers** of ROE — helps identify whether improvements come from operations, asset efficiency, or financial leverage.

## Efficiency Ratios
| Ratio | Formula |
|---|---|
| **Inventory Turnover** | COGS ÷ Avg. Inventory |
| **Days in Inventory** | 365 ÷ Inventory Turnover |
| **Receivables Turnover** | Net Credit Sales ÷ Avg. Net Receivables |
| **Days in Receivables** | 365 ÷ Receivables Turnover |
| **Payables Turnover** | COGS ÷ Avg. Accounts Payable |

## Earnings Quality
- **Non-GAAP measures** (EBITDA, adjusted EPS): supplement but don't replace GAAP; analyze adjustments carefully
- **Accruals ratio**: high accruals relative to cash flow from operations may signal aggressive revenue recognition
- **Cash flow to net income ratio**: sustainable earnings should produce strong operating cash flows`,

'bar-b2-m1': `# Planning, Budgeting & Forecasting

## The Master Budget
The master budget integrates all departmental budgets:
1. **Sales Budget** → drives everything
2. **Production Budget** = Sales + Desired Ending Inventory − Beginning Inventory
3. **Direct Materials, Direct Labor, Overhead Budgets**
4. **SG&A Budget**
5. **Budgeted Income Statement**
6. **Cash Budget** → cash receipts − disbursements = ending cash
7. **Budgeted Balance Sheet**

## Flexible Budgets
A **flexible budget** adjusts the original (static) budget to **actual volume**, holding prices/rates constant.

**Flexible Budget Formula**: Y = F + V(X)
- Y = Total cost
- F = Fixed costs
- V = Variable cost per unit
- X = Actual volume

This allows separation of **price/rate variances** from **volume/efficiency variances**.

## Variance Analysis
**Direct Materials**:
- Price Variance = (Standard Price − Actual Price) × Actual Quantity Purchased
- Efficiency (Quantity) Variance = (Standard Qty for Actual Output − Actual Qty Used) × Standard Price

**Direct Labor**:
- Rate Variance = (Standard Rate − Actual Rate) × Actual Hours
- Efficiency Variance = (Standard Hours for Actual Output − Actual Hours) × Standard Rate

**Fixed Overhead**:
- Budget (Spending) Variance = Budgeted Fixed OH − Actual Fixed OH
- Volume Variance = (Actual Output − Budgeted Capacity) × Fixed OH Rate per Unit

## Capital Budgeting
**Net Present Value (NPV)**: PV of cash inflows − Initial investment. Accept if NPV > 0.

**Internal Rate of Return (IRR)**: discount rate where NPV = 0. Accept if IRR > cost of capital.

**Payback Period**: time to recover initial investment. Simple but ignores time value and cash flows beyond payback.

**Profitability Index (PI)**: PV of future cash flows ÷ Initial investment. Accept if PI > 1.

**NPV vs. IRR conflict**: prefer NPV for investment decisions — NPV assumes reinvestment at cost of capital (more realistic); IRR assumes reinvestment at IRR.`,

'bar-b3-m1': `# Performance Management

## The Balanced Scorecard
The balanced scorecard measures performance from **four perspectives**:
1. **Financial**: ROI, EVA, profit margin, revenue growth
2. **Customer**: customer satisfaction, retention, market share, NPS
3. **Internal Business Processes**: quality, cycle time, throughput, defect rate
4. **Learning & Growth**: employee training, innovation, information system capabilities

The scorecard translates **strategy into measurable objectives** and links them with cause-and-effect relationships.

## Economic Value Added (EVA)
**EVA = NOPAT − (WACC × Invested Capital)**
- NOPAT = Net Operating Profit After Tax
- WACC = Weighted Average Cost of Capital
- Invested Capital = Total assets − Non-interest-bearing current liabilities

EVA > 0 → company is creating value above its cost of capital
EVA < 0 → company is destroying value

## Responsibility Accounting
Managers are held responsible for costs/revenues/assets they **control**:
| Center | Accountable For |
|---|---|
| **Cost center** | Costs only |
| **Revenue center** | Revenues only |
| **Profit center** | Revenues and costs |
| **Investment center** | Revenues, costs, AND assets |

## Transfer Pricing
Prices charged when divisions of the same company transfer goods/services internally.
- **Market price**: preferred when an external market exists
- **Cost-based**: actual cost or standard cost (plus markup); may distort decisions
- **Negotiated**: between divisions; can be complex
- **Minimum transfer price**: Selling division's variable costs + opportunity cost of foregone contribution margin

## Activity-Based Costing (ABC)
Allocates **overhead to products** based on activities that drive costs, rather than a single volume-based driver.
- Identify activities (setups, inspections, purchasing orders)
- Assign costs to activities (activity cost pools)
- Calculate activity rates (pool cost ÷ activity driver)
- Apply to products based on actual driver consumption

ABC provides better information for **pricing, product mix, and profitability** decisions than traditional volume-based overhead allocation.`,

'bar-b4-m1': `# Advanced Reporting

## Business Combinations (ASC 805)
The **acquisition method** is required:
1. **Identify the acquirer** (entity obtaining control)
2. **Determine the acquisition date** (date control is obtained)
3. **Recognize and measure** identifiable assets acquired, liabilities assumed, and any NCI at **fair value**
4. **Recognize goodwill** or a **bargain purchase gain**

**Goodwill = Consideration Transferred + NCI FV + Previously Held Equity Interest − FV of Net Identifiable Assets**

**Bargain purchase**: when FV of net assets > consideration paid → recognize **gain** immediately in income.

Acquisition-related costs (legal, advisory): **expensed** as incurred (not capitalized).

## Consolidation
Line-by-line combination of parent and subsidiary. Key eliminating entries:
- Eliminate parent's investment account vs. subsidiary's equity
- Eliminate intercompany transactions (intercompany sales, loans, dividends)
- Eliminate unrealized profits on intercompany inventory transfers not yet sold to outsiders
- Noncontrolling interest (NCI): share of subsidiary's net assets and net income not owned by parent

## Variable Interest Entities (VIEs)
An entity is a VIE if:
- It lacks sufficient equity investment at risk, OR
- Equity holders lack key decision-making rights or the obligation to absorb losses/receive benefits

**Primary beneficiary** (who consolidates): the party with both: (1) power to direct activities most significantly affecting VIE's economic performance, and (2) obligation to absorb losses or right to receive benefits

## Equity Method Investments
Used for investments with **significant influence** (typically 20–50%).
- Investor records share of investee's net income (Dr Investment / Cr Investment Income)
- Dividends reduce the investment (Dr Cash / Cr Investment) — return of capital, not income
- Excess purchase price over book value: amortize the excess allocated to identifiable assets

## Foreign Currency in Consolidation
- **Functional currency = local currency**: translate using current rate method; translation adjustment → AOCI
- **Functional currency = USD**: remeasure using temporal method; gain/loss → net income`,

'bar-b5-m1': `# Government Accounting (BAR Discipline)

## GASB 34 Reporting Model
Governments must provide **two levels** of financial statements:
1. **Government-wide statements**: full accrual, economic resources focus — Statement of Net Position + Statement of Activities
2. **Fund financial statements**: modified accrual (governmental funds), accrual (proprietary/fiduciary) — multiple fund statements

**Reconciliation** between fund and government-wide statements is required.

## Statement of Activities — Net Cost Format
| Function | Expenses | Charges for Services | Grants | Net Cost |
|---|---|---|---|---|
| Public safety | $(5M) | $1M | $0.5M | $(3.5M) |
| Education | $(10M) | $0.5M | $2M | $(7.5M) |

General revenues (property taxes, sales taxes, unrestricted grants) fill the gap.

## Capital Assets
- Reported only in **government-wide** and **proprietary fund** statements, NOT in governmental fund statements
- Include infrastructure (roads, bridges, water systems)
- **Depreciation required** unless using the modified approach for infrastructure
- **Modified approach**: government commits to maintain and preserve infrastructure at a condition level; instead of depreciation, expense is the cost to maintain the established condition level

## Fund Balance Classifications (GASB 54)
1. Nonspendable (inventories, prepaid items, long-term receivables)
2. Restricted (externally imposed)
3. Committed (formally by highest decision-making authority)
4. Assigned (management's intent)
5. Unassigned (residual — general fund only can be positive)

## Budgetary Comparison Schedule
Required supplementary information (RSI) for the **general fund** and each major special revenue fund with a legally adopted budget. Shows:
- **Original budget**: adopted at beginning of year
- **Final amended budget**: after amendments
- **Actual results** on the budgetary basis (may differ from GAAP basis)`,

// ═══════════════════════════════════════════════════════════════════════════
// TCP — T1–T5
// ═══════════════════════════════════════════════════════════════════════════

'tcp-t1-m1': `# Individual Tax Compliance

## Filing Requirements
Gross income thresholds for 2024 (approximate; indexed annually):
- Single: $14,600 (standard deduction)
- MFJ: $29,200
- HOH: $21,900
- Self-employed: must file if net SE income ≥ **$400**

## Estimated Tax Payments
Required to **avoid underpayment penalty** if tax liability will be ≥$1,000 after withholding.

**Safe harbors** (no penalty if):
1. Pay at least **90%** of current year's tax through withholding/estimated payments, OR
2. Pay at least **100% of prior year's tax** (110% if prior year AGI > $150,000)

Due dates: April 15, June 15, September 15, January 15 of the following year.

## Self-Employment Tax
SE individuals pay both employer and employee portions of FICA:
- **SE tax rate**: 15.3% on net SE income up to Social Security wage base ($168,600 in 2024); 2.9% (Medicare) above that; plus 0.9% Additional Medicare Tax if wages + SE income > threshold
- **Deduction**: 50% of SE tax is deductible as an above-the-line adjustment

## Net Investment Income Tax (§1411)
3.8% surtax on the **lesser of**:
- Net investment income, OR
- Excess of MAGI over threshold ($200,000 single / $250,000 MFJ)

**Net investment income**: interest, dividends, capital gains, rents, royalties, passive activity income. Excludes active business income.

## Retirement Plan Distribution Rules
- **Traditional IRA/401(k)**: distributions included in ordinary income; 10% early withdrawal penalty if before age 59½ (exceptions: disability, death, substantially equal periodic payments, medical expenses >7.5% AGI, first-time home purchase up to $10,000 for IRA)
- **Required Minimum Distributions (RMDs)**: must begin by April 1 following the year the individual turns **73** (per SECURE 2.0); calculated using IRS Uniform Lifetime Table
- **Roth IRA**: qualified distributions tax-free; no RMDs during owner's lifetime`,

'tcp-t2-m1': `# Entity Tax Compliance

## C Corporation Filing
- **Form 1120**: due the **15th day of the 4th month** after year-end (April 15 for calendar-year corps)
- **Extension**: automatic 6-month extension (Form 7004)
- **Estimated payments**: due 15th day of 4th, 6th, 9th, and 12th months of the tax year
- Safe harbor: pay **100% of prior year's tax** OR 100% of current year's tax

## Partnership Filing
- **Form 1065**: due **15th day of the 3rd month** after year-end (March 15 for calendar-year partnerships)
- Partners receive **Schedule K-1** reporting their distributive share
- **No entity-level tax** (unless state-level entity tax)

## S Corporation Filing
- **Form 1120-S**: due **15th day of the 3rd month** after year-end (March 15)
- Shareholders receive **Schedule K-1**
- S corp **elections**: use Form 2553; must be filed by 15th day of the 3rd month of the tax year for the election to be effective for that year (or the previous year if certain requirements are met)

## Built-In Gains Tax (BIG)
If a C corp converts to S corp and has appreciated assets:
- **Recognition period**: 5 years after S election
- If built-in appreciated assets are sold within 5 years → gain taxed at **21% corporate rate** at S corp level
- Basis of built-in gain asset stepped up after BIG tax paid

## Estimated Tax — Corporations
**Required quarterly payments**: 25% × **lesser of**:
- 100% of current year's tax, OR
- 100% of prior year's tax (if prior year was a 12-month year with positive tax)
Large corporations (taxable income > $1M in any of prior 3 years): must base on current year; cannot use prior year safe harbor.

## Consolidated Return
- 80% owned subsidiaries can join consolidated return (Form 1120)
- Intercompany transactions deferred until sold outside the group
- **Separate Return Limitation Year (SRLY)**: limits use of losses generated before joining the group`,

'tcp-t3-m1': `# Tax Planning

## Entity Choice Planning
| Entity | Tax Rate | Self-Employment Tax | Double Tax? | Flexibility |
|---|---|---|---|---|
| **Sole Prop** | Individual rates | Yes (SE tax) | No | Simple |
| **Partnership** | Individual rates | Yes (on GP share) | No | Flexible |
| **S Corp** | Individual rates | Only on W-2 salary | No | Moderate |
| **C Corp** | 21% | No | Yes (dividends) | Most flexible |

**S corp advantage**: Owner takes a reasonable W-2 salary (subject to payroll taxes); remaining profit passed through without SE tax.

**C corp when beneficial**: When corporate rate (21%) < individual rate; when retaining earnings for investment; when planning eventual sale (§1202 QSBS exclusion).

## Roth Conversion Planning
Converting traditional IRA to Roth IRA triggers **ordinary income** in year of conversion. Beneficial when:
- Current marginal rate < expected future rate
- Can pay conversion tax from outside funds (keep the IRA intact)
- Won't need the funds soon (Roth 5-year rule)
- Estate planning: no RMDs from Roth IRAs during owner's lifetime

## Charitable Giving Strategies
- **Cash donations**: deduct up to 60% AGI
- **Appreciated stock donation**: deduct FMV; avoid capital gains tax (30% AGI limit)
- **Donor-Advised Fund (DAF)**: bunch multiple years of giving in one year for itemizing; distribute to charities over time
- **Charitable Remainder Trust (CRT)**: donor receives income stream; remainder to charity; immediate partial charitable deduction
- **Qualified Charitable Distribution (QCD)**: IRA owners ≥70½ can direct up to $105,000 (2024) from IRA directly to charity — excluded from gross income AND satisfies RMD

## Estate and Gift Tax Planning
- **Annual exclusion**: $18,000 per donee (2024); no gift tax return required
- **Lifetime exemption**: $13.61M (2024); shared with estate tax exemption
- **Portability**: unused exemption of deceased spouse transfers to surviving spouse
- **Step-up in basis at death**: heirs receive FMV basis — avoids capital gains on appreciation during decedent's lifetime`,

'tcp-t4-m1': `# Property Transaction Planning

## §1031 Like-Kind Exchange — Planning Opportunities
Post-TCJA: only **real property** used in trade/business or investment qualifies.

**Key planning points**:
- Defer gain by exchanging into qualifying replacement property
- **45-day identification rule**: must identify replacement property within 45 days of transferring relinquished property
- **180-day exchange rule**: must receive replacement property within 180 days (or tax return due date if earlier)
- **Boot reduces deferral**: receiving cash or non-like-kind property = recognizing gain up to boot received
- **Qualified intermediary (QI)**: required for deferred exchanges; taxpayer cannot constructively receive proceeds

**Basis of replacement property** = Adjusted basis of old property − Boot received + Gain recognized + Liabilities assumed

## Installment Sale Planning
Report gain in proportion to cash received each year: **Gross Profit % = Gross Profit ÷ Contract Price**

**Benefits**: defer gain to future years; spread tax liability
**Risks**: depreciable recapture (§1245/§1250) recognized in **year of sale** regardless; if buyer defaults, remaining basis is lost

## §179 and Bonus Depreciation
- **§179**: immediate expensing up to $1,160,000 (2023) of qualifying property; phases out when total property placed in service > $2.89M; limited to taxable income from active trade/business (no loss creation)
- **Bonus depreciation**: 60% (2024) of eligible property; allows losses; phases down 20% per year until eliminated in 2027 (unless extended)
- **Interaction**: apply §179 first, then bonus depreciation on the remainder

## Qualified Opportunity Zone (QOZ) Investments
Invest **capital gains** in a Qualified Opportunity Fund:
- **Tax deferral**: original gain deferred until 12/31/2026 or earlier sale of QOF interest
- **Basis step-up**: 10-year hold → basis stepped up to FMV of QOF investment (all appreciation in QOF excluded from income)
- Investments must be made within **180 days** of the original sale generating the gain`,

'tcp-t5-m1': `# Advanced Tax Topics

## International Tax — Key Concepts
**Foreign Earned Income Exclusion (§911)**: U.S. citizens/residents abroad may exclude up to $126,500 (2024) of foreign earned income if they meet the bona fide residence or physical presence test.

**Foreign Tax Credit (§901)**: credit for income taxes paid to foreign countries; avoids double taxation. Limited to: U.S. tax × (Foreign source income ÷ Total income).

**Subpart F (§951)**: U.S. shareholders (10%+) of Controlled Foreign Corporations (CFCs) must include certain "tainted" income (passive income, related-party sales) in current gross income even if not distributed.

**GILTI**: Global Intangible Low-Taxed Income; U.S. shareholders of CFCs include excess returns in income annually.

## §1202 — Qualified Small Business Stock (QSBS)
Noncorporate taxpayers may **exclude up to 100%** of gain on the sale of QSBS if:
- C corporation with gross assets ≤$50M at time of issuance
- Stock acquired at original issuance for money, property, or services
- Held for more than **5 years**
- Active business in qualified trade or business (not services, finance, hospitality)
- Per-issuer exclusion limit: greater of $10M or 10× adjusted basis

## Generation-Skipping Transfer (GST) Tax
Flat tax equal to the **highest estate tax rate (40%)** imposed on transfers to "skip persons" (grandchildren and beyond). GST exemption = same as estate/gift lifetime exemption ($13.61M in 2024). Applies to direct skips, taxable terminations, and taxable distributions.

## Trust Taxation
- **Grantor trust**: income taxed to the **grantor** (not the trust), regardless of who receives distributions
- **Simple trust**: must distribute all income; gets distribution deduction; beneficiaries taxed on DNI
- **Complex trust**: may accumulate income; taxed on undistributed income
- **Distributable Net Income (DNI)**: limits the trust's deduction for distributions and the beneficiary's inclusion
- Trusts reach highest marginal rate at very low income levels (~$14,450 in 2024)

## Stock Compensation Tax Planning
- **ISOs**: no AMT adjustment at exercise (but ISO spread is AMT preference item); capital gain on sale if holding requirements met (2 years from grant, 1 year from exercise)
- **NSOs**: ordinary income at exercise on spread; employer gets deduction
- **RSUs**: ordinary income when vested (FMV at vesting); W-2 withholding required`,

// ═══════════════════════════════════════════════════════════════════════════
// ISC — I1–I4
// ═══════════════════════════════════════════════════════════════════════════

'isc-i1-m1': `# Information Systems

## IT Governance Frameworks

**COBIT** (Control Objectives for Information and Related Technologies): the primary IT governance framework for the CPA exam.
- Aligns IT goals with business strategy
- Five key domains: Evaluate-Direct-Monitor (EDM), Align-Plan-Organize (APO), Build-Acquire-Implement (BAI), Deliver-Service-Support (DSS), Monitor-Evaluate-Assess (MEA)
- Focus: **governance and management** of enterprise IT

**ITIL**: IT service management framework; focuses on service delivery lifecycle (Strategy, Design, Transition, Operation, Continual Improvement)

## Systems Development Life Cycle (SDLC)
Standard phases:
1. **Planning**: define scope, feasibility, resource requirements
2. **Analysis**: gather requirements; document what the system must do
3. **Design**: create system architecture, database schema, user interfaces
4. **Development (Implementation)**: code the system
5. **Testing**: unit, integration, system, and user acceptance testing
6. **Deployment**: migrate to production; train users
7. **Maintenance**: ongoing updates, bug fixes, enhancements

Key control: ensure **user acceptance testing** is completed and approved before deployment; maintain separation between developers and production environment.

## IT General Controls (ITGCs)
Pervasive controls that support the overall reliability of IT systems:
- **Access controls**: user IDs, passwords, multi-factor authentication, role-based access, least privilege principle
- **Change management**: formal procedures for requesting, testing, approving, and implementing system changes; maintain audit trail
- **Computer operations**: backup and recovery procedures, job scheduling, system monitoring
- **Program development**: SDLC controls above; separate development from production

## Application Controls
Transaction-level controls within specific applications:
- **Input controls**: field validation, format checks, range checks, duplicate detection
- **Processing controls**: batch totals, run-to-run totals, reconciliations
- **Output controls**: report distribution controls, output reconciliation

## Enterprise Resource Planning (ERP) Systems
Integrated software platforms (SAP, Oracle) that consolidate business processes in a single system.
- **Risk**: single point of failure; incorrect configuration affects all modules simultaneously
- **Benefit**: real-time data, reduced redundancy, integrated reporting
- Auditors must understand the ERP's module structure and test ITGCs in that environment`,

'isc-i2-m1': `# Data Management

## Data Classification
Classifying data by **sensitivity and criticality** guides access controls and protection:
| Level | Examples | Controls |
|---|---|---|
| **Public** | Press releases, published reports | Minimal |
| **Internal** | Policies, employee directories | Standard access controls |
| **Confidential** | Financial data, contracts | Restricted access, encryption |
| **Restricted/Secret** | Trade secrets, PII, PHI | Strict controls, encryption, audit logs |

## Data Governance
A framework of policies, processes, and roles to ensure data is accurate, available, and secure.
Key roles:
- **Data Owner**: business unit responsible for the data; determines access rights
- **Data Steward**: operational management of data quality
- **Data Custodian**: IT team responsible for technical storage and protection

## Database Management Systems (DBMS)
- **Relational databases** (SQL): structured data in tables with defined relationships; ACID properties (Atomicity, Consistency, Isolation, Durability)
- **NoSQL**: flexible schema for unstructured/semi-structured data (documents, graphs, key-value)
- **Data warehouse**: repository of historical data from multiple sources; optimized for query/reporting (OLAP vs. OLTP)

## Data Integrity Controls
- **Completeness**: all records processed; use batch totals and record counts
- **Accuracy**: data entered correctly; use validation rules, checksums
- **Consistency**: data is consistent across systems; master data management (MDM)
- **Timeliness**: data is available when needed

## Data Analytics in Financial Reporting
CPAs increasingly use data analytics tools:
- **Descriptive**: summarize what happened (dashboards, pivot tables)
- **Diagnostic**: why did it happen (variance analysis, drill-down)
- **Predictive**: what is likely to happen (regression, forecasting models)
- **Prescriptive**: what should be done (optimization models)

Continuous auditing and monitoring use data analytics to detect anomalies in **real time** rather than at year-end.`,

'isc-i3-m1': `# Cybersecurity

## NIST Cybersecurity Framework (CSF)
Five core functions:
1. **Identify**: understand assets, risks, and governance (asset inventory, risk assessment)
2. **Protect**: implement safeguards (access control, training, data security, maintenance)
3. **Detect**: identify cybersecurity events (anomaly detection, monitoring, log review)
4. **Respond**: contain and eradicate threats (incident response plan, communications)
5. **Recover**: restore capabilities and services (recovery planning, improvements)

## Network Security Fundamentals
- **Firewall**: filters traffic between networks based on rules; perimeter defense
- **DMZ** (Demilitarized Zone): intermediate network zone for public-facing servers (web, email)
- **Intrusion Detection System (IDS)**: monitors for malicious activity; alerts only
- **Intrusion Prevention System (IPS)**: monitors and **actively blocks** threats
- **VPN**: encrypts traffic over public networks; provides secure remote access
- **Encryption**: TLS/SSL for data in transit; AES for data at rest

## Common Threats
- **Phishing**: deceptive emails to steal credentials or install malware; spear phishing = targeted
- **Ransomware**: encrypts files and demands ransom; spread via email attachments or vulnerabilities
- **Social engineering**: manipulating people to divulge information or grant access
- **SQL injection**: inserting malicious code into database queries via input fields
- **Man-in-the-middle**: intercepting communications between two parties

## Incident Response
Phases (NIST 800-61):
1. **Preparation**: develop and train on IR plan; establish team (CSIRT)
2. **Detection & Analysis**: identify the incident; determine scope
3. **Containment**: isolate affected systems; prevent spread
4. **Eradication**: remove malicious code; close vulnerability
5. **Recovery**: restore systems from clean backups; monitor
6. **Post-Incident**: lessons learned; improve controls

## Business Continuity and Disaster Recovery
- **BCP** (Business Continuity Plan): keeps critical functions operating during disruption
- **DRP** (Disaster Recovery Plan): restores IT systems after a disaster
- **RTO** (Recovery Time Objective): maximum acceptable downtime
- **RPO** (Recovery Point Objective): maximum acceptable data loss (measured in time)
- **Backup types**: full (all data), incremental (since last backup), differential (since last full backup)`,

'isc-i4-m1': `# Governance, Risk & Controls

## COSO ERM Framework (Enterprise Risk Management)
The 2017 COSO ERM framework has **five components** and **20 principles**:
1. **Governance and Culture**: board oversight, risk culture, core values
2. **Strategy and Objective-Setting**: strategic planning with risk in mind
3. **Performance**: identify, assess, prioritize, and respond to risks
4. **Review and Revision**: monitor ERM practices and results
5. **Information, Communication, and Reporting**: support ERM at all levels

Compare to **COSO Internal Control Framework** (5 components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring). ERM is broader — it addresses **strategy** and **portfolio** risk, not just internal controls.

## IT Risk Assessment
Key steps:
1. **Asset identification**: catalog IT assets (hardware, software, data, systems)
2. **Threat identification**: identify potential threats (hackers, natural disasters, human error)
3. **Vulnerability assessment**: identify weaknesses that could be exploited
4. **Risk rating**: Risk = Likelihood × Impact (quantitative or qualitative)
5. **Risk response**: avoid, accept, reduce, or transfer (insurance) the risk

## SOC Reports
| Report | Purpose | Users | Standard |
|---|---|---|---|
| **SOC 1** | Controls at service org relevant to user entities' ICFR | User entities and their auditors | AT-C 320 |
| **SOC 2** | Controls related to Trust Service Criteria | Management, regulators, business partners | AT-C 105 |
| **SOC 3** | Same as SOC 2 but available to the public | General public | AT-C 105 |

**Type I**: controls are suitably designed as of a **point in time**
**Type II**: controls are suitably designed AND operating effectively over a **period of time** (more assurance)

## Segregation of Duties in IT
Separate:
- **Application development** from production environment access
- **IT operations** from security administration
- **Security administration** from end users
- **Change management** from system developers (who request changes shouldn't approve them)

## Privacy Regulations
- **GDPR**: EU regulation; applies to any organization processing EU residents' data; consent required; right to erasure; fines up to 4% of global annual revenue
- **CCPA**: California law; consumers have right to know, delete, and opt out of sale of personal information; applies to businesses meeting size/revenue thresholds`,

};
