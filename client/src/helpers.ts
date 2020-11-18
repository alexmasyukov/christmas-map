export function getCSSTranslate3dValues(
  cssTransformValue: string
): [number, number] {
  // translateXY => /.?translateX\s?\(([0-9]+?)px\).*translateY\s?\(([0-9]+?)px\).?/
  const regexp = /.?translate3d\s?\((-?[0-9.]+?)px,\s?(-?[0-9.]+?)px.?/
  const mathResult = cssTransformValue.match(regexp)

  if (mathResult && mathResult.length >= 2) {
    const [_, tx, ty] = mathResult
    return [Math.floor(+tx), Math.floor(+ty)]
  }

  return [0, 0]
}
