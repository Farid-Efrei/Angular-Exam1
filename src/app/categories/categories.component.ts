import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('CategoriesComponent chargé !');
    this.loadCategories();
  }

  loadCategories(): void {
    console.log('Chargement des catégories...');
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('Catégories reçues:', data);
        this.categories = data;
        this.filteredCategories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erreur chargement catégories:', err);
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(
        (category) =>
          category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredCategories = this.categories;
  }

  goToQuiz(categoryId: number): void {
    console.log('Navigation vers quiz, catégorie:', categoryId);
    this.router.navigate(['/quiz', categoryId]);
  }
}
