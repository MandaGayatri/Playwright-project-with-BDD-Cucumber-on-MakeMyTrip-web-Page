Automated end-to-end testing of MakeMyTrip flight booking flow using Playwright with Cucumber BDD and TypeScript. The framework follows Page Object Model design, supports data-driven tests via Scenario Outlines, and captures screenshots and video recordings on failure for easy debugging.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright | Browser automation |
| Cucumber BDD | Gherkin feature files & step definitions |
| TypeScript | Type-safe test code |
| ts-node | TypeScript execution for Cucumber |
| Multiple Cucumber HTML Reporter | Test reporting |
| cross-env | Environment variable management |

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root (already gitignored):

```env
HEADED=false
BASE_URL=https://www.makemytrip.com
SLOW_MO=0
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run test:headed` | Run tests in headed (visible) mode |
| `npm run test:smoke` | Run only `@smoke` tagged scenarios |
| `npm run test:tag -- @e2e` | Run scenarios with a specific tag |

## Test Reporting

```bash
npm run report
```

Generated reports are available in the `reports/` directory (HTML & JSON).

## Project Structure

```
├── src/
│   ├── features/            # Gherkin .feature files
│   │   └── makeMyTrip.feature
│   ├── step-definitions/    # Step definition implementations
│   │   └── makeMyTrip.steps.ts
│   ├── pages/               # Page Object Models
│   │   ├── MethodsPage.ts
│   │   └── locators/
│   │       └── PagesXpaths.ts
│   └── hooks/               # Cucumber hooks (Before/After)
│       └── hooks.ts
├── reports/                 # Test reports (gitignored)
├── screenshots/             # Failure screenshots (gitignored)
├── videos/                  # Test recordings (gitignored)
├── cucumber.js              # Cucumber configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Test Scenarios

### Flight Booking (`@e2e @makemytrip @smoke`)

1. Navigate to MakeMyTrip homepage
2. Select departure (origin) location
3. Select arrival (destination) location
4. Choose departure date
5. Search for flights
6. Apply student fare type
7. Filter non-stop flights
8. Switch to regular fare if student fares unavailable
9. View prices & book the first available flight
10. Fill passenger details (first name & last name)

Data-driven via Cucumber Scenario Outline — easy to add more city/name combinations.

## Reporting

On test failure, the framework automatically captures:
- **Screenshots** — saved per step in `screenshots/`
- **Video recordings** — saved in `videos/`
- **Console logs** — video path logged for failed scenarios
