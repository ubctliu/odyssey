import createUser from '../../lib/createUser';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user } = req.body;

    try {
      const newUser = await createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}