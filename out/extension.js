"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const changes = require("./changes");
const settings = require("./settings");
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
    // Register test
    let disposable3 = vscode.commands.registerCommand('criticmarkup.test', function () {
        console.log("Test");
    });
    context.subscriptions.push(disposable1, disposable2, disposable3);
    // This will break things ever so often, or at least slows things down...
    settings.set(); // Set custom settings, if necessary
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