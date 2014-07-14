/*!
 * jQuery.clickable
 *
 * Designed to make other elements clickable/tapable/pressable based on a sibling or child links!
 *
 * @version: 2.0.0
 * @url: https://github.com/lawlesscreation/jquery.clickable
 * @author: @lawlesscreation
 * @license: licenced under MIT - http://opensource.org/licenses/mit-license.php
 */
(function($, window, document, undefined) {
    'use strict';

    var pluginName = 'jqueryClickable',
        defaults = {
            // Used to make a child element clickable of which the script was executed
            clickableChild: null,
            // Used to specify which link to use within the clickable box should more than one link be found
            selectLink: null,
            // The class that gets added to elements which have been successfully initialized
            clickableClass: 'clickable',
            // The class that gets added to the onHover state of clickable elements
            hoverClass: 'clickable-hover',
            // The class that gets added to the onFocus state of clickable elements
            focusClass: 'clickable-focus',
            // An array of different prefixes that can appear before each link
            urlPrefixes: ['http://', 'https://', 'www.'],
            // A callback that is triggered after the element has been made clickable
            callbackAfter: function() {}
        };

    function JqueryClickable(element, options) {
        var self = this,
            link = null,
            attrs = {};

        self.element = $(element);
        // Combine user options with default options
        self.options = $.extend({}, defaults, options);

        // If more than one link found check to see if all the links are identical.
        if (self.element.find('a[href]').length > 1) {
            var links = self.element.find('a[href]');

            // If links identical use one to make the box clickable
            if (self.identicalHref(self, links)) {
                attrs = self.getAttrs(links.get(0));
            } else {
                // If a fallback function for selecting a link is provided
                if (self.options.selectLink) {
                    link = self.options.selectLink;

                    //if link element is returned get the first link
                    if (link) {
                        attrs = self.getAttrs(links.get(0));
                    }
                }
            }
        } else {
            if (self.element.find('a[href]').length === 1) {
                attrs = self.getAttrs(self.element.find('a[href]'));
            }
        }

        // If the element has a valid link to use, Bind the link and add a clickableClass
        if (attrs.href !== undefined) {
            self.bindLink(self, attrs);

            self.element.addClass(self.options.clickableClass);
        }

        self.options.callbackAfter();
    }

    JqueryClickable.prototype.identicalHref = function(self, links) {
        /*
         * Function to check that all link href attributes in an array are identical
         *
         * @return boolean: true if all of the links are identical, otherwise false
         */
        var first = this.getTrimmedUrl(self, links.get(0)),
            curr = null,
            identical = true;

        $.each(links, function() {
            curr = self.getTrimmedUrl(self, $(this));
            if (curr !== first) {
                identical = false;
            }
        });

        return identical;
    };

    JqueryClickable.prototype.getTrimmedUrl = function(self, link) {
        /*
         * Function for extracting the full url from a link and trimming it
         *
         * @return string: A trimmed url (prefixes removed)
         */
        return this.trimUrl(self, $(link).attr('href'));
    };

    JqueryClickable.prototype.trimUrl = function(self, url) {
        /*
         * Function for removing standard URL prefixes specified in defaults
         *
         * @return string: The trimmed url (prefixes removed)
         */
        url = $.trim(url);

        if (self.options.urlPrefixes) {
            for (var prefix in self.options.urlPrefixes) {
                if (url.indexOf(self.options.urlPrefixes[prefix]) === 0) {
                    url = url.substring(self.options.urlPrefixes[prefix].length);
                }
            }
        }

        return url;
    };

    JqueryClickable.prototype.bindLink = function(self, link_attrs) {
        /*
         * Binds click handler to the target specified in defaults if not null,
         * otherwise apply the click handler to the clickable box
         */
        var bindTarget;

        if (self.options.clickableChild && self.element.find(self.options.clickableChild).length > 0) {
            bindTarget = self.element.find(self.options.clickableChild); 
        } else {
            bindTarget = self.element;
        }

        if (link_attrs.target === '_blank') {
            bindTarget.on('click', function(e) {
                e.preventDefault();
                window.open(link_attrs.href); // removed ,link_attrs.text to fix IE issue
            });
        } else {
            bindTarget.on('click', function(e) {
                e.preventDefault();
                window.location.href = link_attrs.href;
            });
        }

        bindTarget.hover(function() {
            $(bindTarget).addClass(self.options.hoverClass);
        },function() {
            bindTarget.removeClass(self.options.hoverClass);
        });

        bindTarget.find('a').focus(function() {
            bindTarget.addClass(self.options.focusClass);
        });

        bindTarget.find('a').blur(function() {
            bindTarget.removeClass(self.options.focusClass);
        });
    };

    JqueryClickable.prototype.getAttrs = function(linkElement) {
        /*
         * Function used to get attributes from a link
         *
         * @return: Object containing the links attributes
         */
        var text = $(linkElement).text(),
            href,
            target;

        if ($(linkElement).attr('href') !== '') {
            href = $(linkElement).attr('href');
        } else {
            href = null;
        }

        if ($(linkElement).attr('target') !== '') {
            target = $(linkElement).attr('target');
        } else {
            target = null;
        }

        return {
            href: href,
            target: target,
            text: text
        };
    };

    $.fn[pluginName] = function(options) {
        /*
         * Initialise an instance of the plugin on each selected element.
         * Guard against duplicate instantiations.
         */
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new JqueryClickable(this, options));
            }
        });
    };

})(jQuery, window, document);