# Cocktail App

## Code Structure

```
├── components/      # Reusable UI components
├── pages/           # Next.js pages
├── services
|    |__ apis/        # backend api calls
|    |__ queries/     # react-query files
|
├── store/           # zustand state   
├── public/          # Static files
├── utils/           # Utility functions
```

## Libraries Used

- [**React**](https://react.dev/) - A JavaScript library for building user interfaces.  
- [**TypeScript**](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript.  
- [**Next.js**](https://nextjs.org/) - A React framework for server-side rendering and static site generation.  
- [**Axios**](https://axios-http.com/) - A promise-based HTTP client for making API requests.  
- [**React Query**](https://tanstack.com/query/latest) - A powerful data-fetching and state management library for React.  
- [**Zustand**](https://zustand-demo.pmnd.rs/) - A minimal, fast state management library for React.  
- [**Vitest**](https://vitest.dev/) - A blazing-fast unit testing framework for Vite and modern JavaScript.  


## Steps to Run Locally

1. **Clone the repository:**
    ```sh
    git clone https://github.com/KasunEdward/cocktail-app.git
    cd cocktail-app
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the development server:**
    ```sh
    npm run dev
    ```

4. **Open your browser and visit:**
    ```
    http://localhost:3000
    ```

5. **Build for production:**
    ```sh
    npm run build
    npm start
    ```
6. **Run tests:**
    ```sh
    npm run test
    ```
