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
  n = 0;
  id: number = 1;
  selected: any = [];
  temp: any = [];
  static selections: any = [];

  static topic: string = '';
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
    if (this.data.answer == 'D') {
      this.n = 4;
    } else if (this.data.answer == 'C') {
      this.n = 3;
    } else if (this.data.answer == 'B') {
      this.n = 2;
    } else if (this.data.answer == 'A') {
      this.n = 1;
    }
    if (ReviewComponent.selections[this.id - 1].valueOf() == this.n) {
      this.labellings[this.n - 1] = 'alert alert-success';
    } else {
      this.labellings[ReviewComponent.selections[this.id - 1].valueOf()] =
        'alert alert-danger';
      this.labellings[this.n - 1] = 'alert alert-success';
    }
  }
  // ngInit
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selected = params['2'];
      ReviewComponent.topic = params['1'];
      this.show = params['3'];
      for (let s in this.selected) {
        this.temp = this.services.transform(s);
        ReviewComponent.selections.push(JSON.parse(this.temp));
      }
    });

    this.services
      .fetchQuestions(ReviewComponent.topic, this.id)
      .subscribe((data) => {
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
    if (!(this.id > 5)) {
      this.services
        .fetchQuestions(ReviewComponent.topic, this.id)
        .subscribe((data) => {
          this.data = JSON.parse(data);
        });

      if (this.id == 5) {
        this.last = true;
      }
      form.reset();
    }
    this.labels();
  }
}
