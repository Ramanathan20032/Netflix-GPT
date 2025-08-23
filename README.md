#### set-up

- create the project using create-react-app.
- Configured Tailwind for Styling.
- Header Component
- Routing of App
- SignIn/SignUp Form
- Form Validation
- useRef Hook for input fields
- FireBase setup
- Deployed app to the firebase
- implemented signIn/signUp via firebase auth
- "createUserWithEmailAndPassword"[sign up], "signInWithEmailAndPassword"[sign In],
"signOut"[sign out]
- onAuthStateChanged [to Track Sign-in, Sign-out, Sigh-up]
- created redux store with userSlice

- navigate to signIn -> "createUserWithEmailAndPassword"
- navigate to Browse -> "signInWithEmailAndPassword"
- navigate to signIn -> "signOut"

- enabled toaster on successfull signUp
- storing the user on redux when [signIn / signOut]
- fix : if the user is not loggedIn disable the routing for /browse ; viceversa for / ;


TMDB API Call Implementation

- Registered on TMDB and obtained the API key.
- Created a Redux slice for 'api/movies/nowPlaying'. (Movies Lists)
- Implemented an async thunk as middleware to fetch data from the API and synchronize it with the Redux state.
- updated store with movies Data [nowPlaying, popular, top rated, upcoming]
- maintcontainer for Banner [spotlight Movie with video and details]
- secondary container forn listing the movie fetched from the api
- Make an API call for playing video on banner and store it in redux
- embedded the youtube with the corresponding key

- Integrated details API to get the info of the movie with dynamic movieID


