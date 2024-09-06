import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: false
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  showDialog = false;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
    });
  }

  goToResultPage() {
    this.showDialog = true;
  }

  dialogClosed(hasConfirmed: boolean) {
    if (!hasConfirmed) return this.showDialog = false;
    this.router.navigate(['/result']);
    return;
  }
}
