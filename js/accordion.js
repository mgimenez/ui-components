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
         * It is assume first children like a trigger
         */
        this.triggerName = wrapper.children[0].tagName;

        /**
         * Gets an element target 
         * @private
         * @param {Element}
         * @returns {Boolean}
         */
        this.isTrigger = function (target) {
            return target.tagName === that.triggerName && target.parentElement === that.wrapper;
        }

        this.wrapper.addEventListener('click', function(event) {

        	var target = event.target;
        	
            if (that.isTrigger(target)) {
                if (target.nextElementSibling.classList.contains('active')) {
                    target.nextElementSibling.classList.remove('active');
                } else {
                    that.wrapper.querySelector('.active') ? that.wrapper.querySelector('.active').classList.remove('active') : ''
                    target.nextElementSibling.classList.add('active');
                }
        	}

        });
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