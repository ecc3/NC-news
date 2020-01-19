# NC-News

An end-to-end news application where users can read articles, then add comments and vote in response to the articles.

## Project Demo

This project can be viewed in its final form at [NC-news](https://ecc-nc-news.netlify.com), deployed using Netlify.
The back end is deployed on Heroku and can be viewed at [nc-news](https://ec-nc-news.herokuapp.com/api).

## Back end project

The back end can be found on [GitHub](https://github.com/ecc3/backend_project). Follow the readme to run the back end locally.

## Getting started

The front end project can be found at [GitHub](https://github.com/ecc3/NC-news).
To set-up this project:

- This project requires the minimum version of Node v13.5.0 to run locally
- Clone the project by copying into the terminal:

```bash
git clone https://github.com/ecc3/NC-news.git
```

- Change directory into the project:

```bash
cd NC-news
```

- Install all dependencies by running:

```bash
npm i
```

- To view a live version of your local project run npm start, and the app will open in your browser.

```bash
npm start
```

## Features

1. The project will open on the homepage where you will find a randomised list of recommended articles. These will most likely change each time you refresh/revisit the page.

2. Clicking on 'Articles' in the navigation bar with pop up a menu of links to different article topics. Clicking on any one of them will render a list of articles, each with some simple information about the article.

3. The articles can be sorted and ordered by selecting from the drop-downs. Articles can also be filtered by author by typing in the 'Search by author' input. The list of authors will be displayed and narrowed as you type.

4. Vote on an article by clicking the up or down arrows where the article is displayed in the article list, or after clicking on an article to see it in full.

5. Show/Hide comments for each individually displayed article, and comments can be voted on the same way as articles.

6. Add a new comment for an individual article by writing in the text box and clicking submit.

7. Comments can be deleted if the user logged-in is the same as the comment author. The delete option will not appear for comments by other users.

8. Change user by clicking on 'Login' in the navigation bar. This will bring up a modal box with an input box to type a username in. Again, all users will be displayed in a drop-down and filtered as you type. Once the new username has been submitted the new user's name and avatar will be displayed in the navbar. This user will persist even when the app is closed and returned to, as the user is saved in local storage.

9. Click on the Home button in the navbar to return to the homepage.

10. Contact details and a link to my GitHub account can be found in the footer.
