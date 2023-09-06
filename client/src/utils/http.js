import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();



export const fetchArticles = async({ signal, max }) =>{
    let url = 'http://localhost:4002/articles';
    if(max){
        url = `${url}?max=${max}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        
        const err= await response.json();
        console.log("error object:",err)
        throw err;
      }
    
      const articles  = await response.json();
    
      return articles;
}