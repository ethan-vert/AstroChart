import type { Settings } from './settings';
import { ElementWrapper, DocumentWrapper } from './svg-factory';
/**
   * SVG tools.
   *
   * @class
   * @public
   * @constructor
   * @param {String} elementId - root DOM Element (can be empty string for headless mode)
   * @param {int} width
   * @param {int} height
   * @param {DocumentWrapper} doc - optional document wrapper (for React Native compatibility)
   */
declare class SVG {
    settings: Settings;
    _paperElementId: string;
    DOMElement: ElementWrapper;
    root: ElementWrapper;
    width: number;
    height: number;
    context: this;
    document: DocumentWrapper;
    constructor(elementId: string, width: number, height: number, settings: Settings, doc?: DocumentWrapper);
    _getSymbol(name: string, x: number, y: number): ElementWrapper;
    /**
     * Get a required symbol.
     *
     * @param {String} name
     * @param {int} x
     * @param {int} y
     *
     * @return {SVGElement g}
     */
    getSymbol(name: string, x: number, y: number): ElementWrapper;
    /**
     * Create transparent rectangle.
     *
     * Used to improve area click, @see this.settings.ADD_CLICK_AREA
     *
     * @param {Number} x
     * @param {Number} y
     *
     * @return {Element} rect
     */
    createRectForClick(x: number, y: number): ElementWrapper;
    /**
     * Get ID for sign wrapper.
     *
     * @param {String} sign
     *
     * @return {String id}
     */
    getSignWrapperId(sign: string): string;
    /**
     * Get ID for house wrapper.
     *
     * @param {String} house
     *
     * @return {String id}
     */
    getHouseIdWrapper(house: string): string;
    sun(x: number, y: number): ElementWrapper;
    moon(x: number, y: number): ElementWrapper;
    mercury(x: number, y: number): ElementWrapper;
    venus(x: number, y: number): ElementWrapper;
    mars(x: number, y: number): ElementWrapper;
    jupiter(x: number, y: number): ElementWrapper;
    saturn(x: number, y: number): ElementWrapper;
    uranus(x: number, y: number): ElementWrapper;
    neptune(x: number, y: number): ElementWrapper;
    pluto(x: number, y: number): ElementWrapper;
    chiron(x: number, y: number): ElementWrapper;
    lilith(x: number, y: number): ElementWrapper;
    nnode(x: number, y: number): ElementWrapper;
    snode(x: number, y: number): ElementWrapper;
    fortune(x: number, y: number): ElementWrapper;
    aries(x: number, y: number): ElementWrapper;
    taurus(x: number, y: number): ElementWrapper;
    gemini(x: number, y: number): ElementWrapper;
    cancer(x: number, y: number): ElementWrapper;
    leo(x: number, y: number): ElementWrapper;
    virgo(x: number, y: number): ElementWrapper;
    libra(x: number, y: number): ElementWrapper;
    scorpio(x: number, y: number): ElementWrapper;
    sagittarius(x: number, y: number): ElementWrapper;
    capricorn(x: number, y: number): ElementWrapper;
    aquarius(x: number, y: number): ElementWrapper;
    pisces(x: number, y: number): ElementWrapper;
    /**
   * Draw As symbol
   */
    ascendant(x: number, y: number): ElementWrapper;
    /**
   * Draw Ds symbol
   */
    descendant(x: number, y: number): ElementWrapper;
    /**
   * Draw MC symbol
   */
    mediumCoeli(x: number, y: number): ElementWrapper;
    /**
   * Draw IC symbol
   */
    immumCoeli(x: number, y: number): ElementWrapper;
    number1(x: number, y: number): ElementWrapper;
    number2(x: number, y: number): ElementWrapper;
    number3(x: number, y: number): ElementWrapper;
    number4(x: number, y: number): ElementWrapper;
    number5(x: number, y: number): ElementWrapper;
    number6(x: number, y: number): ElementWrapper;
    number7(x: number, y: number): ElementWrapper;
    number8(x: number, y: number): ElementWrapper;
    number9(x: number, y: number): ElementWrapper;
    number10(x: number, y: number): ElementWrapper;
    number11(x: number, y: number): ElementWrapper;
    number12(x: number, y: number): ElementWrapper;
    /**
   * Draw circular sector
   *
   * @param {int} x - circle x center position
   * @param {int} y - circle y center position
   * @param {int} radius - circle radius in px
   * @param {int} a1 - angleFrom in degree
   * @param {int} a2 - angleTo in degree
   * @param {int} thickness - from outside to center in px
   *
   * @return {SVGElement} segment
   *
   * @see SVG Path arc: https://www.w3.org/TR/SVG/paths.html#PathData
   */
    segment(x: number, y: number, radius: number, a1: number, a2: number, thickness: number, lFlag?: number, sFlag?: number): ElementWrapper;
    /**
   * Draw line in circle
   *
   * @param {int} x1
   * @param {int} y2
   * @param {int} x2
   * @param {int} y2
   * @param {String} color - HTML rgb
   *
   * @return {SVGElement} line
   */
    line(x1: number, y1: number, x2: number, y2: number): ElementWrapper;
    /**
   * Draw a circle
   *
   * @param {int} cx
   * @param {int} cy
   * @param {int} radius
   *
   * @return {SVGElement} circle
   */
    circle(cx: number, cy: number, radius: number): ElementWrapper;
    /**
   * Draw a text
   *
   * @param {String} text
   * @param {int} x
   * @param {int} y
   * @param {String} size - etc. "13px"
   * @param {String} color - HTML rgb
   *
   * @return {SVGElement} text
   */
    text(txt: string, x: number, y: number, size: string, color: string): ElementWrapper;
}
export default SVG;
