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
    // modifiers: [{ name: "arrow", options: { element: arrowElement } }],
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
      <button type="button" onClick={open} ref={setReferenceElement}>
        Reference element
      </button>

      <Popover
        active={showDialog}
        onDismiss={close}
        ref={setPopperElement}
        refs={refs}
        popperStuff={popperStuff}
        popperStyle={styles.popper}
        popperAttributes={attributes.popper}
        placement={popperStuff.placement}
      >
        {/* Popper element
        <div ref={setArrowElement} style={styles.arrow} /> */}
      </Popover>
    </div>
  );
}
