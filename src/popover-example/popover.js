import React, { forwardRef, useRef, useState, useMemo } from "react";
import classnames from "classnames";
import { usePopper } from "react-popper";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {
  useMountTransition,
  useConstant,
  useCurrentRef,
  usePrevious,
} from "core-hooks";
import "./popover.css";
import morph from "../utils/morph";

const Popover = forwardRef(
  (
    {
      active,
      onDismiss,
      animationDuration = 140,
      children,
      referenceElement,
      ...otherProps
    },
    ref
  ) => {
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const popperStuff = usePopper(referenceElement, popperElement, {
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    const { styles, attributes } = popperStuff;

    const dudeToTransitionRef = useRef(null);

    const animation = useConstant(() => morph(animationDuration));

    const refs = useMemo(() => {
      return {
        referenceElement,
        popperElement,
      };
    }, [referenceElement, popperElement]);

    const refsRef = useCurrentRef(refs);
    const previousRefs = usePrevious(refs);
    const previousRefsRef = useCurrentRef(previousRefs);

    const [shouldMount, useActiveClass] = useMountTransition({
      shouldBeMounted: active,
      transitionDurationMs: animationDuration,
      onEnteringTimeout: true,
      onEntering() {
        animation.enter({
          overElRef: dudeToTransitionRef,
          overBoundingBox: refsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: refsRef.current.referenceElement.getBoundingClientRect(),
          reduceMotion: false,
        });
      },
      onLeaving() {
        animation.exit({
          overElRef: dudeToTransitionRef,
          overBoundingBox: previousRefsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: previousRefsRef.current.referenceElement.getBoundingClientRect(),
          reduceMotion: false,
        });
      },
    });

    if (!shouldMount) {
      return null;
    }

    return (
      <DialogOverlay
        className={classnames("popover_overlay", {
          "popover_overlay-active": useActiveClass,
        })}
        style={{
          "--popover-animation-duration": `${animationDuration}ms`,
        }}
        isOpen={shouldMount}
        onDismiss={onDismiss}
      >
        {/* See: https://popper.js.org/docs/v2/faq/#how-do-i-add-css-transitions-without-disabling-adaptive */}
        <div
          className="popper-wrapper"
          ref={setPopperElement}
          style={{
            ...styles.popper,
          }}
          {...attributes.popper}
        >
          <DialogContent
            ref={dudeToTransitionRef}
            className={classnames("popover", {
              "popover-active": useActiveClass,
            })}
            {...otherProps}
          >
            {children}
          </DialogContent>
          <div
            className="popover_arrow"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      </DialogOverlay>
    );
  }
);

export default Popover;
