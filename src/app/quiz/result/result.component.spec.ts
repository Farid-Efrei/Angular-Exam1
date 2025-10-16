import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { provideHttpClient } from '@angular/common/http';
import { QuizService } from '../../shared/services/quiz.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;

  beforeEach(() => {
    const quizServiceSpy = jasmine.createSpyObj('QuizService', ['checkAnswers', 'resetQuiz'], {
      score: 10,
      quizContent: [],
      playerName: 'Test Player'
    });

    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [
        provideHttpClient(),
        { provide: QuizService, useValue: quizServiceSpy },
      ]
    });
    
    mockQuizService = TestBed.inject(QuizService) as jasmine.SpyObj<QuizService>;
    
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = fixture.nativeElement.querySelector('[data-test="result-title"]');
    expect(title.textContent).toContain('Prêt à voir ton score ?');
  });

  it('should display the correct score from quiz service', () => {
    component.ngOnInit();
    expect(component.score).toBe(10);
  });
});
