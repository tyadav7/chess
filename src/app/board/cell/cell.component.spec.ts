import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { CellComponent, IPoint, Point } from './cell.component';

@Component({
  template: `
    <app-cell [point]="point"></app-cell>
  `,
})
class TestHostComponent {
  point: IPoint = new Point(0, 0); 
}

describe('CellComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let cellComponent: CellComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    cellComponent = fixture.debugElement.query(By.css('app-cell')).componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(cellComponent).toBeTruthy();
  });

  it('should display a white cell based on the point coordinates', () => {
    const point: IPoint = { x: 0, y: 0 };
    hostComponent.point = point;
    fixture.detectChanges();
    expect(cellComponent.isWhite(point.x, point.y)).toBe(false);
  });

  it('should display a black cell based on the point coordinates', () => {
    const point: IPoint = { x: 1, y: 1 };
    hostComponent.point = point;
    fixture.detectChanges();
    expect(cellComponent.isWhite(point.x, point.y)).toBe(false);
  });

  it('should display a white cell based on the point coordinates', () => {
    const point: IPoint = { x: 0, y: 1 };
    hostComponent.point = point;
    fixture.detectChanges();
    expect(cellComponent.isWhite(point.x, point.y)).toBe(true);
  });

  it('should display a black cell based on the point coordinates', () => {
    const point: IPoint = { x: 1, y: 0 };
    hostComponent.point = point;
    fixture.detectChanges();
    expect(cellComponent.isWhite(point.x, point.y)).toBe(true);
  });
});