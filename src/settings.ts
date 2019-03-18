import * as vscode from 'vscode';

export async function settings() {
    
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
            if (settingsSet) { break; }
        }
    }

    // CriticMarkup settings have not been set
    if (!settingsSet) {

        // Syntax colors for CriticMarkup
        const criticmarkupSettings = {
            "textMateRules": [
                ...(currentSettings.textMateRules ? currentSettings.textMateRules : []), // If there are already TextMateRules, add these
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
        await vscode.workspace.getConfiguration().update('editor.tokenColorCustomizations', criticmarkupSettings,vscode.ConfigurationTarget.Global);
    }
}
