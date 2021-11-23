import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-options',
  templateUrl: './item-options.component.html',
  styleUrls: ['./item-options.component.css']
})
export class ItemOptionsComponent implements OnInit {

  constructor() { }

  public options: string[] = ["Move", "Edit", "Delete"];
  public selected: boolean = false;

  ngOnInit(): void {
  }

  public setSelected(): void {
    this.selected = true;
  }
}
