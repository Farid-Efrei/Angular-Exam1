import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PlayerAnswer {
  questionId: number;
  answerId: number;
  isCorrect?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:3000';

  playerAnswers: PlayerAnswer[] = [];
  playerName: string = 'Joueur';
  score: number = 0;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions`);
  }

  getQuestionsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/questions?categoryId=${categoryId}`
    );
  }

  getAnswersByQuestionId(questionId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/answers?questionId=${questionId}`
    );
  }

  addAnswer(questionId: number, answerId: number): void {
    const existingIndex = this.playerAnswers.findIndex(
      (a) => a.questionId === questionId
    );

    if (existingIndex !== -1) {
      this.playerAnswers[existingIndex].answerId = answerId;
    } else {
      this.playerAnswers.push({ questionId, answerId });
    }
  }

  calculateScore(questions: any[], allAnswers: any[]): number {
    this.score = 0;

    this.playerAnswers.forEach((playerAnswer) => {
      const correctAnswer = allAnswers.find(
        (a) => a.questionId === playerAnswer.questionId && a.isCorrect === true
      );

      if (correctAnswer && correctAnswer.id === playerAnswer.answerId) {
        this.score++;
        playerAnswer.isCorrect = true;
      } else {
        playerAnswer.isCorrect = false;
      }
    });

    return this.score;
  }

  resetQuiz(): void {
    this.playerAnswers = [];
    this.score = 0;
  }

  getScore(): number {
    return this.score;
  }
}
