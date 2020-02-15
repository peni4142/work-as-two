import { window, workspace } from "vscode";
import { equal, notEqual } from "assert";
import { IConfig } from "../../interface";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as myExtension from '../extension';

suite('00 Test test_workspace', () => {
	window.showInformationMessage('Start all tests.');
	test("config exists",()=>{
		let config: IConfig = <any>workspace.getConfiguration("work-as-two");
		notEqual(config.leftEscapedRegex, null);
		notEqual(config.leftTransformToRight, null);
		notEqual(config.rightEscapedRegex, null);
		notEqual(config.rightTransformToLeft, null);
	});

	test("window count start", ()=>{
		equal(window.visibleTextEditors.length, 0);
	});
});
