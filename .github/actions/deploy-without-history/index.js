const core = require('@actions/core');
const { exec } = require('@actions/exec'); // For executing git commands

async function run() {
  try {
    const targetRepo = core.getInput('target_repo', { required: true });
    // const sourceDir = core.getInput('source_dir') || '.';  // Optional: Source directory

    // Extract the repository name from the URL
    const repoName = targetRepo.substring(targetRepo.lastIndexOf('/') + 1, targetRepo.lastIndexOf('.git'));

    await exec('git', ['clone', '--depth', '1', targetRepo, repoName]);
    process.chdir(repoName); // Change directory to the cloned repo
    await exec('rm', ['-rf', '.git']);
    await exec('git', ['init']);
    await exec('git', ['remote', 'add', 'origin', targetRepo]);
    await exec('git', ['add', '.']);
    await exec('git', ['commit', '-m', '"Deploy latest version"']);
    await exec('git', ['branch', '-M', 'main']);
    await exec('git', ['push', '-f', 'origin', 'main'], { env: { GITHUB_TOKEN: process.env.GITHUB_TOKEN } }); // Use GITHUB_TOKEN

    core.info('Deployment complete.');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
