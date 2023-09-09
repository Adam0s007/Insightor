import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

const defaultUrl = 'http://localhost:4002'

export const fetchArticles = async({ signal, max }) =>{
    let url = `${defaultUrl}/articles`;
    if(max){
        url = `${url}?max=${max}`;
    }
    const response = await fetch(url,{signal});
    if (!response.ok) {
        const err = await response.json();
        console.log(err)
        const message = `status: ${err.statusCode} - ${err.message}`;
        throw new Error(message);
      }
    
      const articles  = await response.json();
    
      return articles;
}

export async function fetchArticle({ signal,id}) {
    
    const response = await fetch(`${defaultUrl}/articles/${id}`);
  
    if (!response.ok) {
        const err = await response.json();
        console.log(err)
        const message = `status: ${err.statusCode} - ${err.message}`;
        throw new Error(message);
      }
    
      const article  = await response.json();
      return article;
}


export async function createNewArticle({articleData}) {
    
    //console.log(JSON.stringify(articleData))
    const response = await fetch(`${defaultUrl}/articles`, {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
        const err = await response.json();
        console.log(err)
        const message = `status: ${err.statusCode} - ${err.message}`;
        throw new Error(message);
    }
  
    const article = await response.json();
  
    return article;
  }