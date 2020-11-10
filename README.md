## Potter

*Potter* is a React application built by [Nicole Gooden](https://github.com/nicolegooden).

### Overview

*Potter* is an interactive, story-based application inspired by the Harry Potter series.  
As users arrive at the homepage, they are prompted to receive a house assignment from the sorting hat, then choose a character from their assigned house.  Users can view more details about their character and their house from the homepage.  Additional functionality exists in the spells section.  Users can browse all of the available spells, search for spells by typing into the input field, and see their matching results based on spell name, spell effect, or spell type.  Also, once users have finalized a character to embody, they can add specific spells to their personal inventory, then engage in a practice session through which they receive practice results and earn spell points accordingly.  Once a user reaches 15 points for practicing a spell, they are congratulated with mastery.

### Tech

This application was developed with React, React Router, and Asynchronous JavaScript for network requests to the [Potter API](https://www.potterapi.com/). Dynamic routing was implemented in order to determine the render for the house details view and the character details view. Testing was supported by React Testing Library, Jest, and Node. 

### Installation 

Terminal:

+ Clone: Run `git clone git@github.com:nicolegooden/potter.git` 
+ Transition to repo locally: Run `cd potter`
+ Install packages: Run `npm i` or `npm install`
+ Open app in browser: Run `npm start`

The application should run on `localhost:3000`.

### User Interaction

<img src="https://media.giphy.com/media/A9oObDN4l9Yd2Zlz5r/giphy.gif" height=auto width=75%/>

<img src="https://media.giphy.com/media/W6AZfQcb4gbQyuRAX8/giphy.gif" height=auto width=75%/>

<img src="https://media.giphy.com/media/oaVrxsgFkKaM8VMUnQ/giphy.gif" height=auto width=75%/>

<img src="https://media.giphy.com/media/rJjAYLzcT80G8DrWEM/giphy.gif" height=auto width=75%/>

### Wins

+ Manipulating data retrieved from GET request to API
+ Keeping class components to a minimum - there are 9 components and 7 are functional
+ Using React Router to dynamically render a component based on user interaction

### Challenges

+ Determining if `SpellCard` should hold onto its own state
+ Design - the practice card pop-up styles could be adjusted to prevent user from scrolling

## Next Steps

+ Add reset functionality via a button in the header so user's house, character, and spells can be set back to original state
+ Add more extensive sad path testing 
+ Account for undefined routes
+ Make app responsive for tablet and mobile screen widths





