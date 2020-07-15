# UI Reference

Some common UI elements are quite difficult to implement correctly; one example are modals. This repository
is a reference implementation of some of these more difficult UI elements.

This is _not_ a UI component library that you can `npm install` and use in your application. Instead, this is a
collection of example implementations that you can reference when creating _your own_ components.

## Goals

The UI elements in this repository should:

- follow a11y best practices, including
  - focus trapping
  - scroll locking
  - allow users to press <kbd>ESC</kbd> to exit modals
  - ARIA attributes
- support mount/unmount animations
  - support for both JS and CSS animations
  - support animations that depend on bounding boxes of relevant elements
  - demonstrate support for `prefers-reduced-motion`
- avoid "z-index" issues (and [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) issues)

## Examples

- [Popover](./components/popover)

#### Coming soon

- Dialog
- Alert
- Menu
- Tooltip
