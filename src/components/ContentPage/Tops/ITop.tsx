export default interface ITop {
    id: string,
    title: string,
    created_at: string,
    description: string,
    topImageUrl: string,
    movieInTop: Array<{
        id: string,
        comment: string,
        movieId: string,
        movie: {
            title: string,
            poster_path: string
        }
    }>,
    user: {
        name: string,
        avatar: string
    }
}