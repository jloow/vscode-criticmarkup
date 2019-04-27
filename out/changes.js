"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function select(forward, editor) {
    // Get the document
    let document = editor.document;
    // Get current cursor position
    let cursorPosition = editor.selection;
    // Loop through the document, starting with the current line
    let l = cursorPosition.start.line;
    let search = true;
    let reachedEnd = false;
    while (search) {
        // Set range based on line being searched
        let range = document.lineAt(l).range;
        // Markup to match
        const markupStart = ["{++", "{--", "{~~", "{>>", "{=="];
        const markupEnd = ["++}", "--}", "~~}", "<<}", "==}"];
        // Find the position and type of markups in the string
        let m = -1; // Type of markup
        let p = (forward ? document.getText(range).length : 0); // Position of markup. Start of search set depending on `forward`
        for (let i in markupStart) {
            // Find if there is markup in the string
            let t = document.getText(range).indexOf(markupStart[i], (cursorPosition.start.line === l && forward ? cursorPosition.end.character : 0) // Search only after the cursor position if cursor is at the line being searched
            );
            // Forward search: select the first markup
            if (t > -1 && t < p && forward) {
                m = parseInt(i); // I don't know if `parseInt()` is required, but vscode kept throwing warnings
                p = t;
            }
            // Backwards search: select last markup
            else if (t > -1 && t > p && !forward) {
                // If we are at the line where the cursor is, skip anything after the cursor
                if (cursorPosition.start.line === l && t >= cursorPosition.start.character) {
                    continue;
                }
                else {
                    m = parseInt(i);
                    p = t;
                }
            }
        }
        // Find the start of the markup
        let c = document.getText(range).indexOf(markupStart[m]);
        // Is there markup in the string? Skip if markup is found in the selected text
        if (c > -1 && !cursorPosition.contains(new vscode.Position(l, c))) {
            // Find the end of the markup
            let endFound = false;
            let lEnd = l;
            let cEnd = 0;
            let endRange = range;
            while (!endFound && lEnd !== document.lineCount - 1) {
                cEnd = document.getText(range).indexOf(markupEnd[m]); // Position of the end of the markup
                // Is the markup in the string?
                if (cEnd > -1) {
                    endFound = true;
                    cEnd += 3; // Selected the whole of the markup
                }
                // Next line
                else {
                    lEnd++;
                    range = document.lineAt(lEnd).range;
                }
            }
            // No closing markup could be found; set end of selection to end of the line of first markup
            if (!endFound) {
                lEnd = l;
                cEnd = endRange.end.character;
            }
            // Return selection of markup
            return new vscode.Selection(new vscode.Position(l, c), // Start of the selection
            new vscode.Position(lEnd, cEnd) // End of the selection
            );
        }
        // Search forward
        if (forward) {
            l++; // Next line
            // Are we at where we started and have already looped one cycle? Then stop the search
            if (l === cursorPosition.start.line && reachedEnd) {
                search = false;
            }
            // Are we at the last line for the first time? Then start over, once
            else if (l === document.lineCount) {
                reachedEnd = true;
                l = 0;
            }
        }
        // Search backwards
        else {
            l--; // Previous line
            // Are we at where we started and have already looped one cycle? Then stop the search
            if (l === cursorPosition.start.line && reachedEnd) {
                search = false;
            }
            // Are we at the last line for the first time? Then start over, once
            else if (l <= 0) {
                reachedEnd = true;
                l = document.lineCount - 1;
            }
        }
    }
    // If there is no markup, select current selection again
    return new vscode.Selection(new vscode.Position(editor.selection.start.line, editor.selection.start.character), new vscode.Position(editor.selection.end.line, editor.selection.end.character));
}
function next(editor) {
    // Only search forward if cursor is not currently inside markup
    if (select(false, editor).contains(editor.selection)) {
        return select(false, editor);
    }
    else {
        return select(true, editor);
    }
}
exports.next = next;
function prev(editor) {
    return select(false, editor);
}
exports.prev = prev;
//# sourceMappingURL=changes.js.map