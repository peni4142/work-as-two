import { equal } from "assert";
import { PathHandler } from "./pathHandler";
import { resolve } from "path";
import { IMapPathResult } from "./interfaces";
import { HandSide } from "./enum";



suite("pathHandler", () => {

    let ph: PathHandler = new PathHandler({
        pathLeft: {
            escapedRegex: /^(([^\\\/]+(\\|\/))+([^.]*))(\.ts)$/,
            result: "$1.unit-test$5"
        },
        pathRight: {
            escapedRegex:/^(([^\\\/]+(\\|\/))+([^.]*))\.unit-test(\.ts)$/,
            result: "$1$5"
        }
    });

    let singlePath: string = resolve("src/interface.ts");
    let functionalPath: string = resolve("src/logic/pathHandler.ts");
    let testPath: string = resolve("src/logic/pathHandler.unit-test.ts");

    test("example functional to test", () => {
        let testString: string = functionalPath.replace(/^(([^\\\/]+(\\|\/))+([^.]*))(\.ts)$/, "$1.unit-test$5");
        equal(testString, testPath);
    });

    test("example test to functional", () => {
        let testString: string = "src/logic/pathHandler.unit-test.ts".replace(/^(([^\\\/]+(\\|\/))+([^.]*))\.unit-test(\.ts)$/, "$1$5");
        equal(testString, "src/logic/pathHandler.ts");
    });

    
    test("getHandside quatsch", () => {
        let handSide: HandSide | null = ph.getHandSide("quatsch");
        equal(handSide, null);
    });

    test("getHandside functional", () => {
        let handSide: HandSide | null = ph.getHandSide(functionalPath);
        equal(handSide, HandSide.Left);
    });
    
    test("getHandside testPath", () => {
        let handSide: HandSide | null = ph.getHandSide(testPath);
        equal(handSide, HandSide.Right);
    });

    test("map test to functional", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(testPath);
        equal(complemantary?.path, functionalPath);
        equal(complemantary?.handSide, HandSide.Left);
    });

    test("map functional to test", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(functionalPath);
        equal(complemantary?.path, testPath);
        equal(complemantary?.handSide, HandSide.Right);
    });


    test("false map", () => {
        let complemantary: IMapPathResult | null = ph.mapPath(resolve("tslint.json"));
        equal(complemantary, null);
    });


});