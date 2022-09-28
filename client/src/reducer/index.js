const initialState = {
    videogames: [],
    allVideogames: [],
    genre: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAME':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }

        case 'GET_GENRES':
            return {
                ...state,
                genre: action.payload
            }

        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames.map(g => ({
                id: g.id,
                name: g.name,
                image: g.image,
                description: g.description ? g.description : 'No tiene descripcion',
                released: g.released,
                rating: g.rating,
                platforms: g.platforms,
                types: g.types ? g.types.map(p => p) : 'holaasdasda'
            }))
            const genresFiltered = allVideogames.filter(e => e.types.includes(action.payload))
            console.log(genresFiltered,'HOLASAAAAA')
            return {
                ...state,
                videogames: genresFiltered
            }

        case 'FILTER_BY_QUERY':
            return {
                ...state,
                videogames: action.payload
            }

        case 'ORDER_BY_NAME':
            let orderedName = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogames: orderedName
            }

        case 'ORDER_BY_RATING':
            let orderRating = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogames: orderRating
            }

        case 'FILTER_BY_CREATED_OR_EXIST':
            const allVideogames2 = state.allVideogames;
            const filterCreOrExi = action.payload === 'created'
                ? allVideogames2.filter(el => el.createdInDb === true)
                : allVideogames2.filter(el => el.createdInDb !== true)
            return{
                ...state,
                videogames: action.payload === 'all' ? allVideogames2 : filterCreOrExi
            }

        case 'GET_GAME_BY_ID':
            return{
                ...state,
                detail: action.payload
            }

        case 'CLEAN_DETAIL':
            return{
                ...state,
                detail: []
            }

        case 'POST_GAME':
            return{
                ...state,
                videogames: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer