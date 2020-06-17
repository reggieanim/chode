export const sendMessage = (textmessage, user, socket) => {
  const d = new Date();
  socket.emit("chatMessage", {
    message: textmessage,
    username: user,
    date: d.toLocaleString(),
  });
};
