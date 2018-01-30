import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NouisliderModule } from 'ng2-nouislider';
import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NouisliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
