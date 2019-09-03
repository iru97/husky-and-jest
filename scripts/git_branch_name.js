const fs = require('fs');
const childProcessExec = require('child_process').exec;
const util = require('util');
const BRANCH_CONTRACT = /^[a-zA-Z]*$/;
// const BRANCH_CONTRACT = /^(feature|hotfix)\/AP-[0-9]{1,6}-/;
const TIMEOUT_THRESHOLD = 3000;

const exec = util.promisify(childProcessExec);
let branchName = '';
checkBranchName();
hookCleanup();

async function checkBranchName(){
  console.log('$HUSKY_GIT_PARAMS ' + process.argv[2])
  try{
    branchName = await getCurrentBranch();
  }
  catch (e){
    handleGitBranchCommandError(e);
  }

  if( ! BRANCH_CONTRACT.test(branchName) ){
    handleBadBranchName();
  }

  process.exit(0);
}

async function getCurrentBranch() {

  const branchesOutput = await exec('git branch');
  if( branchesOutput.stderr){
    throw new Error(stderr);
  }
  const branches = branchesOutput.stdout;
  return branches.split('\n').find(b => b.trim().charAt(0) === '*' ).trim().substring(2);
}

function handleGitBranchCommandError(e){
  console.log('ERROR with "git branch" command');
  console.log(e.getMessage() );
  console.log('----');
  console.log('Your commit will be rejected. This script will terminate.');
  process.exit(1);
}

function handleBadBranchName(){
  console.log('There is something wrong with your branch name ' + branchName);
  console.log('branch names in this project must adhere to this contract:' + BRANCH_CONTRACT);
  process.exit(1);
}

function hookCleanup(){

  setTimeout(() => {
    console.log('Timeout error');
    process.exit(1);
  },TIMEOUT_THRESHOLD);

}
