# AstroChart React Native Fork 🍆💦

This is a React Native compatible fork of [AstroChart](https://github.com/AstroDraw/AstroChart) that eliminates all dependencies on browser DOM APIs, making it usable in React Native, Node.js, and any JavaScript environment.

## 🎯 What Changed?

### Core Changes

1. **SVG Abstraction Layer** (`svg-factory.ts`)
   - Replaced all `document.createElementNS()` calls with a factory pattern
   - Created `ElementWrapper` and `DocumentWrapper` classes that mimic DOM APIs
   - SVG elements are now data structures, not real DOM nodes
   - Works in any JavaScript environment (browser, Node.js, React Native)

2. **Updated All Classes**
   - `SVG` class: Now accepts optional `DocumentWrapper` parameter
   - `Chart` class: Creates headless document when no DOM is available
   - `Radix` class: Uses document wrapper for all element creation
   - `Transit` class: Uses document wrapper for all element creation
   - `utils.ts`: Updated to work with `ElementWrapper` instead of DOM `Element`

3. **New Exports**
   - `createDocument()`: Creates a headless document wrapper
   - `getSVGTree()`: Extracts the SVG element tree as a plain object
   - `toReactNativeSVG()`: Converts SVG tree to React Native JSX (string)
   - TypeScript types for all new APIs

### Backward Compatibility

✅ **Fully backward compatible** with the original AstroChart API!

The library still works in browsers exactly as before. When no `DocumentWrapper` is provided, it falls back to using the global `document` object.

## 📦 Installation

```bash
npm install @astrodraw/astrochart-rn react-native-svg
```

## 🚀 Quick Start

### React Native

```typescript
import { Chart, createDocument, getSVGTree } from '@astrodraw/astrochart-rn';
import Svg from 'react-native-svg';

// Create a headless document (no DOM needed!)
const doc = createDocument();

// Create chart
const chart = new Chart('', 800, 800, {}, doc);

// Add your astrology data
chart.radix({
  planets: { "Sun": [0], "Moon": [90] },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
});

// Get the SVG tree
const svgTree = getSVGTree(chart.paper.DOMElement);

// Render in React Native (see REACT_NATIVE_EXAMPLE.tsx for full component)
```

### Browser (backward compatible)

```typescript
import Chart from '@astrodraw/astrochart-rn';

// Works exactly like the original library!
const chart = new Chart('paper', 800, 800);
chart.radix(data);
```

### Node.js (Headless)

```typescript
import { Chart, createDocument, getSVGTree } from '@astrodraw/astrochart-rn';

const doc = createDocument();
const chart = new Chart('', 800, 800, {}, doc);
chart.radix(data);

const svgTree = getSVGTree(chart.paper.DOMElement);
// Process the SVG tree however you want!
```

## 📚 Documentation

- **[React Native Usage Guide](./REACT_NATIVE_USAGE.md)** - Complete guide for React Native
- **[React Native Example](./REACT_NATIVE_EXAMPLE.tsx)** - Full working example component
- **[Original Documentation](https://astrodraw.github.io/)** - API documentation (still applies!)

## 🔧 Architecture

### Before (Original)
```
Chart → SVG → document.createElementNS() → Real DOM
```

### After (This Fork)
```
Chart → SVG → DocumentWrapper → ElementWrapper → Data Structure
                    ↓
            Can serialize to:
            - React Native SVG
            - JSON
            - String
            - Real DOM (in browser)
```

## 🎨 Key Features

- ✅ **No DOM Required**: Works without any browser APIs
- ✅ **React Native Compatible**: Full support for React Native
- ✅ **Headless Rendering**: Perfect for server-side generation
- ✅ **Backward Compatible**: Drop-in replacement for original library
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Zero Dependencies**: Pure TypeScript (except react-native-svg for RN)
- ✅ **Same API**: All original functionality preserved

## 🧪 Testing

The fork maintains all original tests and functionality. Run tests with:

```bash
npm test
```

## 📁 File Structure

New files added:
- `project/src/svg-factory.ts` - SVG abstraction layer
- `REACT_NATIVE_USAGE.md` - Usage guide
- `REACT_NATIVE_EXAMPLE.tsx` - Example component
- `FORK_README.md` - This file

Modified files:
- `project/src/svg.ts` - Uses abstraction layer
- `project/src/chart.ts` - Accepts DocumentWrapper
- `project/src/radix.ts` - Uses abstraction layer
- `project/src/transit.ts` - Uses abstraction layer
- `project/src/utils.ts` - Works with ElementWrapper
- `project/src/index.ts` - Exports new utilities
- `package.json` - Updated for React Native

## 🤝 Contributing

This is a fork of the original AstroChart library. For contributing to the original:
- Original repo: https://github.com/AstroDraw/AstroChart
- Original docs: https://astrodraw.github.io/

For contributing to this React Native fork:
1. Fork this repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT - Same as the original AstroChart project

## 🙏 Credits

- Original AstroChart: https://github.com/AstroDraw/AstroChart
- Created by: @afucher and contributors
- React Native fork: Maintains full compatibility while adding RN support

## 💪 Use Cases

Perfect for:
- 📱 React Native astrology apps
- 🖥️ Server-side chart generation
- 🌐 Static site generation (SSG)
- 🔄 Headless CMS integrations
- 📊 Batch chart processing
- 🎨 Any environment without a browser DOM

## 🚀 Performance

Since this fork doesn't manipulate the real DOM:
- ⚡ Faster chart generation (no layout/paint)
- 💾 Lower memory usage (data structures vs DOM nodes)
- 🔄 Can generate multiple charts in parallel
- 📦 Smaller bundle size in some environments

## 🐛 Known Limitations

None! This fork is fully compatible with all features of the original library.

## 📮 Support

For issues with:
- **Original functionality**: Check [original repo](https://github.com/AstroDraw/AstroChart/issues)
- **React Native specific**: Open an issue in this fork

## 🎉 Enjoy!

You can now use AstroChart anywhere JavaScript runs! 🍆💦🤤🍑

