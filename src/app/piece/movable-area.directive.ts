import { EventEmitter, Output, Directive, QueryList, ElementRef, ContentChildren, AfterContentInit } from '@angular/core';
import { MovableDirective, Position } from './movable.directive';
import { Subscription } from 'rxjs';


interface Boundaries {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

@Directive({
    selector: '[appMovableArea]'
  })
  export class MovableAreaDirective implements AfterContentInit {
    
    @ContentChildren(MovableDirective, {descendants: true}) movableList!: QueryList<MovableDirective>;
    
    @Output() pick = new EventEmitter<Position>();
    @Output() drop = new EventEmitter<Position>();
    
    private boundaries!: Boundaries;
    
    constructor(private el: ElementRef) {}
  
    ngAfterContentInit(): void {
      const subs: Subscription[] = [];
  
      this.movableList.changes
      .subscribe((movables) => {
        if (subs.length) {
          subs.forEach(sub => sub.unsubscribe());
        }
        movables.forEach( (movable: MovableDirective) => {
          subs.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
          subs.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
          subs.push(movable.dragEnd.subscribe(() => this.dragEnd(movable)));
        })
      })
  
      this.movableList.notifyOnChanges();
    }

    private dragEnd(movable: MovableDirective) {

      let x = Math.floor((movable.position.y - this.boundaries.minY)/((this.boundaries.maxY - this.boundaries.minY)/8))
      let y = Math.floor((movable.position.x - this.boundaries.minX)/((this.boundaries.maxX - this.boundaries.minX)/8))
      this.drop.emit({x, y});
    }
  
    private measureBoundaries(movable: MovableDirective) {
      const viewRect: DOMRect = this.el.nativeElement.getBoundingClientRect();
      const movableClientRect: DOMRect = movable.element.nativeElement.getBoundingClientRect();
  
      this.boundaries = {
        minX: viewRect.left - movableClientRect.left + movable.position.x,
        maxX: viewRect.right - movableClientRect.right + movable.position.x,
        minY: viewRect.top - movableClientRect.top + movable.position.y,
        maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y
      }
      
      let x = Math.floor((movable.position.y - this.boundaries.minY)/((this.boundaries.maxY - this.boundaries.minY)/8))
      let y = Math.floor((movable.position.x - this.boundaries.minX)/((this.boundaries.maxX - this.boundaries.minX)/8))
      this.pick.emit({x, y});
      
    }

    private maintainBoundaries(movable: MovableDirective) {
      if (movable.position.x < this.boundaries.minX) movable.position.x = this.boundaries.minX;
      if (movable.position.x > this.boundaries.maxX) movable.position.x = this.boundaries.maxX;
      if (movable.position.y < this.boundaries.minY) movable.position.y = this.boundaries.minY;
      if (movable.position.y > this.boundaries.maxY) movable.position.y = this.boundaries.maxY; 
    }
  }