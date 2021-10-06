import {ChangeDetectorRef, Component} from '@angular/core';
import {ElementDimension, ElementDimensions} from "ngx-resize-detector";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  dimensionsLog: ElementDimensions[] = [];
  jsonToString = JSON.stringify;
  elementDimensionOptions = [
    { label: 'CLIENT_HEIGHT', value: ElementDimension.CLIENT_HEIGHT  },
    { label: 'CLIENT_WIDTH', value: ElementDimension.CLIENT_WIDTH  },
    { label: 'OFFSET_HEIGHT', value: ElementDimension.OFFSET_HEIGHT  },
    { label: 'OFFSET_WIDTH', value: ElementDimension.OFFSET_WIDTH  }
  ];

  controls = {
    debounce: new FormControl(0),
    delay: new FormControl(0),
    disabled: new FormControl(0),
    distinctUntilChanged: new FormControl(this.elementDimensionOptions.map(item => item.value))
  };

  onDimensionChange(event: ElementDimensions) {
    this.dimensionsLog.push(event);
    this._changeDetectorRef.detectChanges();
  }

  onDistinctUntilChangeOptionCheck(value: ElementDimension) {
    let checkedOptions: ElementDimension[] = [...this.controls.distinctUntilChanged.value];
    if (checkedOptions.includes(value)) {
      checkedOptions = checkedOptions.filter(checkedOption => checkedOption !== value);
    } else {
      checkedOptions.push(value);
    }
    this.controls.distinctUntilChanged.setValue(checkedOptions);
    this.controls.distinctUntilChanged.updateValueAndValidity({ emitEvent: true });
  }
}
