import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addItemPayload } from 'src/app/interfaces/addItem'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  //styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public editState: {
    add: boolean,
    edit: boolean,
    moveall: boolean,
    deleteall: boolean
  }

  @Input() list: any;

  constructor() { 
    this.editState = {
      add: false,
      edit: false,
      moveall: false,
      deleteall: false
    }
  }

  @Output() eventAddItem = new EventEmitter<addItemPayload>();

  ngOnInit(): void {

  }

  private _itemAdded: string = "";
  get itemAdded(): string {
    return this._itemAdded;   
  }
  set itemAdded(val: string) {
    this._itemAdded = val;
  }

  public enableEdit(option: string) {
    switch(option) {
      case "Add":
        this.editState.add = true;
        break;
      case "Edit":
        this.editState.edit = true;
        break;
      case "Move All":
        this.editState.moveall = true;
        break;
      case "Delete All":
        this.editState.deleteall = true;
        break;
    }
  }
  public addItem(): void {
    let payload: addItemPayload = {
      list: this.list.list,
      item: this.itemAdded
    };
    this.eventAddItem.emit(payload);
  }
  public cancelAddItem(): void {

  }
}
