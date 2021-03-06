// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtendedApi } from './integration/extendedApi';
import { integration } from './integration/integration';
import { join } from 'path';


export const ExtensionRoot: string =  join(__dirname, "..");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
	ExtendedApi.onDidOpenTextEditor(integration);
	
}

// this method is called when your extension is deactivated
export function deactivate() { }
