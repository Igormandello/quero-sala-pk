git checkout master
git merge -Xtheirs develop
sass sass:css
rm -rf sass
rm -rf bin
git add -f .
git commit -m "Updates GitHub pages"