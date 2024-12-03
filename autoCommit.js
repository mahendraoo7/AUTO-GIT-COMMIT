const simpleGit = require('simple-git');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const git = simpleGit();

// Path to your local Git repository
const repoPath = 'D:\Mahendra\React.Js_Mp';  // Updated with your actual repo path

// GitHub repository URL and credentials
const repoUrl = 'https://github.com/mahendraoo7/React.Js_Mp.git';
const branch = 'main';  // Replace with your default branch name if it's different

// Function to automate Git commit and push
async function automateGitCommit() {
  try {
    // Navigate to the local Git repository
    git.cwd(repoPath);

    // Create or modify a file to simulate a code change
    const filePath = path.join(repoPath, 'app.jsx');
    const currentDate = new Date().toISOString();
    fs.appendFileSync(filePath, `Automated commit on ${currentDate}\n`);

    // Add the file to the Git staging area
    await git.add(filePath);

    // Commit the changes
    await git.commit(`${currentDate}`);

    // Push changes to GitHub (ensure you're authenticated)
    await git.push(repoUrl, branch);  // Use your GitHub HTTPS URL
    await git.push(repoUrl, branch);  // Use your GitHub HTTPS URL

    console.log(`Commit made and pushed on ${currentDate}`);
  } catch (error) {
    console.error('Error during commit:', error);
  }
}

// Schedule the task to run every day at midnight
cron.schedule('0 18 * * *', () => {
  console.log('Running automated commit task...');
  automateGitCommit();
});
