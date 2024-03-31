class Pawn{
    constructor(){
        this.width = 100;
        this.height = 100;
        this.x = CANVAS_WIDTH - 400;
        this.y = CANVAS_HEIGHT - 400;
        this.direction_X = Math.random() + 41;
    }
}