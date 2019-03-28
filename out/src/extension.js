"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
function activate(context) {
    settings_1.settings();
    // Use?:
    // if (!vscode.workspace...(editor.textMateRules...) {
    //    settings();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map