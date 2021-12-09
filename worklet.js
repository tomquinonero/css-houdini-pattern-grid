function drawShape(ctx, shape, x, y, size, ratio) {
  console.log(shape);

  if (shape == "plus") {
    const small = size * ratio;
    const offset = size / 2 - small / 2;
    ctx.fillRect(x, y + offset, size, small);
    ctx.fillRect(x + offset, y, small, size);
  }

  if (shape == "square") {
    ctx.fillRect(x, y, size, size);
  }

  if (shape == "circle") {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  if (shape == "diamond") {
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x, y + size / 2);
    ctx.closePath();

    ctx.fill();
  }

  if (shape == "half-square") {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.closePath();

    ctx.fill();
  }
}

class PatternGrid {
  static get inputProperties() {
    return [
      "--pattern-spacing",
      "--pattern-spacing-y-ratio",
      "--pattern-size",
      "--pattern-color",
      "--pattern-ratio",
      "--pattern-amount",
      "--pattern-shape",
    ];
  }

  paint(ctx, canvasSize, props) {
    // Get the CSS vars
    const size = parseInt(props.get(`--pattern-size`));
    const shapeRatio = parseFloat(props.get(`--pattern-ratio`));
    const color = props.get(`--pattern-color`);
    const shape = props.get(`--pattern-shape`)[0].trim();

    // These might change
    let spacingX = parseInt(props.get(`--pattern-spacing`));
    let spacingY = spacingX * parseInt(props.get(`--pattern-spacing-y-ratio`));
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

    for (let i = 0; i < yAmount; i++) {
      let y = i * spacingY;
      for (let ii = 0; ii < xAmount; ii++) {
        let x = ii * spacingX;
        drawShape(ctx, shape, x + offsetX, y + offsetY, size, shapeRatio);
      }
    }
  }
}

registerPaint("pattern-grid", PatternGrid);
