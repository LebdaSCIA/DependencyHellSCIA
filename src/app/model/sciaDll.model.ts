import { DllCategory, DllStatus } from "./shared.model";
import { DllDependency } from "./dllDependency.model";

export class SciaDll {
    constructor(
        public ID: number,
        public Name: string,
        public Category : DllCategory,
        public Status: DllStatus,
        public Path: string,
        public Category1: any,
        public Status1: any,
        public LoC? : number,
        public Comment?: string) { }

        static Factory() : SciaDll
        {
            let retVal = new SciaDll(-1, "new.dll", DllCategory.Kernel, DllStatus.ok, null, null, null);
            return retVal;
        }
}
