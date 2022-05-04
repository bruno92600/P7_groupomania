// import de express rate limit
const rateLimit = require("express-rate-limit");

// config de exports rate limit (pour limiter le nombre de connection si ça echoue)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

// export du middmeware
module.exports = limiter;
