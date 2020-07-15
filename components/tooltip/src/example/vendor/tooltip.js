import React, { useRef, useState, useMemo } from "react";
import classnames from "classnames";
import { usePopper } from "react-popper";
import { useMountTransition, useCurrentRef } from "core-hooks";
import "./tooltip.css";

export default function Tooltip({
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
  arrowProps,

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
          overBoundingBox: popperElementsRef.current.popperElement.getBoundingClientRect(),
          targetBoundingBox: popperElementsRef.current.referenceElement.getBoundingClientRect(),
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
    <div
      className="popper-wrapper"
      ref={setPopperElement}
      style={{
        ...styles.popper,
      }}
      {...attributes.popper}
    >
      <div
        ref={dialogElementRef}
        className={classnames(`tooltip ${className}`, {
          "tooltip-active": useActiveClass,
        })}
        {...otherProps}
      >
        <div>{children}</div>
        {arrowRef && (
          <div {...arrowProps} ref={arrowRef} style={styles.arrow} />
        )}
      </div>
    </div>
  );
}
