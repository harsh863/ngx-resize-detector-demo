import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxResizeDetectorModule} from "ngx-resize-detector";

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, ReactiveFormsModule, NgxResizeDetectorModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
