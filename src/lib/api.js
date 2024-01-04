//TODO: these fetch paths need to be updated to support more dynamic url pathing - right now only works locally
export async function createUser(user) {
  try {
  const res = await fetch('/api/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  const newUser = await res.json();
  return newUser;
} catch (error) {
  console.error("Error creating user:", error);
}
}

export async function fetchUser(userId) {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error("Failed to retrieve user");
    }
    const fetchedUser = await res.json();
    return fetchedUser;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
}

export async function updateUser(user) {
  try {
    const res = await fetch(`/api/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user })
    });
  
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
  
    const updatedUser = await res.json();
    return updatedUser;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
}