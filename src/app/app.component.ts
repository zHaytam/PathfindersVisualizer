import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { clearTimeout, setTimeout } from 'timers';
import Algorithm from '../pathfinding/algorithms/algorithm';
import AStarAlgorithm from '../pathfinding/algorithms/aStarAlgorithm';
import PathResult from '../pathfinding/algorithms/pathResult';
import Map from '../pathfinding/map';
import Tile, { TileTypes } from '../pathfinding/tile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

    @ViewChild('mapDiv') mapEl: ElementRef;
    @ViewChild('inputMapWidth') inputMapWidth: ElementRef;
    @ViewChild('inputMapHeight') inputMapHeight: ElementRef;
    @ViewChild('inputObstaclesProb') inputObstaclesProb: ElementRef;
    public map: Map;
    private algorithm: Algorithm;
    private animationTimeouts: any[];

    constructor() {
        this.map = new Map();
        this.algorithm = new AStarAlgorithm();
        this.animationTimeouts = [];
    }

    ngAfterContentInit() {
        this.initializeMap();
    }

    private initializeMap() {
        const divWidth = this.mapEl.nativeElement.clientWidth;
        const divHeight = this.mapEl.nativeElement.clientHeight;
        this.map.width = Math.floor((divWidth - 20) / 32);
        this.map.height = Math.floor((divHeight - 20) / 32);
        this.inputMapWidth.nativeElement.value = this.map.width;
        this.inputMapHeight.nativeElement.value = this.map.height;
        this.map.generate();
    }

    private getTileClasses(tile: Tile): string {
        let classes = '';

        if (tile.isObstacle) {
            classes = 'bg-dark';
        }

        if (this.map.start === tile) {
            classes += ' start-tile';
        }

        if (this.map.end === tile) {
            classes += ' end-tile';
        }

        if (tile.type === TileTypes.Path) {
            classes += ' bg-success';
        } else if (tile.type === TileTypes.Closed) {
            classes += ' bg-secondary';
        } else if (tile.type === TileTypes.Opened) {
            classes += ' bg-info';
        }

        return classes;
    }

    private generateMap(event) {
        event.preventDefault();
        this.map.width = parseInt(this.inputMapWidth.nativeElement.value);
        this.map.height = parseInt(this.inputMapHeight.nativeElement.value);
        this.map.obstacleProb = parseFloat(this.inputObstaclesProb.nativeElement.value);
        this.map.generate();
    }

    private run() {
        this.clear();
        const start = window.performance.now();
        const result = this.algorithm.getShortestPath(this.map);
        const timeTaken = window.performance.now() - start;

        if (result) {
            this.animate(result);
        } else {
            console.log('NOT FOUND');
        }
    }

    private clear() {
        this.animationTimeouts.forEach((at) => clearTimeout(at));
        this.map.tiles.forEach((tile) => tile.type = TileTypes.None);
    }

    private animate(result: PathResult) {
        if (result.changements.length === 0) {
            result.path.forEach((pnode) => pnode.tile.type = TileTypes.Path);
        } else {
            const changement: [Tile, TileTypes] = result.changements.shift();
            changement[0].type = changement[1];
            this.animationTimeouts.push(setTimeout(() => this.animate(result), 50));
        }
    }

}
