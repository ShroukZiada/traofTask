import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrammComponent } from './add-programm.component';

describe('AddProgrammComponent', () => {
  let component: AddProgrammComponent;
  let fixture: ComponentFixture<AddProgrammComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProgrammComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
