//programa que simula la caida de arena en una pantalla
//el color de la arena va cambiando conforme se va llenando la pantalla

function make2dArray(cols,rows){
    //crea un array de 2 dimensiones e inicializa cada elemento en 0
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++){
        arr[i] = new Array(rows);
        for (let j = 0; j < rows; j++){
            arr[i][j] = 0;
        }

    }
    return arr;
}

let grid;
let w = 10;
let cols,  rows;
let hueValue = 255;

function setup() {
    //crea la pantalla y el grid
    createCanvas(800, 600);
    colorMode(HSB, 360,255,255);
    cols = width/w;
    rows = height/w;
 
    grid = make2dArray(cols,rows);

    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j] = 0;
        }
    }
}

function withinCols(x){
    //verifica si x esta dentro de los limites de la pantalla
    return x >= 0 && x <= cols-1
}
function withinRows(y){
    //verifica si y esta dentro de los limites de la pantalla
    return y >= 0 && y <= rows-1
}

function mouseDragged(){
    //cambia el valor de la celda en la que se encuentra el mouse
    let i = floor(mouseX / w);
    let j = floor(mouseY / w);
    if (withinCols(i) && withinRows(j)){
        grid[i][j] = hueValue;
    }    
    hueValue = (hueValue + 1) % 360;
}



function draw() {
    background(0);

    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            noStroke();
            if (grid[i][j] > 0){
                fill(grid[i][j],255,255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
            
            
        }
    }
 
    let nextGrid = make2dArray(cols,rows);
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            let state = grid[i][j];
            if(state > 0){
                let below = grid[i][j+1];

                let dir = random([-1,1]);

                let belowR,belowL;
                //console.log(dir);

                if(withinCols(i+dir)){
                    belowR = grid[i+dir][j+1];
                }
                if(withinCols(i-dir)){
                    belowL = grid[i-dir][j+1];
                }

                if(below === 0){
                    nextGrid[i][j+1] = state;
                } else if (belowR === 0){
                    nextGrid[i+dir][j+1] = state;
                } else if (belowL === 0){
                    nextGrid[i-dir][j+1] = state;
                } else{
                    nextGrid[i][j] = state;
                }
            }
        }
    }
    grid = nextGrid;

}