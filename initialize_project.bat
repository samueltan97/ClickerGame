@echo off

git init
git add .
git config user.name Samuel
git config user.email samueltan97@hotmail.com
git commit -m "initial commit"

set /p push=Push to origin? [y/n] : 

if %push%==y (
	git remote add origin https://....
	git push origin --all 
	pause
	exit
)
pause	
exit