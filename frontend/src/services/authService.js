export const login = async (credentials) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
};
