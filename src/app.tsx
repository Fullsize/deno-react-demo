import { React, axiod } from 'deps';
function App() {
	React.useEffect(()=>{
		axiod.get('https://alpha-api.wanmen.org/4.0/content/contents/d81c19c7d1e943d1bf1c7215d370facc?debug=1')
	},[])
	return (
		<div>hello world</div>
	)
}
export default App;