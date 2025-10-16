import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { QuizService } from '../shared/services/quiz.service';
import { ArticleService } from '../shared/services/article.service';
import { Article } from '../shared/models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  searchArticle = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizSvc: QuizService,
    private articleSvc: ArticleService
  ) {}

  ngOnInit(): void {
    //Nous verrons plus tard comment gérer cela avec des observables
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
    this.quizSvc.myObservable.subscribe((num) => console.log(num));
    this.articleSvc.articles.subscribe((articles) => {
      this.articles = articles;
      this.filteredArticles = articles;
    });

    this.articleSvc.query
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) =>
          this.articleSvc.articles.pipe(
            map((articles) =>
              articles.filter((article) =>
                article.title.toLowerCase().includes(query.toLowerCase())
              )
            )
          )
        )
      )
      .subscribe((articles) => {
        console.log(articles);
        this.filteredArticles = articles;
      });
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1;
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz', this.playerName]);
  }

  confirmPseudo() {
    this.isPlayerNameConfirmed = true;
  }

  filterArticles(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.articleSvc.query.next(query);
  }
}
