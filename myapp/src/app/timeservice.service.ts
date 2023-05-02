import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TimeserviceService {
  durationt: number = 300;
  timer: any = null;
  startTime: Date = new Date();
  endTime: Date = new Date('0000-00-00');
  ellapsedTime = '00:00';
  duration = '';
  statement = '';
  submitted: boolean = false;
  constructor() {}
  tick(): string {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    this.ellapsedTime = this.parseTime(diff);
    this.statement = this.ellapsedTime;
    return this.statement;
    if (this.ellapsedTime > this.duration) {
      this.submitted = true;
    }
  }
  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }
}
