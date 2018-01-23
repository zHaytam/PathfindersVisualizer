import { notImplemented } from '@angular/core/src/render3/util';
import Tile from '../tile';
import Path from './path';

export default abstract class AStarAlgorithm {

    public start: Tile; // { x, y }
    public end: Tile; // { x, y }

    public heuristic(currentPoint: Tile): number {
        if (!this.start || !this.end) {
            throw new Error('The ending point must be configured first.');
        }

        return Math.max(Math.abs(currentPoint.row - this.end.row), Math.abs(currentPoint.col - this.end.col));
    }

    public getShortestPath(start: Tile, end: Tile): Path {
        this.start = start;
        this.end = end;

        return this.getPath();
    }

    protected abstract getPath(): Path;

}
