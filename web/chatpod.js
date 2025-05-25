document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chatbox').classList.toggle('hidden');
});

document.getElementById('close-chat').addEventListener('click', () => {
  document.getElementById('chatbox').classList.add('hidden');
});

document.getElementById('chat-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (message === '') return;

  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;

  document.getElementById('chat-messages').appendChild(userMsg);
  input.value = '';

  // Simple bot reply simulation
  const botReply = document.createElement('div');
  botReply.className = 'message bot';
  botReply.textContent = "Thanks for your message. We'll get back to you soon!";

  setTimeout(() => {
    document.getElementById('chat-messages').appendChild(botReply);
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
  }, 1000);
});
