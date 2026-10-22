import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** Flat config ESLint 10 + eslint-config-next 16. */
const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "out/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
