import App from './src/server.js'

const day = new Date()
const currentDay = day.toLocaleString()
const port = process.env.PORT ?? 7070
App.listen(port, () => console.log(`server running on port ${port} at ${currentDay}`))

