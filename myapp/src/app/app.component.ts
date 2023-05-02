import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  topic: string = '';
  constructor(private route: ActivatedRoute) {}
  status: boolean = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'];
      this.topic = params['topic'];
    });
  }
}
