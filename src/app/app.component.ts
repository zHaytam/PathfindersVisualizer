import { Component } from '@angular/core';
import Map from '../pathfinding/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public map: Map;

    constructor() {
        this.map = new Map();
    }

}
