/**
 * Parallax Background Web Component (Based on <u1-parallax-bg> - element)
 * @version 1.0
 * @description Creates parallax effect for background elements with WordPress/Gutenberg editor compatibility
 * @author Jakob Wiens <https://tezmo.media>
 * 
 * @see Original version: https://github.com/u1ui/parallax-bg.el
 * 
 * @license
 * MIT License
 * 
 * Copyright (c) 2021 Tobias Buschor
 * Copyright (c) 2025 Jakob Wiens
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Detect if we're in WordPress Block Editor environment
 * @returns {boolean} True if in Gutenberg editor
 */
const isEditorEnvironment = () => {
    return typeof wp !== 'undefined' && 
           typeof wp.data !== 'undefined' && 
           document.body.classList.contains('block-editor-page');
};

/**
 * Get appropriate scroll container based on environment
 * @returns {HTMLElement} The main scrollable element
 */
const getScrollContainer = () => {
    if (isEditorEnvironment()) {
        // Prioritize Gutenberg's content areas to handle editor-specific layout
        return document.querySelector('.interface-interface-skeleton__content') || 
               document.querySelector('.edit-post-layout__content') || 
               document.body;
    }
    return document.scrollingElement || document.documentElement;
};

// Active elements pool
const pool = new Set();

/**
 * Parallax background management object
 * @namespace paraxBg
 */
const paraxBg = {
    /**
     * Add element to active pool
     * @param {HTMLElement} element - Parallax element to add
     */
    add(element){
        pool.add(element)
        // Initialize listeners when first element is added
        pool.size === 1 && addListeners();
    },
    
    /**
     * Remove element from active pool
     * @param {HTMLElement} element - Parallax element to remove
     */
    remove(element){
        pool.delete(element);
        // TODO: Implement listener cleanup when pool empties
    },
    
    /**
     * Update positions for all registered elements
     */
    positionize(){
        pool.forEach(item => item.positionize());
    },
    
    /**
     * Update layouts for all registered elements
     */
    layout(){
        pool.forEach(item => item.layout());
    }
};

// Cached viewport dimensions
let pageY;   // Current scroll position
let winHeight; // Viewport height
let scrollHeight; // Total scrollable height

/**
 * Update cached viewport dimensions
 */
function setVPDimensions() {
    const scrollContainer = getScrollContainer();
    pageY = scrollContainer.scrollTop;
    winHeight = scrollContainer.clientHeight;
    scrollHeight = scrollContainer.scrollHeight;
}
// Initial dimension setup
setVPDimensions();

/**
 * Set up global event listeners
 */
function addListeners() {
    const scrollContainer = getScrollContainer();

    /**
     * Handle scroll events and update positions
     */
    const handleScroll = () => {
        pageY = scrollContainer.scrollTop;
        requestAnimationFrame(() => paraxBg.positionize());
    };

    // Editor-specific event handling
    if (isEditorEnvironment()) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    } 
    // Regular browser handling
    else {
        document.addEventListener('scroll', handleScroll, { passive: true });
        addEventListener('wheel', handleScroll);
    }

    // Common lifecycle events
    addEventListener('DOMContentLoaded', paraxBg.layout);
    addEventListener('load', paraxBg.layout);

    /**
     * Handle resize events and recalculate layouts
     */
    const handleResize = () => {
        setVPDimensions();
        paraxBg.layout();
        paraxBg.positionize();
    };

    // Set up resize observer for content changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(isEditorEnvironment() ? scrollContainer : document.body);
}

/**
 * ParallaxBg Custom Web Component
 * @customElement parallax-wrapper
 * @extends HTMLElement
 */
