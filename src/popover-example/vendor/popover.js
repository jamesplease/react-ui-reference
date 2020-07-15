import React, { useRef, useState, useMemo } from "react";
import classnames from "classnames";
import { usePopper } from "react-popper";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useMountTransition, useCurrentRef, usePrevious } from "core-hooks";
import "./popover.css";

export default function Popover({
  children,
  className = "",
  overlayClassName = "",

  active,
  onDismiss,

  referenceElement,
  disableScroll = true,

  animation,
  animationDuration = 150,

  onEntering,
  onEnter,
  onLeaving,
  onLeave,

  popperOptions,
  arrowRef,

  ...otherProps
}) {
  const dialogElementRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    popperOptions
  );

  const popperElements = useMemo(() => {
    return {
      referenceElement,
      popperElement,
    };
  }, [referenceElement, popperElement]);

  const popperElementsRef = useCurrentRef(popperElements);
  const previousPopperElements = usePrevious(popperElements);
  const previousPopperElementsRef = useCurrentRef(previousPopperElements);

  const callbackRefs = useCurrentRef({
    onEntering,
    onEnter,
    onLeaving,
    onLeave,
  });

  const [shouldMount, useActiveClass] = useMountTransition({
    shouldBeMounted: active,
    transitionDurationMs: animationDuration,
    onEnteringTimeout: true,
    onEntering() {
      if (animation && typeof animation.enter === "function") {
        animation.enter({
          overElRef: dialogElementRef,
          overBoundingBox: popperElementsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: popperElementsRef.current.referenceElement.getBoundingClientRect(),
          reduceMotion: false,
        });
      }

      if (typeof callbackRefs.current.onEntering === "function") {
        callbackRefs.current.onEntering();
      }
    },
    onLeaving() {
      if (animation && typeof animation.exit === "function") {
        animation.exit({
          overElRef: dialogElementRef,
          overBoundingBox: previousPopperElementsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: previousPopperElementsRef.current.referenceElement.getBoundingClientRect(),
          reduceMotion: false,
        });
      }

      if (typeof callbackRefs.current.onLeaving === "function") {
        callbackRefs.current.onLeaving();
      }
    },

    onEnter() {
      if (typeof callbackRefs.current.onEnter === "function") {
        callbackRefs.current.onEnter();
      }
    },

    onLeave() {
      if (typeof callbackRefs.current.onLeave === "function") {
        callbackRefs.current.onLeave();
      }
    },
  });

  if (!shouldMount) {
    return null;
  }

  return (
    <DialogOverlay
      className={classnames(`popover_overlay ${overlayClassName}`, {
        "popover_overlay-active": useActiveClass,
      })}
      style={{
        "--popover-animation-duration": `${animationDuration}ms`,
      }}
      dangerouslyBypassScrollLock={!disableScroll}
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
          ref={dialogElementRef}
          className={classnames(`popover ${className}`, {
            "popover-active": useActiveClass,
          })}
          {...otherProps}
        >
          {children}
          {arrowRef && (
            <div
              className="popover_arrow"
              ref={arrowRef}
              style={styles.arrow}
            />
          )}
        </DialogContent>
      </div>
    </DialogOverlay>
  );
}
