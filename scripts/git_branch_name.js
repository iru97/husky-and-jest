const childProcessExec = require('child_process').exec;
const util = require('util');
const BRANCH_CONTRACT = /^[a-zA-Z]*$/;
const TIMEOUT_THRESHOLD = 3000;

const exec = util.promisify(childProcessExec);
let branchName = '';
checkBranchName();
hookCleanup();


async function checkBranchName(){
  try{
    branchName = await getCurrentBranch();
    console.log('Current branch is ' + branchName)
  }
  catch (e){
    handleGitBranchCommandError(e);
  }

  if( ! BRANCH_CONTRACT.test(branchName) ){
    handleBadBranchName();
  } else {
    console.log('Your branch name is correct')
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
