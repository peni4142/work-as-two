import { HandSide } from "./enum";

export interface IPathMapping {
    pathLeft: IRegexReplacement;
    pathRight: IRegexReplacement;
}

export interface IRegexReplacement {
    escapedRegex: RegExp;
    result:string;
}

export interface IMapPathResult {
    path: string;
    handSide: HandSide;
}
