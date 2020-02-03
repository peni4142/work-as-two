import { workspace, TextDocument, window, Uri, TextEditor } from "vscode";
import { PathHandler } from "../logic/pathHandler";
import { IMapPathResult } from "../logic/interfaces";
import { HandSide } from "../logic/enum";
import { IConfig } from "../interface";



export class API {

    private static lastOpenedComplementary: string = "";
    private static prevState: TextEditor[] = window.visibleTextEditors;

    public static onDidShowTextDocument() {
        window.onDidChangeVisibleTextEditors((actualState: TextEditor[]) => {
            try {
                if (actualState.length - this.prevState.length === 1) {
                    for (let i: number = 0; i < actualState.length; i++) {
                        if (!this.documentIsOpened(actualState[i].document, this.prevState)) {
                            this.businessLogik(actualState[i].document);
                            return;
                        }
                    }
                }
            }
            finally {
                this.prevState = actualState;
            }
        });
    }

    private static documentIsOpened(document: TextDocument, textEditors: TextEditor[]): boolean {
        for (let i: number = 0; 0 < textEditors.length; i++) {
            if (document.fileName === textEditors[i].document.fileName) {
                return true;
            }
        }
        return false;
    }

    public static businessLogik(document: TextDocument) {
        let config: IConfig = <any>workspace.getConfiguration("work-as-two", document.uri);
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
        let complemantary: IMapPathResult | null = ph.mapPath(document.fileName);
        if (complemantary) {
            workspace.openTextDocument(Uri.file(complemantary.path))
                .then((complemantaryDocument: TextDocument) => {
                    window.showTextDocument(complemantaryDocument, complemantary?.handSide === HandSide.Left ? 1 : 2);
                    window.showTextDocument(document, complemantary?.handSide === HandSide.Right ? 1 : 2);
                    this.lastOpenedComplementary = <string>complemantary?.path;
                });
        }
    }
}