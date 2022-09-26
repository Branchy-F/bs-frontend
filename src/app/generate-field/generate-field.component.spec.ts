import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFieldComponent } from './generate-field.component';

describe('GenerateFieldComponent', () => {
  let component: GenerateFieldComponent;
  let fixture: ComponentFixture<GenerateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
