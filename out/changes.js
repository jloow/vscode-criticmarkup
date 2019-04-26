"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function select(forward) {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        // Get the document
        let document = editor.document;
        // Get current cursor position
        let cursorPosition = editor.selection;
        // Loop through the document, starting with the current line
        let l = cursorPosition.start.line;
        let search = true;
        let reachedEnd = false;
        while (search) {
            let range = document.lineAt(l).range; // Set range based on line being searched
            // Markup to match
            const markupStart = [
                "{++",
                "{--",
                "{~~",
                "{>>",
                "{=="
            ];
            const markupEnd = [
                "++}",
                "--}",
                "~~}",
                "<<}",
                "==}"
            ];
            // Find the position and type of markups in the string
            let m = -1; // Type of markup
            let p = (forward ? document.getText(range).length : 0); // Position of markup. Start set depending on `forward`
            for (let i in markupStart) {
                let t = document.getText(range).indexOf(markupStart[i], 
                // Search only after the cursor position if cursor
                // is at the line being searched
                (cursorPosition.start.line === l && forward ? cursorPosition.end.character : 0) // Doesn't work backwards
                );
                // Select the first markup (forward search)
                if (t > -1 && t < p && forward) {
                    m = i;
                    p = t;
                }
                // Select last markup (backwards search)
                else if (t > -1 && t > p && !forward) {
                    // Make this look nicer
                    // If we are at the line where the cursor is,
                    // search only before the cursor
                    if (cursorPosition.start.line === l && t >= cursorPosition.start.character) { }
                    else {
                        m = i;
                        p = t;
                    }
                }
            }
            // Find the start of the markup
            let c = document.getText(range).indexOf(markupStart[m]);
            // Is there markup in the string?
            // It skips if markup is found in the selected text
            if (c > -1 &&
                !cursorPosition.contains(new vscode.Position(l, c))) {
                // Find the end of the markup
                let endFound = false;
                let lEnd = l;
                let cEnd = 0;
                let endRange = range;
                while (!endFound && lEnd !== document.lineCount - 1) {
                    cEnd = document.getText(range).indexOf(markupEnd[m]);
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
                else if (l <= 0) {
                    reachedEnd = true;
                    l = document.lineCount - 1;
                }
            }
        }
    }
    return new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0)); // If there is no markup, go to top
}
function next() {
    // Only search forward if cursor is not currently inside markup
    // Make prettier...
    let editor = vscode.window.activeTextEditor;
    if (select(false).contains(editor.selection)) {
        return select(false);
    }
    else {
        return select(true);
    }
    //return select(true);
}
exports.next = next;
// This function can also be used to selected a segment of markup
// if the cursor is already inside that markup
function prev() {
    return select(false);
}
exports.prev = prev;
//# sourceMappingURL=changes.js.map