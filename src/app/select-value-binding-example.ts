import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/** @title Select with 2-way value binding */
@Component({
  selector: 'select-value-binding-example',
  templateUrl: 'select-value-binding-example.html'
})
export class SelectValueBindingExample {
  inputForm: FormGroup;
  
  selectedPlan: string = 'RSPRO-12month';  // default plan
  key: string = ""; // "55KZ-3FZN-3THZ-WKID-DYGN-GXPQ-KITA";
  error: string;

  constructor(private http: HttpClient) {
    this.inputForm = new FormGroup({ Key: new FormControl(this.key, Validators.required) });
  };

  payNow(event: any) {
    this.key = this.inputForm.controls.Key.value;
    this.key = this.key.trim().toUpperCase();
    if (!this.key) { 
      this.error = 'Key is required!';
      return;
    }

    const keyRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
    if (!keyRegex.test(this.key)) {
       this.error = 'Incorrect Key Format Entered';
       return;
    };

    this.error = "";
    this.http.get(`http://localhost:3000/api/key/actualKey/${this.key}`).subscribe((resp: any) => {
      if (resp.message) {
        this.error = 'Key not found, please check the key.'; // 'Key is invalid'
        return;
      }

      this.launchUrl();
    })  
  }

  launchUrl() {
    const objfields = {
      key: this.key, 
      plan_code: this.selectedPlan
    }
    // Pre-filled form query string        
    const queryString = Object.entries(objfields).map(pair => pair.map(encodeURIComponent).join('=')).join('&');
    const reactivBuyNowUrl = 'http://localhost:3000/api/zoho/buyNow';
    const url = `${reactivBuyNowUrl}?${queryString}`;

    //this.http.get(url);
    window.location.href = url; 
  }

}
