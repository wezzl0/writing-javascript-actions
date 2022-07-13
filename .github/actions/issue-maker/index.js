const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const issueTitle = core.getInput("issue-title");
    const jokeBody = core.getInput("joke");
    const token = core.getInput("repo-token");

    const octokit = github.getOctokit(token);

    const newIssue = await octokit.rest.issues.create({
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        title: issueTitle,
        body: jokeBody
    });
    
  await core.summary
    .addHeading('Test Results')
    .addTable([
      [{data: 'File', header: true}, {data: 'Result', header: true}],
      ['foo.js', 'Pass '],
      ['bar.js', 'Fail '],
      ['test.js', 'Pass ']
    ])
    .addLink('View staging deployment!', 'https://github.com')
    .write()
  } catch (err) {
      core.setFailed(err.message);
  }
}

run();
