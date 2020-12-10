import { existsSync } from "fs";
import {
  HoverProvider as BaseHoverProvider,
  Hover,
  MarkdownString,
  Position,
  TextDocument,
  Uri,
  workspace,
  ProviderResult,
} from "vscode";

export default class HoverProvider implements BaseHoverProvider {
  public provideHover(
    doc: TextDocument,
    position: Position
  ): ProviderResult<Hover> {
    const config = workspace.getConfiguration("laravel_goto_components");
    const regex = new RegExp(config.regex);
    const range = doc.getWordRangeAtPosition(position, regex);

    if (!range) {
      return;
    }

    const componentName = doc.getText(range);
    const componentPath = `/resources/views/components/${componentName}.blade.php`;
    const workspacePath = workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;

    if (!existsSync(workspacePath + componentPath)) {
      return;
    }

    const lookUpUri = `[${componentPath}](${Uri.file(
      workspacePath + componentPath
    )})`;

    return new Hover(new MarkdownString(`*${componentName}*: ${lookUpUri}`));
  }
}
