import { Observable } from "rxjs";
import { IPoint } from "./cell/cell.component";

export interface IBoardService {
    view: any[][];
    pick(position: IPoint): void;
    drop(position: IPoint): void;
    resetMove(): void;
    resetMove$: Observable<boolean>;
}