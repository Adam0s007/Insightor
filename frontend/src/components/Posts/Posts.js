import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Post from "./Post";
import Search from "./Search";
import classes from "./Posts.module.css";
//dummy data with 6 elements containing title, description, date, personName, img
const DUMMY_DATA = [
  {
    id: "e1",
    title: "Golden Glory: The Art of Chasing Sunsets",
    description:
      "Experience the magic of sunsets through Alice Green's mesmerizing photos. The warm hues, reflected light, and calm waves come together in perfect harmony to create these stunning images.",
    date: "24/08/2023 14:30",
    personName: "Alice Green",
    img: "https://picsum.photos/800/1200",
  },
  {
    id: "e2",
    title: "High Altitudes: The Power and Beauty of Mountains",
    description:
      "Bob Smith showcases the majesty of mountain landscapes in this extraordinary collection. The snow-covered peaks, rugged terrain, and azure skies invite you on a breathtaking visual journey.",
    date: "22/08/2023 09:45",
    personName: "Bob Smith",
    img: "https://picsum.photos/900/700",
  },
  {
    id: "e3",
    title: "The Heartbeat of the City: Uncovering Urban Life",
    description:
      "Charlie Johnson captures the vibrancy of urban life in this dynamic photo series. Busy streets, bright lights, and a diverse mix of people reveal the essence of city living and its fast pace.",
    date: "20/08/2023 12:00",
    personName: "Charlie Johnson",
    img: "https://picsum.photos/1200/800",
  },
  {
    id: "e4",
    title: "The Endless Sands: A Visual Ode to Desert Beauty",
    description:
      "Danielle White's captivating photos reveal the many facets of desert landscapes. The undulating dunes, intricate patterns, and muted tones capture the essence of these harsh yet beautiful environments.",
    date: "18/08/2023 10:30",
    personName: "Danielle White",
    img: "https://picsum.photos/1100/700",
  },
  {
    id: "e5",
    title: "Whispers of the Woods: Unraveling Forest Mysteries",
    description:
      "Join Erik Brown on an exploration of the forest's secrets. From ancient trees to hidden creatures, this photo series delves deep into the wilderness to uncover its hidden gems and untold stories.",
    date: "16/08/2023 16:00",
    personName: "Erik Brown",
    img: "https://picsum.photos/720/1280",
  },
  {
    id: "e6",
    title: "Echoes of the Past: A Journey Through Ancient Ruins",
    description:
      "Fiona Martin's evocative images transport you back in time to explore the remnants of lost civilizations. Witness the grandeur and mysteries of ancient ruins, as they reveal their stories through her lens.",
    date: "14/08/2023 11:15",
    personName: "Fiona Martin",
    img: "https://picsum.photos/1090/1200",
  },
];

const parseDateString = (dateString) => {
  const [day, month, yearTime] = dateString.split("/");
  const [year, time] = yearTime.split(" ");
  const [hour, minute] = time.split(":");

  return new Date(year, month - 1, day, hour, minute);
};

const Posts = () => {
  const filters = useSelector((state) => state.filters);
  const [filteredPosts, setFilteredPosts] = useState(DUMMY_DATA);

  const filterItems = () =>
    DUMMY_DATA.filter((post) => {
      const postDate = parseDateString(post.date);

      let start, end;

      if (filters.startDate !== "") {
        start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
      } else {
        start = -Infinity;
      }

      if (filters.endDate !== "") {
        end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
      } else {
        end = Infinity;
      }

      return (
        (post.title.toLowerCase().includes(filters.title.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())) &&
        postDate >= start &&
        postDate <= end &&
        post.personName
          .toLowerCase()
          .includes(filters.personName.toLowerCase()) 
      );
    });

  useEffect(() => {
    setTimeout(() => {
      setFilteredPosts(filterItems());
    }, 500);
  }, [filters]);

  return (
    <>
      <Search />
      <section className={classes.posts}>
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            date={post.date}
            personName={post.personName}
            img={post.img}
          />
        ))}
      </section>
    </>
  );
};
export default Posts;
