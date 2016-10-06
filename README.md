# jQuery.clickable

[![Build Status](https://travis-ci.org/lawlesscreation/jquery.clickable.svg?branch=master)](https://travis-ci.org/lawlesscreation/jquery.clickable)
[![NPM version](https://badge.fury.io/js/jquery.clickable.png)](http://badge.fury.io/js/jquery.clickable)
[![Dependency Status](https://david-dm.org/lawlesscreation/jquery.clickable.png)](https://david-dm.org/lawlesscreation/jquery.clickable.png)
[![devDependency Status](https://david-dm.org/lawlesscreation/jquery.clickable/dev-status.png)](https://david-dm.org/lawlesscreation/jquery.clickable#info=devDependencies)

> Designed to make other elements clickable/tapable/pressable using its sibling or child links!


## Usage

To get started you can either:

 - Clone the repo: `git clone https://github.com/lawlesscreation/jquery.clickable.git`
 - Install with npm: `npm install jquery.clickable --save`
 - Install with Bower: `bower install jquery.clickable --save`

Then it's just a case of adding required scripts in your page, best at the bottom:

```html
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="jquery.clickable.min.js"></script>
```

### Options &amp; defaults

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>callbackClickBefore</td>
            <td>function() {}</td>
            <td>A callback that is triggered in the click event before navigating to link location</td>
        </tr>
        <tr>
            <td>callbackAfter</td>
            <td>function() {}</td>
            <td>A callback that is triggered after the element has been made clickable</td>
        </tr>
        <tr>
            <td>clickableChild</td>
            <td>null</td>
            <td>Used to make a child element clickable of which the script was executed</td>
        </tr>
        <tr>
            <td>clickableClass</td>
            <td>clickable</td>
            <td>The class that gets added to elements which have been successfully initialized</td>
        </tr>
        <tr>
            <td>focusClass</td>
            <td>clickable-focus</td>
            <td>The class that gets added to the onFocus state of clickable elements</td>
        </tr>
        <tr>
            <td>hoverClass</td>
            <td>clickable-hover</td>
            <td>The class that gets added to the onHover state of clickable elements</td>
        </tr>
        <tr>
            <td>selectLink</td>
            <td>null</td>
            <td>Used to specify which link to use within the clickable box should more than one link be found</td>
        </tr>
        <tr>
            <td>urlPrefixes</td>
            <td>['http://', 'https://', 'www.']</td>
            <td>An array of different prefixes that can appear before each link</td>
        </tr>
    </tbody>
</table>


## Examples

### Link target

```javascript
$(function(){
    $('#clickable-box').find('.box').jqueryClickable();
});
```

### Link image

```javascript
$(function(){
    $('#clickable-image').find('.box').jqueryClickable({
        clickableChild : 'img'
    });
});
```

### Link image from heading

```javascript
$(function(){
    $('#clickable-image-from-heading').find('.box').jqueryClickable({
        clickableChild : 'img',
        selectLink : 'h4'
    });
});
```
## Override the click event action
```javascript
$(function(){
    $('#clickable-box-callback').find('.box').jqueryClickable({
        callbackClickBefore: function(e) {
            alert("Callback click action, prevent navigation");
            return false; // prevent original action
        }
    });
});
```

## Development

You will need [node.js](http://nodejs.org/) before you get started, then:

```bash
$ npm install
#=> will install all required node packages
```

Then simply run either the watcher or build task:

```bash
$ grunt
#=> Running "watch" task
#=> Waiting...
```

or

```bash
$ grunt build
#=> Done, without errors.
```

Copyright &copy; 2013 [@lawlesscreation](http://twitter.com/lawlesscreation)

Licensed under [MIT](http://opensource.org/licenses/mit-license.php)


## TODO
 - Additional callbacks;
 - Finish writing Jasmine test specs.
