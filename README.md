## Song Feed

This project allows users to receive a feed of their songs from the server and update ratings related to them. 

## How to run

First install the apps dependencies with
```
npm install
```

Then run the application locally with

```
npm start
```
The site will be running at http://localhost:3000

## Testing 

For unit testing 

```
npm run test
```

For e2e, open another console and make sure dev server is running then run (this won't work unless the dev server is running):

```
npm run e2e
```

## Stack

This project uses the following frontend technologies

```
- React (Base Framework)
- Redux (State Container)
- Reselect (Memoization Handler)
- Sagas (Data flow Handler)
```
## Styles
This project uses styled-components to create a component centric style pattern. Each component is supplied with a js file solely responsible for defining that components styles. These styles are written in Sass and processed into a bundled CSS file.


## Data flow

This SPA runs with the following data flow.

- React renders components based on the initial state defined in reducers (Redux responsible for attaching this initial state to components).
- An initiating action (attached to the component via redux) is triggered that is responsible for loading the tracks.
- There is a saga root responsible for listening to this action and, upon hearing it, triggers a saga generator.
- This saga makes a call to the api and upon receiving a response it triggers another action.
- A reducer switch recognisies this actions' type and alters the applications state. 
- A selector (using reselect) provides components with a memoised portion of the apps state directly related to a specific piece of data (songs in this case)
- Redux then finishes off by attaching updated state to components that request it. 
- All non api user actions follow this pattern: user interaction -> action -> reducer -> selector
- All api user actions follow this pattern: user interaction -> action -> saga -> action -> reducer ->selector

I have chosen this architecture because it efficiently and concisely compartmentalises the flow of actions through the application into its relevant area. This makes it scalable and easy to debug.

## Future functionality and time limits

- I would have liked to make the progress bar of the music player draggable/clickable so that users could select what part of the song they'd like to hear.
- I also would have liked to make song data animate across a cell on hover so that users could see the full name when the cells width has cut it off. 
- The Eslinter highlighted a number of minor js formatting issues. Due to time constraints I was not able to tend to all of these. With more time I would have liked to clean this up more stringently.
