// ReviewsContainer.js

import React from "react";
import Review from "./Review";
import NewReview from "./NewReview";
import classes from "./Reviews.module.css";
const Reviews = () => {
  const dummyReviews = [
    {
      
      content:
        "Artykuł rewelacyjny!. Można się wiele nauczyć. Polecam!. Autor zna się na rzeczy. Bardzo ciekawy artykuł.",
      rating: 5,
      thumbsUp: 23,
      thumbsDown: 2,
      author: "Jan Kowalski",
      date: "2023-09-03T12:30:45", 
      imgUrl: "https://picsum.photos/200/200?random=1"
    },
    {
      
      content:
        "Artykuł jest bardzo słabej jakości. Nie polecam!. Autor nie zna się na rzeczy. Nie rozumiem jak można czytać takie bzdury.",
      rating: 2,
      thumbsUp: 5,
      thumbsDown: 17,
      author: "Paweł Nowak",
      date: "2023-08-28T14:15:20", 
      imgUrl: "https://picsum.photos/200/200?random=2",
      // format daty z HH:MM:SS
    },
    {
      content:
        "Artykuł zaskoczył mnie pozytywnie! Nie spodziewałem się, że temat może być tak interesujący. Autor prezentuje wiedzę w przystępny sposób.",
      rating: 4,
      thumbsUp: 12,
      thumbsDown: 1,
      author: "Alicja Zając",
      date: "2023-09-02T09:20:10",
      imgUrl: "https://picsum.photos/200/200?random=3"
    },
    {
      content:
        "Ta lektura to prawdziwa perełka. Czyta się jak najlepsza powieść. Chylę kapelusz przed autorem za dogłębne analizy i klarowną argumentację.",
      rating: 5,
      thumbsUp: 30,
      thumbsDown: 0,
      author: "Karol Wójcik",
      date: "2023-08-31T18:05:55",
      imgUrl: "https://picsum.photos/200/200?random=4"
    },
    {
      content:
        "Artykuł dostarczył mi mnóstwo inspiracji do dalszych badań. Podoba mi się podejście autora do tematu. Będę polecać go znajomym!",
      rating: 4,
      thumbsUp: 20,
      thumbsDown: 3,
      author: "Magdalena Szymańska",
      date: "2023-08-30T11:40:30",
      imgUrl: "https://picsum.photos/200/200?random=5"
    },
    {
      content:
        "Nie mogę się zgodzić z tezami przedstawionymi w artykule. Autor zupełnie pomija ważne aspekty tematu i opiera się na wątpliwych źródłach.",
      rating: 1,
      thumbsUp: 2,
      thumbsDown: 25,
      author: "Wojciech Nowicki",
      date: "2023-08-29T16:30:05",
      imgUrl: "https://picsum.photos/200/200?random=6"
    },
    {
      content:
        "Artykuł jest przystępny nawet dla laika w tej dziedzinie. Rozumiem teraz wiele kwestii, o których wcześniej nie miałem pojęcia. Gorąco polecam!",
      rating: 5,
      thumbsUp: 18,
      thumbsDown: 1,
      author: "Aleksandra Kwiatkowska",
      date: "2023-08-27T13:10:20",
      imgUrl: "https://picsum.photos/200/200?random=7"
    }, 
    {
      content:
        "Ten artykuł to kompletna porażka. Autor nie tylko prezentuje niejasne argumenty, ale również wydaje się być kompletnie niezorientowany w temacie. Czytanie tego tekstu to strata czasu.",
      thumbsUp: 1,
      thumbsDown: 50,
      author: "Adam Nowicki",
      date: "2023-09-04T09:45:30",
      imgUrl: "https://picsum.photos/200/200?random=9",
      rating:0
    }
    // ... możesz dodać więcej recenzji w podobny sposób
  ];

  return (
    <div className={classes.container}>
      <NewReview  />
      <div className={classes.content}>

      
      {dummyReviews.map((review, index) => (
        <Review
          key={index}
          title={review.title}
          content={review.content}
          rating={review.rating}
          thumbsUp={review.thumbsUp}
          thumbsDown={review.thumbsDown}
          author={review.author}
          date={review.date}
          imgUrl={review.imgUrl}
        />
      ))}
      </div>
    </div>
  );
};

export default Reviews;
