import { equal } from "assert";
import { PathHandler } from "./pathHandler";
import { resolve } from "path";
import { IMapPathResult } from "./interfaces";
import { HandSide } from "./enum";



suite("pathHandler", () => {

    let ph: PathHandler = new PathHandler({
        pathRight: {
            escapedRegex: /^([^.]*)(\.ts)/,
            result: "$1.unit-test$2"
        },
        pathLeft: {
            escapedRegex: /^([^.]*)\.unit-test(\.ts)/,
            result: "$1$2"
        }
    });

    let testPath: string = resolve("src/logic/pathHandler.unit-test.ts");
    let functionalPath: string = resolve("src/logic/pathHandler.ts");

    test("a example", () => {
        let testString: string = "src/logic/pathHandler.ts".replace(/^([^.]*)(\.ts)/, "$1.test$2");
        equal(testString, "src/logic/pathHandler.test.ts");
    });

    test("map test to functional", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(testPath);
        equal(complemantary?.path, functionalPath);
        equal(complemantary?.handSide, HandSide.Right);
    });

    test("map functional to test", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(functionalPath);
        equal(complemantary?.path, testPath);
        equal(complemantary?.handSide, HandSide.Left);
    });


    test("false map", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(resolve("tslint.json"));
        equal(complemantary, null);
    });


});