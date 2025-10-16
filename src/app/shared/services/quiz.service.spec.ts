import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { provideHttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add answer to playerAnswers when addAnswer is called', () => {
    const questionId = 1;
    const answer = 'Réponse test';
    const initialLength = service.playerAnswers.length;

    service.addAnswer(answer, questionId);

    expect(service.playerAnswers.length).toBe(initialLength + 1);
    expect(service.playerAnswers[0]).toEqual({
      questionId: questionId,
      answer: answer
    });
  });

  it('should update existing answer when addAnswer is called with same questionId', () => {
    const questionId = 1;
    const initialAnswer = 'Première réponse';
    const updatedAnswer = 'Réponse mise à jour';
    
    service.addAnswer(initialAnswer, questionId);
    const initialLength = service.playerAnswers.length;
    
    service.addAnswer(updatedAnswer, questionId);

    expect(service.playerAnswers.length).toBe(initialLength);
    expect(service.playerAnswers[0]).toEqual({
      questionId: questionId,
      answer: updatedAnswer
    });
  });

  describe('checkAnswers', () => {
    beforeEach(() => {
      service.resetQuiz();
    });

    it('should calculate correct score for all correct answers', () => {
      const mockQuiz: Quiz[] = [
        {
          id: 1,
          question: 'Question 1',
          answers: [
            { questionId: 1, answerLabel: 'Bonne réponse', isCorrect: true },
            { questionId: 1, answerLabel: 'Mauvaise réponse', isCorrect: false }
          ]
        },
        {
          id: 2,
          question: 'Question 2',
          answers: [
            { questionId: 2, answerLabel: 'Autre bonne réponse', isCorrect: true },
            { questionId: 2, answerLabel: 'Autre mauvaise réponse', isCorrect: false }
          ]
        }
      ];
      service.quizContent = mockQuiz;

      service.addAnswer('Bonne réponse', 1);
      service.addAnswer('Autre bonne réponse', 2);

      service.checkAnswers();

      expect(service.score).toBe(2);
      expect(service.isQuizFinished).toBe(true);
    });

    it('should calculate correct score for mixed correct and incorrect answers', () => {
      const mockQuiz: Quiz[] = [
        {
          id: 1,
          question: 'Question 1',
          answers: [
            { questionId: 1, answerLabel: 'Bonne réponse', isCorrect: true },
            { questionId: 1, answerLabel: 'Mauvaise réponse', isCorrect: false }
          ]
        },
        {
          id: 2,
          question: 'Question 2',
          answers: [
            { questionId: 2, answerLabel: 'Autre bonne réponse', isCorrect: true },
            { questionId: 2, answerLabel: 'Autre mauvaise réponse', isCorrect: false }
          ]
        }
      ];
      service.quizContent = mockQuiz;

      service.addAnswer('Bonne réponse', 1);
      service.addAnswer('Autre mauvaise réponse', 2);

      service.checkAnswers();

      expect(service.score).toBe(1);
      expect(service.isQuizFinished).toBe(true);
    });

    it('should set isQuizFinished to true after checking answers', () => {
      service.isQuizFinished = false;
      service.quizContent = [];
      service.playerAnswers = [];

      service.checkAnswers();

      expect(service.isQuizFinished).toBe(true);
    });
  });
});
