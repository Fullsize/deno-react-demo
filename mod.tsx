
import {React,ReactDOMServer,Application,Router,Context} from './deps.ts';
import router from './router.tsx';
const app = new Application();
const PORT=8080;
app.use(router.routes());

console.log(`Listening on port ${PORT}`,router);
await app.listen({ port: PORT });