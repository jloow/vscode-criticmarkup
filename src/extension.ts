import * as vscode from 'vscode';
import { settings } from './settings';

export function activate(context: vscode.ExtensionContext) {

	settings();

}

export function deactivate() {}