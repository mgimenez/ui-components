(function (win, doc) {
    'use strict';

	/**
     * Discloses information progressively, revealing only the essentials.
     * @constructor
     * @param {Element} wrapper A container with the "accordion" class name
     * @returns {accordion} A new instance of Accordion.
     */
    function Accordion(wrapper) {
        /**
         * Reference to the context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * Wrapper of functionality
         */
        this.wrapper = wrapper;

        this._init();

        /**
         * Tag name of trigger. 
         * It is assume the first child like a trigger element, all triggers should be the same type
         */
        this.triggerName = wrapper.children[0].tagName;

        /**
         * Gets a target element 
         * @function
         * @private
         * @param {HTMLElement}
         * @returns {Boolean}
         */
        this.isTrigger = function (target) {
            return target.tagName === that.triggerName && target.parentElement === that.wrapper;
        }


        this.wrapper.addEventListener('click', function(event) {

            event.preventDefault();
            var target = event.target;

            if (that.isTrigger(target))
                target.classList.contains('active') ? that.close() : that.open(target);

        });
    
        this.wrapper.addEventListener('accordion-close', function(e) {
            console.log('close', e.detail.tab);
        })

        this.wrapper.addEventListener('accordion-open', function(e) {
            console.log('open', e.detail.tab);
        })

    }

     /**
     * Initialize a new instance of Component
     * @function
     * @private
     * @returns {component}
     */
    Accordion.prototype._init = function() {
        this.wrapper.classList.contains('accordion') ? false : this.wrapper.classList.add('accordion');
    }

    /**
     * Get a element, remove class name active on siblings elements if it is necessary and add class name active on param element
     * @function
     * @private
     * @param {HTMLElement}
     * @eventsEmit {accordion-open:{tab}, accordion-close:{tab}}
     */
    Accordion.prototype.open = function(tab) {

        var openEvent = new CustomEvent('accordion-open', {detail: {tab: tab}});
        this.close();

        tab.classList.add('active');
        this.wrapper.dispatchEvent(openEvent);

    }

    /**
     * Get a element and remove class active
     * @function
     * @private
     * @eventEmit {accordion-close}
     */
    Accordion.prototype.close = function() {
        
        var closeEvent = new CustomEvent('accordion-close', {detail: {tab: this.wrapper.querySelector('.active')}});

        if (this.wrapper.querySelector('.active')) {
            this.wrapper.querySelector('.active').classList.remove('active');
            this.wrapper.dispatchEvent(closeEvent);
        }

    }
    
    /**
     * Get a query string or HTMLElement, return an Array with component's instances
     * @function
     * @public
     * @param {Query String || HTMLElement}
     * @returns {Array}
     */
    Accordion.getInstance = function(param) {

        var wrappers = param instanceof HTMLElement ? [param] : doc.querySelectorAll(param),
            i = 0,
            j = wrappers.length,
            k = 0,
            l = _accordions.length,
            instances = [];

        for (i; i < j; i += 1) {
            k = 0;
            for (k; k < l; k +=1) {
                if (wrappers[i] === _accordions[k].wrapper) {
                    instances.push(_accordions[k]);
                }
            }
        }

        return instances;
    }

    /**
     * Init instances component
     */
    function initialize() {
        var wrappers = doc.querySelectorAll('.accordion'),
            i = 0,
            j = wrappers.length;

        for (i; i < j; i += 1) {
            win._accordions.push(new Accordion(wrappers[i]));
        }
    }

    /**
     * Expose
     */
    // Instances
    win._accordions = win._accordions || [];
    // Constructor
    win.Accordion = Accordion;

    /**
     * Init
     */
    initialize();

}(window, window.document));