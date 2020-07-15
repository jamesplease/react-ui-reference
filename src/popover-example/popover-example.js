import React, { useState } from "react";
import "./popover-example.css";
import CustomPopover from "./custom-popover";

export default function PopoverExample() {
  const [showDialog, setShowDialog] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);

  return (
    <div className="popoverExample">
      <button
        type="button"
        className="openPopover"
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
