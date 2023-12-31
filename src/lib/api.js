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

export async function fetchTripWithDays(url) {
  try {
    const res = await fetch(`/api/trips/${url}/days`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch trip with days");
    }
  
    const trip = await res.json();
    return trip;
  } catch (error) {
    console.error("Error fetching trip with days:", error);
  }
}

export async function fetchTripWithDaysAndEvents(url) {
  try {
    const res = await fetch(`/api/trips/${url}/days/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch trip with all data");
    }
  
    const trip = await res.json();
    return trip;
  } catch (error) {
    console.error("Error fetching trip with all data:", error);
  }
}


export async function fetchEvent(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error("Failed to retrieve event");
    }
    const fetchedEvent = await res.json();
    return fetchedEvent;
  } catch (error) {
    console.error("Error retrieving event:", error);
  }
}

export async function updateDaysEvent(updatedEventData) {
  try {
    const res = await fetch(`/api/events/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEventData),
    });

    if (!res.ok) {
      throw new Error("Failed to update event");
    }
    const updatedEvent = await res.json();
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}