export class DllDependency {
  constructor(
    public ID: number,
    public dllSourceID: number,
    public dllTargetID: number,
    public isTransient: boolean,
    public SCIADLL: any) { }

  static Factory(): DllDependency {
    let retVal = new DllDependency(-1,-1, -1, false, null);
    return retVal;
  }
}
