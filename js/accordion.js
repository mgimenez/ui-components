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

        /**
         * Tag name of trigger. 
         * It is assume the first child like a trigger element, all triggers should be the same type
         */
        this.triggerName = wrapper.children[0].tagName;

        /**
         * Gets a target element 
         * @private
         * @param {Element}
         * @returns {Boolean}
         */
        this.isTrigger = function (target) {
            return target.tagName === that.triggerName && target.parentElement === that.wrapper;
        }



        this.wrapper.addEventListener('click', function(event) {

            var target = event.target;

            if (that.isTrigger(target))
                target.classList.contains('active') ? that.closeTab(target) : that.openTab(target);

        });
    
        that.wrapper.addEventListener('accordion-close', function(e) {
            console.log('close', e.detail.target);
        })

        that.wrapper.addEventListener('accordion-open', function(e) {
            console.log('open', e.detail.target);
        })

    }

    /**
     * Get a element, remove class name active on siblings elements if it is necessary and add class name active on param element
     * @private
     * @param {Element}
     * @eventsEmit {accordion-open, accordion-close}
     */
    Accordion.prototype.openTab = function (trigger) {

        var openEvent = new CustomEvent('accordion-open', {detail: {target: trigger}}),
            closeEvent = new CustomEvent('accordion-close', {detail: {target:this.wrapper.querySelector('.active') }});

        if (this.wrapper.querySelector('.active')) {
            this.wrapper.querySelector('.active').classList.remove('active');
            this.wrapper.dispatchEvent(closeEvent);
        }

        trigger.classList.add('active');
        this.wrapper.dispatchEvent(openEvent);

    }

    /**
     * Get a element and remove class active
     * @private
     * @param {Element}
     * @eventEmit {accordion-close}
     */

    Accordion.prototype.closeTab = function (trigger) {
        
        var openEvent = new CustomEvent('accordion-close', {detail: {target: trigger}});

        trigger.classList.remove('active');
        this.wrapper.dispatchEvent(openEvent);

    }

    /**
     * Init instances component
     */
    function initialize() {
        // `container` is to search for new disclosures within a new AJAX response
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