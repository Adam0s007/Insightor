import Article from "../Posts/Article";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../utils/http";
import classes from "./LatesPosts.module.css";
import postsClasses from "../Posts/Posts.module.css";

import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
// const DUMMY_DATA = [
//   {
//     id: "e1",
//     title: "Golden Glory: The Art of Chasing SunsetsGolden Glory: The Art of Chasing Sunsetssttt",
//     description: "orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel malesuada ex. Ut ac condimentum nisl. Sed feugiat risus tellus, quis feugiat metus sagittis volutpat. Praesent commodo convallis consequat. In vestibulum nisl urna, sed pharetra ligula pellentesque vel. Nunc vestibulum ac velit eu blandit. Aenean id consequat sem, pharetra suscipit nibh. Integer leo leo, vehicula sed bibendum quis, tincidunt sit amet enim. Aenean faucibus sollicitudin eros, vitae cursus lectus pulvinar aliquet. Suspendisse malesuada, nisl sit amet sollicitudin cursus, purus purus iaculis sapien, eget aliquet dolor arcu ut dolor. Aenean rutrum orci at erat bibendum, vel ullamcorper metus fringilla.",
//     date: "01/08/2023 14:30",
//     personName: "Alice Green",
//     img: "https://picsum.photos/800/1200",
//     content: [
//       { type: "paragraph", value: "Here is a paragraph about the sunset." },
//       { type: "image", value: "https://picsum.photos/800/1200?random=1" }
//     ],
//     rating: 4
//   },
//   {
//     id: "e2",
//     title: "High Altitudes: The Power and Beauty of Mountains",
//     description: "Bob Smith showcases the majesty of mountain landscapes.",
//     date: "22/08/2023 09:45",
//     personName: "Bob Smith",
//     img: "https://picsum.photos/900/700",
//     content: [
//       { type: "paragraph", value: "Mountains are majestic." },
//       { type: "image", value: "https://picsum.photos/900/700?random=1" }
//     ],
//     rating: 5
//   },
//   {
//     id: "e3",
//     title: "The Heartbeat of the City: Uncovering Urban Life",
//     description: "Charlie Johnson captures the vibrancy of urban life.",
//     date: "20/08/2023 12:00",
//     personName: "Charlie Johnson",
//     img: "https://picsum.photos/1200/800",
//     content: [
//       { type: "paragraph", value: "City life is vibrant." },
//       { type: "image", value: "https://picsum.photos/1200/800?random=1" }
//     ],
//     rating: 3
//   },
//   {
//     id: "e4",
//     title: "The Endless Sands: A Visual Ode to Desert Beauty",
//     description: "Danielle White's captivating photos reveal desert landscapes.",
//     date: "18/08/2023 10:30",
//     personName: "Danielle White",
//     img: "https://picsum.photos/1100/700",
//     content: [
//       { type: "paragraph", value: "Deserts are captivating." },
//       { type: "image", value: "https://picsum.photos/1100/700?random=1" }
//     ],
//     rating: 4
//   },
//   {
//     id: "e5",
//     title: "Whispers of the Woods: Unraveling Forest Mysteries",
//     description: "Join Erik Brown on an exploration of the forest.",
//     date: "16/08/2020 16:00",
//     personName: "Erik Brown",
//     img: "https://picsum.photos/720/1280",
//     content: [
//       { type: "paragraph", value: "Forests are full of secrets." },
//       { type: "image", value: "https://picsum.photos/720/1280?random=1" }
//     ],
//     rating: 5
//   },
//   {
//     id: "e6",
//     title: "Echoes of the Past: A Journey Through Ancient Ruins",
//     description: "Fiona Martin's images transport you back in time.",
//     date: "19/08/2023 11:15",
//     personName: "Fiona Martin",
//     img: "https://picsum.photos/1090/1200",
//     content: [
//       { type: "paragraph", value: "Ancient ruins tell stories." },
//       { type: "image", value: "https://picsum.photos/1090/1200?random=1" }
//     ],
//     rating: 2
//   },
// ];

const LatestPosts = () => {
  //use tanstackquery to retrieve data  from tanstack

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", { max: 3 }],
    queryFn: ({ signal }) => fetchArticles({ max: 3, signal }),
  });
  let content = null;
  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorContainer title="An error occurred" message={error.message} />
    );
  }
  if (data) {
    content = (
      <>
        <section className={postsClasses.posts}>
          {data.map((post) => (
            <Article
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              personName={post.personName}
              img={post.img}
              rating={post.rating}
            />
          ))}
        </section>

        <Link to="/posts">
          <button className={classes.button}>all articles</button>
        </Link>
      </>
    );
  }
  return (
    <section className={classes["latest-posts"]}>
      <h1>Latests articles</h1>
      {content}
    </section>
  );
};

export default LatestPosts;
