git checkout master &&
git merge --squash -Xtheirs develop &&
sass sass:css &&
rm -rf sass bin .gitignore &&
git add -f . &&
git commit -m "Updates GitHub pages"