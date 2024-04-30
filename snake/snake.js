
function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.update = function(){
        if (this.total === this.tail.length){
            console.log(this.total);
            for (var i = 0; i < this.tail.length - 1; i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total -1 ] = createVector(this.x, this.y);
        
        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;
        this.limits();
    }
    this.death = function(){
        for (var i = 0; i < this.tail.length; i++){
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1){
                console.log('starting over');
                this.total = 0;
                this.tail = [];
            }
        }
    }
    this.limits = function(){
        if (this.x > width){
            this.x = 0;
        }
        if (this.x < 0){
            this.x = width;
        }
        if (this.y > height){
            this.y = 0;
        }
        if (this.y < 0){
            this.y = height;
        }
    }

    this.show = function(){
        fill(255);
        for (var i = 0; i < this.total; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.dir = function(x, y){
        if (this.xspeed === -1 && x === 1){
            return;
        }
        if (this.xspeed === 1 && x === -1){
            return;
        }
        if (this.yspeed === 1 && y === -1){
            return;
        }
        if (this.yspeed === -1 && y === 1){
            return;
        }
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(){
        if (this.x === food.x && this.y === food.y){
            pickLocation();
            this.total++;
        }
    }
}