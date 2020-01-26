export interface IPathMapping {
    pathLeft: IRegexReplacement;
    pathRight: IRegexReplacement;
}

export interface IRegexReplacement {
    escapedRegex: RegExp;
    result:string;
}
