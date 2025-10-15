import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from '../../shared/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: false,
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() questionIndex!: number;

  answers: any[] = [];
  isLoading: boolean = true;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.quizService.getAnswersByQuestionId(this.question.id).subscribe({
      next: (data) => {
        this.answers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement réponses:', err);
        this.isLoading = false;
      },
    });
  }
}
