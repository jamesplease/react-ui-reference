# Popover

A popover is a [modal](https://en.wikipedia.org/wiki/Modal_window) that appears in relation
to another element on the page.

The difference between a Popover and a Dialog is that the Dialog is always centered on the screen. Aside
from that difference, the interaction design of both of these components is identical.

## Features

These are the features of the Popover that come out-of-the-box

- Positioned relative to another element on the page
- Focus lock
- Scroll lock (optionally)
- ESC to close the popover

## Example Details

These are things that are a part of this example, but are not a part of the Popover itself.

- a "morph" transition
- a "reduce motion" API for the transition
- a darkened overlay background

## Implementation

These are the libraries that enable the features described above.

- [React Popper](https://popper.js.org/docs/v2/) for popover placement
- [Reach UI Dialog](https://reach.tech/dialog/) for a11y, scroll locking, focus locking
- [core-hooks useMountTransition](https://github.com/jamesplease/core-hooks#usemounttransition-options-) for mount/unmount animations

## Future work

- Support popover arrows
