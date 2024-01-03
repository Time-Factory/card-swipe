import { defineIOHandler } from 'nuxt3-socket.io/helpers'

export default defineIOHandler((io) => {
  io.on('connection', (socket) => {
    console.log('Connected ', socket.id)
    socket.on("swipe", (data) => {
      console.log('event:swipe',data)
      socket.broadcast.emit("swipe", data);
    });

    socket.on("cards", (data) => {
      console.log('event:cards', data)
      const cards = [];
      for(let i=0;i<1000;i++) {
        cards.push({
          id: 1,
          name: 'Card '+i,
          no: 1000000000+i
        })
      }
      socket.emit('cards', cards);
    });
  })
  io.on('disconnect', (socket) => {
    console.log('Disconnected ', socket.id)
  });

})