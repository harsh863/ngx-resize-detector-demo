import { ChangeDetectionStrategy, Component, NgZone } from "@angular/core";
import { ElementDimension, ElementDimensions } from "ngx-resize-detector";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  $dimensionLogs = new BehaviorSubject<ElementDimensions[]>([]);
  elementDimensionOptions = [
    { label: "CLIENT_HEIGHT", value: ElementDimension.CLIENT_HEIGHT },
    { label: "CLIENT_WIDTH", value: ElementDimension.CLIENT_WIDTH },
    { label: "OFFSET_HEIGHT", value: ElementDimension.OFFSET_HEIGHT },
    { label: "OFFSET_WIDTH", value: ElementDimension.OFFSET_WIDTH },
  ];
  controls = {
    debounce: new FormControl(0),
    delay: new FormControl(0),
    disabled: new FormControl(0),
    distinctUntilChanged: new FormControl(
      this.elementDimensionOptions.map((item) => item.value)
    ),
  };

  jsonToString = JSON.stringify;

  constructor(private _ngZone: NgZone) {}

  onDimensionChange(event: ElementDimensions) {
    this._ngZone.run(() => {
      const dimensionLogs = this.$dimensionLogs.getValue();
      dimensionLogs.push(event);
      this.$dimensionLogs.next(dimensionLogs);
    });
  }

  onDistinctUntilChangeOptionCheck(value: ElementDimension) {
    let checkedOptions: ElementDimension[] = [
      ...this.controls.distinctUntilChanged.value,
    ];
    if (checkedOptions.includes(value)) {
      checkedOptions = checkedOptions.filter(
        (checkedOption) => checkedOption !== value
      );
    } else {
      checkedOptions.push(value);
    }
    this.controls.distinctUntilChanged.setValue(checkedOptions);
    this.controls.distinctUntilChanged.updateValueAndValidity({
      emitEvent: true,
    });
  }
}
