import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor() {}
  start: boolean = false;
  read: boolean = false;
  @Input('topic')
  topic: string = '';
  ngOnInit(): void {
    console.log(this.topic);
  }
  onStart() {
    this.start = true;
  }
  onReadInstructions() {
    this.read = true;
  }
}
