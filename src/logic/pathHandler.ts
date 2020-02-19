import { existsSync } from "fs";
import { IPathMapping, IMapPathResult } from "./interfaces";
import { HandSide } from "./enum";

export class PathHandler {

    constructor(private pathMapping: IPathMapping) {

    }

    public getHandSide(path:string): HandSide | null{
        if (this.pathMapping.pathLeft.escapedRegex.test(path)) {
            return HandSide.Left;
        }
        if (this.pathMapping.pathRight.escapedRegex.test(path)) {
            return HandSide.Right;
        }
        return null;
    }

    public mapPath(path: string): IMapPathResult | null {
        if (existsSync(path)) {
            if (this.pathMapping.pathLeft.escapedRegex.test(path)) {
                let newPath = path.replace(this.pathMapping.pathLeft.escapedRegex ,this.pathMapping.pathLeft.result);
                if (existsSync(newPath)) {
                    return {
                        path : newPath,
                        handSide: HandSide.Right
                    };
                }
            }
            if (this.pathMapping.pathRight.escapedRegex.test(path)) {
                let newPath = path.replace(this.pathMapping.pathRight.escapedRegex ,this.pathMapping.pathRight.result);
                if (existsSync(newPath)) {
                    return {
                        path : newPath,
                        handSide: HandSide.Left
                    };
                }
            }
        }
        return null;
    }
}