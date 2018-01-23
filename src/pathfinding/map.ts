import Tile from './tile';
export default class Map {

    public width: number;
    public height: number;
    public obstacleProb: number;
    public tiles: Tile[];

    constructor(width: number = 24, height: number = 24, obstacleProb: number = 0.2) {
        this.width = width;
        this.height = height;
        this.obstacleProb = obstacleProb;
        this.generate();
    }

    public generate() {
        this.tiles = [];

        for (let row = 0; row < this.width; row++) {
            for (let col = 0; col < this.height; col++) {
                const isObstacle = (Math.floor(Math.random() * 100) + 1) <= (this.obstacleProb * 100);
                this.tiles.push(new Tile(row, col, isObstacle));
            }
        }

        console.log(this.tiles);
    }

}
