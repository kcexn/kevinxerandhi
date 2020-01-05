import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttireComponent } from './attire.component';

describe('AttireComponent', () => {
  let component: AttireComponent;
  let fixture: ComponentFixture<AttireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
