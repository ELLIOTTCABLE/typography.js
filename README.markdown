Typography.js
=============
This is a small project that simply brings together several useful JavaScript
functions:

- `Typography.baseline(element)` will calculate the baseline ratio of a given
  element. This is mostly used internally, but it’s useful enough that I made
  it a publicly-available function.
- `Typography.underline(element, style)` will draw a “typographically proper”
  underline directly under a given element (e.g. an underline with “holes” in
  it for the typeface’s descenders).

Requirements
------------
Currently, Typography.js relies on MooTools (built using `mootools-1.2.1-core`,
though other versions may work). I’m not very good at JavaScript, at all — the
plan is to eventually be framework‐agnostic, but I’m certainly not there yet.

Plans
-----
I’m a huge typophile, and I’m always interested in anything related to
anything that might improve the state of typography on the web. Please feel
free to contact me if you see a problem that you’d like me to consider
attempting to fix and include in this library, that relates to typography in
any way. That being said, I’ve got several plans for this library, which may
or may not see implementation:

- A collection of functions providing designers with the ability to design
  against a true “baseline grid” on the web as has been standard in the print
  design industry for ages. Not just a “vertical rhythm”, mind you. See some
  of these articles for more information: [Setting up a Baseline Grid][baseline grid],
  [Compose to a Vertical Rhythm][vertical rhythm], [Setting Type on the Web][fake baseline grid],
  [Incremental Leading][incremental leading]
- Some sort of central system for using typefaces on the web. Should
  automatically use whichever of the following systems make most sense in a
  given context: [`@font-face`][font-face], [Cufón][], [sIFR][], or IE’s
  [Embedded OpenType][eot] (in approximate order of usefulness). Other things
  worth looking at may be [dojo.gfx’s implementation][dojo.gfx] and SVG fonts.

  [baseline grid]: <http://typophile.com/node/47265> "Aligning your work to a baseline grid in Adobe InDesign"
  [vertical rhythm]: <http://24ways.org/2006/compose-to-a-vertical-rhythm> "Richard Rutter’s article on designing against a “Vertical Rhythm” on the web"
  [fake baseline grid]: <http://www.alistapart.com/articles/settingtypeontheweb> "Setting Type on the Web to a Baseline Grid from the astute A List Apart"
  [incremental leading]: <http://www.markboulton.co.uk/journal/comments/incremental_leading/> "An article on “incremental leading” on the web, by Mark Boulton"
  [Cufón]: <http://cufon.shoqolate.com/> "Fast text replacement with canvas and VML"
  [sIFR]: <http://wiki.novemberborn.net/sifr/> "Scalable Inman Flash Replacement"
  [font-face]: <http://webfonts.info/> "The proper, standardized method to utilize typefaces on the web"
  [eot]: <http://www.fontembedding.com/eot/> "Microsoft’s old-ass hack on `@font-face`"
  [dojo.gfx]: <http://www.sitepen.com/blog/2008/09/08/custom-fonts-with-dojoxgfx/> "A new system, in the Dojo toolkit, for designing on SVG fonts"
