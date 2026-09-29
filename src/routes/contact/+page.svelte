<script>
	import EmailIcon from '~icons/ph/envelope';
	import CopyIcon from '~icons/ph/copy';
	import CheckIcon from '~icons/ph/check';

	let status = $state('submit ->');
	let emailCopied = $state(false);

	// assembled at runtime so the address never appears in the static HTML
	let email = $state('');
	$effect(() => {
		email = ['awanzihassan6', 'gmail.com'].join('@');
	});

	const handleSubmit = async (data) => {
		data.preventDefault();

		status = 'submitting...';
		const formData = new FormData(data.currentTarget);
		const object = Object.fromEntries(formData);
		// TODO: replace with your own web3forms access key — create one free at
		// https://web3forms.com (the original author's key was removed)
		object.access_key = 'YOUR_WEB3FORMS_ACCESS_KEY';
		const json = JSON.stringify(object);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});

		const result = await response.json();
		if (result.success) {
			status = 'message sent!';
		} else {
			status = 'something went wrong :(';
		}
	};

	const copyEmail = async () => {
		await navigator.clipboard.writeText(email);
		emailCopied = true;
		setTimeout(() => (emailCopied = false), 1000);
	};
</script>

<main>
	<h1>contact</h1>
	<p>ways to get in touch.</p>
	<div class="info">
		<EmailIcon />email <span class="sub">-></span>
		<a href={email ? `mailto:${email}` : undefined} class="external"
			>{email}<span class="arrow">/></span>
		</a>
		<button class="copy-btn" onclick={copyEmail} aria-label="Copy email">
			{#if emailCopied}
				<CheckIcon />
			{:else}
				<CopyIcon />
			{/if}
		</button>
	</div>
	<br />
	<br />
	<h3>contact form</h3>
	<form onsubmit={handleSubmit}>
		<input type="text" name="name" placeholder="name" required />
		<input type="email" name="email" placeholder="email (if you want a reply)" required />
		<textarea name="message" placeholder="your message..." required rows="4"></textarea>
		<button type="submit">{status}</button>
	</form>
</main>

<style>
	main {
		width: 100%;
		max-width: 53rem;
		margin: 0 auto 10rem auto;
		padding: 0 1.5rem;
	}
	a {
		font-family: 'Space Mono', monospace;
		font-size: 1.25rem;
	}

	.info {
		font-size: 1.25rem;
		margin: 0.5rem 0;
		font-family: 'Space Mono', monospace;

		:global(svg) {
			vertical-align: sub;
			margin-right: 0.75ch;
			transform: translateY(6%);
			font-size: 1.125em;
		}
	}

	.copy-btn {
		background: none;
		border: none !important;
		cursor: pointer;
		padding: 0rem;
		display: inline-flex;
		align-items: center;
		transition: color 0.2s;
		vertical-align: sub;
		transform: translateY(-4%);

		:global(svg) {
			font-size: 1.125rem;
			margin: 0;
		}

		&:hover {
			color: var(--txt-1);
		}
	}

	form {
		display: grid;
		grid-template-columns: auto auto;
		gap: 1rem;
	}

	input[type='text'],
	input[type='email'],
	textarea,
	button {
		background-color: transparent;
		border: none;
		padding: 1rem;
		color: inherit;
		font: inherit;
		font-size: 1.125rem;
		border: 2px solid var(--bg-3);
		transition: 0.2s;
		background-color: var(--bg-2);
		/* border-radius: 0.5rem; */

		&:focus {
			outline: none;
			border: 2px solid var(--txt-2);
		}
	}

	::placeholder {
		color: var(--txt-2);
	}

	textarea,
	button {
		grid-column: 1 / -1;
	}

	textarea {
		resize: vertical;
	}

	button {
		font-family: 'Space Mono', monospace;
		padding: 1rem;
		&:hover {
			border: 2px solid var(--txt-2);
		}
	}

	@media (max-width: 600px) {
		form {
			grid-template-columns: auto;
		}
	}
</style>
