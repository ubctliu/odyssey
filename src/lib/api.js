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


export async function createTrip(trip) {
  try {
    const res = await fetch(`/api/trips/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trip })
    });
  
    if (!res.ok) {
      throw new Error("Failed to create trip");
    }
  
    const newTrip = await res.json();
    return newTrip;
  } catch (error) {
    console.error("Error creating trip:", error);
  }
}

export async function updateTrip(trip) {
  try {
    const res = await fetch(`/api/trips/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trip })
    });
  
    if (!res.ok) {
      throw new Error("Failed to update trip");
    }
  
    const updatedTrip = await res.json();
    return updatedTrip;
  } catch (error) {
    console.error("Error updating trip:", error);
  }
}


export async function fetchTrip(url) {
  try {
    const res = await fetch(`/api/trips/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch trip");
    }
  
    const updatedTrip = await res.json();
    return updatedTrip;
  } catch (error) {
    console.error("Error fetching trip:", error);
  }
}