import Post from './Post'
import classes from './Posts.module.css'
//dummy data with 6 elements containing title, description, date, personName, img
const DUMMY_DATA = [
    {
        title: "Golden Glory: The Art of Chasing Sunsets",
        description: "Experience the magic of sunsets through Alice Green's mesmerizing photos. The warm hues, reflected light, and calm waves come together in perfect harmony to create these stunning images.",
        date: "24-08-2023 14:30",
        personName: "Alice Green",
        img: "https://picsum.photos/250/350"
    },
    {
        title: "High Altitudes: The Power and Beauty of Mountains",
        description: "Bob Smith showcases the majesty of mountain landscapes in this extraordinary collection. The snow-covered peaks, rugged terrain, and azure skies invite you on a breathtaking visual journey.",
        date: "22-08-2023 09:45",
        personName: "Bob Smith",
        img: "https://picsum.photos/300/400"
    },
    {
        title: "The Heartbeat of the City: Uncovering Urban Life",
        description: "Charlie Johnson captures the vibrancy of urban life in this dynamic photo series. Busy streets, bright lights, and a diverse mix of people reveal the essence of city living and its fast pace.",
        date: "20-08-2023 12:00",
        personName: "Charlie Johnson",
        img: "https://picsum.photos/275/375"
    },
    {
        title: "The Endless Sands: A Visual Ode to Desert Beauty",
        description: "Danielle White's captivating photos reveal the many facets of desert landscapes. The undulating dunes, intricate patterns, and muted tones capture the essence of these harsh yet beautiful environments.",
        date: "18-08-2023 10:30",
        personName: "Danielle White",
        img: "https://picsum.photos/320/420"
    },
    {
        title: "Whispers of the Woods: Unraveling Forest Mysteries",
        description: "Join Erik Brown on an exploration of the forest's secrets. From ancient trees to hidden creatures, this photo series delves deep into the wilderness to uncover its hidden gems and untold stories.",
        date: "16-08-2023 16:00",
        personName: "Erik Brown",
        img: "https://picsum.photos/260/360"
    },
    {
        title: "Echoes of the Past: A Journey Through Ancient Ruins",
        description: "Fiona Martin's evocative images transport you back in time to explore the remnants of lost civilizations. Witness the grandeur and mysteries of ancient ruins, as they reveal their stories through her lens.",
        date: "14-08-2023 11:15",
        personName: "Fiona Martin",
        img: "https://picsum.photos/290/390"
    }
]




const Posts = () =>{
    return(
            <section className={classes.posts}>
                {DUMMY_DATA.map((post) => (
                    <Post
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        personName={post.personName}
                        img={post.img}
                    />
                ))}
            </section>
        )
        
}

export default Posts;