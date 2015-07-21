# PdUI - A user interface for interacting with Pure Data patches in the browser.

## Motivation
Programming computers is hard, and consequently visual programming languages
have been created to make it easier for non-programmers to create computer programs by manipulating
program elements graphically instead of textually. One of the earliest examples of a visual progamming
language for live music performance is [Pure Data](http://puredata.info) (Pd), developed by Miller Puckette in the 90s'.
While there have been several desk top implementations of Pd, it is only more recently that 
[Sebastien Piquemal](http://funktion.fm/#contact) et. al. have created [WebPd](https://github.com/sebpiq/WebPd)
using the new [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) standard.

**WebPd** is a major step in loading and play Pd patches on the web using Web Audio.
**PdUI** takes the next step by stacking a GUI on top of WebPd to enable users to create, modify & save their patches directly within a web browser.

## Description
PdUI is a very early stage project that began on July 9, 2015.  Users are able to register and login and play the demo
examples. Iteraction is limited to sending PD messages to the patch and hearing the resulting changes.  The ultimate goal and direction will
be to interact directly with all Pd object types. Check out our [PdUI Trello board](https://trello.com/b/07uE2nVI/pure-data-gui-development) for status of features planned or in progress.

## Libraries & Frameworks
- MEAN stack sans Angular (Nodejs, Express, Mongo, JQuery)
- WebPd: Web Audio, Pd patch parsing and renders

## Installation
PdUI uses MongoDB for storing user login information.  Therefore, you should create a .env file in your pdui root directory 
and add the following lines:
```
SECRET=somesecret  // Pick a secret word
DEV_MONGODB='your local mongodb uri'  //Example: 'mongodb://localhost/pdui'
PORT = Port #  // Example: PORT = 3000
```
## Documentation
PdUI's development is currently 'Demonstration Mode' only.
- Login or Register an account
- Click the demo link
- Select one of five patches to view and play

Patches that contain message send/receive ability will be displayed as
object fields in the patch panel. Enter values in those fields to change
the patch.

## Deployment
[Heroku]()

## Future Direction
The ultimate goal and direction will be to interact with all Pd object types, with the
ability to upload, create, edit, and save patches to the PdUI database.  Members will be able
to view and share their patches with other members. Check out our [PdUI Trello Board](https://trello.com/b/07uE2nVI/pure-data-gui-development)
for status of features, planned or in progress.

