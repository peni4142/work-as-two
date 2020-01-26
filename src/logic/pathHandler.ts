import { existsSync } from "fs";
import { IPathMapping, IRegexReplacement } from "./interfaces";

export class PathHandler {

    constructor(private pathMapping: IPathMapping) {

    }

    public mapPath(path: string): string | null {
        if (existsSync(path)) {
            if (this.pathMapping.pathLeft.escapedRegex.test(path)) {
                let newPath = path.replace(this.pathMapping.pathLeft.escapedRegex ,this.pathMapping.pathLeft.result);
                if (existsSync(newPath)) {
                    return newPath;
                }
            }
            if (this.pathMapping.pathRight.escapedRegex.test(path)) {
                let newPath = path.replace(this.pathMapping.pathRight.escapedRegex ,this.pathMapping.pathRight.result);
                if (existsSync(newPath)) {
                    return newPath;

                }
            }
        }
        return null;
    }
}