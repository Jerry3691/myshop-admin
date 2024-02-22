import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmailDataComponent } from './view-email-data.component';

describe('ViewEmailDataComponent', () => {
  let component: ViewEmailDataComponent;
  let fixture: ComponentFixture<ViewEmailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmailDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
