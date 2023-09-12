import styles from "./Profile.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
const Profile = (props) => {
  // const {
  //     name = "N/A",
  //     surname = "N/A",
  //     email = "N/A",
  //     articles = []
  // } = props.data || {};
  const { data, isPending, isError, error } = props.queryObj;

  let mainContent = null;
  if (isPending) {
    mainContent = <LoadingIndicator/>;
  }
  if (isError) {
    mainContent = <ErrorContainer title="Error while fetching data" message={error.message}/>;
  }
  if (data) {
    const{name,surname,email,articles} = data;
    mainContent = (
      <>
        <h1>Profile</h1>
        <p>
          Name: {name} {surname}
        </p>
        <p>Email: {email}</p>

        <h2>Articles</h2>
        <ul>
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.id}>
                <h3>{article.title || "Untitled"}</h3>
                <p>Date: {article.date || "N/A"}</p>
                <p>Description: {article.description || "No description"}</p>
                <p>Rating: {article.rating || 0}</p>
              </li>
            ))
          ) : (
            <li>No articles available</li>
          )}
        </ul>
      </>
    );
  }

  return (
    <section className={styles.profile}>
      <div className={styles.container}>
        {mainContent}
      </div>
    </section>
  );
};

export default Profile;
