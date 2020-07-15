import React, { useMemo } from "react";
import Dialog from "./vendor/dialog";
import "./custom-dialog.css";
import CustomDialogBody from "./custom-dialog-body";
import morph from "../utils/morph";

const ANIMATION_DURATION = 280;

export default function CustomDialog({
  showDialogBtnElement,
  active,
  onDismiss,
}) {
  // This could be set based on a media query
  const REDUCE_MOTION = false;

  // Although I wouldn't recommend using morph for most dialogs, this morph animation
  // requires the most information of any commonly-used animation, which is why this
  // example uses it.
  const animation = useMemo(() => morph(ANIMATION_DURATION, REDUCE_MOTION), [
    REDUCE_MOTION,
  ]);

  return (
    <Dialog
      // For more, see: https://reach.tech/dialog/#labeling
      aria-label="Example Dialog"
      className="customDialog"
      overlayClassName="customDialog_overlay"
      active={active}
      onDismiss={onDismiss}
      showDialogBtnElement={showDialogBtnElement}
      animation={animation}
      animationDuration={ANIMATION_DURATION}
    >
      <CustomDialogBody onDismiss={onDismiss} />
    </Dialog>
  );
}
