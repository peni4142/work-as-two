import { equal } from "assert";
import { PathHandler } from "./pathHandler";
import { resolve } from "path";



suite("pathHandler", () => {

    let ph: PathHandler = new PathHandler({
        pathLeft: {
            escapedRegex: /^([^.]*)(\.ts)/,
            result: "$1.test$2"
        },
        pathRight: {
            escapedRegex: /^([^.]*)\.test(\.ts)/,
            result: "$1$2"
        }
    });

    let testPath: string = resolve("src/logic/pathHandler.test.ts");
    let functionalPath: string = resolve("src/logic/pathHandler.ts");

    test("a example", () => {
        let testString: string = "src/logic/pathHandler.ts".replace(/^([^.]*)(\.ts)/, "$1.test$2");
        equal(testString, "src/logic/pathHandler.test.ts");
    });

    test("map test to functional", () => {
        let complemantaryPath: string | null = ph.mapPath(testPath);
        equal(complemantaryPath, functionalPath);
    });

    test("map functional to test", () => {
        let complemantaryPath: string | null = ph.mapPath(functionalPath);
        equal(complemantaryPath, testPath);
    });


    test("false map", () => {
        let complemantaryPath: string | null = ph.mapPath(resolve("tslint.json"));
        equal(complemantaryPath, null);
    });


});