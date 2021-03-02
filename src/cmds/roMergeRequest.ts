import * as vscode from 'vscode';
// serive
import { gitLocalOrigin, gitRemoteV, gitBranchCurrent } from '../cli-services/gitService';
// utils
import { showInfo } from '../utils/showMsg';

export default async function helloWorld (context: vscode.ExtensionContext) {
  const testPath = context.extensionPath;

  try {
    const { stdout } = await gitBranchCurrent(testPath) as any;
    const curBranchName = (stdout + '').trim();

    const res = await gitLocalOrigin(testPath);
    const url = `${res}`.replace('.git', '/merge_requests/new?') + 'merge_request%5Bsource_branch%5D=' + curBranchName;

    require('shelljs')
      .exec('start ' + url, (err: any, stdout: any, stderr: any) => {
        showInfo('Hi, ro mr 我要疯了');
      });
  } catch (error) {
    console.log(error);
  }

  // console.log(context);
  const cp = require('child_process');

  cp.exec('git remote -v',
    { cwd: testPath, silent: true },
    (err: any, stdout: any, stderr: any) => {
      console.log(1, err);
      console.log(2, stdout);
      console.log(3, stderr);
    }
  );



  // cp.exec('start https://www.baidu.com', (err: any, stdout: any, stderr: any) => {
  //   vscode.window.showInformationMessage('Hi, ro mr 我要疯了');
  // });
}
