import { DllCategory, DllStatus } from "./shared.model";
import { DllDependency } from "./dllDependency.model";

export class SciaDll {
    constructor(
        public id: number,
        public name: string,
        public category : DllCategory,
        public status : DllStatus,
        public coment?: string) { }

        static Factory() : SciaDll
        {
            let retVal = new SciaDll(-1, "new.dll", DllCategory.Kernel, DllStatus.ok, "no coment");
            return retVal;
        }
}