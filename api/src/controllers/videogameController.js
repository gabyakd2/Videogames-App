const axios = require('axios')
const { Videogame, Genre } = require('../db')
const API_KEY = 'd1f19f9e0799425f879300a3b00a61c2'



const getApiInfoGame = async () => {
    let games = [];
    try {
        for (let i = 1; i < 6; i++) {
            await (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results.map((e) => {
                games.push({
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map((e) => e.platform.name),
                    types: e.genres.map((e) => e.name),
                });
            });
        }
        //console.log(games.length)
        return games;
    } catch (error) {
        console.log(error);
    }
};



const getInfoDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [] }
        }
    })
}



const getInfoTotal = async () => {
    const infoApi = await getApiInfoGame();
    const infoDb = await getInfoDb();
    const infoTotal = infoApi.concat(infoDb);
    //console.log(infoTotal, 'EEEEEEEEEEEEEEEEEE')
    return infoTotal
}



const getGameByQuery = async (req, res) => {
    const { name } = req.query;
    const getGames = await getInfoTotal()
    if (name) {
        let gamesFiltered = []
        getGames.map(e => {
            let boolean = e.name.toLowerCase().includes(name.toLowerCase())
            if (boolean) {
                gamesFiltered.push(e)
            }
        })
        gamesFiltered.length > 0 ? res.status(200).send(gamesFiltered)
            : res.status(404).send('No se encontro el videojuego')
    } else {
        res.status(200).send(getGames)
    }
}




const getGameById = async (req, res) => {
    const { id } = req.params;
    if (id.length > 9) {
        const game = await Videogame.findOne({
            where: { id: id },
            include: [{ model: Genre }],
        });
        const infoApiDescription = {
            id: game.id,
            name: game.name,
            description: game.description.replace(/<[^>]*>?/g, ''),
            released: game.released,
            image: game.background_image ? game.background_image : game.image,
            platforms: game.platforms,
            rating: game.rating,
            types: game.genres.map(gen => gen.name)
        }
        res.send(infoApiDescription)
    } else {
        const apiData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const descriptionApi = {
            id: apiData.data.id,
            name: apiData.data.name,
            description: apiData.data.description.replace(/<[^>]*>?/g, ''),
            released: apiData.data.released,
            image: apiData.data.background_image,
            rating: apiData.data.rating,
            platforms: apiData.data.platforms.map(el => el.platform.name),
            types: apiData.data.genres.map(gen => gen.name)
        }
        res.status(200).send(descriptionApi)
    }
}




const postGame = async (req, res) => {
    const { name, image, description, released, rating, platforms, genres } = req.body;
    let gameObj = { name, image: image ? image : 'https://p4.wallpaperbetter.com/wallpaper/985/799/687/dauntless-videogame-video-games-wallpaper-preview.jpg', description, released, rating, platforms }

    try {
        const gameCreated = await Videogame.create(gameObj)
        let genreDb = await Genre.findAll({
            where: { name: genres }
        })

        gameCreated.addGenre(genreDb)
        res.status(200).send('Juego creado con exito!')
    }
    catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}





module.exports = {
    getGameByQuery,
    getGameById,
    postGame
}