import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-item-options',
  templateUrl: './item-options.component.html',
  styleUrls: ['./item-options.component.css']
})
export class ItemOptionsComponent implements OnInit {
  @Input() optionsExpanded: any;
  @Input() optionEnabled: any;

  public options: string[] = ["Cancel", "Move", "Edit", "Delete"];

  @Output() eventEditItem = new EventEmitter<string>();
  @Output() eventOptionsExpanded = new EventEmitter<Boolean>();

  constructor() {}

  ngOnInit(): void {

  }
  public isOptionsExpanded(): void {
    this.eventOptionsExpanded.emit(true);
  }
  public editItem(option: string): void {
    if (this.optionEnabled == "") {
      this.eventEditItem.emit(option);
    }
  }
}
