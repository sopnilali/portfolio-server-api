import { Server } from "http"
import app from "./app.js"

let server: Server

const PORT = process.env.PORT || 5000

const main = () => {
    try {
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to connect to the server", error)
    }

}
main()