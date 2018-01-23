export default class Tile {

    public row: number;
    public col: number;
    public isObstacle: boolean;

    constructor(row: number, col: number, isObstacle: boolean) {
        this.row = row;
        this.col = col;
        this.isObstacle = isObstacle;
    }

}
