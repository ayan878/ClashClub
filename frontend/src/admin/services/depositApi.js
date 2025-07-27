export const fetchDeposite = async () => {
  const response = await fetch(`http://localhost:3000/admin/deposit-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
