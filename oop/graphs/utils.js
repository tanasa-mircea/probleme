function getTriangleCenter(a, b, c) {
  return [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3
  ];
}

function getColor() {
  return '#' + ((Math.floor(5592405 + Math.random()*8947848).toString(16)) + '543215').slice(2,8);
}