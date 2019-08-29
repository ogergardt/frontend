import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SAMPLE_RESULTS} from './sample-results';

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.css'],
  template: `
      <h1>Search</h1>
      <input type="search" placeholder="Search..." class="mat-elevation-z2" [matAutocomplete]="auto" [formControl]="searchControl">
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" class="mat-elevation-z2">
          <mat-option *ngFor="let item of filteredResults" [value]="item">
              <span [innerHTML]="item | bold:searchControl.value"></span>
          </mat-option>
      </mat-autocomplete>
  `,
})
export class SearchComponent implements OnInit {


  searchControl: FormControl;
  filteredResults: string[] = [];
  results = SAMPLE_RESULTS;

  constructor() {
    this.searchControl = new FormControl();
    let i: number = 1;
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(
        term => {
          console.log(term);
          this.filteredResults = this.filterResults(term).slice(0, 4)
        }
      );
  }

  ngOnInit() {
  }

  private filterResults(val: string): string[] {
    return val ? this.results.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }
}
