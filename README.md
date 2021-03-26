hi there! thanks for reviewing my code.

## setup instructions

pull the code from GitHub, then execute the following commands:

```
npm install
npm run build
npm run start
```

then you will be able to access the app from http://localhost:8080

## demo

![demo](https://user-images.githubusercontent.com/1881454/112560210-11a5cc80-8da9-11eb-95f1-e410cc1b08ee.gif)


## dev process

I pushed to this github repository, using branches both for my own benefit of breaking down the problem into tasks. and I turned those branches into PRs to give a good idea about how I break down a problem

I included a sampling of unit tests for different kinds of code

## design

I implemented the drawing app with Node and React. I used express to serve the API and the static files for the fontend, and I used webpack to build the frontend files. I used Jest to unit test both the frontend and the backend. I used Enzyme to help unit test the React code.

### backend

for the backend, I organized the different components to keep them easy to understand, unit test, and change. there is an express subapp for the API that could be easily extracted into a completely separate deployment, but for now, I have it served all of the same port. (thinking about how it would be deployed, the port is configurable via a command line argument)

for the data storage, I just used the filesystem for now. the data access functions are cleanly separated, making it easy to use some other data storage in the future

### frontend

for the fontend, I configured webpack and babel to build the code. the code is laid out with a root App component and views in their own folders with supporting components. common code is shared at the top level. I didn't include css files in favor of inline styling

I decided to use an svg tag as the drawing surface, listening for mouse events to produce a stream of data that another component could process into a series of strokes. this ensures that the image is rendered the best quality possible for whatever screen, and it also affords the future development of replaying the strokes in real time, assuming each stroke had a timestamp added to it

the same Canvas component is used for drawing, displaying the full-sized image, and rendering the thumbnails

I used fetch to retrieve the data from the API, writing a helper function for some common processing like encoding URI components and network-level error handling

the log in/out mechanism is just a basic honor system / type your own username. the API client handles adding the username as a header, so this would be easy to instead add a real auth token later

I did error handling in a basic way, introducing a concept of an error stream that any code can publish to, and an ErrorOverlay component an subscribe to to display the error

the loading states are rendered as simple full screen text

I didn't use a component library like react-bootstrap, just to keep it simple and clearly show my own code

## tradeoffs

I didn't include paging for the list of drawings, because I wanted to focus on other complexities of the problem. that would be necessary if a lot of people were to use this app. (and the data storage would have to be some kind of database as well.)

I didn't implement the erase functionality. if I did, I think I would use the existing data stream that the Canvas component provides, but when in erase mode, use those points to check for existing strokes that intersect with the path of the erase stroke. I'd add another type of erase entry to the drawing, rather than delete the erased strokes to support replay functionality.

the SVG canvas worked out okay, but with thicker brushes, the flat edges of the individual strokes don't look how I'd want. I'd do more research to figure out how to create multi-segment lines, sine SVG has to support this exact scenario rendering line drawings.

I'm not sure if the SVG canvas would stay performant for large detailed drawings. if this became an issue, maybe I could have a working canvas just for the last few strokes, which then can be moved over to a main canvas which gets redrawn less frequently.

## bonus points

the data and components are set up to have a natural path to the replay functionality. the code would need to start recording a timestamp with each stroke, then replay would be a matter of constantly redrawing, adding the strokes to the canvas that have a timestamp less than or equal to a timer.

since the image rendering is SVG, the drawings will look good on retina/high-DPI displays

to provide a good mobile experience, I'd want to add some responsiveness to the sizing of the drawing canvas. and then on smaller screens, the listing could show the DrawingDisplay components stacked, as the display's full width.  I'd also need to hook into more types of events in the Canvas component, which currently only listens for mouse events

to make the strokes smoother, I'd want to research more about SVGs to fix the main rendering issue. beyond that, I could explore algorithms to process the strokes and actually change their paths

more brush types seem very possible with a foundation of SVG. I'd just need to do a bit more research framed in that way
