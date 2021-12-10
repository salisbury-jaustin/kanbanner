import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent implements OnInit {
  
  @Input() optionsExpanded: any;
  @Input() optionEnabled: any

  public options: string[] = ["Cancel", "Add"];

  @Output() eventEditList = new EventEmitter<string>();
  @Output() eventOptionsExpanded = new EventEmitter<Boolean>();

  constructor() {}

  ngOnInit(): void {
  }

  public isOptionsExpanded(): void {
    this.eventOptionsExpanded.emit(true);
  }
  public editList(option: string): void {
    if (this.optionEnabled == "") {
      this.eventEditList.emit(option);
    }
  }

}
