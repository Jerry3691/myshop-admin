import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit {
  @Input() title: string
  constructor() { }

  ngOnInit(): void {
  }

}
