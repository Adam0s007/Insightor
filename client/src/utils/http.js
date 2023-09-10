import { QueryClient } from "@tanstack/react-query";
import { redirect, json } from "react-router-dom";
export const queryClient = new QueryClient();

const defaultUrl = "http://localhost:4002";

export const fetchArticles = async ({ signal, max }) => {
  let url = `${defaultUrl}/articles`;
  if (max) {
    url = `${url}?max=${max}`;
  }
  const response = await fetch(url, { signal });
  if (!response.ok) {
    const err = await response.json();
    console.log(err);
    const message = `status: ${err.statusCode} - ${err.message}`;
    throw new Error(message);
  }

  const articles = await response.json();

  return articles;
};

export async function fetchArticle({ signal, id }) {
  const response = await fetch(`${defaultUrl}/articles/${id}`);

  if (!response.ok) {
    const err = await response.json();
    console.log(err);
    const message = `status: ${err.statusCode} - ${err.message}`;
    throw new Error(message);
  }

  const article = await response.json();
  return article;
}

export async function createNewArticle({ articleData }) {
  //console.log(JSON.stringify(articleData))
  const response = await fetch(`${defaultUrl}/articles`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.json();
    console.log(err);
    const message = `status: ${err.statusCode} - ${err.message}`;
    throw new Error(message);
  }

  const article = await response.json();

  return article;
}

export async function authAction({ request, params }) {
  //console.log(request);
  const authData = await request.formData();

  let sendingData = null;

  if (authData.get("authType") === "login") {
    sendingData = {
      email: authData.get("email"),
      password: authData.get("password"),
    };
  } else {
    sendingData = {
      email: authData.get("email"),
      password: authData.get("password"),
      name: authData.get("name"),
      surname: authData.get("surname"),
    };
  }
 
  const response = await fetch(
    "http://localhost:4002/" + authData.get("authType"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    console.log(err);
    throw json({ message: err.message }, { status: err.statusCode });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
