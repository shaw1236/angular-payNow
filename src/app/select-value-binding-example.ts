import { Component } from '@angular/core';

/** @title Select with 2-way value binding */
@Component({
  selector: 'select-value-binding-example',
  templateUrl: 'select-value-binding-example.html'
})
export class SelectValueBindingExample {
  selectedPlan = 'YEAR_PAY';
  key = 'ABCD-EFGH-FIJK-LMNO-XYZW';
  result = '';
  submitted = false;
  payNow(event: any) {
    this.submitted = true;
    this.result = 'Process';
  }
}
