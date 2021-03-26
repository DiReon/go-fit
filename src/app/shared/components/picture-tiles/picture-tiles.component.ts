import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'picture-tiles',
  templateUrl: './picture-tiles.component.html',
  styleUrls: ['./picture-tiles.component.css']
})
export class PictureTilesComponent implements OnInit {
  @Input() urls: string[];
  @Input() isEditable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
