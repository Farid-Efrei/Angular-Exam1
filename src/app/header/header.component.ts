import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private quizSvc: QuizService) { }

  ngOnInit(): void {
    this.quizSvc.myObservable.subscribe(num => console.log(num));
  }

  logout() {
    this.authService.logout();
  }

  get isUserConnected() {
    return this.authService.isUserConnected();
  }

  get getUsername() {
    return this.authService.user?.username || '';
  }
}
