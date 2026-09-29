<script>
	import { journey } from '$lib/js/journey.js';

	// personal photos and videos are served as-is (no enhancement pipeline) —
	// they're yours, at whatever size you drop in.
	const images = import.meta.glob('/src/content/journey/*.{jpg,jpeg,png,webp,avif,gif}', {
		import: 'default',
		eager: true,
		query: '?url'
	});

	const videos = import.meta.glob('/src/content/journey/*.{mp4,webm,mov}', {
		import: 'default',
		eager: true,
		query: '?url'
	});

	function resolve(filename) {
		if (!filename) return null;
		for (const [path, url] of Object.entries(images)) {
			if (path.includes(filename)) return url;
		}
		for (const [path, url] of Object.entries(videos)) {
			if (path.includes(filename)) return url;
		}
		return null;
	}

	const accents = ['var(--pink)', 'var(--purple)', 'var(--blue)'];
</script>

<main>
	<h1>{journey.intro.title}</h1>
	<p class="intro">{journey.intro.text}</p>

	{#each journey.chapters as chapter, i}
		<section class="chapter" style:--accent={accents[i % accents.length]}>
			<header>
				<div class="years">{chapter.years}</div>
				<h2>{chapter.title}</h2>
				<p class="chapter-text">{chapter.text}</p>
			</header>
			<div class="strip">
				{#each chapter.media as entry}
					{@const url = resolve(entry.video ?? entry.photo)}
					{@const isVideo = Boolean(entry.video)}
					<figure class="frame">
						{#if isVideo && url}
							<video
								src={url}
								poster={resolve(entry.poster) ?? undefined}
								controls
								preload="metadata"
								playsinline
							></video>
						{:else if !isVideo && url}
							<img src={url} alt={entry.caption} loading="lazy" />
						{:else}
							<div class="missing">
								<span class="missing-name">{entry.video ?? entry.photo}</span>
								<span class="missing-hint">drop this file into src/content/journey/</span>
							</div>
						{/if}
						<figcaption>{entry.caption}</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	{/each}

	<p class="end">more chapters as they happen.</p>
</main>

<style>
	main {
		width: 100%;
		max-width: 60rem;
		margin: 0 auto 10rem auto;
		padding: 0 1.5rem;
	}

	.intro {
		max-width: 42rem;
		color: var(--txt-2);
	}

	.chapter {
		position: relative;
		border-left: 2px solid var(--bg-3);
		padding: 0 0 3rem 2rem;
		margin: 0 0 0 0.4rem;
	}

	.chapter:last-of-type {
		padding-bottom: 1rem;
	}

	/* timeline node */
	.chapter::before {
		content: '';
		position: absolute;
		left: -0.5rem;
		top: 0.35rem;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--accent);
	}

	.years {
		font-family: 'Space Mono', monospace;
		font-size: 1.125rem;
		color: var(--accent);
	}

	h2 {
		margin: 0.25rem 0 0.5rem 0;
	}

	.chapter-text {
		max-width: 42rem;
		color: var(--txt-2);
		margin: 0 0 1.5rem 0;
	}

	.strip {
		display: flex;
		gap: 1.5rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		padding: 0.25rem 0.25rem 1rem 0.25rem;
	}

	.frame {
		flex: 0 0 min(26rem, 78vw);
		scroll-snap-align: start;
		margin: 0;
		background: var(--bg-2);
		border: 1px solid var(--bg-3);
		padding: 0.6rem 0.6rem 0.75rem 0.6rem;
	}

	.frame:nth-child(odd) {
		transform: rotate(-0.6deg);
	}

	.frame:nth-child(even) {
		transform: rotate(0.6deg);
	}

	img,
	video {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		background: var(--bg-3);
	}

	figcaption {
		margin-top: 0.6rem;
		font-family: 'Space Mono', monospace;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--txt-2);
	}

	.missing {
		display: grid;
		align-content: center;
		justify-items: center;
		gap: 0.4rem;
		width: 100%;
		aspect-ratio: 4 / 3;
		border: 2px dashed var(--bg-3);
		padding: 1rem;
		text-align: center;
	}

	.missing-name {
		font-family: 'Space Mono', monospace;
		color: var(--txt-3);
		overflow-wrap: anywhere;
	}

	.missing-hint {
		font-family: 'Space Mono', monospace;
		font-size: 0.85rem;
		color: var(--txt-3);
		opacity: 0.7;
	}

	.end {
		margin: 3rem 0 0 2.4rem;
		font-family: 'Space Mono', monospace;
		color: var(--txt-3);
	}

	@media (max-width: 850px) {
		.chapter {
			padding-left: 1.25rem;
		}

		.frame {
			flex-basis: min(21rem, 85vw);
		}
	}
</style>
