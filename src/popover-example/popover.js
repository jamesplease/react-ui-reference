import React, { forwardRef, useRef } from "react";
import classnames from "classnames";
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
      style,
      refs,
      popperStyle,
      popperAttributes,
      placement,
      popperStuff,
      animationDuration = 500,
      ...otherProps
    },
    ref
  ) => {
    const nodeRef = useRef(null);
    const dudeToTransitionRef = useRef(null);

    function innerRef(node) {
      nodeRef.current = node;
      ref(node);
    }

    const animation = useConstant(() => morph(animationDuration));
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
        });
      },
      onLeaving() {
        animation.exit({
          overElRef: dudeToTransitionRef,
          overBoundingBox: previousRefsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: previousRefsRef.current.referenceElement.getBoundingClientRect(),
        });
      },
    });

    if (!shouldMount) {
      return null;
    }

    return (
      <DialogOverlay
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
        isOpen={shouldMount}
        onDismiss={onDismiss}
      >
        {/* See: https://popper.js.org/docs/v2/faq/#how-do-i-add-css-transitions-without-disabling-adaptive */}
        <div
          className="popper-wrapper"
          ref={innerRef}
          style={{
            ...popperStyle,
          }}
          {...popperAttributes}
        >
          <DialogContent
            ref={dudeToTransitionRef}
            className={classnames("popover", {
              [`popover-${placement}`]: true,
              "popover-active": useActiveClass,
            })}
            style={{
              ...style,
              "--animationDuration": `${animationDuration}ms`,
              width: "10rem",
            }}
            aria-label="Example Dialog"
            {...otherProps}
          >
            <div>This is a popover.</div>
            <button onClick={onDismiss}>Okay</button>
          </DialogContent>
        </div>
      </DialogOverlay>
    );
  }
);

export default Popover;
