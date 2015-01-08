# Rangestepper.js - A jQuery plugin that creates a highly css style-able snappable range input

I needed a slider / range input / input of type range that I could customize via css, all the slider plugins are way 
overkill out there and also the HTML input of range type is customizable but not enough, besides changing the way the
thumb and the track looks I also wanted to style the snappable points. 

This is why I created rangestepper :) All contributions are more than welcome! :D

## Demo & Examples

http://eek.ro/rangestepper

### Image

![Rangestepper.js](http://eek.ro/rangestepper/rangestepper.png)

## Example Usage

### HTML

```html
<div id="demo-rangestepper"></div>
```

### jQuery

Use the plugin as follows:

```js
$('#demo-rangestepper').rangestepper({
            inputName: 'rangestepper',
            minVal: -10,
            maxVal: 10
        });
```

By default, a `<input type="hidden" name="rangestepper" />` input field will be added in the div for backwords compatibility to form submissions. You can override default by passing the `inputName` option.

Also, there is the ability to set the `minVal` and `maxVal`, if the `minVal` is set to 0 the thumb will be by default placed at the beginning of the range input slider, if a negative value is set to `minVal`, the thumb will be set at the center/origin where the value reaches 0.

You can easily get the value with the default `$('#demo-rangestepper input').val();`

### CSS

The CSS is super customizable, the default theme is for black, but it can easily be changed from the CSS file.

## Installation

Download and insert the .js and .css in your project and you're ready to go. jQuery is required.

## License

This plugin is available under [the MIT license](http://mths.be/mit).

## Thanks to…

* [Paul Anastasiu](https://github.com/paul2moro/) for graphics! :)

### Please contribute if you find it usefull! Thanks! :D
