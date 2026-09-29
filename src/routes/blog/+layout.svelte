<script>
	import { site } from '$lib/js/site.js';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="{site.domain} - blog rss feed"
		href="/blog/rss.xml"
	/>
</svelte:head>

{@render children()}
