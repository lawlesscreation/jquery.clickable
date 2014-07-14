'use strict';

describe('The jQuery clickable plugin', function() {

    var markUp =
            '<div class="button-dropdown">' +
            '<a class="button-dropdown_control" href="#"><span>Action</span></a>' +
            '<ul class="button-dropdown_list">' +
                '<li><a href="#">Menu item 1</a></li>' +
                '<li><a href="#">Menu item 2</a></li>' +
                '<li><a href="#">Menu item 3</a></li>' +
                '<li><a href="#">Menu item 4</a></li>' +
            '</ul>' +
        '</div><!-- .button-dropdown -->',
        testElement;

    beforeEach(function() {
        testElement = $(markUp);
    });

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    it('should be protected against multiple instantiations', function() {
        var plugin = testElement.jqueryClickable();
        expect(plugin === testElement.jqueryClickable()).toBe(true);
    });

    describe('initialisation', function() {
        beforeEach(function() {
            testElement.jqueryClickable();
        });
    });
});