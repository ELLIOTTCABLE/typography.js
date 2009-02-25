window.addEvent('domready', function() {
  
  var root = document.documentElement.ownerDocument.documentElement;
  
  // What typeface are we going to calculate for? The only important
  // elements are probably the point size and line-height, but you never
  // know.
  var target_element = $('container')
  
  // First, we create a div, and move it into the middle of nowhere.
  var calculation_area = new Element('div');
  calculation_area.setStyle('position', 'fixed');
  calculation_area.setStyle('top', '0px');
  calculation_area.setStyle('left', '0px');
  
  calculation_area.setStyle('font-family', target_element.getStyle('font-family'));
  calculation_area.setStyle('font-style', target_element.getStyle('font-style'));
  calculation_area.setStyle('font-variant', target_element.getStyle('font-variant'));
  calculation_area.setStyle('font-weight', target_element.getStyle('font-weight'));
  calculation_area.setStyle('line-height', '1.0');
  
  calculation_area.setStyle('text-shadow', '#FFFFFF 3px 0px 0px, #FFFFFF -3px 0px 0px, #FFFFFF 0px 1px 1px, #FFFFFF 0px -1px 1px');
  calculation_area.setStyle('font-size', '1000%');
  calculation_area.inject(root);
  
  // Now we put some measurable content into the area
  calculation_area.set('text', 'ijMqm');
  
  // Next, we create a sub-element
  var sub_span = new Element('span');
  sub_span.setStyle('font-size', '0%');
  sub_span.inject(calculation_area);
  
  // And inject some text into it
  sub_span.set('text', '');
  
  var bottom = sub_span.offsetTop + sub_span.offsetHeight;
  // This is imprecise, because we're assuming the baseline of the small
  // text is 3/4s of the height. This is, unfortunately, necessary,
  // because WebKit won't let us set the height of the text to 0%.
  var baseline_position = bottom; // + (0.25 * sub_span.offsetHeight);
  var baseline = (calculation_area.offsetHeight - baseline_position) / calculation_area.offsetHeight;
  
  console.log(baseline)
  
  /* -- ---- -- ! -- ---- -- */
  
  var baseline_indicator = new Element('div');
  baseline_indicator.setStyle('position', 'absolute');
  baseline_indicator.setStyle('top', baseline_position.toString() + 'px');
  baseline_indicator.setStyle('left', '0px');
  baseline_indicator.setStyle('width', '100%');
  baseline_indicator.setStyle('z-index', '-9999');
  baseline_indicator.setStyle('border-top', '3px solid green');
  baseline_indicator.inject(calculation_area);
  
  // =============
  // = Adjusting =
  // =============
  
  // Now that we have a baseline percentage, we need to calculate the
  // proper padding for the target element. First, we need to duplicate a
  // single line of said element.
  
  var calculation_area_two = new Element('div');
  calculation_area_two.setStyle('position', 'fixed');
  calculation_area_two.setStyle('bottom', '0px');
  calculation_area_two.setStyle('right', '0px');
  
  calculation_area_two.setStyle('font-family', target_element.getStyle('font-family'));
  calculation_area_two.setStyle('font-style', target_element.getStyle('font-style'));
  calculation_area_two.setStyle('font-variant', target_element.getStyle('font-variant'));
  calculation_area_two.setStyle('font-weight', target_element.getStyle('font-weight'));
  calculation_area_two.setStyle('font-size', target_element.getStyle('font-size'));
  calculation_area_two.setStyle('line-height', target_element.getStyle('line-height'));
  
  calculation_area_two.inject(root);
  
  calculation_area_two.set('text', 'ijMqm');
  
  var line_height = calculation_area_two.offsetHeight + 1; // Not sure why I need to +1…
  calculation_area_two.setStyle('line-height', '1.0');
  var height = calculation_area_two.offsetHeight;
  
  console.log(line_height, height, line_height - height);
  console.log(baseline, baseline * line_height, baseline * height);
  
  // Finally, apply this padding to the top of the target element.
  target_element.setStyle('padding-top', ((line_height - height) + (baseline * height)).toString() + 'px');
  
  var baseline_indicator_two = new Element('div');
  baseline_indicator_two.setStyle('position', 'absolute');
  baseline_indicator_two.setStyle('bottom', (baseline * height).toString() + 'px');
  baseline_indicator_two.setStyle('right', '0px');
  baseline_indicator_two.setStyle('width', '100%');
  baseline_indicator_two.setStyle('z-index', '9999');
  baseline_indicator_two.setStyle('border-top', '1px dashed red');
  baseline_indicator_two.inject(calculation_area_two);
  
});
