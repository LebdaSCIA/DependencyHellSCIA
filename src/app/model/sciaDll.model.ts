import { DllCategory } from "./shared.model";
import { DllDependency } from "./dllDpendency.model";

export class SciaDll {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public category : DllCategory,
        public dllDependency?: DllDependency) { }
}