# Insightor

Insightor is a user-friendly platform that allows users to create, rate, and comment on articles. With features such as creating tags for articles, searching articles based on these tags, basic CRUD operations for articles and reviews, user authentication, and user profile editing, Insightor offers a comprehensive environment for sharing and evaluating content.

## Technologies Used

- **Frontend**: React + Vite
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Containerization**: Docker

## Preview
   To give you a taste of what to expect, here's a preview of Insightor:
   ![InsightorPreview](https://github.com/Adam0s007/Blog/assets/109285249/156e3a95-91f9-4fef-a1a8-b2da34a119a0)

## Features

1. **Article Creation & Management**
   - Create, edit, delete and view articles.
   - Basic CRUD operations for article reviews.
   - Assign tags/categories to articles.

2. **User Interaction**
   - Rate and comment on articles.
   - Search articles based on tags/categories.

3. **User Account Management**
   - User registration and login.
   - Edit basic user information.

## Prerequisites

- Ensure that you have Docker installed on your machine. If not, download it from [Docker Official Page](https://www.docker.com/get-started).

## Setup & Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Adam0s007/Blog.git
   cd Blog
   ```

2. **Start Docker**

   Make sure Docker is running on your machine. Refer to Docker's official documentation if you encounter any issues.

3. **Run the Application**

   Follow the steps below to run the application:

   1. **Start the Services**:
   
      Navigate to the project directory and execute the following command:
   
      ```sh
      docker-compose up
      ```

      Wait for the last message to be:
      ```
      LOG:  database system is ready to accept connections
      ```


   2. **Inject Sample Data**:
   
      While the container is running, execute the following command to inject data from `blog_dump.sql` into the database. Replace `blog-postgres-1` with the actual name of your PostgreSQL container if it’s different.
   
      ```sh
      cat blog_dump.sql | docker exec -i blog-postgres-1 psql -U postgres blog
      ```

   3. **Restart the Services**:
   
      After injecting the sample data, stop the running services using `Ctrl+C` or by executing `docker-compose down` in another terminal. Then, start the services again using:
   
      ```sh
      docker-compose up
      ```

   The application should now be up and running with the sample data from `blog_dump.sql`. 
   
   ***Note***: Make sure Docker and Docker Compose are correctly installed and configured on your system before running the above commands. Refer to the [Docker documentation](https://docs.docker.com/get-docker/) and [Docker Compose documentation](https://docs.docker.com/compose/install/) for installation and configuration guidelines.


4. **Access the Application**

   Once the Docker containers are up and running, open your web browser and navigate to:

   ```sh
   http://127.0.0.1:4000/
   ```

## Usage

- Register / login to start interacting with the platform.
- Once logged in, you can create, edit, or delete articles and reviews.
- Explore articles based on tags/categories or through the search functionality.
- Update your user information through the user profile section.


## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Adam0s007/Blog/blob/master/LICENSE) file for details.

