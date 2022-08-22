export const createSvg = (canvas_ref, svg_ref, props) => {
  const base64_default = getBase64(canvas_ref, props)
  const base64 = base64_default.replace('data:image/png;base64,', '')

  const svg = svg_ref.current
  return {svg, base64}
}

const getBase64 = (canvas_ref, props) => {
  const { width, height, blocks } = props

  var canvas = canvas_ref.current
  var ctx = canvas.getContext("2d")

  var canvas_copy = document.createElement('canvas')
  var ctx_copy = canvas_copy.getContext("2d")

  canvas_copy.width = blocks
  canvas_copy.height = blocks

  ctx_copy.msImageSmoothingEnabled = false;
  ctx_copy.mozImageSmoothingEnabled = false;
  ctx_copy.webkitImageSmoothingEnabled = false;
  ctx_copy.imageSmoothingEnabled = false;

  ctx_copy.drawImage(canvas, 0, 0, blocks, blocks)

  return canvas_copy.toDataURL()
}

const getColors = (canvas_ref, props) => {
  const { width, height, blocks } = props

  var canvas = canvas_ref.current
  var ctx = canvas.getContext("2d")

  var canvas_copy = document.createElement('canvas')
  var ctx_copy = canvas_copy.getContext("2d")
  ctx_copy.drawImage(canvas, 0, 0, blocks, blocks)

  var image_data = ctx_copy.getImageData(0, 0, blocks, blocks);
  var pixel_data = image_data.data;

  var colors = [[]]
  var counter = 0
  const row_end = 4 * blocks
  for (var i = 0, n = pixel_data.length; i < n; i += 4) {
    if (Number.isInteger(i / row_end) && i !== 0){
      counter++
    }

    if (!colors[counter]) {
      colors[counter] = []
    }
    const hex = rgbToHex(pixel_data[i], pixel_data[i+1], pixel_data[i+2])
    // colors[counter].push(`rgb(${pixel_data[i]},${pixel_data[i+1]},${pixel_data[i+2]})`)
    colors[counter].push(hex)
  }

  return colors
}

const colorsToString = (colors) => {
  var string = colors.flat().toString()
  return string
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
