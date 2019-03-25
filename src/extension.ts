import * as vscode from 'vscode';
import { settings } from './settings';

export function activate(context: vscode.ExtensionContext) {

	settings();

	// Use?:
	// if (!vscode.workspace...(editor.textMateRules...) {
    //    settings();
}

}

export function deactivate() {}