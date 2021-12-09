function drawPlus(ctx, x, y, size, ratio) {
  const small = size * ratio;
  const offset = size / 2 - small / 2;
  ctx.fillRect(x, y + offset, size, small);
  ctx.fillRect(x + offset, y, small, size);
}

console.log("test");

class Plusgrid {
  static get inputProperties() {
    return [
      "--plus-spacing",
      "--plus-spacing-y-ratio",
      "--plus-size",
      "--plus-color",
      "--plus-ratio",
      "--plus-amount",
      "--plus-spacing-clean",
    ];
  }

  paint(ctx, canvasSize, props) {
    // Get the CSS vars
    const size = parseInt(props.get(`--plus-size`));
    const shapeRatio = parseFloat(props.get(`--plus-ratio`));
    const color = props.get(`--plus-color`);

    // These might change
    let spacingX = parseInt(props.get(`--plus-spacing`));
    let spacingY = spacingX * parseInt(props.get(`--plus-spacing-y-ratio`));
    let offsetX = (spacingX - size) / 2;
    let offsetY = (spacingY - size) / 2;

    // Computed stuff
    const xAmount = parseInt(canvasSize.width / spacingX);
    const yAmount = parseInt(canvasSize.height / spacingY);

    ctx.fillStyle = color;

    // This is a fixed amount of pattern
    spacingX = canvasSize.width / xAmount;
    spacingY = canvasSize.height / yAmount;
    offsetX = (spacingX - size) / 2;
    offsetY = (spacingY - size) / 2;

    console.log(xAmount, yAmount);
    console.log(spacingX, spacingY);

    for (let i = 0; i < yAmount; i++) {
      let y = i * spacingY;
      for (let ii = 0; ii < xAmount; ii++) {
        let x = ii * spacingX;
        drawPlus(ctx, x + offsetX, y + offsetY, size, shapeRatio);
      }
    }
  }
}

registerPaint("plusgrid", Plusgrid);
