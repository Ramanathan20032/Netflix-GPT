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
- Created a Redux slice for 'api/movies/nowPlaying'. (Movies Lists, TV Series List)
- (Movies Lists) - nowPlaying, popular, top rated, upcoming, 
- (TV Series Lists) - nowPlaying, popular, top rated, upcoming, Airing today TV, Popular TV, Top Rated, On the Air
- Implemented an async thunk as middleware to fetch data from the API and synchronize it with the Redux state.
- updated store with movies Data [nowPlaying, popular, top rated, upcoming]
- maintcontainer for Banner [spotlight Movie with video and details]
- secondary container forn listing the movie fetched from the api
- Make an API call for playing video on banner and store it in redux
- embedded the youtube with the corresponding key

- Integrated details API to get the info of the Movie || TV with dynamic movieID
- directed to the corresponding details page of the Movie and Tv
- with in the details page, handle the ui with available data
- routed the cast and crew data rendered from the available data from the details api
- routed the recommendation and similiar movies with the corresponding movies || tv series with lazy loading

- Categories Listing for Movie && TV from genere API




