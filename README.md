# rspack-stylex-hmr-bug

## Description

This project demonstrates a bug related to StyleX and Hot Module Replacement (HMR) in Rspack during development.

Specifically, when a compilation error occurs in `src/App.tsx` (e.g., mismatched JSX tags) while running in development mode (`yarn dev:rspack`), the PostCSS styles extracted by StyleX become stuck on the error-ridden version.  Even after fixing the error in `src/App.tsx` or deleting the entire file, the problem persists. The only way to trigger a successful re-compilation of the StyleX styles is to modify `src/style.css`.

## Steps to Reproduce

1.  Clone the repository.
2.  Install dependencies using `yarn` or `pnpm`.
3.  Run the development server: `yarn dev:rspack` or `pnpm dev:rspack`.
4.  Introduce a compilation error in `src/App.tsx` (e.g., add an unmatched opening or closing JSX tag).
5.  Observe the resulting error in the browser and/or terminal.  Note the StyleX-generated CSS reflects the error.
6.  Fix the `src/App.tsx` file.
7.  Observe that the browser continues to shows the error from the faulty `src/App.tsx` file via the Stylex-generated CSS.
8.  Modify `src/style.css` (e.g., add a whitespace, comment out a line, or change a style property).
9.  Observe that the browser finally re-compiles with the correct StyleX styles.

## Project Setup

To start the development server:

```bash
yarn/pnpm dev:rspack
```
