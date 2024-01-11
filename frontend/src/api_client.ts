import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
const API_BASE_URL ="https://happyholidays.onrender.com";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseBody = await response.json();
    console.log(responseBody);
    localStorage.setItem("auth_token", responseBody.auth_token);
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
  };

  export const validateToken = async () => {
      const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ''}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Token invalid");
      }
  
      return response.json();
    };

export const signIn= async (formData:SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  localStorage.setItem("auth_token", responseBody.auth_token);
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
  localStorage.removeItem("auth_token");
}
