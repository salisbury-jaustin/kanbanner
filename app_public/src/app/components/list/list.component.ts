import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KanBannerDataService } from 'src/app/kan-banner-data.service';
import { AuthService } from 'src/app/classes/authService';
import { addItemPayload } from 'src/app/interfaces/addItem'
import { rmvItemPayload, rmvItemBody } from 'src/app/interfaces/rmvItem';
import { editItemBody, editItemPayload } from 'src/app/interfaces/editItem';
import { moveItemBody, moveItemPayload } from 'src/app/interfaces/moveItem';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  //styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: any;

  private _itemAdded: string = "";

  public editState: {
    add: boolean,
    edit: boolean,
    moveall: boolean,
    deleteall: boolean
  }
  public optionsExpanded: Boolean = false;
  public optionEnabled: string = "";

  @Output() eventAddItem = new EventEmitter<addItemPayload>();

  constructor(private kanBannerDataService: KanBannerDataService,
    private authService: AuthService,
    private router: Router) { 
    this.editState = {
      add: false,
      edit: false,
      moveall: false,
      deleteall: false
    }
  }


  ngOnInit(): void {

  }

  get itemAdded(): string {
    return this._itemAdded;   
  }
  set itemAdded(val: string) {
    this._itemAdded = val;
  }

  public enableEdit(option: string) {
    if (option != "Cancel") {
      this.optionEnabled = option;
    }
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
      case "Cancel":
        this.cancelEdit();
        break;
    }
  }
  public cancelEdit(): void {
    this.editState = {
      add: false,
      edit: false,
      moveall: false,
      deleteall: false
    };
    this.optionEnabled = "";
    this.setOptionsExpanded(false);
  }
  public setOptionsExpanded(payload: Boolean): void {
    this.optionsExpanded = payload;
  }
  public addItem(): void {
    let payload: addItemPayload = {
      list: this.list.list,
      item: this.itemAdded
    };
    this.eventAddItem.emit(payload);
  }
  public rmvItem(payload: rmvItemPayload): void {
    let auth = this.authService.getAuth();
    let body: rmvItemBody = {
      user: auth.user[0].user,
      list: this.list.list,
      item: payload.item 
    }
    this.kanBannerDataService 
      .rmvItem(body);
    window.location.reload();
  }

  public editItem(payload: editItemPayload): void {
    let auth = this.authService.getAuth();
    let body: editItemBody = {
      user: auth.user[0].user,
      list: this.list.list,
      prevItem: payload.prevItem,
      newItem: payload.newItem
    }
    this.kanBannerDataService 
      .editItem(body);
    window.location.reload();
  }
  public moveItem(payload: moveItemPayload): void {
    let auth = this.authService.getAuth();
    let body: moveItemBody = {
      user: auth.user[0].user,
      prevList: this.list.list,
      item: payload.item,
      destination: payload.destination
    }
    this.kanBannerDataService 
      .moveItem(body);
    window.location.reload();
  }
}
