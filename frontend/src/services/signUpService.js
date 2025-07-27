const signUp = async (formData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};
