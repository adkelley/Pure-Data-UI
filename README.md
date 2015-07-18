# PDGUI - creating, editing, playing, and saving Pure Data patches in the browser.

## Motivation
Programming computers is hard, and consequently visual programming languages
have been created to make it easier for non-programmers to create computer programs by manipulating
program elements graphically instead of textually. One of the earliest examples of a visual progamming
language for live music performance is [Pure Data](http://puredata.info), developed by Miller Puckette in the 90s'.
While there have been several desk top implementations of the Pure Data, it is only more recently that 
[Sebastien Piquemal](http://funktion.fm/#contact) et. al. have created [WebPd](https://github.com/sebpiq/WebPd)
using the new [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) standard.

**WebPd** is a major step in enabling developers to load and play Pure Data patches on the web using Web Audio.
**PDGUI** takes the next step by stacking a GUI on top of WebPd to enable users to CRUD their Pure Data patches directly in the browser.

## Description
PDGUI is a very early stage project that began on July 9, 2015.  Users are able to register and login and play the demo
examples. Iteraction is limited to sending PD messages to the patch and hearing the resulting changes.  The ultimate goal and direction will
be to interact with all Pure Data object types, with the ability to upload, create, edit, play, and save Pure Data patches. Check out
our [PDGUI Trello board](https://trello.com/b/07uE2nVI/pure-data-gui-development) for status of features planned or in progress.

## Libraries & Frameworks
- MEAN stack sans Angular (i.e, Nodejs, Express, Mongo)
- WebPD: Web Audio, Pure Data patch parsing and renders

## Installation
PDGUI uses MongoDB for storing user login information.  Therefore, you should create a .env file in your pdgui root directory 
and add the following lines:
```
SECRET=somesecret  // Pick a secret word
DEV_MONGODB='your local mongodb uri'  //Example: 'mongodb://localhost/pdgui'
PORT = Port #  // Example: PORT = 3000
```
## Documentation
PDGUI is currently 'Demonstration Mode' only.
- Login or Register an account
- Click the demo link
- Select one of five patches to view and play

Patches that contain message send/receive ability will be displayed as
object fields in the patch panel. Enter values in those fields to change
the patch.

## Deployment
[Heroku]()

## Future Direction
Again, the ultimate goal and direction will be to interact with all Pure Data object types, with the
ability to upload, create, edit, and save Pure Data patches to the PDGUI database.  Members will be able
to view and share their patches with other members. Check out our [PDGUI Trello Board](https://trello.com/b/07uE2nVI/pure-data-gui-development)
for status of features, planned or in progress.
