import React, { useMemo } from "react";
import Tooltip from "./vendor/tooltip";
import "./custom-tooltip.css";
import CustomTooltipBody from "./custom-tooltip-body";
import morph from "../utils/morph";

const ANIMATION_DURATION = 150;

export default function CustomTooltip({
  referenceElement,
  active,
  onDismiss,
  displayTooltip,
}) {
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

  // This could be set based on a media query
  const REDUCE_MOTION = false;

  const animation = useMemo(() => morph(ANIMATION_DURATION, REDUCE_MOTION), [
    REDUCE_MOTION,
  ]);

  return (
    <Tooltip
      className="customTooltip"
      active={active}
      onDismiss={onDismiss}
      allowHover={true}
      referenceElement={referenceElement}
      animation={animation}
      animationDuration={ANIMATION_DURATION}
      popperOptions={popperOptions}
      displayTooltip={displayTooltip}
      // arrowRef={setArrowElement}
      // arrowProps={{
      //   className: "customTooltip_arrow",
      // }}
    >
      <CustomTooltipBody onDismiss={onDismiss} />
    </Tooltip>
  );
}
