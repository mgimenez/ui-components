(function (win, doc) {
    'use strict';

	// var accordion = doc.querySelectorAll('.accordion');
	/**
     * Discloses information progressively, revealing only the essentials.
     * @constructor
     * @param {Element} wrapper A container with the "disclosure" attribute.
     * @returns {disclosure} A new instance of Disclosure.
     *
     * @todo Sometimes the element must be the trigger: <button disclosure disclosure-event="click"....> It has the 3 properties: disclosure, disclosure-url and disclosure-container.
     * @todo Unit testing Jasmine.
     * @todo loading spinner
     * @todo Preload method to save time on predictible loadings. Just do the request and grab response into this.responses.
     * @todo usar localstorage para ni siquiera hacer el primer request
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

        this.wrapper.addEventListener('click', function(event) {

        	var target = event.target;
        	
        	if (target.tagName === that.triggerName && target.parentElement === that.wrapper) {
        		target.classList.toggle('active');
        		target.nextElementSibling.classList.toggle('hide');
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