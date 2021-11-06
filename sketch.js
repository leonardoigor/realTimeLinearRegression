let xs = [];
let ys = [];

let m, b;

const learningRate = 0.01;
const optimizer = tf.train.sgd(learningRate);
let w = window.innerWidth;
let h = window.innerHeight;
function setup() {
  createCanvas(w, h);
  background(0);
  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(8);

  if (xs.length > 0) {
    optimizer.minimize(() => loss(predict(xs), ys));
  }
  for (let i = 0; i < xs.length; i++) {
    let x = map(xs[i], 0, 1, 0, width);
    let y = map(ys[i], 0, 1, height, 0);
    point(x, y);
  }

  let x1 = [0, 1];
  let y1 = predict([0, 1]);
  //   y1.print();

  let xx1 = map(x1[0], 0, 1, 0, width);
  let xx2 = map(x1[1], 0, 1, 0, width);

  let yy1 = map(y1.dataSync()[0], 0, 1, height, 0);
  let yy2 = map(y1.dataSync()[1], 0, 1, height, 0);
  line(xx1, yy1, xx2, yy2);
}
function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}
function predict(x) {
  const tfxs = tf.tensor1d(x);
  const y = tfxs.mul(m).add(b);
  return y;
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  xs.push(x);
  ys.push(y);
}
