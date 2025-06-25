class Cube {
  constructor() {
    this.sides = {
      top: Array(9).fill('w'),
      bottom: Array(9).fill('y'),
      front: Array(9).fill('g'),
      back: Array(9).fill('b'),
      left: Array(9).fill('o'),
      right: Array(9).fill('r')
    };
  }

  spinFace(face) {
    const a = this.sides[face];
    this.sides[face] = [a[6], a[3], a[0], a[7], a[4], a[1], a[8], a[5], a[2]];
  }

  twist(part) {
    this.spinFace(part);
    let t = this.sides.top.slice();
    let b = this.sides.bottom.slice();
    let l = this.sides.left.slice();
    let r = this.sides.right.slice();
    let f = this.sides.front.slice();
    let ba = this.sides.back.slice();

    switch (part) {
      case 'front':
        [this.sides.top[6], this.sides.top[7], this.sides.top[8]] = [l[8], l[5], l[2]];
        [this.sides.right[0], this.sides.right[3], this.sides.right[6]] = [t[6], t[7], t[8]];
        [this.sides.bottom[2], this.sides.bottom[1], this.sides.bottom[0]] = [r[0], r[3], r[6]];
        [this.sides.left[2], this.sides.left[5], this.sides.left[8]] = [b[2], b[1], b[0]];
        break;
      case 'back':
        [this.sides.top[0], this.sides.top[1], this.sides.top[2]] = [r[8], r[5], r[2]];
        [this.sides.left[0], this.sides.left[3], this.sides.left[6]] = [t[2], t[1], t[0]];
        [this.sides.bottom[8], this.sides.bottom[7], this.sides.bottom[6]] = [l[0], l[3], l[6]];
        [this.sides.right[8], this.sides.right[5], this.sides.right[2]] = [b[6], b[7], b[8]];
        break;
    }
  }

  mix(times = 10) {
    const sides = ['front', 'back', 'left', 'right', 'top', 'bottom'];
    for (let c = 0; c < times; c++) {
      const rand = sides[Math.floor(Math.random() * sides.length)];
      this.twist(rand);
    }
  }

  reset() {
    this.sides = new Cube().sides;
  }

  toString() {
    return this.sides.top.join('') +
           this.sides.right.join('') +
           this.sides.front.join('') +
           this.sides.bottom.join('') +
           this.sides.left.join('') +
           this.sides.back.join('');
  }
}

const cubeModel = new Cube();

function formatCubeView(code) {
  let r = '';
  r += 'Top:    ' + code.slice(0, 9).split('').join(' ') + '\n';
  r += 'Right:  ' + code.slice(9, 18).split('').join(' ') + '\n';
  r += 'Front:  ' + code.slice(18, 27).split('').join(' ') + '\n';
  r += 'Bottom: ' + code.slice(27, 36).split('').join(' ') + '\n';
  r += 'Left:   ' + code.slice(36, 45).split('').join(' ') + '\n';
  r += 'Back:   ' + code.slice(45, 54).split('').join(' ') + '\n';
  return r;
}

function draw() {
  document.getElementById("display").innerText = formatCubeView(cubeModel.toString());
}

function mixCube() {
  cubeModel.mix();
  draw();
}

function resetCube() {
  cubeModel.reset();
  draw();
}

draw();