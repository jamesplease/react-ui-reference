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
      refs,
      popperStyle,
      popperAttributes,
      placement,
      popperStuff,
      animationDuration = 140,
      children,
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
          ref={innerRef}
          style={{
            ...popperStyle,
          }}
          {...popperAttributes}
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
        </div>
      </DialogOverlay>
    );
  }
);

export default Popover;
