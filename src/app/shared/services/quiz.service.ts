import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { Quiz } from '../models/quiz';
import { PlayerAnswer } from '../models/player-answer';
import { filter, first, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: Quiz[] = [];
  playerAnswers: PlayerAnswer[] = [];
  score = 0;
  isQuizFinished = false;
  playerName = '';
  myObservable = of(1,2,3).pipe(
    map(num => num + 1),
    filter(num => num % 2 === 0),
    first()
  );

  constructor(private http: HttpClient) { }

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer?.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  getQuizContent() {
    this.http.get<Question[]>('http://localhost:3000/questions').subscribe((questions) => {
      for (const question of questions) {
        this.http.get<Answer[]>(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers) => {
          this.quizContent.push({
              id: question.id,
              question: question.questionLabel,
              answers
          });
        });
      }
    });
  }

  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}
