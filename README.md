# Forkify Recipes Add

<sub>Disclaimer: This project was built for learning and educational purposes as a part of "The Complere JavaScript course 2022", taught by Jonas Schmedtmann.</sub>

## Overview:

The Forkify Recipes App allows users to search the web for various recipes, which will provide them the required ingredients list and cooking instructions. The users can adjust the serving size and get the necessary ingredients accordingly. Further, the users can also create and upload their own recipes.

## Tech used and learnings:

1. Used a robust **MVC** (Model View Controller) architecture for building the App in which the _model_ element is responsible for fetching data from server and updating the state of the app. The _controller_ element passes the data from the _model_ to the respective _view_ elements which inturn are responsible for displaying information to the user.
2. Abstracting the functions used for fecting and sending data from and to the servers via api calls with a separate file.
3. Familiar about working with forms and form validation.
4. used `babel` for transpiling and polyfilling.
5. used `parcel` to configure and build the app for distribution.
