# Insightor

## Description

Insightor is a user-friendly platform that allows users to create, rate, and comment on articles. With features such as creating tags for articles, searching articles based on these tags, basic CRUD operations for articles and reviews, user authentication, and user profile editing, ArticleHub offers a comprehensive environment for sharing and evaluating content.

## Technologies Used

- **Frontend**: React + Vite
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Containerization**: Docker

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

   Inside the project directory, run the following command:

   ```sh
   docker-compose up
   ```

   This command will start all the services defined in `docker-compose.yml` file, setting up the entire stack including the frontend, backend, and database.

4. **Access the Application**

   Once the Docker containers are up and running, open your web browser and navigate to:

   ```sh
   http://localhost:4000
   ```

## Usage

- Register / login to start interacting with the platform.
- Once logged in, you can create, edit, or delete articles and reviews.
- Explore articles based on tags/categories or through the search functionality.
- Update your user information through the user profile section.


## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Adam0s007/Blog/blob/master/LICENSE) file for details.

