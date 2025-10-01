# React Native Usage Guide

This is a React Native compatible fork of AstroChart that doesn't rely on browser DOM APIs.

## Installation

```bash
npm install @astrodraw/astrochart-rn react-native-svg
```

## Usage

### Basic Example

```typescript
import { Chart, createDocument, getSVGTree } from '@astrodraw/astrochart-rn';

// Create a headless document (no real DOM needed)
const doc = createDocument();

// Create chart with the headless document
const chart = new Chart('', 800, 800, {}, doc);

// Add your astrology data
const data = {
  planets: {
    "Sun": [0],
    "Moon": [90],
    "Mercury": [120],
    // ... more planets
  },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
};

// Generate the chart
const radix = chart.radix(data);

// Get the SVG element tree
const svgTree = getSVGTree(chart.paper.root);

// Now you can serialize this to React Native SVG components
console.log(svgTree);
```

### React Native Component Example

```typescript
import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Circle, Line, Text } from 'react-native-svg';
import { Chart, createDocument, getSVGTree, type SVGElement } from '@astrodraw/astrochart-rn';

// Helper to convert SVG element tree to React Native components
function renderSVGElement(element: SVGElement, key: number): React.ReactNode {
  const { type, attributes, children } = element;
  
  // Map attributes
  const props: any = { key };
  
  for (const [attr, value] of Object.entries(attributes)) {
    // Convert kebab-case to camelCase for React Native
    const propName = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    switch (propName) {
      case 'strokeWidth':
        props.strokeWidth = parseFloat(value);
        break;
      case 'id':
        props.id = value;
        break;
      default:
        props[propName] = value;
    }
  }
  
  // Map SVG elements to React Native SVG components
  switch (type) {
    case 'g':
      return (
        <G {...props}>
          {children.map((child, i) => 
            'type' in child && child.type !== 'text' 
              ? renderSVGElement(child as SVGElement, i) 
              : null
          )}
        </G>
      );
    case 'path':
      return <Path {...props} />;
    case 'circle':
      return <Circle {...props} />;
    case 'line':
      return <Line {...props} />;
    case 'rect':
      return <Rect {...props} />;
    case 'text':
      const textContent = children.find(c => 'content' in c);
      return <Text {...props}>{textContent ? (textContent as any).content : ''}</Text>;
    default:
      return null;
  }
}

export function AstroChart({ data }: { data: any }) {
  const [svgTree, setSvgTree] = React.useState<SVGElement | null>(null);
  
  React.useEffect(() => {
    // Create headless document
    const doc = createDocument();
    
    // Create chart
    const chart = new Chart('', 800, 800, {
      // Your settings here
      SYMBOL_SCALE: 1.5,
    }, doc);
    
    // Generate radix chart
    const radix = chart.radix(data);
    
    // Get SVG tree
    const tree = getSVGTree(chart.paper.DOMElement);
    setSvgTree(tree);
  }, [data]);
  
  if (!svgTree) {
    return <View />;
  }
  
  return (
    <View style={{ flex: 1 }}>
      <Svg width={svgTree.attributes.width} height={svgTree.attributes.height} viewBox={svgTree.attributes.viewBox}>
        {svgTree.children.map((child, i) => renderSVGElement(child as SVGElement, i))}
      </Svg>
    </View>
  );
}
```

### Example Data

```typescript
const exampleData = {
  planets: {
    "Sun": [0],
    "Moon": [90],
    "Mercury": [120],
    "Venus": [150],
    "Mars": [180],
    "Jupiter": [210],
    "Saturn": [240],
    "Uranus": [270],
    "Neptune": [300],
    "Pluto": [330]
  },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
};
```

## API Differences from Original

### Creating Charts

**Original (Browser):**
```typescript
const chart = new Chart('paper', 800, 800);
```

**React Native:**
```typescript
import { createDocument } from '@astrodraw/astrochart-rn';
const doc = createDocument();
const chart = new Chart('', 800, 800, {}, doc);
```

### Getting SVG Output

**Original (Browser):**
The chart is rendered directly to the DOM.

**React Native:**
```typescript
import { getSVGTree } from '@astrodraw/astrochart-rn';
const svgTree = getSVGTree(chart.paper.DOMElement);
// Convert svgTree to React Native SVG components
```

## Advanced Usage

### Custom Rendering

You can also access the raw SVG element tree and create your own renderer:

```typescript
import { getSVGTree, type SVGElement } from '@astrodraw/astrochart-rn';

const svgTree = getSVGTree(chart.paper.DOMElement);

// Traverse the tree
function traverse(element: SVGElement) {
  console.log(element.type, element.attributes);
  element.children.forEach(child => {
    if ('type' in child && child.type !== 'text') {
      traverse(child as SVGElement);
    }
  });
}

traverse(svgTree);
```

### Serializing to String

The library includes a helper to convert to React Native JSX (as a string):

```typescript
import { toReactNativeSVG } from '@astrodraw/astrochart-rn';

const svgTree = getSVGTree(chart.paper.DOMElement);
const jsxString = toReactNativeSVG(svgTree);
console.log(jsxString);
```

## Compatibility

This fork maintains full compatibility with the original AstroChart API while adding React Native support. It works in:

- ✅ React Native
- ✅ Node.js (headless)
- ✅ Web browsers (with DOM)
- ✅ Any JavaScript environment

## Notes

- The library generates SVG data structures instead of directly manipulating the DOM
- All chart generation happens in memory
- No browser APIs are required
- Perfect for server-side rendering or React Native
- Compatible with react-native-svg

## Contributing

This is a fork of the original AstroChart library. For the original project, see:
https://github.com/AstroDraw/AstroChart

## License

MIT - Same as the original AstroChart project

