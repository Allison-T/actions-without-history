# actions-without-history
Deploy Hugo public folder to GitHub Pages without commit history 

Workflow Usage:

```yml
- uses: ./.github/actions/deploy-without-history # Use your local action
        with:
          target_repo: 'https://github.com/username/username.github.io.git'
        env:
          GITHUB_TOKEN: ${{ secrets.PERSONAL_TOKEN }} # Or GITHUB_TOKEN
```
