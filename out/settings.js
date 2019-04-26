"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function set() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get current settings
        const currentSettings = vscode.workspace.getConfiguration('editor.tokenColorCustomizations');
        let settingsSet = false;
        // Are there already TextMateRules?
        if (currentSettings.textMateRules) {
            // Are there already CriticMarkup settings?
            for (let setting of currentSettings.textMateRules) {
                if (setting.scope === "criticmarkup.addition") {
                    settingsSet = true;
                }
                if (settingsSet) {
                    break;
                }
            }
        }
        // CriticMarkup settings have not been set
        if (!settingsSet) {
            // Syntax colors for CriticMarkup
            const criticmarkupSettings = {
                "textMateRules": [
                    ...(currentSettings.textMateRules ? currentSettings.textMateRules : []),
                    {
                        "scope": "criticmarkup.addition",
                        "settings": {
                            "foreground": "#00bb00"
                        }
                    },
                    {
                        "scope": "criticmarkup.deletion",
                        "settings": {
                            "foreground": "#dd0000"
                        }
                    },
                    {
                        "scope": "criticmarkup.substitution",
                        "settings": {
                            "foreground": "#ff8600"
                        }
                    },
                    {
                        "scope": "criticmarkup.comment",
                        "settings": {
                            "foreground": "#0000bb"
                        }
                    },
                    {
                        "scope": "criticmarkup.highlight",
                        "settings": {
                            "foreground": "#aa53a9"
                        }
                    }
                ]
            };
            // Add the settings
            yield vscode.workspace.getConfiguration().update('editor.tokenColorCustomizations', criticmarkupSettings, vscode.ConfigurationTarget.Global);
        }
    });
}
exports.set = set;
//# sourceMappingURL=settings.js.map