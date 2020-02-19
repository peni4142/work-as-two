import { ExtendedApi } from "../extendedApi";
import { ExtensionRoot } from "../../extension";
import { ViewColumn, window, TextEditor } from "vscode";
import { resolve, join } from "path";
import { equal } from "assert";


let paths: { [key: string]: string } = {
    anOther: ExtensionRoot.replace(/\\/g, "/") + "/test_workspace/src/anOther.quatsch",
    anOtherTest: ExtensionRoot.replace(/\\/g, "/") + "/test_workspace/src/anOther.test.quatsch",
    index: ExtensionRoot.replace(/\\/g, "/") + "/test_workspace/src/index.quatsch",
    indexTest: ExtensionRoot.replace(/\\/g, "/") + "/test_workspace/src/index.test.quatsch",
    noComplementary: ExtensionRoot.replace(/\\/g, "/") + "/test_workspace/src/noComplementary.quatsch"
};

interface IAnalysing {
    column1: string[];
    column2: string[];
}

function analyseTextEditor(textEditors: TextEditor[]): IAnalysing {
    let result: IAnalysing = { column1: [], column2: [] };
    textEditors.forEach((textEditor: TextEditor) => {
        if (textEditor.viewColumn === 1) {
            result.column1.push(textEditor.document.fileName);
        } else if (textEditor.viewColumn === 2) {
            result.column2.push(textEditor.document.fileName);
        }
    });
    return result;
}

suite("02 Implementation", () => {
    test("open test on left side first time", async () => {
        await ExtendedApi.openTextEditor(paths.indexTest, ViewColumn.One);
        await new Promise(resolve => setTimeout(resolve, 1000));

        let result: IAnalysing = analyseTextEditor(window.visibleTextEditors);

        equal(result.column1[0].replace(/\\/g,"/"), paths.index, "left side is not correct opened");
        equal(result.column2[0].replace(/\\/g,"/"), paths.indexTest, "right side is not correct opened");
    }).timeout(2000);

    test("open test on left side second time", async () => {
        await ExtendedApi.openTextEditor(paths.anOtherTest, ViewColumn.One);
        await new Promise(resolve => setTimeout(resolve, 1000));

        let result: IAnalysing = analyseTextEditor(window.visibleTextEditors);

        equal(result.column1[0].replace(/\\/g,"/"), paths.anOther, "left side is not correct opened");
        equal(result.column2[0].replace(/\\/g,"/"), paths.anOtherTest, "right side is not correct opened");
    }).timeout(2000);

    test("open functional on right side first time", async () => {
        await ExtendedApi.openTextEditor(paths.index, ViewColumn.Two);
        await new Promise(resolve => setTimeout(resolve, 1000));

        let result: IAnalysing = analyseTextEditor(window.visibleTextEditors);

        equal(result.column1[0].replace(/\\/g,"/"), paths.index, "left side is not correct opened");
        equal(result.column2[0].replace(/\\/g,"/"), paths.indexTest, "right side is not correct opened");
    }).timeout(2000);

    test("open functional on left side second time", async () => {
        await ExtendedApi.openTextEditor(paths.anOther, ViewColumn.Two);
        await new Promise(resolve => setTimeout(resolve, 1000));

        let result: IAnalysing = analyseTextEditor(window.visibleTextEditors);

        equal(result.column1[0].replace(/\\/g,"/"), paths.anOther, "left side is not correct opened");
        equal(result.column2[0].replace(/\\/g,"/"), paths.anOtherTest, "right side is not correct opened");
    }).timeout(2000);
});
