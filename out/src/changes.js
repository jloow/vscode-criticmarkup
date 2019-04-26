"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function select(forward) {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        let document = editor.document;
        // Get current cursor position
        let cursorPosition = editor.selection;
        // Loop through the document, starting with the current line
        let l = cursorPosition.start.line;
        let search = true;
        let reachedEnd = false;
        while (search) {
            let range = document.lineAt(l).range; // Set range based on line being searched
            // Find the start of the markup
            let c = document.getText(range).indexOf("{++");
            // Is there markup in the string?
            // It skips if markup is found in the selected text
            // Currently it doesn't properly detect if the cursor
            // is inside the markup
            if (c > -1 &&
                !cursorPosition.contains(new vscode.Position(l, c))) {
                // Find the end of the markup
                let endFound = false;
                let lEnd = l;
                let cEnd = 0;
                let endRange = range;
                while (!endFound && lEnd !== document.lineCount - 1) {
                    cEnd = document.getText(range).indexOf("++}");
                    if (cEnd > -1) { // Is the markup in the string?
                        endFound = true;
                        cEnd += 3; // To selected the whole of the markup
                    }
                    else { // Next line
                        lEnd++;
                        range = document.lineAt(lEnd).range;
                    }
                }
                // No closing markup could be found; set end of
                // selection to end of the line of first markup
                if (!endFound) {
                    lEnd = l;
                    cEnd = endRange.end.character;
                }
                return new vscode.Selection(new vscode.Position(l, c), // Start of the selection
                new vscode.Position(lEnd, cEnd) // End of the selection
                ); // Return selection of markup
            }
            // Search forward
            if (forward) {
                l++; // Next line
                // Are we at where we started and have already looped
                // one cycle? Then stop the search
                if (l === cursorPosition.start.line && reachedEnd) {
                    search = false;
                }
                // Are we at the last line for the first time? Then
                // start over, once
                else if (l === document.lineCount) {
                    reachedEnd = true;
                    l = 0;
                }
            }
            // Search backwards
            else {
                l--; // Previous line
                // Are we at where we started and have already looped
                // one cycle? Then stop the search
                if (l === cursorPosition.start.line && reachedEnd) {
                    search = false;
                }
                // Are we at the last line for the first time? Then
                // start over, once
                else if (l === 0) {
                    reachedEnd = true;
                    l = document.lineCount - 1;
                }
            }
        }
    }
    return new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0)); // If there is no markup, go to top
}
function next() {
    return select(true);
}
exports.next = next;
function prev() {
    return select(false);
}
exports.prev = prev;
//# sourceMappingURL=changes.js.map