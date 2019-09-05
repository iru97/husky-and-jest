const childProcessExec = require('child_process').exec;
const https = require('https');
const util = require('util');
const axios = require('axios');
const BRANCH_CONTRACT = /^[a-zA-Z]*$/;
const TIMEOUT_THRESHOLD = 15000;

const exec = util.promisify(childProcessExec);
let branchName = '';
checkBranchName();
hookCleanup();

async function checkBranchName(){
  try{
    branchName = await getCurrentBranch();
  }
  catch (e){
    handleGitBranchCommandError(e);
  }

  if( ! BRANCH_CONTRACT.test(branchName) ){
    handleBadBranchName();
  } else if (branchName === 'development'){
    await sendPushDevEmail().then((result) => {
      process.exit(0);
    });
  } else if (branchName === 'master') {
    console.log('YOU CANT PUSH TO MASTER')
    process.exit(1);
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

async function sendPushDevEmail() {
  console.log('SENDING EMAIL....')
  const url = "http://localhost:3000/send-email"
  const emailOptions = {
    from: "iruhsan@gmail.com",
    to: ["iru.hernandez@ultebra.eu", "eduardo.marrero@ultebra.eu"],
    subject: "Push to Master",
    body: "Se ha realizado un push a master"
  }
  
  return axios.post(url, emailOptions);
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
