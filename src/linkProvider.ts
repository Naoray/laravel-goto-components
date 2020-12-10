import { existsSync } from "fs";
import {
  DocumentLinkProvider,
  Hover,
  MarkdownString,
  Position,
  TextDocument,
  Uri,
  workspace,
  ProviderResult,
  DocumentLink,
  Range,
} from "vscode";

export default class LinkProvider implements DocumentLinkProvider {
  public provideDocumentLinks(
    doc: TextDocument
  ): ProviderResult<DocumentLink[]> {
    const documentLinks: DocumentLink[] = [];

    const config = workspace.getConfiguration("laravel_goto_components");
    const workspacePath = workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;

    const reg = new RegExp(config.regex);
    let linesCount = doc.lineCount;

    let index = 0;
    while (index < linesCount) {
      let line = doc.lineAt(index);
      let result = line.text.match(reg);

      if (result !== null) {
        for (let item of result) {
          const componentPath = `/resources/views/components/${item}.blade.php`;

          if (existsSync(workspacePath + componentPath)) {
            let start = new Position(line.lineNumber, line.text.indexOf(item));
            let end = start.translate(0, item.length);
            let documentlink = new DocumentLink(
              new Range(start, end),
              Uri.file(workspacePath + componentPath)
            );
            documentLinks.push(documentlink);
          }
        }
      }

      index++;
    }

    return documentLinks;
  }
}
