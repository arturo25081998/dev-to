const API_URL = "https://kodemia-back-end-challenge.onrender.com";

export async function getAllPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const data = await response.json();
  //console.log(data.data.posts);
  return data.data.posts;
}

export async function getPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const data = await response.json();
  return data?.data?.post || false;
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();
  return data?.data.user || false;
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  const token = data?.data || false;
  return token;
}

export async function createUser(profilePic, name, email, password) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, profilePic, email, password }),
  });
  const data = await response.json();
  return data;
}

export async function createPost(title, image, body, tags, token) {
  const response = await fetch(`${API_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ title, image, body, tags }),
  });
  const data = await response.json();
  return data;
}
