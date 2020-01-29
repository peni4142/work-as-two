import { workspace, TextDocument, window, Uri } from "vscode";
import { PathHandler } from "./logic/pathHandler";
import { IMapPathResult } from "./logic/interfaces";
import { HandSide } from "./logic/enum";
import { CancelableQueue } from "./logic/cancelableQueue";




export class API {

    private static lastOpened: string = "";



    private static ph: PathHandler = new PathHandler({
        pathRight: {
            escapedRegex: /^([^.]*)(\.ts)/,
            result: "$1.test$2"
        },
        pathLeft: {
            escapedRegex: /^([^.]*)\.test(\.ts)/,
            result: "$1$2"
        }
    });

    public static run() {
        workspace.onDidOpenTextDocument((document: TextDocument) => {
            if (document.uri.scheme === "file") {
                let windowCounter:number = window.visibleTextEditors.length;
                setTimeout(()=>{
                    let newWindowCounter: number = window.visibleTextEditors.length;
                    if(newWindowCounter- windowCounter !== 2){
                        this.open(document);
                    }
                }, 100);
            }
        });
    }

    private static open(document: TextDocument) {
        let complemantary: IMapPathResult | null = this.ph.mapPath(document.fileName);
        try {
            if (complemantary && complemantary.path !== this.lastOpened) {
                workspace.openTextDocument(Uri.file(complemantary.path))
                    .then((d: TextDocument) => {
                        window.showTextDocument(d, complemantary?.handSide === HandSide.Left ? 1 : 2);
                        window.showTextDocument(document, complemantary?.handSide === HandSide.Right ? 1 : 2);
                    });
            }
        }
        finally {
            this.lastOpened = document.fileName;
        }
    }
}