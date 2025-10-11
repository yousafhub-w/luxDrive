import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  searchText: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchText);
  }
}
