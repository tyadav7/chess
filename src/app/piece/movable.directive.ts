import { Directive, ElementRef, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

export interface Position {
    x: number;
    y: number;
}

@Directive({
    selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {

    @HostBinding('style.transform') get transform(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(
            `translateX(${this.position.x}px) translateY(${this.position.y}px)`
        );
    }

    @HostBinding('class.grabbing') get grabbing(): boolean {
        return this.dragging;
    }

    @HostBinding('class.movable') movable = true;

    position: Position = { x: 0, y: 0 };

    private startPosition!: Position;

    private _reset:boolean = false;

    public get reset(): boolean {
        return this._reset;
    }

    @Input('appMovableReset') 
    public set reset(value: boolean) {
        if(value)
            this.position = { x: 0, y: 0 };
        this._reset = value;
    }

    constructor(private sanitizer: DomSanitizer, public element: ElementRef) {
        super();
    }

    @HostListener('dragStart', ['$event'])
    onDragStart(event: PointerEvent) {
        this.startPosition = {
            x: event.clientX - this.position.x,
            y: event.clientY - this.position.y
        }
    }

    @HostListener('dragMove', ['$event'])
    onDragMove(event: PointerEvent) {
        this.position.x = event.clientX - this.startPosition.x;
        this.position.y = event.clientY - this.startPosition.y;
    }

    @HostListener('dragEnd', ['$event'])
    onDragEnd(event: PointerEvent) {
        if (this.reset) {
            this.position = { x: 0, y: 0 };
        }
    }
}
