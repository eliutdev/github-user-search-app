import "./js/dark-mode";
import "./css/style.css";

const form = document.forms["search-user"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector('input[name="username"]').value;
  const user = await getUser(username);
  const template = renderUserProfile(user);
  document.querySelector(".profile-card").innerHTML = template;
});

function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((user) => {
      return {
        username,
        avatar_url: user.avatar_url,
        name: user.name,
        location: user.location,
        company: user.company,
        bio: user.bio,
        twitter: user.twitter_username,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
      };
    });
}

function renderUserProfile(user) {
  const {
    avatar_url,
    username,
    name,
    location,
    company,
    bio,
    twitter,
    public_repos,
    followers,
    following,
    created_at,
  } = user;
  return `
    <div class="profile-card">
      <img src="${avatar_url}" alt="profile-pic">
      <h1>${name}</h1>
      <p><a href="#">${username}</a></p>
      <p>${bio}</p>
      <ul>
        <li>Location: ${location}</li>
        <li>Company: ${company}</li>
        <li>Twitter: <a href="https://twitter.com/${twitter}">${twitter}</a></li>
        <li>Followers: ${followers}</li>
        <li>Following: ${following}</li>
        <li>Public Repos: ${public_repos}</li>
        <li>Joined: ${created_at}</li>
      </ul>
    </div>
  `;
}
