import { DllCategory, DllStatus } from "./shared.model";
import { DllDependency } from "./dllDependency.model";

export class SciaDll {
    constructor(
<<<<<<< HEAD
        public id: number,
        public name: string,
        public category : DllCategory,
        public status : DllStatus,
        public lineCount : number,
        public coment?: string) { }
=======
        public ID: number,
        public Name: string,
        public Category : DllCategory,
        public Status: DllStatus,
        public Path: string,
        public Comment?: string) { }
>>>>>>> 3b77d54a23a455ef3bf3bc7bab9a1a5e1511ebe3

        static Factory() : SciaDll
        {
            let retVal = new SciaDll(-1, "new.dll", DllCategory.Kernel, DllStatus.ok, 0, "no coment");
            return retVal;
        }
}
