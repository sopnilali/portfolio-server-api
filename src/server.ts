import app from "./app"

const PORT = process.env.PORT || 5000

const main = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })


}
main()