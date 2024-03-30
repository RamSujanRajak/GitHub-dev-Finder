import './App.css';
import React, { useState, useEffect } from 'react';

const APIURL = "https://api.github.com/users/";

function App() {
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);

  const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    setUserData(data);
  };

  const getRepos = async (username) => {
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    setRepos(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.search.value;
    getUser(username);
    getRepos(username);
    e.target.search.value = "";
  };

  useEffect(() => {
    getUser("RamSujanRajak");
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Search a GitHub Username" />
        <button type="submit">Search</button>
      </form>
      <div className="card">
        <div className="date-avatar">
          <img className="avatar" src={userData.avatar_url} alt="User Avatar" />
          <p>Joined At {userData.created_at}</p>
        </div>
        <div className="user-info">
          <h2>{userData.name}</h2>
          {userData.bio ? <p>{userData.bio}</p> : <p>Not Found</p>}
          <ul className="info">
            <li>{userData.followers}<strong>Followers</strong></li>
            <li>{userData.following}<strong>Following</strong></li>
            <li>{userData.public_repos}<strong>Repositories</strong></li>
          </ul>
          <div id="repos">
            {repos.map(repo => (
              <a key={repo.id} className="repo" href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;