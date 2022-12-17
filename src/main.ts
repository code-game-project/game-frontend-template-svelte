import './css/reset.css';
import './css/style.css';
import 'prismjs/themes/prism-tomorrow.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
