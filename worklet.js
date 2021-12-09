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
      "--plus-spacing-x",
      "--plus-spacing-y",
      "--plus-size",
      "--plus-color",
      "--plus-ratio",
    ];
  }

  paint(ctx, size, props) {
    const plusSpacingX = parseInt(props.get(`--plus-spacing-x`));
    const plusSpacingY = parseInt(props.get(`--plus-spacing-y`));
    const plusSize = parseInt(props.get(`--plus-size`));
    const plusRatio = parseFloat(props.get(`--plus-ratio`));
    const color = props.get(`--plus-color`);

    const offsetX = (plusSpacingX - plusSize) / 2;
    const offsetY = (plusSpacingY - plusSize) / 2;

    const lineAmount = size.height / plusSpacingY;
    const colAmount = size.width / plusSpacingX;

    ctx.fillStyle = color;

    for (let i = 0; i < lineAmount; i++) {
      let y = i * plusSpacingY;
      for (let ii = 0; ii < colAmount; ii++) {
        let x = ii * plusSpacingX;
        drawPlus(ctx, x + offsetX, y + offsetY, plusSize, plusRatio);
      }
    }
  }
}

registerPaint("plusgrid", Plusgrid);
