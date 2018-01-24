import { notImplemented } from '@angular/core/src/render3/util';
import Map from '../map';
import Tile from '../tile';
import Node from './node';
import PathResult from './pathResult';

export default abstract class AStarAlgorithm {

    protected map: Map;

    public heuristic(currentTile: Tile): number {
        if (!this.map) {
            throw new Error('Call getShortestPath first.');
        }

        return Math.max(Math.abs(currentTile.row - this.map.end.row), Math.abs(currentTile.col - this.map.end.col));
    }

    public getShortestPath(map: Map): PathResult {
        this.map = map;
        return this.getPath();
    }

    protected findLowestF(openList: Node[]): any {
        let lowestNode = openList[0];
        let lowestIndex = 0;

        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < lowestNode.f) {
                lowestNode = openList[i];
                lowestIndex = i;
            }
        }

        return {
            node: lowestNode,
            index: lowestIndex
        };
    }

    protected abstract getPath(): PathResult;

}
