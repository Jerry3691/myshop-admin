import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(public settingService:SettingService) { }

  ngOnInit() {
  }

}
