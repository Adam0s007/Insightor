import { createNewArticle } from "../../utils/http";


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  function generateRandomArticle(id) {
    const sampleTitles = ["Amazing Article", "Incredible News", "Breaking Update", "Latest Discoveries", "Unbelievable Facts"];
    const sampleDescriptions = [
      "This article will blow your mind.",
      "Discover the latest updates in the field.",
      "Incredible breakthroughs revealed.",
      "You won't believe what happened next.",
      "Read on to uncover the mysteries.",
    ];
    const sampleTypes = ["paragraph", "image"];
    const sampleValues = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Suspendisse ullamcorper nec sem eget consequat.",
      "Cras vel neque ut odio tempus commodo.",
      "Vestibulum id ipsum in sapien pretium rhoncus.",
      "Curabitur ullamcorper enim at metus cursus, a mollis arcu aliquet.",
    ];
    const sampleNames = ["Technology", "Science", "Health", "Education", "Environment"];
  
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomLength = () => Math.floor(Math.random() * 5) + 1; // Losowa długość od 1 do 5
  
    const article = {
      title: getRandomElement(sampleTitles) + " " + id,
      description: getRandomElement(sampleDescriptions) + " " + generateRandomString(10),
      content: Array.from({ length: getRandomLength() }, () => ({
        type: getRandomElement(sampleTypes),
        value: getRandomElement(sampleValues) + " " + generateRandomString(10),
      })),
      categories: Array.from({ length: getRandomLength() }, () => ({
        name: getRandomElement(sampleNames),
      })),
    };
  
    return article;
  }
  const numberOfArticles = 10;
  const articles = Array.from({ length: numberOfArticles }, (_, id) => generateRandomArticle(id + 1));

    export async function initArticles() {
        const articles = Array.from({ length: numberOfArticles }, (_, id) => generateRandomArticle(id + 1));
        const createdArticles = await Promise.all(articles.map((article) => createNewArticle({ articleData:article })));
        return createdArticles;
    }
  