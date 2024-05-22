# Chat Application

Welcome to our Chat Application! This chat application is built with Spring Boot for the backend and Vite for the frontend. It features authentication using JWT, a MySQL database, and Cloudflare Images for storing profile images. Currently, it supports one-on-one chats, with plans to add group chat functionality using web sockets with the STOMP protocol and RabbitMQ. The backend is hosted on Digital Ocean, and Docker Compose is used for building app images and deployment.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Future Plans](#future-plans)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- User authentication (login, signup, and logout) using JWT.
- One-on-one chat functionality.
- Profile image upload and storage using Cloudflare Images.
- MySQL database for storing user and chat data.
- Backend hosted on Digital Ocean.
- Docker Compose for containerization and deployment.

## Technologies Used

- **Backend**: Spring Boot
- **Frontend**: Vite, React
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **WebSockets** (planned): STOMP protocol, RabbitMQ
- **Deployment**: Docker, Docker Compose, Digital Ocean
- **Image Storage**: Cloudflare Images
- **Future Technologies**: Web Sockets with STOMP protocol, RabbitMQ

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Java (JDK 17 or higher)
- Node.js and npm
- Docker and Docker Compose
- MySQL database
- Cloudflare account for images
- Digital Ocean account

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/BravinR/Teamsphere-frontend.git
   npm install
   npm run dev
   ```

2. **Backend Setup**
    ```sh 
    git clone https://github.com/Flanderzz/TeamSphere-API.git
    cd YipYap-API-Testing

## Future Plans
- Add group chat functionality.
- Implement web sockets using the STOMP protocol.
- Use RabbitMQ for message brokering.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding standards. 

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a new pull request.

## License
This project is licensed under the MIT License.