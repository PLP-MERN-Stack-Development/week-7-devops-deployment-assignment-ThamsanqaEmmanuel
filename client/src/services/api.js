import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);


//Create a new transaction
export async function createTransaction(data) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create transaction");
  }

  return await res.json();
}

// getTransactions
export async function getTransactions() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to get transactions");
  return await res.json();
}

// deleteTransaction
export async function deleteTransaction(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete transaction");
  return await res.json();
}

//update transaction service
export const updateTransaction = (id, data) =>
  axios.put(`${BASE_URL}/transactions/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
