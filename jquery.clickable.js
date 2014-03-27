/*!
 * jQuery.clickable
 *
 * Designed to make other elements clickable/tapable/pressable based on a sibling or child links!
 * 
 * @version: 1.1.1
 * @url: https://github.com/lawlesscreation/jquery.clickable
 * @author: @lawlesscreation
 * @license: licenced under MIT - http://opensource.org/licenses/mit-license.php
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

  'use strict';

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = 'jqueryClickable',
      defaults = {
        clickable_child: null,                        // Used to make a child element clickable of which the script was executed
        select_link: null,                            // Used to specify which link to use within the clickable box should more than one link be found
        clickable_class: 'clickable',                 // The class that gets added to elements which have been successfully initialized
        hover_class: 'clickable-hover',               // The class that gets added to the onHover state of clickable elements
        focus_class: 'clickable-focus',               // The class that gets added to the onFocus state of clickable elements
        url_prefixes: ['http://', 'https://', 'www.'] // An array of different prefixes that can appear before each link
      };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and 
      // call them like so: this.yourOtherFunction(this.element, this.options).
      // this.options.propertyName

      var $self = this;

      return $(this.element).each(function() {
        // If the box contains more than one link check to see if all the $links in the box are 
        // identical. If they are use one to make the box clickable use plugin defaults e.g.: $self.options.clickable_class
        var $link = null,
            attrs = {};

        if( $(this).find('a[href]').length > 1 ) {
          var $links = $(this).find('a[href]');

          if( $self.identicalHref($self, $links) ) {
            attrs = $self.getAttrs($links.get(0));
          } else {
            // If a fallback function for selecting a link is provided
            if( $self.options.select_link ) {
              $link = $self.options.select_link;

              //if link element is returned get the first link
              if( $link ) {
                attrs = $self.getAttrs($links.get(0));
              }
            }
          }
        } else {
          // If the box contains only one link, use it
          if( $(this).find('a[href]').length === 1 ) {
            attrs = $self.getAttrs($(this).find('a[href]'));
          }
        }

        if( attrs.href !== undefined ) {
          // If the element has a valid link to use, Bind the link and add a clickable_class
          $(this).addClass($self.options.clickable_class);
          $self.bindLink($self, $(this), attrs);
        }
        
      });
    }, 


    /*
     * Function to check that all link href attributes in an array are identical
     *
     * @return boolean: true if all of the $links are identical, otherwise false
     */
    identicalHref: function ($self, $links) {
      var first = this.getTrimmedUrl($self, $links.get(0)),
          curr = null,
          is_identical = true;

      $.each($links, function() {
        curr = $self.getTrimmedUrl($self, $(this));
        if( curr !== first ) {
          is_identical = false;
        } 
      });

      return is_identical;
    },


    /*
     * Function for extracting the full url from a link and trimming it
     *
     * @return string: A trimmed url (prefixes removed)
     */
    getTrimmedUrl: function ($self, link) {
      return this.trimUrl($self, $(link).attr('href'));
    },


    /*
     * Function for removing standard URL prefixes specified in defaults
     *
     * @return string: The trimmed url (prefixes removed)
     */
    trimUrl: function ($self, url) {
      url = $.trim(url);

      if( $self.options.url_prefixes ) {
        for( var prefix in $self.options.url_prefixes ) {
          if( url.indexOf($self.options.url_prefixes[prefix]) === 0 ) {
            url = url.substring($self.options.url_prefixes[prefix].length);
          }
        }
      }

      return url;
    },


    /*
     * Binds click handler to the target specified in defaults if not null,
     * otherwise apply the click handler to the clickable box
     */
    bindLink: function ($self, box, link_attrs) {
      var $bind_target;

      if ( $self.options.clickable_child && $(box).find($self.options.clickable_child).length > 0 ) {
        $bind_target = $(box).find($self.options.clickable_child); 
      } else {
        $bind_target = box;
      }

      if( link_attrs.target === '_blank' ) {
        $bind_target.on('click', function(e) {
          e.preventDefault();
          window.open(link_attrs.href); // removed ,link_attrs.text to fix IE issue
        });
      } else {
        $bind_target.on('click', function(e) {
          e.preventDefault();
          window.location.href = link_attrs.href;
        });
      }

      $bind_target.hover(function() {
        $($bind_target).addClass($self.options.hover_class);
      },function() {
        $bind_target.removeClass($self.options.hover_class);
      });

      $bind_target.find('a').focus(function() {
        $bind_target.addClass($self.options.focus_class);
      });

      $bind_target.find('a').blur(function() {
        $bind_target.removeClass($self.options.focus_class);
      });
    },


    /*
     * Function used to get attributes from a link
     *
     * @return: Object containing the $links attributes
     */
    getAttrs: function (link_element) {
      var text = $(link_element).text(),
          href,
          target;

      if ( $(link_element).attr('href') !== "" ) {
        href = $(link_element).attr('href');
      } else {
        href = null;
      }

      if ( $(link_element).attr('target') !== "" ) {
        target = $(link_element).attr('target');
      } else {
        target = null;
      }

      return {href : href, target : target, text : text};
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
