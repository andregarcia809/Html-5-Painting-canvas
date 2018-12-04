const canvas = document.querySelector('#draw');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = '#bada55';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 100;
context.globalCompositeOperation = 'overlay';



// flag (checker)for when to draw
let isDrawing = false;
let lastX = 0; //start of the drawing line
let lastY = 0; // End of drawing line
// changes the color on the drawing line
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return // Stops function from running if they are not moused down (pressed)
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.beginPath();
  //Start from
  context.moveTo(lastX, lastY);
  // Go to where ever the user goes to
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  // es6 destructuring an array
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  // Resets hue
  if(hue >= 360) {
    hue = 0;
  }
  // Allows line width to increment and decrement
  if(context.lineWidth >= 100 || context.lineWidth <= 1) {
    direction = !direction;
  }
  if(direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  };
};
// Starts drawing on mouse down
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);