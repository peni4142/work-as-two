import { TextEditor, workspace, TextDocument, Uri, window, ViewColumn } from "vscode";
import { IConfig } from "../interface";
import { PathHandler } from "../logic/pathHandler";
import { IMapPathResult } from "../logic/interfaces";
import { HandSide } from "../logic/enum";
import { ExtendedApi } from "./extendedApi";



export function integration(actualState: TextEditor[], openedTextEditor: TextEditor): void {
    let config: IConfig = <any>workspace.getConfiguration("work-as-two");

    let ph: PathHandler = new PathHandler({
        pathLeft: {
            escapedRegex: new RegExp(config.leftEscapedRegex),
            result: config.leftTransformToRight
        },
        pathRight: {
            escapedRegex: new RegExp(config.rightEscapedRegex),
            result: config.rightTransformToLeft
        }
    });

    let complementary: IMapPathResult | null = ph.mapPath(openedTextEditor.document.uri.fsPath);
    if (complementary === null) {
        return;
    }
    if (complementary.handSide === HandSide.Right) { // original is HandSide.Left
        if (openedTextEditor.viewColumn === ViewColumn.One) { // check if original is opened on correct side
            if(checkComplementaryIsOpen(actualState, complementary)){
                return;
            }
            else{
                ExtendedApi.openTextEditor(complementary.path, ViewColumn.Two);
            }
        } else {
            ExtendedApi.openTextEditor(openedTextEditor.document.uri.fsPath, ViewColumn.One);
        }
    } else if (complementary.handSide === HandSide.Left) { // original is HandSide.Right
        if (openedTextEditor.viewColumn === ViewColumn.Two) {
            if(checkComplementaryIsOpen(actualState, complementary)){
                return;
            }
            else{
                ExtendedApi.openTextEditor(complementary.path, ViewColumn.One);
            }
        } else {
            if(actualState.length ===1){
                ExtendedApi.openTextEditor(complementary.path, ViewColumn.One);
            }
            ExtendedApi.openTextEditor(openedTextEditor.document.uri.fsPath, ViewColumn.Two);
        }
    }
}

function checkComplementaryIsOpen(actualState: TextEditor[], complementary: IMapPathResult): boolean {
    let textEditorsInColumn: TextEditor[] = [];

    actualState.forEach((textEditor: TextEditor) => {
        if (textEditor.viewColumn === transformHandsideToViewColumn(complementary.handSide)) {
            textEditorsInColumn.push(textEditor);
        }
    });
    
    if (textEditorsInColumn.length === 1 &&
        textEditorsInColumn[0].document.uri.fsPath === complementary.path) {
        return true;
    }
    return false;
}

function transformHandsideToViewColumn(handSide: HandSide): ViewColumn {
    switch (handSide) {
        case HandSide.Left:
            return ViewColumn.One;
        case HandSide.Right:
            return ViewColumn.Two;
    }
}
