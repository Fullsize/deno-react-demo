import { React, ReactDOMServer, Application, Router, Context } from './deps.ts';
import routes from './src/router/index.ts';
const router = new Router();
const jsBundle = "/main.js";
const js = (Element: any):string => {
	return `import React from "https://jspm.dev/react@16.13.1";
import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
const App = ${Element};
ReactDOM.hydrate(React.createElement(App), document.getElementById('root'));`
};
const html = (Compon: any):string => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script type="module" src="${jsBundle}"></script>
	<title>Document</title>
</head>
<body>
	<div id="root">
		${ReactDOMServer.renderToString(<Compon />)}
	</div >
</body>
</html>`
}; 
routes.map((item) => {
	router.get(item.path, (context: Context) => {
		context.response.type = 'text/html';
		context.response.body = html(item.page);
	}).get(jsBundle,(context: Context)=>{
		context.response.type = 'application/javascript';
		context.response.body = js(item.page);
	})
})
export default router;