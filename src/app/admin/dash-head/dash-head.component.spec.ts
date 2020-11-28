import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHeadComponent } from './dash-head.component';

describe('DashHeadComponent', () => {
  let component: DashHeadComponent;
  let fixture: ComponentFixture<DashHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
