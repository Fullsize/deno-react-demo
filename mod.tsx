import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "./src/app.tsx";
const app = new Application();
const PORT=8080;
const router = new Router();
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
	<script type="module" src="${js}"></script>
	<title>Document</title>
</head>
<body>
	<div id="root">${ReactDOMServer.renderToString(<App />)}</div>
</body>
</html>
`;


router
  .get('/', (context) => {
    context.response.type = 'text/html';
    context.response.body = html;
  })
app.use(router.routes());
console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });