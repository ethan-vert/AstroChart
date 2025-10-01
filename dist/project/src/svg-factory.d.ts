/**
 * SVG Element Factory - React Native compatible abstraction layer
 *
 * This replaces direct DOM manipulation with a data structure approach
 * that can be serialized to React Native SVG components or DOM elements
 */
export interface SVGElement {
    type: string;
    attributes: Record<string, string>;
    children: Array<SVGElement | SVGTextNode>;
    id?: string;
    namespaceURI?: string;
}
export interface SVGTextNode {
    type: 'text';
    content: string;
}
export interface SVGRoot {
    type: 'svg';
    attributes: Record<string, string>;
    children: SVGElement[];
    width: number;
    height: number;
}
/**
 * SVG Factory - creates SVG element data structures without DOM
 */
export declare class SVGFactory {
    private namespaceURI;
    private elements;
    private root;
    /**
     * Create an SVG element (replaces document.createElementNS)
     */
    createElementNS(namespaceURI: string, tagName: string): SVGElement;
    /**
     * Create a text node (replaces document.createTextNode)
     */
    createTextNode(text: string): SVGTextNode;
    /**
     * Get element by ID (replaces document.getElementById)
     */
    getElementById(id: string): SVGElement | null;
    /**
     * Register an element with an ID
     */
    registerElement(element: SVGElement, id: string): void;
    /**
     * Set root element
     */
    setRoot(element: SVGElement): void;
    /**
     * Get root element
     */
    getRoot(): SVGElement | null;
    /**
     * Clear all elements
     */
    clear(): void;
    /**
     * Get the namespace URI
     */
    getNamespaceURI(): string;
}
/**
 * Element wrapper that mimics DOM Element API
 */
export declare class ElementWrapper {
    private element;
    private factory;
    constructor(element: SVGElement, factory: SVGFactory);
    get namespaceURI(): string;
    get id(): string;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    appendChild(child: ElementWrapper | TextNodeWrapper): void;
    removeChild(child: ElementWrapper): void;
    getElement(): SVGElement;
    querySelectorAll(selector: string): ElementWrapper[];
}
/**
 * Text node wrapper
 */
export declare class TextNodeWrapper {
    private node;
    constructor(node: SVGTextNode);
    getNode(): SVGTextNode;
}
/**
 * Document wrapper that provides document-like API
 */
export declare class DocumentWrapper {
    private factory;
    private bodyElement;
    constructor(factory: SVGFactory);
    get body(): ElementWrapper;
    createElementNS(namespaceURI: string, tagName: string): ElementWrapper;
    createElement(tagName: string): ElementWrapper;
    createTextNode(text: string): TextNodeWrapper;
    getElementById(id: string): ElementWrapper | null;
}
/**
 * Create a new document wrapper instance
 */
export declare function createDocument(): DocumentWrapper;
/**
 * Serialize SVG element tree to React Native JSX string
 */
export declare function toReactNativeSVG(element: SVGElement, indent?: number): string;
/**
 * Get raw SVG element tree (for debugging or processing)
 */
export declare function getSVGTree(wrapper: ElementWrapper): SVGElement;
