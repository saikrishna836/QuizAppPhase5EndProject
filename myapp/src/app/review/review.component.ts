import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TservicesService } from '../tservices.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private services: TservicesService
  ) {}
  show = false;
  resultbool = false;
  score = 0;
  n = 0;
  n1 = 0;
  correct = 0;
  wrong = 0;
  id: number = 1;
  selections: string[] = [];
  temp: any = [];
  len: number = 0;

  topic: string = '';
  obj: any = {};
  questions: any = [];
  last = false;
  data: {
    id: number;
    question: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    answer: string;
  } = {
    id: 0,
    question: '',
    options: {
      A: '',
      B: '',
      C: '',
      D: '',
    },
    answer: '',
  };
  labellings = [
    'alert alert-secondary',
    'alert alert-secondary',
    'alert alert-secondary',
    'alert alert-secondary',
  ];
  labels() {
    console.log('labels:' + this.data.answer);
    if (this.data.answer == 'D') {
      this.n = 4;
    } else if (this.data.answer == 'C') {
      this.n = 3;
    } else if (this.data.answer == 'B') {
      this.n = 2;
    } else if (this.data.answer == 'A') {
      this.n = 1;
    }
    if (this.selections[this.id - 1].valueOf() == 'D') {
      this.n1 = 4;
    } else if (this.selections[this.id - 1].valueOf() == 'C') {
      this.n1 = 3;
    } else if (this.selections[this.id - 1].valueOf() == 'B') {
      this.n1 = 2;
    } else if (this.selections[this.id - 1].valueOf() == 'A') {
      this.n1 = 1;
    }
    if (this.n1 == this.n) {
      this.labellings[this.n - 1] = 'alert alert-success';
      this.correct = this.correct + 1;
    } else {
      this.wrong = this.wrong + 1;
      this.labellings[this.n1 - 1] = 'alert alert-danger';
      this.labellings[this.n - 1] = 'alert alert-success';
    }
  }
  // ngInit
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selections = params['2'];
      this.topic = params['1'];
      this.show = params['3'];
      this.len = this.selections.length;
    });

    this.services.fetchQuestions(this.topic, this.id).subscribe((data) => {
      this.data = JSON.parse(data);
      this.labels();
    });
  }
  onNext(form: NgForm) {
    this.labellings = [
      'alert alert-secondary',
      'alert alert-secondary',
      'alert alert-secondary',
      'alert alert-secondary',
    ];

    this.id = this.id + 1;
    if (this.id > 5) {
      this.resultbool = true;
      this.score = 5 - this.wrong;
    }
    if (this.id <= 5) {
      this.services.fetchQuestions(this.topic, this.id).subscribe((data) => {
        this.data = JSON.parse(data);
        this.labels();
      });

      if (this.id == 5) {
        this.last = true;
      }
      form.reset();
    }
  }
}
