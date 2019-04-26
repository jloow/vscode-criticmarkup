"use strict";
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
        let cEnd;
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
        // Select the encounted markup
        editor.selection = new vscode.Selection(new vscode.Position(l, c), // Start of the selection
        new vscode.Position(lEnd, cEnd) // End of the selection
        );
        editor.revealRange(range); // Move view to found markup
        search = false; // Stop the search
    }
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
//# sourceMappingURL=stuff.js.map