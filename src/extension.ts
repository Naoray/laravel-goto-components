// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages } from "vscode";
import HoverProvider from "./hoverProvider";
import LinkProvider from "./linkProvider";

export function activate(context: ExtensionContext) {
  let hover = languages.registerHoverProvider("blade", new HoverProvider());
  let link = languages.registerDocumentLinkProvider(
    "blade",
    new LinkProvider()
  );

  context.subscriptions.push(hover, link);
}

// this method is called when your extension is deactivated
export function deactivate() {}
