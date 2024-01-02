export async function createUser(user) {
  try {
  const response = await fetch('http://localhost:3000/api/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  const newUser = await response.json();
  console.log("User created:", newUser);
} catch (error) {
  console.error("Error creating user:", error);
}
}
