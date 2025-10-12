import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  searchQuery: string = '';
  suggestions: any[] = [];
  allProducts: any[] = [];

  // ✅ Properly define the output as EventEmitter<any[]>
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private taskService: TaskService) {
    // Load all products once
    this.taskService.getProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  // When typing in search box
  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();

    if (query.trim()) {
      this.suggestions = this.allProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.carbrand.toLowerCase().includes(query)
      );
    } else {
      this.suggestions = [];
      this.searchResults.emit(this.allProducts); // Reset when empty
    }
  }

  // When pressing Enter
  onEnterKey(): void {
    const filtered = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.carbrand.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.searchResults.emit(filtered); // ✅ Emits array of results
    this.suggestions = [];
  }

  // When selecting from suggestions
  onSelectProduct(product: any): void {
    this.searchQuery = product.name;
    this.suggestions = [];
    this.searchResults.emit([product]); // ✅ Emit single item in array
  }

  // Clear search input
  clearSearch(): void {
    this.searchQuery = '';
    this.suggestions = [];
    this.searchResults.emit(this.allProducts); // ✅ Emit full list again
  }
}
