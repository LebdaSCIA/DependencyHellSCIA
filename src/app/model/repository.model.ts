import { Injectable } from "@angular/core";
import { SciaDll } from "./sciaDll.model";
import { Observable } from "rxjs/Observable";
import { IModelDataSource } from "./datasource.interface.model";

@Injectable()
export class ModelRepository {
    private SciaDlls: SciaDll[] = new Array<SciaDll>();
    private locator = (p: SciaDll, id: number) => p.id == id;

    constructor(private dataSource: IModelDataSource) {
        this.dataSource.getData().subscribe(data => this.SciaDlls = data);
    }

    getSciaDllsObservable(): Observable<SciaDll[]> {
        return this.dataSource.getData();
    }

    getSciaDllsPromise(callBack: (dll : SciaDll[]) => void): void {
        this.dataSource.getData().subscribe(data => callBack(data));
    }

    getSciaDllPromise(id: number, callBack: (dll : SciaDll) => void): void {
        this.dataSource.getData().subscribe(data => callBack(data.find(p =>p.id == id)));
    }

    getSciaDlls(): SciaDll[] {
        return this.SciaDlls;
    }

    getSciaDll(id: number): SciaDll {
        return this.SciaDlls.find(p => this.locator(p, id));
    }

    // saveSciaDll(SciaDll: SciaDll) {
    //     if (SciaDll.id == 0 || SciaDll.id == null) {
    //         this.dataSource.saveSciaDll(SciaDll)
    //             .subscribe(p => this.SciaDlls.push(p));
    //     } else {
    //         this.dataSource.updateSciaDll(SciaDll).subscribe(p => {
    //             let index = this.SciaDlls
    //                 .findIndex(item => this.locator(item, p.id));
    //             this.SciaDlls.splice(index, 1, p);
    //         });
    //     }
    // }

    // deleteSciaDll(id: number) {
    //     this.dataSource.deleteSciaDll(id).subscribe(() => {
    //         let index = this.SciaDlls.findIndex(p => this.locator(p, id));
    //         if (index > -1) {
    //             this.SciaDlls.splice(index, 1);
    //         }
    //     });
    // }
}
