#  CriticMarkup for Visual Studio Code README

A [CriticMarkup](http://criticmarkup.com/) extension for Visual
Studio Code.

## Features

Implements support for CriticMarkup in Visual Studio Code.

- Snippets with key bindings for suggesting additions, deletions and
  substitutions, as well as for commenting and highlighting.
- Adds grammars and syntax highlighting

## Requirements

This extension doesn't have any requirements or dependencies. However,
to convert the text you'll need converter.

## Usage

See the official [CriticMarkup User's Guide](http://criticmarkup.com/users-guide.php)
for a full introduction.

Use the following key bindings to insert CriticMarkup markup:

- Addition (`ctrl+shift+a`): Suggest an addition to the text.
- Deletion (`ctrl+shift+d`): Suggest text to be deleted (will markup
  currently selected text).
- Substitution (`ctrl+shift+s`): Suggest that text be substituted for
  other text (will markup the currently selected text as text to be
  substituted).
- Comment (`ctrl+shift+c`): Add a comment.
- Highlight and comment (`ctrl+shift+h`): Highlight and comment the
  text (selected text will be highlighted).

## Extension Settings

The syntax highlight colors can be changed by modifying the following
`textMateRules` under `editor.tokenColorCustomizations` in
`settings.json`:

- `criticmarkup.addition` (default `#00bb00`)
- `criticmarkup.deletion` (default `#dd0000`)
- `criticmarkup.substitution`(default `#ff8600`)
- `criticmarkup.comment` (default `#0000bb`)
- `criticmarkup.highlight` (default `#aa53a9`)

## Known Issues

- The extension will automatically set syntax highlighting colors for
  the CriticMarkup syntax. It will do so only if these setting aren't
  already set. Currently, only one setting is checked
  (`criticmarkup.addition`); if some settings are removed but not
  this, the extension won't reset the settings.

- Currently, the extension does not work very well with Markdown All
  in One and other extensions that implements strikethrough text.
  Since substitutions in CriticMarkup use the syntax `{~~foo~>bar~~}`,
  and the strikethrough syntax is `~~foo~~`, the substitution will
  appear as strikethrough text. If you still want to use this
  extension together with Markdown All in One, it is recommended that
  you disable the "syntax decorations" option.

- The key bindings probably conflict with other key bindings. Please
  let know.

## Todo

- [ ] Automatically distinguish between highlighting and commenting,
      and just commenting
- [ ] Accept/reject changes
- [ ] Jump to changes
- [ ] Track changes functionality

## Release Notes

### [0.1.1] - 2019-04-16

Improved support for markup that extends over multiple lines.

### [0.1.0] - 2019-03-28

Initial release.