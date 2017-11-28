export class DllDependency {
  constructor(
    public ID: number,
    public dllSourceID: number,
    public dllTargetID: number,
    public SCIADLL: any) { }

  static Factory(): DllDependency {
    let retVal = new DllDependency(-1,-1, -1, null);
    return retVal;
  }
}
