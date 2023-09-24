const express = require("express");
const app = express();

const db = require("./models");
const Actor = db.actor;
const Film = db.film;
const FilmActor = db.filmActor;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "sakila rent movies",
    data: null,
  });
});

app.get("/films", async (req, res) => {
  try {
    const films = await Film.findAll({
      attributes: [
        "film_id",
        "title",
        "description",
        "release_year",
        "last_update",
      ],
    });

    return res.status(200).send({
      message: "success",
      data: films,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error",
      data: JSON.stringify(err),
    });
  }
});

app.get("/actors", async (req, res) => {
  try {
    const actors = await Actor.findAll({
      attributes: ["actor_id", "first_name", "last_name", "last_update"],
    });

    return res.status(200).send({
      message: "success",
      data: actors,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error",
      data: JSON.stringify(err),
    });
  }
});

app.get("/actors/:actorId/films", async (req, res) => {
  try {
    const { actorId } = req.params;

    const actorFilms = await Actor.findOne({
      //attributes: ["actor_id", "first_name", "last_name"],
      //   as: "actor",
      where: {
        actor_id: actorId,
      },
      include: [
        {
          model: FilmActor,
          //attributes: ["actor_id", "film_id", "last_update"],
          //as: "film_actor",
          include: [
            {
              //attributes: ["film_id", "title", "description"],
              model: Film,
              //as: "film",
            },
          ],
        },
      ],
    });

    // const filmActors = await FilmActor.findAll({
    //   attributes: ["actor_id", "film_id", "last_update"],
    //   include: [
    //     {
    //       model: Actor,
    //       attributes: ["actor_id", "first_name", "last_name"],
    //     },
    //     {
    //       model: Film,
    //     },
    //   ],
    //   where: {
    //     actor_id: actorId,
    //   },
    // });

    return res.status(200).send({
      message: "success",
      data: actorFilms,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error",
      data: JSON.stringify(err),
    });
  }
});

app.get("/films/:filmId/actors", (req, res) => {
  try {
    return res.status(200).send({
      message: "success",
      data: null,
    });
  } catch (err) {
    return res.status(500).send({
      message: "error",
      data: JSON.stringify(err),
    });
  }
});

app.listen(5600, () => {
  console.log("server run on port = ", 5600);
});
