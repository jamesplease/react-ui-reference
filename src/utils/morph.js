export default function morph(time) {
  return {
    enter({
      overElRef,
      overBoundingBox,
      targetBoundingBox,
      reduceMotion = false,
    }) {
      if (!overElRef.current) {
        return;
      }
      overElRef.current.style.opacity = 0;
      overElRef.current.style.transition = "none";
      overElRef.current.style.transformOrigin = "top left";

      if (!reduceMotion) {
        overElRef.current.style.transform = [
          `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
            targetBoundingBox.y - overBoundingBox.y
          }px, 0)`,
          `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
            targetBoundingBox.height / overBoundingBox.height
          })`,
        ].join(" ");
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!overElRef.current) {
            return;
          }

          const opacityCurve = reduceMotion
            ? "ease-in-out"
            : "cubic-bezier(0.175, 0.885, 0.32, 1.275)";

          overElRef.current.style.transition = `opacity ${time}ms ${opacityCurve}, transform ${time}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
          overElRef.current.style.opacity = 1;
          overElRef.current.style.transform = "none";
        });
      });
    },

    exit({
      overElRef,
      overBoundingBox,
      targetBoundingBox,
      reduceMotion = false,
    }) {
      if (!overElRef.current) {
        return;
      }

      overElRef.current.style.transition = `opacity ${time}ms ease-out, transform ${time}ms ease-out`;

      requestAnimationFrame(() => {
        if (!overElRef.current) {
          return;
        }
        overElRef.current.style.opacity = 0;
        overElRef.current.style.transformOrigin = "top left";

        if (!reduceMotion) {
          overElRef.current.style.transform = [
            `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
              targetBoundingBox.y - overBoundingBox.y
            }px, 0)`,
            `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
              targetBoundingBox.height / overBoundingBox.height
            })`,
          ].join(" ");
        }
      });
    },
  };
}
