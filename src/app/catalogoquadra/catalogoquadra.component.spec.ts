import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoquadraComponent } from './catalogoquadra.component';

describe('CatalogoquadraComponent', () => {
  let component: CatalogoquadraComponent;
  let fixture: ComponentFixture<CatalogoquadraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoquadraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoquadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
