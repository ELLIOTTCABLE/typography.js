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

})();
