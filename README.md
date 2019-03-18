#  CriticMarkup for Visual Studio Code README

A [CriticMarkup](http://criticmarkup.com/) extentsion for Visual
Studio Code.

## Features

Implements support for CriticMarkup in Visual Studio Code.

- Snippets with keybindings for suggesting additions, deletions and
  substituions, as well as for commenting and highlightning.
- Adds grammars and syntax highlighting

## Requirements

This extension doesn't have any requirements or dependencies. However,
to convert the text you'll need converter. 

## Extension Settings

Include if your extension adds any VS Code settings through the
`contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

The extension will automatically set syntax highlighting colors for
the CriticMarkup syntax. It will do so only if no these setting aren't
already set. Currently, only one setting is checked; if some settings
are removed but not this one, the extension won't reset the settings.

## Release Notes

### 0.1.0

Initial release.