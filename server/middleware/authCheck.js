const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  console.log("Auth Check", req.headers.cookie);
  if (!req.headers.cookie) {
    console.log("No Cookie");
    res.json({ msg: "No Cookie" });
  } else {
    console.log("$$$$$", req.headers.cookie.split("="));
    const split = req.headers.cookie.split("=")
    console.log("SPLIT", split[1]);

    const decoded = jwt.verify(split[1], process.env.SECRET_KEY);
    console.log("decoded", decoded);
    if (!decoded.username) {
      res.json({ msg: "bad token" });
    } else {
        req.user = decoded
      res.json({ msg: "valid token" });
    }
  }

  next();
};

module.exports = authCheck;