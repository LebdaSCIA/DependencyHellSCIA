import { Injectable } from "@angular/core";
import { DllCategory } from "./shared.model";
import { SciaDll } from "./sciaDll.model";
import { DllDependency } from "./dllDependency.model";
import { IModelDataSource } from "./datasource.interface.model";

// @Injectable()
// export class StaticDataSource implements IModelDataSource {
//     private data: SciaDll[];
//     constructor() {
//         this.data = new Array<SciaDll>(
//             new SciaDll(1, "Child.dll", "-", DllCategory.BussinesLogic),
//             new SciaDll(2, "Child2.dll", "-", DllCategory.Data),
//             new SciaDll(3, "Parent.dll", "-", DllCategory.Presentation, new DllDependency(new Array<number>(1,2))));
//     }
//     getData(): SciaDll[] {
//         return this.data;
//     }
// }