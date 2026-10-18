import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationComponent } from './station-component';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
