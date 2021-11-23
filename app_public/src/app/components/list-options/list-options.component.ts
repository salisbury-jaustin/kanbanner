import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent implements OnInit {
  
  constructor() { }

  public options: string[] = ["Add", "Edit", "Move All", "Delete All"];
  public selected: boolean = false;
  public enabled: string = "";

  @Output() eventEditList = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public setSelected(): void {
    this.selected = true;
  }
  private setEnabled(option: string): void {
    this.enabled = option;
  }
  public editList(option: string) {
    if (this.enabled == "") {
      this.setEnabled(option);
      this.eventEditList.emit(option);
    }
  }

}
