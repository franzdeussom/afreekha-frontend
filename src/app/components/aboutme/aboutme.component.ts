import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {
  voirPlus : boolean = false;

  toggleText(){
    this.voirPlus = !this.voirPlus
  }

}
