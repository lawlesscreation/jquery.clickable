'use strict';

describe('The jQuery clickable plugin', function() {

    var example1A =
            '<div class="box">' +
                '<h4>Single link in target</h4>' +
                '<p>A single link within the target. <a href="https://google.com">Google</a>. That will link the whole box!</p>' +
            '</div><!-- .box -->',
        example1B =
            '<div class="box">' +
                '<h4>Multiple same links in target</h4>' +
                '<p>Multiple links within the target. <a href="https://google.com">Google</a>. But to the same place, so thats ok. <a href="https://google.com">Google</a>.</p>' +
            '</div><!-- .box -->',
        example1C =
            '<div class="box">' +
                '<h4>Link opens in new window</h4>' +
                '<p>Best to avoid links opening in a new window, but just incase this should work. <a target="_blank" href="https://google.com">Google</a>.</p>' +
            '</div><!-- .box -->',
        example1D =
            '<div class="box">' +
                '<h4>Multiple different links - PLUGIN WILL IGNORE</h4>' +
                '<p>Multiple links within the target. <a href="https://google.com">Google</a>. But to DIFFERENT places, so the plugin will ignore this. <a href="https://facebook.com">Facebook</a>.</p>' +
            '</div><!-- .box -->',
        testExample1A,
        testExample1B,
        testExample1C,
        testExample1D;

    beforeEach(function() {
        testExample1A = $(example1A),
        testExample1B = $(example1B),
        testExample1C = $(example1C),
        testExample1D = $(example1D);
    });

    it('depends on jQuery', function() {
        expect($).toBeDefined();
    });

    it('should be protected against multiple instantiations', function() {
        var plugin = testExample1A.jqueryClickable();
        expect(plugin === testExample1A.jqueryClickable()).toBe(true);
    });

    describe('initialisation', function() {
        beforeEach(function() {
            testExample1A.jqueryClickable();
            testExample1B.jqueryClickable();
            testExample1C.jqueryClickable();
            testExample1D.jqueryClickable();
        });


    });

    describe('public function "identicalHref"', function() {
        beforeEach(function() {
            testExample1A.jqueryClickable();
            testExample1B.jqueryClickable();
            testExample1C.jqueryClickable();
            testExample1D.jqueryClickable();
        });

        it('should check for identical href values and return a boolean', function() {
            
        });
    });
});