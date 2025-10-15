import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from '../shared/services/category.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: false,
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentCategory: Category | null = null;
  categoryId!: number;
  isLoading: boolean = true;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.loadCategoryAndQuestions();
    });
  }

  loadCategoryAndQuestions(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category) => {
        this.currentCategory = category;
      },
      error: (err) => {
        console.error('Erreur chargement catégorie:', err);
      },
    });

    this.quizService.getQuestionsByCategoryId(this.categoryId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement questions:', err);
        this.isLoading = false;
      },
    });
  }

  goToResultPage(): void {
    this.router.navigate(['/result']);
  }
}
