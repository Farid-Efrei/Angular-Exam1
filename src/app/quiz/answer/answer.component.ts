import { Component, Input } from '@angular/core';
import { QuizService } from '../../shared/services/quiz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  standalone: false,
})
export class AnswerComponent {
  @Input() answer: any;
  @Input() questionId!: number;

  constructor(private quizService: QuizService) {}

  selectAnswer(answerId: number): void {
    console.log(
      'Réponse sélectionnée:',
      answerId,
      'pour la question:',
      this.questionId
    );
  }
}
