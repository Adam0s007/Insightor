import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();



export const fetchArticles = async({ signal, max }) =>{
    let url = 'http://localhost:4002/articles';
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
    console.log(`http://localhost:4002/articles/${id}`)
    const response = await fetch(`http://localhost:4002/articles/${id}`);
  
    if (!response.ok) {
        const err = await response.json();
        console.log(err)
        const message = `status: ${err.statusCode} - ${err.message}`;
        throw new Error(message);
      }
    
      const article  = await response.json();
      return article;
}