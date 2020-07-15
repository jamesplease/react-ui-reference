import React, { useMemo } from "react";
import Popover from "./vendor/popover";
import "./custom-popover.css";
import CustomPopoverBody from "./custom-popover-body";
import morph from "../utils/morph";

const ANIMATION_DURATION = 150;

export default function CustomPopover({ referenceElement, active, onDismiss }) {
  // const [arrowElement, setArrowElement] = useState(null);

  const popperOptions = {
    placement: "bottom-start",
    modifiers: [
      // { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  };

  // This could be set based on
  const REDUCE_MOTION = true;

  const animation = useMemo(() => morph(ANIMATION_DURATION, REDUCE_MOTION), [
    REDUCE_MOTION,
  ]);

  return (
    <Popover
      {/* For more, see: https://reach.tech/dialog/#labeling */}
      aria-label="Example Dialog"
      className="customPopover"
      overlayClassName="customPopover_overlay"
      active={active}
      onDismiss={onDismiss}
      referenceElement={referenceElement}
      animation={animation}
      animationDuration={ANIMATION_DURATION}
      popperOptions={popperOptions}
      // arrowRef={setArrowElement}
      // arrowProps={{
      //   className: "customPopover_arrow",
      // }}
    >
      <CustomPopoverBody onDismiss={onDismiss} />
    </Popover>
  );
}
