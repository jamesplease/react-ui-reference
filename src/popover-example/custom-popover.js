import React from "react";
import { useConstant } from "core-hooks";
import Popover from "./vendor/popover";
import "./custom-popover.css";
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

  const animation = useConstant(() => morph(ANIMATION_DURATION));

  return (
    <Popover
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
    >
      <div>This is a popover dialog.</div>
      <br />
      <button onClick={onDismiss}>Okay</button>
    </Popover>
  );
}
