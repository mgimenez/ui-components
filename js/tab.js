(function (win, doc) {
    'use strict';

    /**
     * Helpers
     */
     



	/**
     * Discloses information progressively, revealing only the essentials.
     * @constructor
     * @param {Element} wrapper A container with the "accordion" class name
     * @returns {accordion} A new instance of Accordion.
     */
    function Tab(wrapper) {
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
         * Coleccions of triggers, it is assumed first child like a wrapper of trigger.
         * Each trigger is associated with a content through of index
         */
        this.nav = wrapper.children[0];

        /**
         * Coleccions of contents, it is assumed second child like a wrapper of contents.
         * Each content is associated with a trigger through of index
         */
        this.contents = wrapper.children[1];

        /**
         * Gets a element, find node list in his parentElement (siblings), "cast" HTMLNodeCollection into an true Array and 
         * get indexOf.
         * @private
         * @param {Element}
         * @returns {String}
         */
        this.getIndex = function(el) {
            return Array.prototype.slice.call(el.parentElement.children).indexOf(el)
        }

        this.nav.addEventListener('click', function(event) {

            event.preventDefault();
            var target = event.target;
            
            if (that.nav.querySelector('.active') !== target)
                that.close();

            if (!target.classList.contains('active'))
                that.open(target);

        });

        that.wrapper.addEventListener('tab-close', function(e) {
            console.log('close tab', e.detail.tab, 'content', e.detail.content);
        })

        that.wrapper.addEventListener('tab-open', function(e) {
            console.log('open tab', e.detail.tab, 'content', e.detail.content);
        })

    }

    /**
     * Get a element, add class name active on param element and on content with the same index, event emit open
     * @private
     * @param {Element}
     * @eventsEmit {tab-open: {tab, content}}
     */
    Tab.prototype.open = function (trigger) {

        var content = this.contents.children[this.getIndex(trigger)],
            openEvent = new CustomEvent('tab-open', {detail: {tab: trigger, content: content}});

        trigger.classList.add('active');
        content.classList.add('active');

        this.wrapper.dispatchEvent(openEvent);

    }
    
    /**
     * Remove class active in nav and contents collection, emit event close 
     * @private
     * @eventEmit {tab-close: {tab, content}}
     */
    Tab.prototype.close = function () {

        var closeEvent = new CustomEvent('tab-close', {
            detail: {
                tab:this.nav.querySelector('.active'), 
                content: this.contents.querySelector('.active')
            }
        });

        this.nav.querySelector('.active').classList.remove('active');
        this.contents.querySelector('.active').classList.remove('active');
        this.wrapper.dispatchEvent(closeEvent);

    
    }

    /**
     * Init instances component
     */
    function initialize() {
        // `container` is to search for new disclosures within a new AJAX response
        var wrappers = doc.querySelectorAll('.tab'),
            i = 0,
            j = wrappers.length;

        for (i; i < j; i += 1) {
            win._tab.push(new Tab(wrappers[i]));
        }
    }

    /**
     * Expose
     */
    // Instances
    win._tab = win._tab || [];
    // Constructor
    win.Tab = Tab;

    /**
     * Init
     */
    initialize();

}(window, window.document));