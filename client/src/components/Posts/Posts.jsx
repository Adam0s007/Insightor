import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../utils/http.js";
import {formatDate} from '../../utils/date-conventer'
import classes from "./Posts.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
const DUMMY_DATA = [
  {
    id: "e1",
    title:
      "Golden Glory: The Art of Chasing SunsetsGolden Glory: The Art of Chasing Sunsetssttt",
    description:
      "orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel malesuada ex. Ut ac condimentum nisl. Sed feugiat risus tellus, quis feugiat metus sagittis volutpat. Praesent commodo convallis consequat. In vestibulum nisl urna, sed pharetra ligula pellentesque vel. Nunc vestibulum ac velit eu blandit. Aenean id consequat sem, pharetra suscipit nibh. Integer leo leo, vehicula sed bibendum quis, tincidunt sit amet enim. Aenean faucibus sollicitudin eros, vitae cursus lectus pulvinar aliquet. Suspendisse malesuada, nisl sit amet sollicitudin cursus, purus purus iaculis sapien, eget aliquet dolor arcu ut dolor. Aenean rutrum orci at erat bibendum, vel ullamcorper metus fringilla.",
    date: "01/08/2023 14:30",
    personName: "Alice Green",
    img: "https://picsum.photos/800/1200",
    content: [
      { type: "paragraph", value: "Here is a paragraph about the sunset." },
      { type: "image", value: "https://picsum.photos/800/1200?random=1" },
    ],
    rating: 4,
  },
  {
    id: "e2",
    title: "High Altitudes: The Power and Beauty of Mountains",
    description: "Bob Smith showcases the majesty of mountain landscapes.",
    date: "22/08/2023 09:45",
    personName: "Bob Smith",
    img: "https://picsum.photos/900/700",
    content: [
      { type: "paragraph", value: "Mountains are majestic." },
      { type: "image", value: "https://picsum.photos/900/700?random=1" },
    ],
    rating: 5,
  },
  {
    id: "e3",
    title: "The Heartbeat of the City: Uncovering Urban Life",
    description: "Charlie Johnson captures the vibrancy of urban life.",
    date: "20/08/2023 12:00",
    personName: "Charlie Johnson",
    img: "https://picsum.photos/1200/800",
    content: [
      { type: "paragraph", value: "City life is vibrant." },
      { type: "image", value: "https://picsum.photos/1200/800?random=1" },
    ],
    rating: 3,
  },
  {
    id: "e4",
    title: "The Endless Sands: A Visual Ode to Desert Beauty",
    description:
      "Danielle White's captivating photos reveal desert landscapes.",
    date: "18/08/2023 10:30",
    personName: "Danielle White",
    img: "https://picsum.photos/1100/700",
    content: [
      { type: "paragraph", value: "Deserts are captivating." },
      { type: "image", value: "https://picsum.photos/1100/700?random=1" },
    ],
    rating: 4,
  },
  {
    id: "e5",
    title: "Whispers of the Woods: Unraveling Forest Mysteries",
    description: "Join Erik Brown on an exploration of the forest.",
    date: "16/08/2020 16:00",
    personName: "Erik Brown",
    img: "https://picsum.photos/720/1280",
    content: [
      { type: "paragraph", value: "Forests are full of secrets." },
      { type: "image", value: "https://picsum.photos/720/1280?random=1" },
    ],
    rating: 5,
  },
  {
    id: "e6",
    title: "Echoes of the Past: A Journey Through Ancient Ruins",
    description: "Fiona Martin's images transport you back in time.",
    date: "19/08/2023 11:15",
    personName: "Fiona Martin",
    img: "https://picsum.photos/1090/1200",
    content: [
      { type: "paragraph", value: "Ancient ruins tell stories." },
      { type: "image", value: "https://picsum.photos/1090/1200?random=1" },
    ],
    rating: 2,
  },
];

const parseDateString = (dateString) => {
  const [day, month, yearTime] = dateString.split("/");
  const [year, time] = yearTime.split(" ");
  const [hour, minute] = time.split(":");

  return new Date(year, month - 1, day, hour, minute);
};

const Posts = () => {
  const { data, isPending, isError, Error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchArticles,
    staleTime: 4000,
  });

  console.log(data);
  const filters = useSelector((state) => state.filters);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [filters]);

  const filterItems = useMemo(
    () =>
      DUMMY_DATA.filter((post) => {
        const postDate = parseDateString(post.date);

        let start, end;

        if (debouncedFilters.startDate !== "") {
          start = new Date(debouncedFilters.startDate);
          start.setHours(0, 0, 0, 0);
        } else {
          start = -Infinity;
        }

        if (debouncedFilters.endDate !== "") {
          end = new Date(debouncedFilters.endDate);
          end.setHours(23, 59, 59, 999);
        } else {
          end = Infinity;
        }

        return (
          (post.title
            .toLowerCase()
            .includes(debouncedFilters.title.toLowerCase()) ||
            post.description
              .toLowerCase()
              .includes(debouncedFilters.description.toLowerCase())) &&
          postDate >= start &&
          postDate <= end &&
          post.personName
            .toLowerCase()
            .includes(debouncedFilters.personName.toLowerCase())
        );
      }),
    [debouncedFilters]
  );

  let content = null;
  if (isPending) {
    content = <LoadingIndicator/>;
  }
  if (isError) {
    console.log("a tu probuje zlapac ten error:"+Error);
    content = <ErrorContainer title="An error occurred" message={Error?.message || 'failed to fetch events'}/>;
  }
  if (data) {
    
    content = (
        <>
            {data.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    date={formatDate(post.date)}
                    personName={post.personName}
                    img={post.img}
                    rating={post.rating}
                />
            ))}
        </>
    );
}

  return <section className={classes.posts}>
    {content}
  </section>;
};

export default Posts;
