import { workspace, TextDocument, window, Uri } from "vscode";
import { PathHandler } from "../logic/pathHandler";
import { IMapPathResult } from "../logic/interfaces";
import { HandSide } from "../logic/enum";
import { IConfig } from "../interface";



export class API {

    private static lastOpenedComplementary: string = "";
    private static gitMode: boolean = false; // git mode is more precise, but it has to be in a git repository


    private static windowCounter: number[] = [
        window.visibleTextEditors.length,
        window.visibleTextEditors.length
    ];

    public static onDidShowTextDocument() {
        setInterval(() => {
            this.windowCounter.push(window.visibleTextEditors.length);
            this.windowCounter.shift();
            this.lastOpenedComplementary = "";
        }, 300);

        workspace.onDidOpenTextDocument((document: TextDocument) => {
            if (document.uri.scheme === "gitfs") { // fires after every show up of a TextDocument
                if (!this.gitMode) {
                    this.gitMode = true;
                } else { // the file mode will handle the first time
                    let newWindowCounter: number = window.visibleTextEditors.length;
                    if (newWindowCounter - this.windowCounter[0] === 1) { // prevent to act by source control
                        workspace.openTextDocument(Uri.file(document.fileName.substr(0, document.fileName.length - 4))) // cut out ".git"
                            .then((innerDocument: TextDocument) => {
                                this.businessLogik(innerDocument);
                            });
                    }
                }
            }
            if (!this.gitMode) {
                if (document.uri.scheme === "file") { // fires every time when TextDocument is opened, but TextDocuments can stay open while you kill the VisibleTextEditor

                    let windowCounter: number = window.visibleTextEditors.length;
                    setTimeout(() => {
                        if (window.visibleTextEditors.length - windowCounter === 1) {// prevent to act by source control
                            this.businessLogik(document);
                        }
                    }, 100);
                }
            }
        });
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

            if (complemantary && document.fileName !== this.lastOpenedComplementary) {
                workspace.openTextDocument(Uri.file(complemantary.path))
                    .then((complemantaryDocument: TextDocument) => {
                        window.showTextDocument(complemantaryDocument, complemantary?.handSide === HandSide.Left ? 1 : 2);
                        window.showTextDocument(document, complemantary?.handSide === HandSide.Right ? 1 : 2);
                        this.lastOpenedComplementary = <string>complemantary?.path;
                    });
            }
    }
}