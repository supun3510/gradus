import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent {
  myControl: FormControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three']; 
  filteredControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  public settings: Settings;
  constructor(public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  } 
  
  ngOnInit() {
    this.filteredOptions = this.filteredControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}