/**
 * Complete React Native Example Component
 * 
 * This example shows how to use the React Native compatible fork
 * of AstroChart in a React Native application.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Svg, { G, Path, Circle, Line, Text, Rect } from 'react-native-svg';
import { Chart, createDocument, getSVGTree, type SVGElement } from '@astrodraw/astrochart-rn';

// Type for SVG text node
interface SVGTextNode {
  type: 'text';
  content: string;
}

/**
 * Recursively render SVG elements as React Native SVG components
 */
function renderSVGElement(element: SVGElement, key: number): React.ReactNode {
  const { type, attributes, children } = element;
  
  // Convert attributes to React Native props
  const props: any = { key };
  
  for (const [attr, value] of Object.entries(attributes)) {
    // Convert kebab-case to camelCase
    const propName = attr.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    
    // Handle special cases
    switch (propName) {
      case 'strokeWidth':
        props.strokeWidth = parseFloat(value) || 1;
        break;
      case 'fontSize':
        props.fontSize = value;
        break;
      case 'fontFamily':
        props.fontFamily = value;
        break;
      case 'dominantBaseline':
        props.dominantBaseline = value;
        break;
      case 'transform':
        // React Native SVG handles transforms differently
        props.transform = value;
        break;
      case 'id':
      case 'x':
      case 'y':
      case 'cx':
      case 'cy':
      case 'r':
      case 'x1':
      case 'y1':
      case 'x2':
      case 'y2':
      case 'width':
      case 'height':
      case 'd':
      case 'fill':
      case 'stroke':
      case 'fillOpacity':
      case 'strokeOpacity':
      case 'opacity':
        props[propName] = value;
        break;
      default:
        // Pass through other attributes
        props[propName] = value;
    }
  }
  
  // Map element types to React Native SVG components
  switch (type) {
    case 'svg':
      // This is handled by the parent Svg component
      return children.map((child, i) => 
        'type' in child && child.type !== 'text' 
          ? renderSVGElement(child as SVGElement, i) 
          : null
      );
      
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
      const textContent = children.find(c => 'content' in c) as SVGTextNode | undefined;
      return (
        <Text {...props}>
          {textContent ? textContent.content : ''}
        </Text>
      );
      
    default:
      console.warn(`Unknown SVG element type: ${type}`);
      return null;
  }
}

/**
 * AstroChart Component Props
 */
interface AstroChartProps {
  data: {
    planets: Record<string, number[]>;
    cusps: number[];
  };
  width?: number;
  height?: number;
  settings?: any;
}

/**
 * Main AstroChart Component for React Native
 */
export function AstroChartComponent({ 
  data, 
  width = 800, 
  height = 800,
  settings = {}
}: AstroChartProps) {
  const [svgTree, setSvgTree] = React.useState<SVGElement | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    try {
      setLoading(true);
      
      // Create headless document (no real DOM needed)
      const doc = createDocument();
      
      // Create chart with custom settings
      const chart = new Chart('', width, height, {
        SYMBOL_SCALE: 1.5,
        PADDING: 10,
        ...settings
      }, doc);
      
      // Generate radix chart
      chart.radix(data);
      
      // Get SVG element tree
      const tree = getSVGTree(chart.paper.DOMElement);
      setSvgTree(tree);
      setLoading(false);
    } catch (error) {
      console.error('Error generating chart:', error);
      setLoading(false);
    }
  }, [data, width, height, settings]);
  
  if (loading || !svgTree) {
    return <View style={styles.container} />;
  }
  
  const svgWidth = parseFloat(svgTree.attributes.width || width.toString());
  const svgHeight = parseFloat(svgTree.attributes.height || height.toString());
  const viewBox = svgTree.attributes.viewBox || `0 0 ${width} ${height}`;
  
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Svg 
          width={svgWidth} 
          height={svgHeight} 
          viewBox={viewBox}
        >
          {svgTree.children.map((child, i) => renderSVGElement(child as SVGElement, i))}
        </Svg>
      </ScrollView>
    </View>
  );
}

// Example usage data
export const exampleAstroData = {
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
    "Pluto": [330],
    "Chiron": [45],
    "Lilith": [135],
    "NNode": [225],
  },
  cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

/**
 * Example App Component
 */
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AstroChartComponent 
        data={exampleAstroData}
        width={600}
        height={600}
        settings={{
          SYMBOL_SCALE: 1.2,
          PADDING: 18,
        }}
      />
    </View>
  );
}

