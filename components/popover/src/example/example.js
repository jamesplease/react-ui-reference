import React, { useState } from "react";
import "./example.css";
import CustomPopover from "./custom-popover";

export default function Example() {
  const [showDialog, setShowDialog] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);

  return (
    <div className="example">
      <button
        type="button"
        className="example_btn"
        onClick={() => setShowDialog(true)}
        ref={setReferenceElement}
      >
        Open Popover
      </button>

      <CustomPopover
        referenceElement={referenceElement}
        active={showDialog}
        onDismiss={() => setShowDialog(false)}
      />
    </div>
  );
}
