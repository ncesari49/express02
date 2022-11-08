const database = require("./database")


const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      console.log(res);
      res.status(200).json(movies)
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id=?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.status(200).json(movies[0])
      } else {
        res.status(404).send("not found")
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body
  console.log(req.body);

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ? )", [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error saving movie")
    })
}


const getUser = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => res.status(200).json(users))
    .catch((err) => console.log(err))
}
const getUserByID = (req, res) => {
  const idu = parseInt(req.params.id)
  database
    .query("select * from users where id=?", [idu])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0])
      } else {
        res.status(404).send("not found")
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("error from retroving data from database")
    })
}

const createUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body
  database
    .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error saving user")
    })
}



module.exports = {
  getMovies,
  getMovieById,
  getUser,
  getUserByID,
  postMovie,
  createUser,
};


