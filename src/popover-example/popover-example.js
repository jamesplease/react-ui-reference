import React, { useState } from "react";
import "./popover-example.css";
import Popover from "./popover";

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

      <Popover
        active={showDialog}
        onDismiss={() => setShowDialog(false)}
        aria-label="Example Dialog"
        referenceElement={referenceElement}
      >
        <div>This is a popover dialog.</div>
        <br />
        <button onClick={() => setShowDialog(false)}>Okay</button>
      </Popover>
    </div>
  );
}
