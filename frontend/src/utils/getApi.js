import axios from "axios";

// GET request
export const getApi = async (uri) => {
  const data = await axios.get(uri, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.data;
};

// POST request
export const postApi = async (uri, body) => {
  const data = await axios.post(uri, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.data;
};

// PUT request
export const putApi = async (uri, body) => {
  const data = await axios.put(uri, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.data;
};

// DELETE request
export const deleteApi = async (uri) => {
  const data = await axios.delete(uri, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.data;
};
