import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Result } from 'src/app/datamodels/data.model';
import { TimeserviceService } from 'src/app/timeservice.service';
import { TservicesService } from 'src/app/tservices.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  user_answers: string[] = [];

  last: boolean = false;
  constructor(
    private services: TservicesService,
    private timeservice: TimeserviceService
  ) {}
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
  options: string[] = ['A', 'B', 'C', 'D'];
  option: string = '';
  submit: string = '';
  id: number = 1;
  submitted: boolean = false;
  ellapsedTime: string = '';
  duration: string = '';
  timer: any = null;
  startTime: Date = new Date('0000-00-00');
  durationt: number = 300;

  @Input()
  topic: string = '';
  ngOnInit(): void {
    this.loadTimer();
    this.services.fetchQuestions(this.topic, this.id).subscribe((data) => {
      this.data = JSON.parse(data);
      console.log('data' + this.data);
    });
  }

  onNext(form: NgForm) {
    this.id = this.id + 1;
    if (this.id == 6) {
      this.user_answers.push(form.value.option);
    }
    if (!(this.id > 5 && this.ellapsedTime <= this.duration)) {
      this.user_answers.push(form.value.option);

      console.log(this.user_answers);
      this.services.fetchQuestions(this.topic, this.id).subscribe((data) => {
        this.data = JSON.parse(data);
      });

      if (this.id == 5) {
        this.last = true;
      }
      form.reset();
    } else {
      console.log('Answers:' + this.user_answers);
      this.submitted = true;
    }
  }
  loadTimer() {
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => {
      this.ellapsedTime = this.timeservice.tick();
      if (this.id > 5) {
        this.submitted = true;
      } else {
        this.submitted = this.timeservice.submitted;
      }
    }, 1000);
    this.duration = this.timeservice.parseTime(this.durationt);
  }
}
