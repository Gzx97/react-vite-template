const baseUrl = "https://jsonplaceholder.typicode.com/";

export const fetchUserList = async (data = {}) => {
  const response = await fetch(baseUrl + "users");
  return await response.json();
};
