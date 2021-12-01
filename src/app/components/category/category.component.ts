import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  identityCategory: Category = { categoryId: 0, categoryName: "" }
  currentCategory: Category = this.identityCategory;
  dataLoaded: boolean = false;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe((resp) => {
      this.categories = resp.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  getActiveClassIfEqualsCurrentCategory(category: Category) {
    if (category === this.currentCategory) {
      return "active";
    } else {
      return "";
    }
  }

  getActiveClassIfNoCurrentCategory() {
    if (this.identityCategory === this.currentCategory) {
      return "active";
    } else {
      return "";
    }
  }
}
