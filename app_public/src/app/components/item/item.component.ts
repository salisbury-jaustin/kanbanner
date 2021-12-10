import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/classes/authService';
import { Auth } from 'src/app/interfaces/auth';
import { editItemPayload } from 'src/app/interfaces/editItem';
import { moveItemPayload } from 'src/app/interfaces/moveItem';
import { rmvItemPayload } from 'src/app/interfaces/rmvItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: any;
  @Input() list: any;

  private _destination: string = "";

  public editState: {
    edit: boolean,
    move: boolean,
    delete: boolean
  }
  public optionsExpanded: Boolean = false;
  public optionEnabled: string = "";
  public _destinations!: string[];
  public itemEdit: string = "";

  @Output() eventEditItem = new EventEmitter<editItemPayload>();
  @Output() eventMoveItem = new EventEmitter<moveItemPayload>();
  @Output() eventRmvItem = new EventEmitter<rmvItemPayload>();

  constructor(private authService: AuthService) { 
    this.editState = {
      edit: false,
      move: false,
      delete: false
    }
    this.destinations = this.setDestinations();  
  }

  ngOnInit(): void {

  }
  
  get destination(): string {
    return this._destination;
  }
  set destination(val: string) {
    this._destination = val;
  }
  get destinations(): string[] {
    return this._destinations;
  }
  set destinations(val: string[]) {
    this._destinations = val
  }
  private setDestinations(): string[] {
    let auth = this.authService.getAuth();
    let authLists = auth.user[0].lists;
    let lists = [];
    for (let i=0; i<authLists.length; i++) {
      let list = authLists[i].list;
      lists.push(list);
    }
    return lists;
  }

  public enableEdit(option: string): void {
    if (option != "Cancel") {
      this.optionEnabled = option;
    }
    switch(option) {
      case "Edit":
        this.editState.edit = true;
        break;
      case "Move":
        this.editState.move = true;
        break;
      case "Delete":
        this.editState.delete = true;
        break;
      case "Cancel":
        this.cancelEdit();
        break;
    }
  }
  public cancelEdit(): void {
    this.editState = {
      edit: false,
      move: false,
      delete: false
    };
    this.optionEnabled = "";
    this.setOptionsExpanded(false);
  }
  public setOptionsExpanded(payload: Boolean): void {
    this.optionsExpanded = payload;
  }
  public editItem(): void {
    let payload: editItemPayload = {
      prevItem: this.item,
      newItem: this.itemEdit,
    };
    this.eventEditItem.emit(payload);
    this.optionEnabled = "";
  }
  public moveItem(): void {
    let payload: moveItemPayload = {
      item: this.item,
      destination: this.destination,
    };
    this.eventMoveItem.emit(payload);
    this.optionEnabled = "";
  }
  public rmvItem(item: string): void {
    let payload: rmvItemPayload = {
      item: item
    };
    this.eventRmvItem.emit(payload);
    this.optionEnabled = "";
  }
}
