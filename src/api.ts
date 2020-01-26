import { workspace, TextDocument, window, Uri } from "vscode";
import { PathHandler } from "./logic/pathHandler";
import { IMapPathResult } from "./logic/interfaces";
import { HandSide } from "./logic/enum";




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

        workspace.onDidOpenTextDocument((e: TextDocument) => {
            let complemantary: IMapPathResult | null = this.ph.mapPath(e.fileName);
            try {
                if (complemantary && complemantary.path !== this.lastOpened) {
                    window.showInformationMessage("should open");
                    workspace.openTextDocument(Uri.file(complemantary.path))
                        .then((d: TextDocument) => {
                            window.showTextDocument(d, complemantary?.handSide=== HandSide.Left? 1:2);
                            window.showTextDocument(e, complemantary?.handSide=== HandSide.Right? 1:2);
                        });
                }
            }
            finally {
                this.lastOpened = e.fileName;
            }
        });
    }
}