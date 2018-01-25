import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { setTimeout } from 'timers';
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

    constructor() {
        this.map = new Map();
        this.algorithm = new AStarAlgorithm();
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
        const start = window.performance.now();
        const result = this.algorithm.getShortestPath(this.map);
        const timeTaken = window.performance.now() - start;

        if (result) {
            console.log(`Took ${timeTaken}ms.`);
            setTimeout(() => {
                result.path.forEach((pnode) => pnode.tile.type = TileTypes.Path);
            }, 4);
        } else {
            console.log('NOT FOUND');
        }
    }

    private animate(result: PathResult) {
        if (result.openList.length === 0 && result.closedList.length === 0 && result.path.length !== 0) {
            const pnode = result.path.shift();
            pnode.tile.type = TileTypes.Path;
            setTimeout(() => this.animate(result), 4);
        } else {
            if (result.openList.length !== 0) {
                const onode = result.openList.shift();
                onode.tile.type = TileTypes.Opened;
            }

            if (result.closedList.length !== 0) {
                const cnode = result.closedList.shift();
                cnode.tile.type = TileTypes.Closed;
            }

            setTimeout(() => this.animate(result), 4);
        }
    }

}
