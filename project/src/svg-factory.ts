/**
 * SVG Element Factory - React Native compatible abstraction layer
 * 
 * This replaces direct DOM manipulation with a data structure approach
 * that can be serialized to React Native SVG components or DOM elements
 */

export interface SVGElement {
  type: string
  attributes: Record<string, string>
  children: Array<SVGElement | SVGTextNode>
  id?: string
  namespaceURI?: string
}

export interface SVGTextNode {
  type: 'text'
  content: string
}

export interface SVGRoot {
  type: 'svg'
  attributes: Record<string, string>
  children: SVGElement[]
  width: number
  height: number
}

/**
 * SVG Factory - creates SVG element data structures without DOM
 */
export class SVGFactory {
  private namespaceURI: string = 'http://www.w3.org/2000/svg'
  private elements: Map<string, SVGElement> = new Map()
  private root: SVGElement | null = null

  /**
   * Create an SVG element (replaces document.createElementNS)
   */
  createElementNS(namespaceURI: string, tagName: string): SVGElement {
    const element: SVGElement = {
      type: tagName,
      attributes: {},
      children: [],
      namespaceURI
    }
    return element
  }

  /**
   * Create a text node (replaces document.createTextNode)
   */
  createTextNode(text: string): SVGTextNode {
    return {
      type: 'text',
      content: text
    }
  }

  /**
   * Get element by ID (replaces document.getElementById)
   */
  getElementById(id: string): SVGElement | null {
    return this.elements.get(id) || null
  }

  /**
   * Register an element with an ID
   */
  registerElement(element: SVGElement, id: string): void {
    element.id = id
    this.elements.set(id, element)
  }

  /**
   * Set root element
   */
  setRoot(element: SVGElement): void {
    this.root = element
  }

  /**
   * Get root element
   */
  getRoot(): SVGElement | null {
    return this.root
  }

  /**
   * Clear all elements
   */
  clear(): void {
    this.elements.clear()
    this.root = null
  }

  /**
   * Get the namespace URI
   */
  getNamespaceURI(): string {
    return this.namespaceURI
  }
}

/**
 * Element wrapper that mimics DOM Element API
 */
export class ElementWrapper {
  private element: SVGElement
  private factory: SVGFactory

  constructor(element: SVGElement, factory: SVGFactory) {
    this.element = element
    this.factory = factory
  }

  get namespaceURI(): string {
    return this.element.namespaceURI || this.factory.getNamespaceURI()
  }

  get id(): string {
    return this.element.id || this.element.attributes.id || ''
  }

  setAttribute(name: string, value: string): void {
    this.element.attributes[name] = value
    if (name === 'id') {
      this.factory.registerElement(this.element, value)
    }
  }

  getAttribute(name: string): string | null {
    return this.element.attributes[name] || null
  }

  appendChild(child: ElementWrapper | TextNodeWrapper): void {
    if (child instanceof TextNodeWrapper) {
      this.element.children.push(child.getNode())
    } else {
      this.element.children.push(child.getElement())
    }
  }

  removeChild(child: ElementWrapper): void {
    const index = this.element.children.indexOf(child.getElement())
    if (index > -1) {
      this.element.children.splice(index, 1)
    }
  }

  getElement(): SVGElement {
    return this.element
  }

  querySelectorAll(selector: string): ElementWrapper[] {
    // Simple implementation for basic selectors
    const results: ElementWrapper[] = []
    
    const traverse = (el: SVGElement) => {
      // Check if element matches selector
      if (selector.startsWith('#') && el.id === selector.substring(1)) {
        results.push(new ElementWrapper(el, this.factory))
      } else if (el.type === selector) {
        results.push(new ElementWrapper(el, this.factory))
      }
      
      // Traverse children
      for (const child of el.children) {
        if ('type' in child && child.type !== 'text') {
          traverse(child as SVGElement)
        }
      }
    }
    
    traverse(this.element)
    return results
  }
}

/**
 * Text node wrapper
 */
export class TextNodeWrapper {
  private node: SVGTextNode

  constructor(node: SVGTextNode) {
    this.node = node
  }

  getNode(): SVGTextNode {
    return this.node
  }
}

/**
 * Document wrapper that provides document-like API
 */
export class DocumentWrapper {
  private factory: SVGFactory
  private bodyElement: ElementWrapper | null = null

  constructor(factory: SVGFactory) {
    this.factory = factory
  }

  get body(): ElementWrapper {
    if (!this.bodyElement) {
      const bodyEl = this.factory.createElementNS(this.factory.getNamespaceURI(), 'body')
      this.bodyElement = new ElementWrapper(bodyEl, this.factory)
    }
    return this.bodyElement
  }

  createElementNS(namespaceURI: string, tagName: string): ElementWrapper {
    const element = this.factory.createElementNS(namespaceURI, tagName)
    return new ElementWrapper(element, this.factory)
  }

  createElement(tagName: string): ElementWrapper {
    return this.createElementNS(this.factory.getNamespaceURI(), tagName)
  }

  createTextNode(text: string): TextNodeWrapper {
    const node = this.factory.createTextNode(text)
    return new TextNodeWrapper(node)
  }

  getElementById(id: string): ElementWrapper | null {
    const element = this.factory.getElementById(id)
    return element ? new ElementWrapper(element, this.factory) : null
  }
}

/**
 * Create a new document wrapper instance
 */
export function createDocument(): DocumentWrapper {
  const factory = new SVGFactory()
  return new DocumentWrapper(factory)
}

/**
 * Serialize SVG element tree to React Native JSX string
 */
export function toReactNativeSVG(element: SVGElement, indent: number = 0): string {
  const indentStr = '  '.repeat(indent)
  const tagMap: Record<string, string> = {
    'svg': 'Svg',
    'g': 'G',
    'path': 'Path',
    'line': 'Line',
    'circle': 'Circle',
    'rect': 'Rect',
    'text': 'Text'
  }

  const componentName = tagMap[element.type] || element.type.charAt(0).toUpperCase() + element.type.slice(1)
  
  // Convert attributes to React Native props
  const props: string[] = []
  for (const [key, value] of Object.entries(element.attributes)) {
    const propName = key === 'stroke-width' ? 'strokeWidth' : 
                     key === 'fill' ? 'fill' :
                     key === 'stroke' ? 'stroke' :
                     key.includes('-') ? key.replace(/-([a-z])/g, g => g[1].toUpperCase()) : key
    
    if (key === 'transform' || key === 'style') {
      // Skip complex attributes for now, would need more processing
      continue
    }
    
    props.push(`${propName}="${value}"`)
  }

  const propsStr = props.length > 0 ? ' ' + props.join(' ') : ''

  if (element.children.length === 0) {
    return `${indentStr}<${componentName}${propsStr} />`
  }

  let result = `${indentStr}<${componentName}${propsStr}>\n`
  
  for (const child of element.children) {
    if ('type' in child && child.type === 'text') {
      result += `${indentStr}  {${JSON.stringify((child as SVGTextNode).content)}}\n`
    } else {
      result += toReactNativeSVG(child as SVGElement, indent + 1) + '\n'
    }
  }

  result += `${indentStr}</${componentName}>`
  
  return result
}

/**
 * Get raw SVG element tree (for debugging or processing)
 */
export function getSVGTree(wrapper: ElementWrapper): SVGElement {
  return wrapper.getElement()
}

