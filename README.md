# eSports Arena

This project is a modern eSports tournament platform built with Vite, React, TypeScript, and Tailwind CSS. It's configured for easy and efficient deployment on Netlify.

## Local Development

To run the application on your local machine, follow these steps:

1.  **Install Dependencies:**
    ```sh
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root of the project and add your Firebase configuration. You can copy the contents of `.env.example` as a template.

3.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Build for Production

To create an optimized production build of the application:

1.  **Build the Project:**
    ```sh
    npm run build
    ```
    This command will generate a `dist` directory with all the static assets ready for deployment.

## Deploy to Netlify

This repository is ready for deployment on Netlify.

1.  **Push to GitHub:**
    Commit your changes and push them to your GitHub repository.

2.  **Connect Repository in Netlify:**
    - Log in to your Netlify account.
    - Click on "Add new site" -> "Import an existing project".
    - Connect to your Git provider (GitHub) and select your repository.

3.  **Deploy Settings:**
    Netlify should automatically detect the settings from the `netlify.toml` file. Verify they are correct:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`

4.  **Add Environment Variables:**
    In your Netlify site settings, go to "Site configuration" > "Environment variables" and add the Firebase keys you have in your `.env.local` file.

5.  **Click Deploy:**
    Netlify will build and deploy your site.
