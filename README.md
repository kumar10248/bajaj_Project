# AI Movie Script Generator

This project is an AI-powered movie script generator. It consists of a client-side application built with React, TypeScript, and Vite, and a server-side application built with Express.js. The client allows users to input movie details, and the server generates a script using Google's Generative AI.



## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

### Clone the repository

```sh
git clone <repository-url>
cd <repository-directory>
```

### Install dependencies

#### Client

```sh
cd client
npm install
```

#### Server

```sh
cd server
npm install
```

## Running the Project

### Start the Server

1. Navigate to the 

server

 directory:

    ```sh
    cd server
    ```

2. Create a 

.env

 file in the 

server

 directory and add your Google Generative AI API key:

    ```sh
    GEMINI_API_KEY=your_api_key_here
    ```

3. Start the server:

    ```sh
    npm run dev


    ```





   The server will run on `http://localhost:8000`.

### Start the Client

1. Navigate to the `client` directory:

    ```sh
    cd client
    ```

2. Start the client:

    ```sh
    npm run dev
    ```

   The client will run on `http://localhost:5173`.

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Fill in the movie title, genre, plot synopsis, and script style.
3. Click the "Generate Script" button.
4. The generated script will be displayed on the page.

## Deployment

### Vercel

The project is configured to be deployed on Vercel. The 

vercel.json

 file in the 

server

 directory contains the necessary configuration.

1. Install the Vercel CLI:

    ```sh
    npm install -g vercel
    ```

2. Deploy the project:

    ```sh
    vercel
    ```


