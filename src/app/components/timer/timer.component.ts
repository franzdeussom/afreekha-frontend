import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy{
  remainingTime: string = "24:00:00";
  private subscription!:Subscription
  ngOnInit(): void {
      this.startTimer()
  }

  startTimer(){
    const totalSeconds = 24 * 60 * 60; //total 24h en seconde
    let startTime = localStorage.getItem('timerStartTime')

    if(!startTime){
        let startTime = Date.now().toString()
        localStorage.setItem("timerStartTime", startTime)

    }
    this.subscription = interval(1000).subscribe(()=>{
      const elapsedSeconds = Math.floor((Date.now()-Number(startTime))/1000)
      let remainingSeconds = totalSeconds - (elapsedSeconds%totalSeconds)

  //     // if(remainingSeconds<=0){
  //     //   startTime=Date.now()
  //     //   remainingSeconds = totalSeconds
  //     // }

      //conversion
      const hours = String(Math.floor(remainingSeconds/3600)).padStart(2,'0')
      const minutes = String(Math.floor(remainingSeconds % 3600/60)).padStart(2,'0')
      const seconds = String(remainingSeconds % 60).padStart(2,'0')
      this.remainingTime = `0J : ${hours}h : ${minutes}m : ${seconds}s`
    })
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe()
      }
  }

}
