import httpClient from "../utils/http";

export const fetchUsers = async function () {
  return await httpClient.get("/Users");
};
