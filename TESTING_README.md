# 🔹 Core Testing

`jest` → the test runner itself (executes tests).

`jest-environment-jsdom` → simulates a browser environment (React components need document, window).

# 🔹 React Testing Library

`@testing-library/react` → helpers to render and query React components in tests.

`@testing-library/jest-dom` → adds nice matchers like .toBeInTheDocument(), .toHaveTextContent().

`@testing-library/user-event` → simulates real user interactions (click, type, tab).

# 🔹 TypeScript Support

`ts-jest` → compiles TypeScript on the fly so Jest can run .ts/.tsx files.

`@types/jest` → TypeScript type definitions for Jest globals (test, expect, etc).

✅ So really, you’re only installing 3 main tools:

- Jest (runner)
- React Testing Library (testing React components)
- TypeScript support for Jest

The rest are helpers to make them work together smoothly.
