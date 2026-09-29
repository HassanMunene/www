// ─── your journey, in photos and videos ─────────────────────────────────────
//
// how to add media:
//   1. drop your photo (jpg/png/webp/avif) or video (mp4/webm/mov) into
//      src/content/journey/
//   2. add an entry to the chapter's `media` list below:
//        { photo: 'my-photo.jpg', caption: 'what this moment meant' }
//        { video: 'site-visit.mp4', poster: 'thumb.jpg', caption: '...' }
//   3. that's it — filenames just need to match the file you dropped in.
//
// entries with no matching file yet render as a labeled placeholder frame,
// so you can shape the story first and drop the photos in as you find them.
// delete a placeholder once its media exists.

export const journey = {
	intro: {
		title: 'the journey so far',
		text: 'not a portfolio of polished screenshots — just the moments that got me here. some from work, some from the road between. this page is the honest one.'
	},
	chapters: [
		{
			id: 'beginnings',
			years: 'the beginnings',
			title: 'where it started',
			text: 'the first computer i could call mine, the first "hello world" that actually ran, the late nights that didn\u2019t feel late. nobody claps for this chapter — but every line i write today traces back here.',
			media: [
				{
					// drop a photo into src/content/journey/ and rename the key below
					photo: 'beginnings-01.jpg',
					caption: 'the machine that started everything.'
				},
				{
					photo: 'beginnings-02.jpg',
					caption: 'first program that actually worked. i remember staring at it like it was magic.'
				}
			]
		},
		{
			id: 'learning',
			years: 'the learning years',
			title: 'learning by breaking things',
			text: 'tutorials, crashes, that one deploy that took the whole thing down at 2am. i didn\u2019t know it yet, but this was the curriculum: break, read the error, understand, rebuild.',
			media: [
				{
					photo: 'learning-01.jpg',
					caption: 'the setup where everything got learned — and broken.'
				},
				{
					photo: 'learning-02.jpg',
					caption: 'proof of the all-nighter: coffee, tabs, and a working feature at sunrise.'
				}
			]
		},
		{
			id: 'work',
			years: 'the work',
			title: 'shipping real things',
			text: 'the chapter where it got serious — real users, real stakes, real wins. building systems people depend on changes how you think: every feature carries a promise, and someone\u2019s day depends on you keeping it.',
			media: [
				{
					video: 'work-site-visit.mp4',
					poster: 'work-site-visit-poster.jpg',
					caption: 'out in the field — seeing the system actually being used.'
				},
				{
					photo: 'work-team-01.jpg',
					caption: 'the crew. shipping is a team sport.'
				},
				{
					photo: 'work-demo-01.jpg',
					caption: 'demo day — showing what weeks of work can do.'
				}
			]
		},
		{
			id: 'now',
			years: 'now',
			title: 'still building, still curious',
			text: 'these days i\u2019m deep in backend systems by day and chasing clean, fast, human interfaces by night. the tools changed. the feeling from chapter one never did.',
			media: [
				{
					photo: 'now-desk-01.jpg',
					caption: 'today\u2019s view. the stickers multiply; the excitement doesn\u2019t fade.'
				},
				{
					photo: 'now-01.jpg',
					caption: 'still here. still building.'
				}
			]
		}
	]
};
