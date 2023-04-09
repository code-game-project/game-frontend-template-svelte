<script>
	import { onMount } from 'svelte';
	import { Router, Route } from 'svelte-routing';
	import { initInfo } from './stores';
	import ErrorStack from './components/generic/error-stack.svelte';
	import Header from './components/header.svelte';
	import Footer from './components/generic/footer.svelte';
	import Index from './routes/index.svelte';
	import Spectate from './routes/spectate.svelte';
	import Debug from './routes/debug.svelte';

	export let url = '';
	onMount(initInfo);
</script>

<ErrorStack />

<Header />

<main>
	<Router {url}>
		<Route path="/"><Index /></Route>
		<Route path="spectate" component={Spectate} />
		<Route path="debug" component={Debug} />
	</Router>
</main>

<Footer />
