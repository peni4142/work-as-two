import { window, TextEditor, ViewColumn, workspace, Uri, TextDocument } from "vscode";



export class ExtendedApi {

    private static prevState: TextEditor[] = window.visibleTextEditors;

    public static onDidOpenTextEditor(fn: (actualState: TextEditor[], openedTextEditor: TextEditor) => any) {
        window.onDidChangeVisibleTextEditors((actualState: TextEditor[]) => {
            try {
                if (actualState.length < this.prevState.length) {
                    return;
                }
                let openedTextEditor: TextEditor[] = this.getOpenedTextEditor(actualState);
                if (openedTextEditor.length !== 1) {
                    return;
                }
                if (openedTextEditor[0].document.uri.scheme === "git") {
                    return;
                }
                actualState.forEach((textEditor: TextEditor) => {
                    if (textEditor.document.uri.scheme === "git") {
                        if (textEditor.document.uri.fsPath === openedTextEditor[0].document.uri.fsPath) {
                            return;
                        }
                    }
                });
                return fn(actualState, openedTextEditor[0]);
            } finally {
                this.prevState = actualState;
            }
        });
    }

    public static async openTextEditor(fsPath: string, viewColumn: ViewColumn):Promise<TextEditor> {
        let document: TextDocument = await workspace.openTextDocument(fsPath);
        return window.showTextDocument(document, viewColumn);
    }

    private static getOpenedTextEditor(actualState: TextEditor[]): TextEditor[] {
        let result: TextEditor[] = [];
        for (let i: number = 0; i < actualState.length; i++) {
            if (!this.TextEditorWasOpen(actualState[i], this.prevState)) {
                result.push(actualState[i]);
            }
        }
        return result;
    }

    private static TextEditorWasOpen(TextEditor: TextEditor, textEditors: TextEditor[]): boolean {
        for (let i: number = 0; i < textEditors.length; i++) {
            if (TextEditor === textEditors[i]) {
                return true;
            }
        }
        return false;
    }

}