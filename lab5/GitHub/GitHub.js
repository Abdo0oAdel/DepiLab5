
document.getElementById('searchBtn').addEventListener('click', function() {
	const username = document.getElementById('usernameInput').value.trim();
	const userInfoDiv = document.getElementById('userInfo');
	userInfoDiv.innerHTML = '';
	if (!username) {
		userInfoDiv.innerHTML = '<p>Please enter a username.</p>';
		return;
	}
	fetch(`https://api.github.com/users/${username}`)
		handleSearch();
	});


async function fetchGitHubUser(username) {
	const response = await fetch(`https://api.github.com/users/${username}`);
	if (!response.ok) {
		throw new Error('User not found');
	}
	return await response.json();
}

function buildUserCard(data) {
	return `
		<div class="user-card">
			<img src="${data.avatar_url}" alt="Avatar" width="100" height="100">
			<h2>${data.name || data.login}</h2>
			<p><strong>Username:</strong> ${data.login}</p>
			<p><strong>Bio:</strong> ${data.bio || 'N/A'}</p>
			<p><strong>Location:</strong> ${data.location || 'N/A'}</p>
			<p><strong>Public Repos:</strong> ${data.public_repos}</p>
			<p><a href="${data.html_url}" target="_blank">View Profile</a></p>
		</div>
	`;
}

async function handleSearch() {
	const username = document.getElementById('usernameInput').value.trim();
	const userInfoDiv = document.getElementById('userInfo');
	userInfoDiv.innerHTML = '';
	if (!username) {
		userInfoDiv.innerHTML = '<p>Please enter a username.</p>';
		return;
	}
	try {
		const data = await fetchGitHubUser(username);
		userInfoDiv.innerHTML = buildUserCard(data);
	} catch (error) {
		userInfoDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
	}
}