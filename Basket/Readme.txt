This project shows a simple your basket app done for AKQA assignment.

Points to note
1) Have two versions of HTML
	- One for Dev(index.html loads multiple css and js)
	- Another for production (index_production.html loads one css and js only)

2) Have configured grunt tasks with the project which could be used for the generations of production files. Steps in build
	- Clean any earlier existing build folder
	- jslint the js code
	- concat js files
	- minify the js code
	- minify the css code

3) Though the build is already done,
To run the build again, open cmd and run following commands,
after having the node and grunt installed
	- npm install(generates node_modules)
	- grunt build


