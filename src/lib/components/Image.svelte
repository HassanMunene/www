<script>
	let { image, alt, sizes = '', loading = 'eager', fetchpriority = 'auto' } = $props();

	// Check if the image is an external URL
	const isExternalUrl = $derived(image ? /^https?:\/\//.test(image) : false);
	const isGif = $derived(image ? image.endsWith('.gif') : false);

	// Enhancing every image with sharp (6 widths x avif/webp) makes the first
	// page load in dev take an extremely long time on a cold cache, so in dev
	// images are served as-is instead.
	const dev = import.meta.env.DEV;

	const gifs = dev
		? {}
		: import.meta.glob('/src/content/**/*.gif', {
				import: 'default',
				eager: true
			});

	const pictures = dev
		? {}
		: import.meta.glob('/src/content/**/*.{avif,heif,jpeg,jpg,png,tiff,webp}', {
				import: 'default',
				eager: true,
				query: {
					enhanced: true,
					w: '2400;2000;1600;1200;800;400'
				}
			});

	function importImage(image) {
		if (image.endsWith('.gif')) {
			if (dev) return devUrl(image);
			for (const [path, src] of Object.entries(gifs)) {
				if (path.includes(image)) {
					return src;
				}
			}
			return;
		}

		if (dev) return devUrl(image);

		for (const [path, src] of Object.entries(pictures)) {
			if (path.includes(image)) {
				return src;
			}
		}
	}

	// Resolves a content image to a raw url the vite dev server can serve.
	function devUrl(image) {
		for (const path of Object.keys(picturePaths)) {
			if (path.includes(image)) {
				return path;
			}
		}
	}

	const picturePaths = dev
		? import.meta.glob('/src/content/**/*.{avif,heif,jpeg,jpg,png,tiff,webp}', {
				query: '?url',
				import: 'default',
				eager: true
			})
		: {};

	const src = $derived(image && !isExternalUrl ? importImage(image) : null);
</script>

{#if isExternalUrl}
	<img
		src={image}
		{alt}
		{loading}
		{fetchpriority}
		{sizes}
		onload={(e) => (e.target.style.opacity = 1)}
	/>
{:else if isGif}
	{#if src}
		<img {src} {alt} {loading} {fetchpriority} onload={(e) => (e.target.style.opacity = 1)} />
	{/if}{:else if image}
	{#if dev}
		{#if src}
			<img
				{src}
				{alt}
				{loading}
				{fetchpriority}
				{sizes}
				onload={(e) => (e.target.style.opacity = 1)}
			/>
		{/if}
	{:else}
		<picture>
			{#if src}
				<source srcset={src.sources.avif} type="image/avif" {sizes} />
				<source srcset={src.sources.webp} type="image/webp" {sizes} />
				<img
					src={src.img.src}
					{alt}
					{loading}
					{fetchpriority}
					width={src.img.w}
					height={src.img.h}
					onload={(e) => (e.target.style.opacity = 1)}
				/>
			{/if}
		</picture>
	{/if}
{/if}

<style>
	picture {
		aspect-ratio: var(--aspect-ratio, auto);
	}

	img {
		display: block;
		width: var(--width, 100%);
		height: var(--height, auto);
		aspect-ratio: var(--aspect-ratio, auto);
		object-fit: cover;
		transition: opacity 0.2s;
		opacity: 0;
		margin: auto;
	}
</style>
