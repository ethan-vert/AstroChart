# Build Instructions for React Native Fork

## Building the Library

### 1. Install Dependencies

```bash
npm install
```

### 2. Build TypeScript

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions
- Output to `dist/` directory

### 3. Test

```bash
npm test
```

## Using in Your Project

### Option 1: Install from npm (when published)

```bash
npm install @astrodraw/astrochart-rn react-native-svg
```

### Option 2: Local Development

1. In this repository:
```bash
npm run build
npm link
```

2. In your React Native project:
```bash
npm link @astrodraw/astrochart-rn
npm install react-native-svg
```

### Option 3: Direct File Copy

Copy the `dist/` folder to your project and import directly.

## Publishing to npm

To publish this fork to npm:

```bash
# 1. Update version in package.json
# 2. Build
npm run build

# 3. Login to npm
npm login

# 4. Publish
npm publish --access public
```

## TypeScript Configuration

The fork maintains the same TypeScript configuration as the original:

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Webpack Configuration

The webpack build bundles everything into a single file for browser compatibility:

```bash
npm run build
```

Output: `dist/astrochart.js`

## Development Workflow

1. Make changes to TypeScript files in `project/src/`
2. Run `npm run build` or `npm run build:w` (watch mode)
3. Test changes with `npm test`
4. Check type definitions in `dist/project/src/`

## React Native Integration

The library is designed to be used as a dependency in React Native projects:

```javascript
// Your React Native app
import { Chart, createDocument } from '@astrodraw/astrochart-rn';
import Svg from 'react-native-svg';
```

Make sure your React Native project has:
- `react-native-svg` installed
- Metro bundler configured to transpile the package (usually automatic)

## Troubleshooting

### "Cannot find module" errors

Make sure you've built the library:
```bash
npm run build
```

### Type errors in your project

Regenerate type definitions:
```bash
npm run build
```

### Tests failing

The original test suite should still pass. If tests fail:
1. Check that all `document` calls are replaced with `this.document`
2. Verify `ElementWrapper` is used instead of `Element`
3. Check that `getEmptyWrapper` gets the `doc` parameter

### React Native runtime errors

Common issues:
1. Missing `react-native-svg` dependency
2. Not calling `createDocument()` before creating Chart
3. Trying to use browser-only features

## File Structure

```
AstroChart/
├── project/
│   ├── src/
│   │   ├── svg-factory.ts     # NEW: Abstraction layer
│   │   ├── svg.ts              # MODIFIED: Uses abstraction
│   │   ├── chart.ts            # MODIFIED: Accepts DocumentWrapper
│   │   ├── radix.ts            # MODIFIED: Uses abstraction
│   │   ├── transit.ts          # MODIFIED: Uses abstraction
│   │   ├── utils.ts            # MODIFIED: Works with ElementWrapper
│   │   ├── index.ts            # MODIFIED: Exports new utilities
│   │   └── ...                 # Other files unchanged
│   └── __tests__/              # Test files
├── dist/                       # Built output (generated)
├── package.json                # MODIFIED: Updated package name
├── tsconfig.json              # TypeScript config
├── webpack.config.js          # Webpack config
├── REACT_NATIVE_USAGE.md      # NEW: Usage guide
├── REACT_NATIVE_EXAMPLE.tsx   # NEW: Example component
├── FORK_README.md             # NEW: Fork documentation
└── BUILD_INSTRUCTIONS.md      # NEW: This file
```

## Git Workflow

If you want to maintain this as a fork:

```bash
# Add original as upstream
git remote add upstream https://github.com/AstroDraw/AstroChart.git

# Fetch updates from original
git fetch upstream

# Merge updates (resolve conflicts in modified files)
git merge upstream/main

# Rebuild after merging
npm run build
npm test
```

## Continuous Integration

The fork maintains the same CI/CD setup as the original. Make sure all tests pass before publishing:

```bash
npm test
npm run build
npm run lint
```

## Questions?

For build issues specific to the React Native fork, check:
1. This BUILD_INSTRUCTIONS.md
2. The original README.md for base build instructions
3. REACT_NATIVE_USAGE.md for usage questions

