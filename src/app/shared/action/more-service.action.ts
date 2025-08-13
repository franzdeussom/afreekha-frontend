
export class SetMoreService {
    static readonly type = "[MoreService] Set More Service";
    constructor(public payload: any[]) {}
  }
  
  
  export class GetMoreService {
    static readonly type = "[MoreService] Get More Service";
    constructor(public payload: {first: any[], second: any[]}) {}
  }
  