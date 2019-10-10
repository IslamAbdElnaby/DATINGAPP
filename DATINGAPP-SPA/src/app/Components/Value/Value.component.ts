import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {
  values: any[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();

  }
  getValues() {
    // this.http.post(`http://localhost:5000/api/auth/Register`, {username: 'islam', password: 'password'})
    this.http.get(`http://localhost:5000/api/values`)
    .subscribe((res: any[]) => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
