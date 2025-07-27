export const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("User socket_id:", socket.id);

    socket.on("start_timer", (data) => {
      const durations = [30, 60, 180, 300];

      durations.map((duration) => {
        let timeLeft = duration;

        const interval = setInterval(() => {
          if (timeLeft >= 0) {
            socket.emit("timer_tick", { duration, time: timeLeft });
            timeLeft--;
          } else {
            timeLeft = duration;
          }
        }, 1000);
      });
    });
  });
};
