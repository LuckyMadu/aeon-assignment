# AEON Bank Mobile Application

> A React Native mobile banking application built for the **AEON Bank Mobile Engineer Assessment**. Enables digital banking customers to inspect incoming and outgoing transactions, view transaction details, and share official transfer receipts externally.

---

## 📱 Table of Contents
- [Features Overview](#-features-overview)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [Key Engineering Decisions & Trade-offs](#-key-engineering-decisions--trade-offs)
- [Requirements Traceability Matrix](#-requirements-traceability-matrix)
- [Prerequisites & Quickstart](#-prerequisites--quickstart)
- [Running Automated Verification & Tests](#-running-automated-verification--tests)
- [Git Commit History](#-git-commit-history)

---

## 🚀 Features Overview

### 1. Latest Transactions Feed
- **High-Performance Virtualization**: Powered by `@shopify/flash-list` for smooth 60–120 FPS cell recycling.
- **Credit vs. Debit Visual Semantics**: 
  - Incoming funds (+ / Emerald Green) for salary, profits, and bonuses.
  - Outgoing payments (- / Slate-Rose) for transfers, refunds, and utility bills.
- **Account Overview Balance Card**: Live summary of Available Balance, Total Inflow (Credits), and Total Outflow (Debits).
- **Instant Search & Multi-criteria Filtering**:
  - Filter chips: `All`, `Money In (Credits)`, and `Money Out (Debits)` with live counts.
  - Case-insensitive search matching recipient name, transfer purpose, or reference ID.
- **Pull-to-Refresh & Graceful States**: Built-in network latency simulation, empty state when queries yield no results, and error recovery banners.

### 2. Transaction Details & Digital Receipt
- **Official AEON Bank Receipt Layout**: Structured like an authentic Islamic digital bank statement.
- **Complete Transaction Metadata**: Prominently displays Reference ID (`refId`), Date & Time, Recipient Name, Amount, Purpose (`transferName`), Payment Channel, and Status.
- **1-Tap Reference ID Copy**: Copies the reference ID with instantaneous visual feedback.
- **External Sharing**: Integrated with native `Share.share` API to export structured receipts to WhatsApp, Telegram, Mail, or Notes.

---

## 🏗 Architecture & Directory Structure

The project adopts a modular, domain-driven structure with strict separation of concerns:

```
src/
├── app/                  # Application root, theme configurations, providers
│   ├── App.tsx
│   └── theme.ts
├── navigation/           # React Navigation stack with typed route definitions
│   └── RootNavigator.tsx
├── design-system/        # AEON brand design system
│   ├── tokens/           # Colors (AEON Magenta), Spacing scale, Typography, Radii
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── radii.ts
│   └── ui/               # Atomic reusable primitives
│       ├── Text.tsx      # Tabular numeral-supported typography
│       ├── Surface.tsx   # Card and container surfaces
│       ├── Button.tsx    # Accessible primary/secondary action buttons
│       ├── Chip.tsx      # Filter pills
│       ├── SearchField.tsx
│       ├── Badge.tsx
│       └── IconButton.tsx
├── types/                # Strict domain contracts and DTOs
│   ├── transaction.ts    # DTOs, Transaction model, Filter types
│   └── navigation.ts     # RootStackParamList & screen prop bindings
├── services/             # Networking and data normalizers
│   ├── api.ts            # Banking API client with network delay simulation
│   ├── mockData.ts       # Exact assessment BE response + realistic banking cases
│   └── transactionNormalizer.ts
├── store/                # Zustand state management
│   └── useTransactionStore.ts # Centralized store for transactions, filters, metrics
├── utils/                # Pure formatting and share helpers
│   ├── currencyFormatter.ts # Malaysian Ringgit (RM/MYR) formatting with sign logic
│   ├── dateFormatter.ts     # UTC ISO parsing to local date/time
│   └── shareReceipt.ts      # Native share sheet receipt payload builder
├── components/           # Shared UI components (TopAppBar, CategoryIcon, EmptyState)
└── features/             # Feature slices
    ├── transactions/
    │   ├── screens/TransactionsListScreen.tsx
    │   └── components/
    │       ├── BalanceCard.tsx
    │       ├── FilterBar.tsx
    │       └── TransactionRow.tsx
    └── transaction-detail/
        ├── screens/TransactionDetailScreen.tsx
        └── components/
            ├── DetailItem.tsx
            └── ReceiptHero.tsx
```

---

## 💡 Key Engineering Decisions & Trade-offs

### 1. State Management: Zustand (Explicit Bonus)
* **Rationale**: The assessment specifically notes: *"using Zustand would be a bonus as well"*. 
* **Advantage**: Compared to Redux Toolkit, Zustand requires zero boilerplate, eliminates reducer boilerplate, and leverages selector-based subscriptions to prevent unnecessary component re-renders.

### 2. High-Performance Virtualization: `@shopify/flash-list`
* **Rationale**: React Native's standard `FlatList` can encounter blank cell flashing during rapid scrolling. FlashList recycles native cell views, delivering steady 60–120 FPS performance on transaction ledgers.

### 3. Banking Security: In-Memory State vs. Plain `AsyncStorage`
* **Rationale**: In real-world digital banking apps (regulated by Bank Negara Malaysia / PCI-DSS compliance), financial transaction ledgers and live balances are **never persisted unencrypted in client-side storage**. 
* **Implementation**: Transaction data is session-bound in memory via Zustand and retrieved via secure API simulation, mirroring actual banking security standards.

### 4. Tabular Numbers (`tabular-nums`)
* **Rationale**: Monospaced tabular digits ensure that ticking numbers or varying currency values never cause horizontal layout shifts.

---

## 📋 Requirements Traceability Matrix

| Requirement from Assessment PDF | Component / Module | Test Coverage |
| :--- | :--- | :--- |
| **Incoming & Outgoing Transactions** | `src/features/transactions/components/BalanceCard.tsx` | `useTransactionStore.test.ts` |
| **Transfer Details (Name, Party)** | `src/features/transactions/components/TransactionRow.tsx` | `transactionNormalizer.test.ts` |
| **Date of Transfer (UTC)** | `src/utils/dateFormatter.ts` | `dateFormatter.test.ts` |
| **Amount of Transfer (Currency, Sign)**| `src/utils/currencyFormatter.ts` | `currencyFormatter.test.ts` |
| **Navigate to Detail Screen on Click** | `src/features/transactions/screens/TransactionsListScreen.tsx` | Type-checked via `RootStackParamList` |
| **Detail: Reference ID (`refId`)** | `src/features/transaction-detail/components/DetailItem.tsx` | Verified on Detail screen |
| **Detail: Recipient Name & Date** | `src/features/transaction-detail/components/DetailItem.tsx` | Verified on Detail screen |
| **Detail: Transfer Amount & Status** | `src/features/transaction-detail/components/ReceiptHero.tsx` | `currencyFormatter.test.ts` |
| **External Sharing to Medium of Choice** | `src/utils/shareReceipt.ts` | `shareReceipt.test.ts` |
| **Exact BE Response Support** | `src/services/mockData.ts` & `api.ts` | `transactionNormalizer.test.ts` |
| **Clean Commits & Order of Work** | Git Commit History | Verified via Conventional Commits |

---

## 🛠 Prerequisites & Quickstart

### Prerequisites
- **Node.js**: >= 22.11.0 (Tested on Node v24)
- **Package Manager**: `npm`
- **Ruby & CocoaPods** (for iOS only)
- **Android Studio / Xcode** with configured emulator or physical device

### Installation
```bash
# 1. Clone repository
git clone <repository-url>
cd aeon-assignment

# 2. Install JavaScript dependencies
npm install

# 3. iOS Setup (macOS only)
cd ios && bundle exec pod install && cd ..
```

### Running on Simulator / Device
```bash
# Start Metro bundler
npm start

# In a separate terminal:
npm run android   # Run on connected Android device/emulator
# or
npm run ios       # Run on iOS simulator
```

---

## 🧪 Running Automated Verification & Tests

To execute full static analysis, typechecking, and the Jest test suite in one command:

```bash
npm run verify
```

Or execute individually:
```bash
npm run lint         # ESLint (0 errors, 0 warnings)
npm run typecheck    # TypeScript compiler check (0 errors)
npm test             # Jest unit test suite (20/20 passing)
```

### Test Suite Summary
```text
 PASS  src/utils/__tests__/currencyFormatter.test.ts
 PASS  src/services/__tests__/transactionNormalizer.test.ts
 PASS  src/utils/__tests__/dateFormatter.test.ts
 PASS  src/utils/__tests__/shareReceipt.test.ts
 PASS  src/store/__tests__/useTransactionStore.test.ts

Test Suites: 5 passed, 5 total
Tests:       20 passed, 20 total
Snapshots:   0 total
```

---

## 📜 Git Commit History

The repository follows semantic Conventional Commits to clearly document the candidate's engineering thought process:

1. `feat(project): initialize React Native 0.86 TypeScript project with FlashList and Zustand`
2. `feat(design-system): implement AEON Bank brand design tokens and atomic primitives`
3. `feat(types): define transaction domain models, DTOs, and navigation contracts`
4. `feat(services): implement mock banking API service with network simulation and normalizer`
5. `feat(utils): add currency formatting, date formatting, and share sheet utilities`
6. `feat(store): implement Zustand transaction store with search, filters, and metrics`
7. `feat(components): implement TopAppBar, CategoryIcon, EmptyState, and ErrorBanner`
8. `feat(features): implement TransactionsListScreen with FlashList and TransactionDetailScreen with Share`
9. `feat(navigation): configure typed Native Stack Navigator with AEON banking theme`
10. `test: add comprehensive unit test suite for formatters, services, and Zustand store`
11. `docs: add comprehensive README with architecture, setup instructions, and design trade-offs`

---

*Built with precision for the AEON Bank Engineering Team.*
