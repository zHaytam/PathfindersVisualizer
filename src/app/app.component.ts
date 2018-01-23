import { Component, ElementRef, ViewChild } from '@angular/core';
import Map from '../pathfinding/map';
import { ResizeService } from './resize.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('map') mapEl: ElementRef;
    public map: Map;

    constructor(private resizeService: ResizeService) {
        this.map = new Map();
    }



}
