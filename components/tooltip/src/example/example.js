import React, { useState } from "react";
import "./example.css";
import CustomTooltip from "./custom-tooltip";

export default function Example() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);

  return (
    <div className="example">
      <div
        className="example_text"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        ref={setReferenceElement}
      >
        Hover for a Tooltip
      </div>

      <CustomTooltip
        referenceElement={referenceElement}
        active={showTooltip}
        onDismiss={() => setShowTooltip(false)}
      />
    </div>
  );
}
