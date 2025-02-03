const GetTokenData = async () => {
  try {
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      return data
    } else {
      return data.error
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return error
  }
}

export default GetTokenData;  