import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import AStarAlgorithm from '../pathfinding/algorithms/aStarAlgorithm';
import AStarAlgorithmWithArray from '../pathfinding/algorithms/aStarAlgorithmWithArray';
import PathResult from '../pathfinding/algorithms/pathResult';
import Map from '../pathfinding/map';
import Tile from '../pathfinding/tile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('mapDiv') mapEl: ElementRef;
    @ViewChild('inputMapWidth') inputMapWidth: ElementRef;
    @ViewChild('inputMapHeight') inputMapHeight: ElementRef;
    @ViewChild('inputObstaclesProb') inputObstaclesProb: ElementRef;
    public map: Map;
    public result: PathResult;
    private algorithm: AStarAlgorithm;

    constructor() {
        this.map = new Map();
        this.algorithm = new AStarAlgorithmWithArray();
    }

    ngAfterViewInit() {
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

        if (this.result) {
            if (this.result.path.find((pnode) => pnode.tile === tile) !== undefined) {
                classes += ' bg-success';
            } else if (this.result.closedList.find((cnode) => cnode.tile === tile) !== undefined) {
                classes += ' bg-secondary';
            } else if (this.result.openList.find((onode) => onode.tile === tile) !== undefined) {
                classes += ' bg-info';
            }
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
        console.log(this.mapEl);
        this.result = this.algorithm.getShortestPath(this.map);
    }

}
