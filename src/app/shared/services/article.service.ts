import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { delay, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  query = new Subject<string>();

  articles: Observable<Article[]> = of([
    {
      id: 1,
      title: 'Article 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Article 2',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'Article 3',
      content: 'Content 3',
    },
    {
      id: 4,
      title: 'Article 4',
      content: 'Content 4',
    },
    {
      id: 5,
      title: 'Article 5',
      content: 'Content 5',
    },
    {
      id: 6,
      title: 'Article 6',
      content: 'Content 6',
    },
  ]).pipe(delay(1000));

  constructor() { }
}
