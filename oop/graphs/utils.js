function getTriangleCenter(a, b, c) {
  return [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3
  ];
}

function getColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}