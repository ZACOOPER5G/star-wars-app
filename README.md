## Learn More About the Star Wars universe with this application 📈

This app will give you the ability to search through all your favourite Star Wars films (available from the SWAPI), favourite select films so they appear at the top of the homepage and on the favourites page, and view more information about each film. 

Each film contains more information on when it was released, the Director and the Producer, as well as all of the characters who appear in the film. Hover over each character to find out more of their personal information, including what planet they are from, hair colour, birthdate, and more!

![image](https://user-images.githubusercontent.com/105761311/206091088-555c3589-25e9-4daa-8957-4f3fff446ede.png)

## About the project 📝

* This app was built using Next.js and Material UI components. 
* Data, such as films that have been favourited, will persist and are saved via local storage.
* The App was styled using Sass.

## Features ⚙️

* Search through the available Star Wars films using the search field in the navbar. Films can only be searched using their title.
* Add and remove favourite films. Films will be reordered and added/removed from the favourites page depending on your favourite selections. Information is persisted through local storage.
* Selection "See More" or the title of each film from the homepage/favourites page will take you to a separate url where individual information about the film is displayed. Hover over each character to find out more information about them as well!
* API data from SWAPI is collected as an initial prop via the app component. This is then stored in local storage and used globally throughout the app. Upon clicking each film, individual data is fetched from the SWAPI for each character and might take a few additional seconds to load.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting started with the app 🛠️

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More 🧑🏻‍💻

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Vercel 🚀

Visit the latest deployment of the app via 🔗 https://star-wars-flix.vercel.app 🔗. Happy exploring! 
