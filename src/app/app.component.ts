import {ChangeDetectorRef, Component} from '@angular/core';
import {ElementDimensions} from "ngx-resize-detector";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  dimensionsLog: ElementDimensions[] = [];
  jsonToString = JSON.stringify;

  controls = {
    debounce: new FormControl(0),
    delay: new FormControl(0),
  }

  onDimensionChange(event: ElementDimensions) {
    this.dimensionsLog.push(event);
    this._changeDetectorRef.detectChanges();
  }
}
