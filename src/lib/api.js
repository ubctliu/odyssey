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
    const res = await fetch(`/api/events/${id}`, {
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

export async function updateDayEvents(updatedEventData) {
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
  }
}

export async function updateDayNotes(day) {
  try {
    const res = await fetch(`/api/days/update/notes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(day),
    });

    if (!res.ok) {
      throw new Error("Failed to update notes");
    }
    
    const updatedEvent = await res.json();
    return updatedEvent;
  } catch (error) {
    console.error("Error updating notes:", error);
  }
}


export async function createDays(trip) {
  try {
    const res = await fetch(`/api/days/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip)
    });
  
    if (!res.ok) {
      throw new Error("Failed to create days");
    }
  
    const daysCreated = await res.json();

    return daysCreated;
  } catch (error) {
    console.error("Error creating days:", error);
  }
}


export async function createEvent(day, event) {
  try {
    const res = await fetch(`/api/events/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day, event })
    });
  
    if (!res.ok) {
      throw new Error("Failed to create event");
    }
  
    const newEvent = await res.json();
    // add to visible events on create event
    return newEvent;
  } catch (error) {
    console.error("Error creating event:", error);
  }
}


export async function deleteEvent(event) {
  try {
    const res = await fetch(`/api/events/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event })
    });
  
    if (!res.ok) {
      throw new Error("Failed to delete event");
    }
  
    const deletedEvent = await res.json();
    return deletedEvent;
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

export async function fetchTripIdByUserId(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/trips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve trip data");
    }
    const fetchedUserData = await res.json();
    return fetchedUserData;

  } catch (error) {
    console.error("Error retrieving trip data:", error);
  }
}