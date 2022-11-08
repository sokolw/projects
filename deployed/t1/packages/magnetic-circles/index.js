const MAGNETIC_CIRCLE_SELECTOR = ".magnetic-circle";
const RATIO = 3;

const getMagneticCirclePos = (elemCircle) => {
  const pos = elemCircle.getBoundingClientRect();
  const radius = pos.width / 2;
  return { x: pos.left + radius, y: pos.top + radius, radius };
};

const getAngleBetweenOffsets = (x, y) => {
  let result;
  if ((x > 0 && y > 0) || (x < 0 && y > 0)) {
    result = Math.PI / 2 - Math.atan(x / y);
  }
  if ((x < 0 && y < 0) || (x > 0 && y < 0)) {
    result = (3 * Math.PI) / 2 - Math.atan(x / y);
  }
  return (180 / Math.PI) * result;
};

const drawRotate = (x, y, elemCircle) => {
  elemCircle.style.transform = `rotate(${getAngleBetweenOffsets(x, y)}deg)`;
};

const getDiameter = (radius) => {
  return radius * 2;
};

const getCurrentOffsetRadius = (rectX, rectY) => {
  return Math.sqrt(rectX ** 2 + rectY ** 2);
};

const getOffsetMouse = (
  mousePos = { x: 0, y: 0 },
  circlePos = { x: 0, y: 0 }
) => {
  return {
    // window.pageXOffset location after scroll
    offsetX: mousePos.x - circlePos.x + window.pageXOffset,
    offsetY: mousePos.y - circlePos.y + window.pageYOffset,
  };
};

const setCirclePosition = (center = { x: 0, y: 0 }, radius = 0, elemCircle) => {
  elemCircle.style.left = `${center.x - radius}px`;
  elemCircle.style.top = `${center.y - radius}px`;
  elemCircle.style.width = `${radius * 2}px`;
  elemCircle.style.height = `${radius * 2}px`;
  return center;
};

const handlerMagneticCircles = (circles) => {
  return (event) => {
    const mousePos = { x: event.clientX, y: event.clientY };
    circles.forEach((circle) => {
      const offsetMouse = getOffsetMouse(mousePos, circle.basePos);
      const actionCircleArea = getDiameter(circle.basePos.radius) * RATIO;
      const currentOffsetRadius = getCurrentOffsetRadius(
        offsetMouse.offsetX,
        offsetMouse.offsetY
      );

      if (
        actionCircleArea > currentOffsetRadius &&
        currentOffsetRadius > circle.basePos.radius * RATIO
      ) {
        setCirclePosition(
          circle.basePos,
          circle.basePos.radius + (actionCircleArea - currentOffsetRadius),
          circle.elem
        );
        drawRotate(offsetMouse.offsetX, offsetMouse.offsetY, circle.elem);
      }

      if (
        actionCircleArea > currentOffsetRadius &&
        currentOffsetRadius < circle.basePos.radius * RATIO
      ) {
        setCirclePosition(
          circle.basePos,
          circle.basePos.radius + currentOffsetRadius,
          circle.elem
        );
        drawRotate(offsetMouse.offsetX, offsetMouse.offsetY, circle.elem);
      }
    });
  };
};

const createHandlerMagneticCircles = (circles) => {
  document.addEventListener("mousemove", handlerMagneticCircles(circles));
};

export const initMagneticCircles = () => {
  const circles = Array.from(
    document.querySelectorAll(MAGNETIC_CIRCLE_SELECTOR)
  ).map((item) => {
    return {
      elem: item,
      basePos: getMagneticCirclePos(item),
    };
  });
  createHandlerMagneticCircles(circles);
};
