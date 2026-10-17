import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LouagisteComponent } from './louagiste-component';

describe('LouagisteComponent', () => {
  let component: LouagisteComponent;
  let fixture: ComponentFixture<LouagisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LouagisteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LouagisteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
