const passport = require("passport");
const LocalStrategy = require("passport-local");
const users = [
  { name: "Mark", password: "Mark" },
  { name: "Larry", password: "Larry" },
  { name: "Ann", password: "Ann" },
  { name: "Carlo", password: "Carlo" }
];

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      session: true
    },
    async function(name, password, done) {
      console.log("local strategy scope");
      const user = { name, password };
      //output [{name:Mark,password:Mark}]
      // {name:Mark,password:Mark};
      const [singleUser] = users.filter(
        userObj =>
          userObj.name == user.name && userObj.password == userObj.password
      );
      if (singleUser) {
        done(null, singleUser);
      } else {
        done(null, false);
      }
    }
  )
);
// never serialize passwords inside cookies
// cookie = {name:"Carlo"}
// passport.authenticate("local") ====>  new LocalStrategy ====> serializeUser
passport.serializeUser(function(user, done) {
  if (user) {
    done(null, user.name);
  } else {
    done(null, false);
  }
});
// DESERIALIZE FLOW: USER MAKES A REQUEST =====> PASSPORT.deserialize checks for cookies and deserializes the data
// and puts the deserialized data into REQ.USER
// COOKIES automatically attach themselves on every HTTP, AXIOS, FETCH requests to any backend.
passport.deserializeUser(function(user_name, done) {
  if (user_name) {
    const [singleUser] = users.filter(userObj => userObj.name == user_name);
    done(null, singleUser);
  } else {
    done(null, false);
  }
});
