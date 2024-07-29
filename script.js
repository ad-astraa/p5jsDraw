let penColor = 'black';
let penSize = 4;
let paths = [];
let currentPath = [];
let bgColor = 255;

function setup() {
  createCanvas(400, 300);
  createUI();
  background(bgColor);
}

function draw() {
  background(bgColor);
  noFill();

  for (let i = 0; i < paths.length; i++) {
    beginShape();
    for (let j = 0; j < paths[i].length; j++) {
      stroke(paths[i][j].color);
      strokeWeight(paths[i][j].size);
      vertex(paths[i][j].x, paths[i][j].y);
    }
    endShape();
  }

  if (mouseIsPressed) {
    let point = {
      x: mouseX,
      y: mouseY,
      color: penColor,
      size: penSize
    };
    currentPath.push(point);
  }
}

function mousePressed() {
  currentPath = [];
  paths.push(currentPath);
}

function createUI() {
  // Color buttons
  let colors = ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'orange'];
  for (let i = 0; i < colors.length; i++) {
    let button = createButton(colors[i]);
    button.position(10 + i * 60, height + 10);
    button.style('background-color', colors[i]);
    button.style('color', 'white');
    button.style('border', 'none');
    button.style('padding', '5px');
    button.style('border-radius', '4px');
    button.mousePressed(() => setPenColor(colors[i]));
  }

  // Pen size slider
  let slider = createSlider(1, 20, penSize);
  slider.position(10, height + 50);
  slider.input(() => setPenSize(slider.value()));

  // Clear button
  let clearButton = createButton('Clear');
  clearButton.position(10, height + 90);
  clearButton.mousePressed(clearCanvas);

  // Undo button
  let undoButton = createButton('Undo');
  undoButton.position(80, height + 90);
  undoButton.mousePressed(undoLast);

  // Save button
  let saveButton = createButton('Save');
  saveButton.position(150, height + 90);
  saveButton.mousePressed(saveDrawing);

  // Background color selector
  let bgColorPicker = createColorPicker('#ffffff');
  bgColorPicker.position(220, height + 90);
  bgColorPicker.input(() => setBackgroundColor(bgColorPicker.color()));
}

function setPenColor(color) {
  penColor = color;
}

function setPenSize(size) {
  penSize = size;
}

function clearCanvas() {
  paths = [];
  background(bgColor);
}

function undoLast() {
  paths.pop();
}

function saveDrawing() {
  saveCanvas('myDrawing', 'png');
}

function setBackgroundColor(color) {
  bgColor = color;
}
