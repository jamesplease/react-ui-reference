import React, { useState, useMemo } from "react";
import { usePopper } from "react-popper";
import "./popover-example.css";
import Popover from "./popover";

export default function PopoverExample() {
  const [showDialog, setShowDialog] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  // const [arrowElement, setArrowElement] = useState(null);
  const popperStuff = usePopper(referenceElement, popperElement, {
    modifiers: [
      // { name: "arrow", options: { element: arrowElement } }
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });
  const { styles, attributes } = popperStuff;

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const refs = useMemo(() => {
    return {
      referenceElement,
      popperElement,
    };
  }, [referenceElement, popperElement]);

  return (
    <div className="popoverExample">
      <button
        type="button"
        className="openPopover"
        onClick={open}
        ref={setReferenceElement}
      >
        Open Popover
      </button>

      <Popover
        active={showDialog}
        onDismiss={close}
        ref={setPopperElement}
        refs={refs}
        popperStuff={popperStuff}
        popperStyle={styles.popper}
        aria-label="Example Dialog"
        popperAttributes={attributes.popper}
        placement={popperStuff.placement}
      >
        <div>This is a popover dialog.</div>
        <br />
        <button onClick={close}>Okay</button>
        {/* Popper element
        <div ref={setArrowElement} style={styles.arrow} /> */}
      </Popover>
    </div>
  );
}
