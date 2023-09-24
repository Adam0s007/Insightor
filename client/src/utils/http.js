import { QueryClient } from "@tanstack/react-query";
import { redirect, json } from "react-router-dom";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

export const defaultUrl = "http://localhost:4002";

const authHeaders = () => { 
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  };
};

const checkErrors = async (response) => {
  if (!response.ok) {
    const err = await response.json();
    console.log(err);
    const message = `status: ${err.statusCode} - ${err.message}`;
    throw new Error(message);
  }
}

export const fetchArticles = async ({ signal, max,page }) => {
  let url = `${defaultUrl}/articles`;
  if (page) {
    url = `${url}?page=${page}`;
  }
  else if (max) {
    url = `${url}?max=${max}`;
  }
  const response = await fetch(url, { signal });
  await checkErrors(response)
  const articles = await response.json();
  return articles;
};

export async function fetchArticle({ signal, id }) {
  const response = await fetch(`${defaultUrl}/articles/${id}`, {
    signal,
    headers: authHeaders(),
  });
  await checkErrors(response)
  const article = await response.json();
  return article;
}

export async function createNewArticle({ articleData }) {
  const imgUrl = articleData.imgUrl;
  delete articleData.imgUrl;
  const response = await fetch(`${defaultUrl}/articles`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: authHeaders(),
  });
  await checkErrors(response)
  const article = await response.json();
  if(imgUrl){
    await updateArticlePicture({formData:imgUrl,articleId:article.id});
  }
  return article;
}

export async function updateArticle({ article, id }) {
  delete article.id;
  delete article.reviews;
  delete article.date;
  delete article.user;
  const imgUrl = article.imgUrl;
  delete article.imgUrl;
  if (article.content && article.content.length > 0) {
    article.content.forEach((content) => {
      delete content.id;
    });
  }
  if (article.categories && article.categories.length > 0) {
    article.categories.forEach((category) => {
      delete category.id;
    });
  }
  const response = await fetch(`${defaultUrl}/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(article),
    headers: authHeaders(),
  });
  await checkErrors(response)
  const articleRO = await response.json();
  if(imgUrl){
    await updateArticlePicture({formData:imgUrl,articleId:id});
  }
  return articleRO;
}

export async function deleteArticle({ id }) {
  const response = await fetch(`${defaultUrl}/articles/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  await checkErrors(response)
  const article = await response.json();
  return article;
}


export async function authAction({ request, params }) {
  //console.log(request);
  const authData = await request.formData();

  let sendingData = null;
  let dataType = authData.get("authType");
  if (dataType === "login") {
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
  const userId = resData.id;
  localStorage.setItem("token", token);
  return redirect(
    `/user/${userId}`
  );
}

export async function fetchUser({ signal,restPoint="myProfile" }) {
  // fetching from /localhost:4002/myProfile, needed application-type and Authorization Bearer token
  const response = await fetch(`${defaultUrl}/`+restPoint, {
    signal,
    headers: authHeaders(),
  });
  await checkErrors(response)
  const user = await response.json();
  return user;
}

export async function fetchReviews({ signal, articleId }) {
  const response = await fetch(`${defaultUrl}/reviews/article/${articleId}`, {
    signal,
    headers: authHeaders(),
  });
  await checkErrors(response)
  const reviews = await response.json();
  return reviews;
}

export async function reviewAction({ reviewData, articleId, method }) {
  const formattedReviewData = {
    content: reviewData.content,
    rating: reviewData.rating,
  };
  const response = await fetch(`${defaultUrl}/reviews/article/${articleId}`, {
    method: method,
    body: JSON.stringify(formattedReviewData),
    headers: authHeaders(),
  });
  await checkErrors(response)
  const review = await response.json();
  return review;
}

export async function voteAction({ reviewId, action}){
  //action -> downvote, upvote, rest point: /localhost:4002/reviews/:reviewId/:action
  const response = await fetch(`${defaultUrl}/reviews/${reviewId}/${action}`, {
    method: "POST",
    headers: authHeaders(),
  });
  await checkErrors(response)
  const review = await response.json();
  return review;
}


export async function updateUser({ updatedFields }) {
  const response = await fetch(`${defaultUrl}/myProfile`, {
    method: "PUT",
    body: JSON.stringify(updatedFields),
    headers: authHeaders(),
  });
  await checkErrors(response)
  const user = await response.json();
  return user;
}

export async function updateProfilePicture({ formData }) {
  const response = await fetch(`${defaultUrl}/profilePicture`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });
  await checkErrors(response)
  const user = await response.json();
  return user;
}

export async function updateArticlePicture({formData,articleId}){
  const response = await fetch(`${defaultUrl}/articles/${articleId}/imgUrl`,{
    method:'PUT',
    body:formData,
    headers:{
      Authorization: "Bearer " + getAuthToken(),
    }
  })
  await checkErrors(response)
  const article = await response.json();
  return article;
}


export async function fetchCategories({signal}) {
  const response = await fetch(`${defaultUrl}/categories`, {
    signal,
    headers: authHeaders(),
  });
  await checkErrors(response)
  const categories = await response.json();
  return categories;
}

export async function fetchCategoriesByUser({signal,userId}) {
  const response = await fetch(`${defaultUrl}/categories/user/${userId}`, {
    signal,
    headers: authHeaders(),
  });
  await checkErrors(response)
  const categories = await response.json();
  return categories;
}

export async function changePassword({sendObj}){
  console.log(sendObj)
  const response = await fetch(`${defaultUrl}/change-password`,{
    method:'PUT',
    body:JSON.stringify(sendObj),
    headers:authHeaders()
  })
  await checkErrors(response)
  const user = await response.json();
  return user;
}