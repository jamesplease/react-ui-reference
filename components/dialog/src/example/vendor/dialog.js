import React, { useState, useMemo } from "react";
import classnames from "classnames";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useMountTransition, useCurrentRef } from "core-hooks";
import "./dialog.css";

export default function Dialog({
  children,
  className = "",
  overlayClassName = "",

  active,
  onDismiss,

  showDialogBtnElement,
  disableScroll = true,

  animation,
  animationDuration = 150,

  onEntering,
  onEnter,
  onLeaving,
  onLeave,

  ...otherProps
}) {
  const [dialogElement, setDialogElement] = useState(null);
  const dialogElementRef = useCurrentRef(dialogElement);

  const relevantElements = useMemo(() => {
    return {
      showDialogBtnElement,
      dialogElement,
    };
  }, [showDialogBtnElement, dialogElement]);

  const relevantElementsRef = useCurrentRef(relevantElements);

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
          overBoundingBox: relevantElementsRef.current.dialogElement.getBoundingClientRect(),
          targetBoundingBox: relevantElementsRef.current.showDialogBtnElement.getBoundingClientRect(),
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
          overBoundingBox: relevantElementsRef.current.dialogElement.getBoundingClientRect(),
          targetBoundingBox: relevantElementsRef.current.showDialogBtnElement.getBoundingClientRect(),
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
      className={classnames(`dialog_overlay ${overlayClassName}`, {
        "dialog_overlay-active": useActiveClass,
      })}
      style={{
        "--dialog-animation-duration": `${animationDuration}ms`,
      }}
      dangerouslyBypassScrollLock={!disableScroll}
      isOpen={shouldMount}
      onDismiss={onDismiss}
    >
      <DialogContent
        ref={setDialogElement}
        className={classnames(`dialog ${className}`, {
          "dialog-active": useActiveClass,
        })}
        {...otherProps}
      >
        <div>{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
}
