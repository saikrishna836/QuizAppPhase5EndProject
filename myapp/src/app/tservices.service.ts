import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TservicesService implements PipeTransform {
  jsonObj: string = '';
  jsonArray: any = [];
  constructor(private httpClient: HttpClient) {}
  fetchQuestions(topic: string, id: number) {
    return this.httpClient
      .get('http://localhost:3000/' + topic + '/' + id)
      .pipe(
        map((data) => {
          this.jsonObj = this.transform(data);
          console.log(this.jsonObj);
          return this.jsonObj;
        })
      );
  }

  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
