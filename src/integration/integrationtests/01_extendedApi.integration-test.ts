import { ExtendedApi } from "../extendedApi";
import { ViewColumn, window, TextEditor } from "vscode";
import { resolve, join } from "path";
import { equal } from "assert";
import { ExtensionRoot } from "../../extension";


suite("01 Extended Api", () => {
    test("openTextEditor", async () => {
        // equal(window.visibleTextEditors.length, 0);
        // let fsPath: string = ExtensionRoot.replace(/\\/g,"/") + "/test_workspace/.vscode/settings.json";
        // await ExtendedApi.openTextEditor(fsPath, ViewColumn.One);
        // equal(window.visibleTextEditors.length, 1, "no TextEditor is open");
        // equal(window.visibleTextEditors[0].document.fileName.replace(/\\/g,"/"), fsPath);
    }).timeout(3000);


    test("onDidOpenTextEditor", async () => {
        let fsPath: string = resolve(join(ExtensionRoot, "test_workspace/src/noComplementary.quatsch"));
        let state: TextEditor[] = [];
        let fileName: string = "";
        ExtendedApi.onDidOpenTextEditor((actualState: TextEditor[], openedTextEditor: TextEditor) => {
            state = actualState;
            fileName = openedTextEditor.document.fileName;
        });
        await ExtendedApi.openTextEditor(fsPath, ViewColumn.One);
        equal(state.length, 1, "no TextEditor is open");
        equal(fileName, fsPath);
    }).timeout(4000);
});
