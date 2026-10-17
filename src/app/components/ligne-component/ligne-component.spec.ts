import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LigneComponent } from './ligne-component';

describe('LigneComponent', () => {
  let component: LigneComponent;
  let fixture: ComponentFixture<LigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LigneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
