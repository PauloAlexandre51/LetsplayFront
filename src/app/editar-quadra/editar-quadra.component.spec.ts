import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuadraComponent } from './editar-quadra.component';

describe('EditarQuadraComponent', () => {
  let component: EditarQuadraComponent;
  let fixture: ComponentFixture<EditarQuadraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarQuadraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarQuadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
