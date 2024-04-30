var s;
var scl = 10;
var food;

function setup(){
    //crea la pantalla y la serpiente
    createCanvas(600, 600);
    s = new Snake();
    pickLocation();
}

function pickLocation(){
    //elige una ubicación aleatoria para la comida
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw(){
    //dibuja la serpiente y la comida
    background(0);
    s.eat();
    s.death();
    s.update();
    s.show();
    frameRate(10);

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function mousePressed(){
    // incrementa el tamaño de la serpiente al hacer click
    s.total = s.total + 1;
}

function keyPressed(){
    //cambia la dirección de la serpiente al presionar una tecla
    if (keyCode === UP_ARROW){
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW){
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW){
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW){
        s.dir(-1, 0);
    }
}