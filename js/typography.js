// This encapsulates a series of useful functions for working in a non-
// typographically rich medium, while attempting to remain typographically
// astute.
var Typography = {};

(function(){

// This will retreive the absolute root of the current document.
var root = function() {
  return document.documentElement.ownerDocument.documentElement;
};

// ////////
// This function returns a numeric float representing the ratio of the text's
// cap-height to its baseline.
// Caveats: Does not take line-height into account, adjust your own
// calculations to whatever line-height you may be utilizing.
Typography.baseline = function(element) {
  // We require an `element` argument to be present
  if(typeof element != "object" || element == null) return false;
  // We require that `element` duck type to an `Element`
  if(typeof element.getStyle != "function") return false;
  
  var calculation_area = create_calculation_area('ijMqm');
  calculation_area.setStyle('font-size', '1000000%');
  
  calculation_area.setStyle('font-family',  element.getStyle('font-family'));
  calculation_area.setStyle('font-style',   element.getStyle('font-style'));
  calculation_area.setStyle('font-variant', element.getStyle('font-variant'));
  calculation_area.setStyle('font-weight',  element.getStyle('font-weight'));
  calculation_area.setStyle('line-height', '1.0');
  
  var sub_span = new Element('span');
  sub_span.setStyle('font-size', '0%');
  sub_span.inject(calculation_area);
  
  // TODO: Should this be ''?
  sub_span.set('text', 'ijMqm');
  
  var bottom = sub_span.offsetTop + sub_span.offsetHeight;
  // This is imprecise, because we're assuming the baseline of the small
  // text is 3/4s of the height. This is, unfortunately, necessary,
  // because WebKit won't let us set the height of the text to 0%.
  var baseline_position = bottom; // + (0.25 * sub_span.offsetHeight);
  var baseline_ratio = (calculation_area.offsetHeight - baseline_position) / calculation_area.offsetHeight;
  
  calculation_area.parentNode.removeChild(calculation_area);
  
  return baseline_ratio;
};

// This will create and return a new "calculation div" for measuring purposes.
var create_calculation_area = function(content) {
  var calculation_area = new Element('div');
  calculation_area.setStyle('position', 'fixed');
  calculation_area.setStyle('top', '-1000000px');
  calculation_area.setStyle('left', '-1000000px');
  
  calculation_area.inject(root());
  
  calculation_area.set('text', content);
  return calculation_area;
};

// ////////
// This function draws an underline directly under an element's text.
Typography.underline = function(element) {
  // We require an `element` argument to be present
  if(typeof element != "object" || element == null) return false;
  // We require that `element` duck type to an `Element`
  if(typeof element.getStyle != "function") return false;
  
  var baseline = Typography.baseline(element)
  if(!baseline) return false;
  
  // Our approach is essentially to create a new copy of `element, and then
  // wrap all of the copy's content in a `<span>`. This `display: inline;`
  // duplicate will be given a `border-bottom`, and then the original element
  // will be padded in such a way as to align the border of the duplicate to
  // the baseline of the original.
  // 
  // This is necessary for several reasons; primarily, we don't want the
  // border to appear anywhere there isn't text, because that's how an
  // underline is expected to function.
  var duplicate = element.cloneNode(true);
  
  // Absolute positioning only works within a positioned containing element.
  if(element.getStyle('position') == 'static')
    element.setStyle('position', 'relative');
  
  // We're going to place our duplicate directly underneath the existing text …
  duplicate.inject(element);
  duplicate.setStyle('position', 'absolute');
  duplicate.setStyle('top', '0px');
  duplicate.setStyle('left', '0px');
  duplicate.setStyle('z-index', zIndex(element) - 1);
  
  duplicate.setStyle('color', 'red'); // DEBUG
  
  // … then create a new span, and move all of the duplicate's contents into it …
  var wrapper = new Element('span');
  // (Unfortunately, getChildren only returns elements, not all nodes.)
  //duplicate.getChildren().each(function(el) { el.inject(wrapper); });
  var curr, next = duplicate.firstChild;
  while (curr = next) {
    next = next.nextSibling
    wrapper.adopt(curr);
  };
  wrapper.inject(duplicate);
  
  // … and then add a bottom-border to that span!
  wrapper.setStyle('border-bottom', '1px solid red');
  
  return true;
}

// Returns the computed `z-index` of a given `element`, iterating up the DOM
// until it reaches an element with a defined `z-index`.
var zIndex = function(element) {
  if(typeof console != "undefined") console.log(element); // DEBUG
  // We require an `element` argument to be present
  if(typeof element != "object" || element == null) return false;
  // We require that `element` duck type to an `Element`
  if(typeof element.getStyle    != "function" ||
     typeof element.parentNode  != "object")
    return false;
  
  var css_z_index = element.getStyle('z-index');
  // Something went wrong, and we reached the root document without even a '0'
  if(css_z_index == null) return false;
  var z_index = ((css_z_index == "auto") ? zIndex(element.parentNode) : parseInt(css_z_index))
  return z_index;
}

})();