class ParallaxBg extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Shadow DOM structure
        shadowRoot.innerHTML = `
        <style>
            :host {
                position: absolute !important; /* Override editor styles */
                z-index: 0 !important; /* Ensure visibility in editor */
                pointer-events: none; /* Allow block selection */
                overflow: hidden;
                top: 0; 
                left: 0; 
                right: 0;
                bottom: -.2px; /* Safari fix */
                will-change: transform;
                background-size: cover;
            }
            .mover {
                pointer-events: none; /* Prevent UI interference */
                position: absolute;
                top: 0; 
                bottom: 0; 
                left: 0; 
                right: 0;
                z-index: -1;
                will-change: transform;
                background: inherit;
            }
            .visible {
                display: flex;
                flex-direction: row;
                align-items: stretch;
                justify-content: center;
                position: absolute;
                top: 0; 
                bottom: 0; 
                left: 0; 
                right: 0;
            }
        </style>
        <div class="mover" part="_mover">
            <slot class="visible"></slot>
        </div>
        `;

        // Component references
        this.mover = this.shadowRoot.querySelector('.mover');
        this.visible = this.shadowRoot.querySelector('.visible');

        // Get speed from CSS custom property
        const style = getComputedStyle(this);
        const speed = style.getPropertyValue('--parallax-bg-speed');
        this.speed = speed === '' ? 0.5 : parseFloat(speed);
    }

    /**
     * Element connected to DOM
     */
    connectedCallback() {
        // Find positioning parent
        this.stage = this.offsetParent || 
                    document.querySelector('.edit-post-visual-editor__content-area') || 
                    document.body;
    
        // Prevent body modification in editor
        if (isEditorEnvironment() && this.stage.tagName === 'BODY') {
            return;
        }
        
        // Initial setup
        scrollHeight = this.stage.scrollHeight;
        this.layout();
        this.positionize();
        paraxBg.add(this);
    }

    /**
     * Element disconnected from DOM
     */
    disconnectedCallback() {
        paraxBg.remove(this);
    }

    /**
     * Calculate layout dimensions
     */
    layout() {
        const rect = this.stage.getBoundingClientRect();
        
        // Stage dimensions relative to document
        this.stageRect = {
            top: pageY + rect.top,
            bottom: pageY + rect.bottom,
            height: rect.height,
            yCenter: (rect.top + pageY) + rect.height / 2,
        };

        // Calculate base offset
        let relevantTop = this.stageRect.top;
        if (this.speed > 1) relevantTop += this.stageRect.height;

        let offset = this.offsetAtPageY(relevantTop);
        offset = Math.abs(offset);

        // Handle reverse movement
        if (this.speed < 0) offset += (-this.speed * this.stageRect.height);

        // Apply offset to mover element
        this.mover.style.top = `${-offset}px`;
        this.mover.style.bottom = `${-offset}px`;

        // Update visible area (complex calculation block)
        if (this.speed < 0) {
            console.warn('parallax-bg: Negative speed visible area not implemented');
            return;
        }
        
        if (this.visible) {
            // Calculate visible area bounds based on scroll positions
            let top = 0, bottom = 0;
            const offsetAtElTop = this.offsetAtPageY(this.stageRect.top);
            const offsetAtTop = this.offsetAtPageY(0);
            const offsetAtElBottom = this.offsetAtPageY(this.stageRect.bottom - winHeight);
            const offsetAtBottom = this.offsetAtPageY(scrollHeight - winHeight);

            // Different calculations for speed ranges
            if (this.speed < 1) {
                top = Math.min(offsetAtElTop, offsetAtBottom);
                bottom = Math.max(offsetAtTop, offsetAtElBottom);
            } else {
                top = Math.max(offsetAtTop, -offsetAtElBottom);
                bottom = Math.min(-offsetAtElTop, offsetAtBottom);
            }

            // Apply visible area bounds
            this.visible.style.top = `${offset - top}px`;
            this.visible.style.bottom = `${offset + bottom}px`;
        }
    }

    /**
     * Calculate vertical offset for given scroll position
     * @param {number} pageY - Current scroll position
     * @returns {number} Calculated offset
     */
    offsetAtPageY(pageY) {
        const moved = this.stageRect.yCenter - (pageY + winHeight / 2);
        return moved * (this.speed - 1);
    }
    
    /**
     * Update element position based on current scroll
     */
    positionize() {
        const scrollContainer = getScrollContainer();
        const currentScroll = scrollContainer.scrollTop;
        this.mover.style.transform = `translate3d(0, ${this.offsetAtPageY(currentScroll)}px, 0)`;
    }
}

// Register custom element
customElements.define('parallax-wrapper', ParallaxBg);