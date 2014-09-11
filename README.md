# jQuery.clickable [![Build Status](https://travis-ci.org/lawlesscreation/jquery.clickable.svg?branch=master)](https://travis-ci.org/lawlesscreation/jquery.clickable)
###### Designed to make other elements clickable/tapable/pressable using its sibling or child links!

 - [View demo](http://lawlesscreation.github.io/jquery.clickable/)
 - [Download ZIP](https://github.com/lawlesscreation/jquery.clickable/archive/master.zip)


## Requirements

 - [jQuery](http://jquery.com) >= v1.9.x


## Usage

To get started you can either:

 - Clone the repo: `git clone https://github.com/lawlesscreation/jquery.clickable.git`
 - Or install with Bower: `bower install jquery.clickable`

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
            <td>clickable_child</td>
            <td>null</td>
            <td>Used to make a child element clickable of which the script was executed</td>
        </tr>
        <tr>
            <td>select_link</td>
            <td>null</td>
            <td>Used to specify which link to use within the clickable box should more than one link be found</td>
        </tr>
        <tr>
            <td>clickable_class</td>
            <td>clickable</td>
            <td>The class that gets added to elements which have been successfully initialized</td>
        </tr>
        <tr>
            <td>hover_class</td>
            <td>clickable-hover</td>
            <td>The class that gets added to the onHover state of clickable elements</td>
        </tr>
        <tr>
            <td>focus_class</td>
            <td>clickable-focus</td>
            <td>The class that gets added to the onFocus state of clickable elements</td>
        </tr>
        <tr>
            <td>url_prefixes</td>
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
        clickable_child : 'img'
    });
});
```

### Link image from heading

```javascript
$(function(){
    $('#clickable-image-from-heading').find('.box').jqueryClickable({
        clickable_child : 'img',
        select_link : 'h4'
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


## Release history
 - 2.0.0 Added Jasmine tests and restructured JavaScript to allow for public methods
 - 1.1.0 Changed to semantic versioning

Copyright &copy; 2013 [@lawlesscreation](http://twitter.com/lawlesscreation)

Licensed under [MIT](http://opensource.org/licenses/mit-license.php)


## TODO
 - Finish writing Jasmine test specs.
