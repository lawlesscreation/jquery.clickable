# jQuery clickable
## Designed to make other elements clickable/tapable/pressable using its sibling or child links!

Built using the awesome <a href="https://github.com/jquery-boilerplate/boilerplate/">jQuery Boilerplate</a>.

## Requiremenets
 - jQuery (tested with 1.9.x);

## Usage
Inlcude the following scripts in your page, best at the bottom:
```html
<script src="js/jquery/1.9.1/jquery.min.js"></script>
<script src="../jquery.clickable.min.js"></script>
```
Then you can initialize the plugin like so:
```javascript
$(document).ready(function(){
  $('#clickable-box').find('.box').jqueryClickable();

  $('#clickable-image').find('.box').jqueryClickable({
    clickable_child : 'img'
  });

  $('#clickable-image-from-heading').find('.box').jqueryClickable({
    clickable_child : 'img',
    select_link : 'h4'
  });
});
```

## Options & defaults
### clickable_child: null
Used to make a child element clickable of which the script was executed

### select_link: null
Used to specify which link to use within the clickable box should more than one link be found

### clickable_class: 'clickable'
The class that gets added to elements which have been successfully initialized

### hover_class: 'clickable-hover'
The class that gets added to the onHover state of clickable elements

### focus_class: 'clickable-focus'
The class that gets added to the onFocus state of clickable elements

### url_prefixes: ['http://', 'https://', 'www.']
An array of different prefixes that can appear before each link
