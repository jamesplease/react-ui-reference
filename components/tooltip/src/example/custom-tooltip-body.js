import React, { useState, useEffect } from "react";

/*
  This is a separate component so that the state gets wiped automatically on unmount. Were
  this to be moved into the CustomTooltip component, then it would always be mounted, and the
  state would never clear. This typically makes it more difficult to work with stateful tooltips,
  such as forms.
*/

export default function CustomTooltipBody({ onDismiss }) {
  // This state is automatically reset back to 0 when the tooltip unmounts
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>This is a tooltip. {count}.</div>
    </>
  );
}
