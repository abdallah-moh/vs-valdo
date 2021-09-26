import * as vscode from "vscode";
import { exec } from "child_process";
import G = require("glob");
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("vs-valdo.createNewValaProject", () => {
    exec("valdo", (_err, stdout) => {
      let parsedInput = stdout.split("\n");
      parsedInput.shift();
      parsedInput.shift();
      parsedInput = parsedInput.filter((item) => {
        return item !== "";
      });
      vscode.window.showQuickPick(parsedInput).then((template) => {
        if (!template) {
          return;
        }
        template = template.split("-")[0].replace(/ /g, "");
        exec(`valdo ${template} --list-vars`, (_err, stdout) => {
          const vars = JSON.parse(stdout);
        });
      });
    });
  });

  context.subscriptions.push(disposable);
}
