function fetchPostsAndCommentsCallbackHell() {
	const postsContainer = document.createElement('div');
	postsContainer.className = 'posts-container';
	document.body.appendChild(postsContainer);

	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(res => res.json())
		.then(posts => {
			posts.forEach(post => {
				const postDiv = document.createElement('div');
				postDiv.className = 'post';
				postDiv.innerHTML = `<h2>Post #${post.id}: ${post.title}</h2><p>${post.body}</p><div class="comments"><h3>Comments:</h3><ul></ul></div>`;
				postsContainer.appendChild(postDiv);
				fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
					.then(res => res.json())
					.then(comments => {
						const ul = postDiv.querySelector('ul');
						comments.forEach(comment => {
							const li = document.createElement('li');
							li.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
							ul.appendChild(li);
						});
					})
					.catch(err => {
						postDiv.querySelector('.comments').innerHTML += '<p>Error loading comments</p>';
					});
			});
		})
		.catch(err => {
			postsContainer.innerHTML = '<p>Error loading posts</p>';
		});
}

async function fetchPostsAndCommentsAsyncAwait() {
	const postsContainer = document.createElement('div');
	postsContainer.className = 'posts-container';
	document.body.appendChild(postsContainer);
	try {
		const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
		const posts = await postsRes.json();
	for (const post of posts) {
			const postDiv = document.createElement('div');
			postDiv.className = 'post';
			postDiv.innerHTML = `<h2>Post #${post.id}: ${post.title}</h2><p>${post.body}</p><div class="comments"><h3>Comments:</h3><ul></ul></div>`;
			postsContainer.appendChild(postDiv);
			try {
				const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
				const comments = await commentsRes.json();
				const ul = postDiv.querySelector('ul');
				comments.forEach(comment => {
					const li = document.createElement('li');
					li.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
					ul.appendChild(li);
				});
			} catch (err) {
				postDiv.querySelector('.comments').innerHTML += '<p>Error loading comments</p>';
			}
		}
	} catch (err) {
		postsContainer.innerHTML = '<p>Error loading posts</p>';
	}
}

async function fetchUserAndPostsSequential(userId) {
	const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
	const user = await userRes.json();
	const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
	const posts = await postsRes.json();
	displayUserAndPosts(user, posts, 'Sequential');
}

async function fetchUserAndPostsParallel(userId) {
	const [userRes, postsRes] = await Promise.all([
		fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
		fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
	]);
	const user = await userRes.json();
	const posts = await postsRes.json();
	displayUserAndPosts(user, posts, 'Parallel');
}

function displayUserAndPosts(user, posts, mode) {
	const container = document.createElement('div');
	container.className = 'user-posts-container';
	container.innerHTML = `<h2>User #${user.id} (${mode}): ${user.name}</h2><p>Email: ${user.email}</p><h3>Posts:</h3><ul></ul>`;
	const ul = container.querySelector('ul');
	posts.forEach(post => {
		const li = document.createElement('li');
		li.innerHTML = `<strong>${post.title}</strong>: ${post.body}`;
		ul.appendChild(li);
	});
	document.body.appendChild(container);
}

function clearContainers() {
	document.querySelectorAll('.posts-container, .user-posts-container').forEach(e => e.remove());
}

window.onload = function() {
	document.getElementById('btn-callback').onclick = () => {
		clearContainers();
		fetchPostsAndCommentsCallbackHell();
	};
	document.getElementById('btn-async').onclick = () => {
		clearContainers();
		fetchPostsAndCommentsAsyncAwait();
	};
	document.getElementById('btn-user-seq').onclick = () => {
		clearContainers();
		fetchUserAndPostsSequential(1);
	};
	document.getElementById('btn-user-par').onclick = () => {
		clearContainers();
		fetchUserAndPostsParallel(1);
	};
};