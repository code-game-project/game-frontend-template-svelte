<script>
	import { Router, Route } from 'svelte-routing';
	import Index from './routes/index.svelte';
	import Spectate from './routes/spectate.svelte';
	import Debug from './routes/debug.svelte';

	export let url = '';
</script>

<Router {url}>
	<Route path="/"><Index /></Route>
	<Route path="spectate" component={Spectate} />
	<Route path="debug" component={Debug} />
</Router>
