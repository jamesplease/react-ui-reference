import React, { useState, useRef } from "react";
import "./example.css";
import CustomTooltip from "./custom-tooltip";

export default function Example() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const hideTooltipTimerRef = useRef();

  function displayTooltip() {
    clearTimeout(hideTooltipTimerRef.current);
    setShowTooltip(true);
  }

  function hideTooltip() {
    clearTimeout(hideTooltipTimerRef.current);

    hideTooltipTimerRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 350);
  }

  return (
    <div className="example">
      <div
        className="example_text"
        onMouseEnter={displayTooltip}
        onMouseLeave={hideTooltip}
        ref={setReferenceElement}
      >
        Hover for a Tooltip
        <CustomTooltip
          referenceElement={referenceElement}
          active={showTooltip}
          displayTooltip={displayTooltip}
          onDismiss={hideTooltip}
        />
      </div>
    </div>
  );
}
