import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDe44Xq6yp5JFV21V4AJr_i3uaGo4jlX6U',
  authDomain: 'liverun-45203.firebaseapp.com',
  databaseURL: 'https://liverun-45203.firebaseio.com',
  projectId: 'liverun-45203',
  storageBucket: 'liverun-45203.appspot.com',
  messagingSenderId: '142247574738'

  // apiKey: 'AIzaSyAyX88sE5Rf2vJ8EW3v3v3pcH1DqzDuhjw',
  // authDomain: 'liverun-staging.firebaseapp.com',
  // databaseURL:'https://liverun-staging.firebaseio.com/',
  // projectId: 'liverun-staging',
  // storageBucket: 'liverun-staging.appspot.com',
  // messagingSenderId: '551144111565'
  
}

const app = Firebase.initializeApp(config)

export const db = app.database()
