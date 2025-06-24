create vite app

remove unecessary code and create a hello World app

Install tailwind css

Install Daisyui

Add Navbar component to App.jsx

create a navbar saperate navbar file

install react router dom

Create BrowserROuter > Routes > ROute= /Body > RouteChildren

Create an Outlet in your Body Component - for children component

Create a footer

Create a login page

Install Axios

CORS install cors in backend => add middleware to with configurations : origin: URL of frontend , credentials=true {

withCredentials: true ensures that cookies and HTTP authentication data (like sessions or tokens) are sent and received correctly between the client and the server. It's mainly required when you're working with: 1.Cookies for authentication (e.g., JWT stored in cookies). 2.Sessions managed on the server using cookies (e.g., express-session). 3.CORS (Cross-Origin Resource Sharing) requests when the frontend (e.g., localhost:3000) is different from the backend (e.g., localhost:8000).

}

whever you are making api call so pass axios => { withCredentials: true}

Install Redux toolkit

created a store=> configureStore =>

wrapping everything under provider in app =>

create Slice => addReducer to store
install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
configureStore => Provider => createSlice => add reducer to store


Add redux devtools in chrome

Login and see if your data is coming properly in the store
NavBar should update as soon as user logs in

Refactor our code to add constants file + create a components folder


You should not be access other routes without login
If token is not present, redirect user to login page

Logout Feature


Get the feed and add the feed in the store
build the user card on feed
Edit Profile Feature
Show Toast Message on save of profile
New Page - See all my connections
New Page - See all my Conenction REquests
Feature - Accept/Reject connection request
Send/Ignore the user card from the feed
Signup New User
E2E testing



//routing 
Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile