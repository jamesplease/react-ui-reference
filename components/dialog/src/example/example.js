import React, { useState } from "react";
import "./example.css";
import CustomDialog from "./custom-dialog";

export default function Example() {
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogBtnElement, setShowDialogBtnElement] = useState(null);

  return (
    <div className="example">
      <button
        type="button"
        className="example_btn"
        onClick={() => setShowDialog(true)}
        ref={setShowDialogBtnElement}
      >
        Open Dialog
      </button>

      <CustomDialog
        showDialogBtnElement={showDialogBtnElement}
        active={showDialog}
        onDismiss={() => setShowDialog(false)}
      />
    </div>
  );
}
