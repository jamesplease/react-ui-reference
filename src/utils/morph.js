export default function morph(time) {
  return {
    enter({ overElRef, overBoundingBox, targetBoundingBox }) {
      if (!overElRef.current) {
        return;
      }
      overElRef.current.style.opacity = 0;
      overElRef.current.style.transition = "none";
      overElRef.current.style.transformOrigin = "top left";

      overElRef.current.style.transform = [
        `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
          targetBoundingBox.y - overBoundingBox.y
        }px, 0)`,
        `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
          targetBoundingBox.height / overBoundingBox.height
        })`,
      ].join(" ");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!overElRef.current) {
            return;
          }
          overElRef.current.style.transition = `opacity ${time}ms cubic-bezier(0.175, 0.885, 0.32, 1.275), transform ${time}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
          overElRef.current.style.opacity = 1;
          overElRef.current.style.transform = "none";
        });
      });
    },

    exit({ overElRef, overBoundingBox, targetBoundingBox }) {
      if (!overElRef.current) {
        return;
      }
      overElRef.current.style.transition = `opacity ${time}ms cubic-bezier(0.6, -0.28, 0.735, 0.045), transform ${time}ms cubic-bezier(0.6, -0.28, 0.735, 0.045)`;

      requestAnimationFrame(() => {
        if (!overElRef.current) {
          return;
        }
        overElRef.current.style.opacity = 0;
        overElRef.current.style.transformOrigin = "top left";

        overElRef.current.style.transform = [
          `translate3d(calc(${targetBoundingBox.x - overBoundingBox.x}px), ${
            targetBoundingBox.y - overBoundingBox.y
          }px, 0)`,
          `scale(${targetBoundingBox.width / overBoundingBox.width}, ${
            targetBoundingBox.height / overBoundingBox.height
          })`,
        ].join(" ");
      });
    },
  };
}
