"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const settings_1 = require("./settings");
const changes = require("./changes");
function activate(context) {
    // Register nextChange
    let disposable1 = vscode.commands.registerCommand('criticmarkup.nextChange', function () {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.selection = changes.next(); // Select the encounted markup
            editor.revealRange(editor.selection); // Move view to found markup
        }
    });
    context.subscriptions.push(disposable1);
    // Register prevChange
    let disposable2 = vscode.commands.registerCommand('criticmarkup.prevChange', function () {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.selection = changes.prev(); // Select the encounted markup
            editor.revealRange(editor.selection); // Move view to found markup
        }
    });
    context.subscriptions.push(disposable2);
    // Register nextChange
    let disposable3 = vscode.commands.registerCommand('criticmarkup.test', function () {
        console.log("Test");
    });
    context.subscriptions.push(disposable3);
    settings_1.settings(); // Set custom settings, if necessary
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
// What happens if there is *no* markup?
// (What happens if there are more than one suggestions?)
// let word = document.getText(selection);
// let reversed = word.split('').reverse().join('');
// editor.edit(editBuilder => {
// 	editBuilder.replace(selection, reversed);
// });
//# sourceMappingURL=extension.js.map