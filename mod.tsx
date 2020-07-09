
import {React,ReactDOMServer,Application,Router,Context} from './deps.ts';
import App from "./src/app.tsx";
const app = new Application();
const PORT=8080;
const router = new Router();
const jsBundle = "/main.js";
const js =`import React from "https://jspm.dev/react@16.13.1";
import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
const App = ${App};
ReactDOM.hydrate(React.createElement(App), document.getElementById('root'));`;  
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script type="module" src="${jsBundle}"></script>
	<title>Document</title>
</head>
<body>
	<div id="root">${ReactDOMServer.renderToString(<App />)}</div>
</body>
</html>
`;


router
  .get('/', (context:Context) => {
    context.response.type = 'text/html';
    context.response.body = html;
  }).get(jsBundle,(context:Context)=>{
		context.response.type = 'application/javascript';
    context.response.body = js;
	})
app.use(router.routes());
console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });