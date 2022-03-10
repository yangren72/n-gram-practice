let txt,
  txt2,
  txtCon,
  order = 10,
  len = 1000;
ngrams = {};
let img;
let cap = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function preload() {
  txt = loadStrings("one hundred years.txt");
}

function setup() {
  createCanvas(660, 340);
  background(0);
  //textAlign(CENTER);
  textSize(20);
  textFont("Courier");

  txtCon = RiTa.untokenize(txt);
  txtCon = txtCon.replace(/�/g, "");
  txtCon = txtCon.replace(/\s\s/g, " ");
  txtCon = txtCon.replace(/\s\s/g, " ");

  for (i = 0; i < txtCon.length - order; i++) {
    let gram = txtCon.substring(i, i + order);

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txtCon.charAt(i + order));
  }
}

function markovIt() {
  let firstW = floor(random(txtCon.length));
  while (cap.includes(txtCon.charAt(firstW)) == false) {
    firstW = floor(random(txtCon.length));
  }

  let currentGram = txtCon.substring(firstW, firstW + order);

  let result = currentGram;

  let stop = 0;
  for (let i = 0; i < len; i++) {
    let possibilities = ngrams[currentGram];
    let next = random(possibilities);
    if (next == ".") stop++;
    result += next;
    currentGram = result.substring(result.length - order, result.length);
    if (stop > 2) break;
  }
  let result2 = result.charAt(0).toUpperCase() + result.slice(1);
  result2 = result2.replace(/\s\s/g, " ");
  return result2;
}

function mouseClicked() {
  background(0);
  fill(245);
  let test1 = markovIt();
  for (let i = 0; i < len; i++) {
    if (i % 100 == 0) {
      text(test1.substring(i, 100 + i), 30, 80 + i * 0.2);
    }
  }
  console.log(test1);
}
