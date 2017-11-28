import { Injectable } from "@angular/core";
import { SciaDll } from "./sciaDll.model";
import { DllDependency } from "./dllDependency.model";
import { Observable } from "rxjs/Observable";
import { IModelDataSource } from "./datasource.interface.model";

@Injectable()
export class ModelRepository {
    private SciaDlls = new Array<SciaDll>();
    private SciaDllDeps = new Array<DllDependency>();
    private locator = (p: SciaDll, id: number) => p.id == id;

    constructor(private dataSource: IModelDataSource) {
        this.dataSource.getSciaDlls().subscribe(data => this.SciaDlls = data);
        //this.dataSource.getSciaDllDeps().subscribe(data => this.SciaDllDeps = data);
    }

    getSciaDllsPromise(callBack: (dll : SciaDll[]) => void): void {
        this.dataSource.getSciaDlls().subscribe(data => callBack(data));
    }

    getSciaDllPromise(id: number, callBack: (dll: SciaDll) => void): void {
      this.dataSource.getSciaDll(id).subscribe(data => callBack(data));
    }

    getSciaDllDepsForSrPromise(id: number, callBack: (dll: DllDependency[]) => void): void {
      this.dataSource.getSciaDllDepsForSrc(id).subscribe(data => callBack(data));
    }

    getSciaDlls(): SciaDll[] {
        return this.SciaDlls;
    }

    getSciaDll(id: number): SciaDll {
        return this.SciaDlls.find(p => this.locator(p, id));
    }

    getDependencyForSource(id: number): DllDependency[] {
      this.dataSource.getSciaDllDepsForSrc(id).subscribe(data => this.SciaDllDeps = data);
      return this.SciaDllDeps;
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
