export const setBodySizeAndOffset = (element, widthFactor, heightFactor) => {
  element.body.setSize(
    element.width * widthFactor,
    element.height * heightFactor
  );
  element.body.setOffset(
    (element.width - element.width * widthFactor) / 2,
    (element.height - element.height * heightFactor) / 2
  );
};
