import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../shared/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  standalone: false,
})
export class ResultComponent implements OnInit {
  score: number = 0;
  scoreTotal: number = 0;
  playerName: string = 'Joueur';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.score = 0;
    this.scoreTotal = 10;
  }

  restartQuiz(): void {
    this.router.navigate(['/categories']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
