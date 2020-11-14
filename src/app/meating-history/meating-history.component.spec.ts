import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatingHistoryComponent } from './meating-history.component';

describe('MeatingHistoryComponent', () => {
  let component: MeatingHistoryComponent;
  let fixture: ComponentFixture<MeatingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeatingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
