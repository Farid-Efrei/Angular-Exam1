import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-card',
  standalone: false,
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  // Parent enfant
  @Input() category!: Category;
}
