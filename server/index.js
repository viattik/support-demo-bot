'use strict';
const TelegramBot = require('node-telegram-bot-api'),
// Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
		telegram = new TelegramBot("348348593:AAHHGuv2m1xExxE7QK8c0E3j5nhUtIwMhR4", { polling: true });

const port = (process.env.PORT || 5000);
const webSocketServer = require('websocket').server;
const http = require('http');

const chats = {};
const connections = [];

function getAutoReply(text) {
	switch (text) {
		case '/start':
			return 'Доброго времени суток!\n' +
					'Контакты - /contacts\n' +
					'Поддержка - /support';
			break;
		case '/contacts':
			return 'Телефон: +38 (099) 999 99 99\n' +
					'Адрес: ул. Николая Амосова, 12\n' +
					'Email: support@mail.com';
			break;
		case '/support':
			return 'Ожидайте. Чтобы закончить, нажмите /end_support';
		case '/end_support':
			return 'Пока.';
		default:
			break;
	}
}

function syncToBrowser() {
	connections.forEach(function(connection) {
		connection.sendUTF(JSON.stringify(chats));
	});
}

telegram.on("text", (message) => {
	const text = message.text;
	const id = message.chat.id;
	const autoReply = getAutoReply(text.toLowerCase());
	if (autoReply) {
		telegram.sendMessage(message.chat.id, autoReply);
	}
	let chat = chats[id];
	if (!chat && text === '/support') {
		chats[id] = chat = {
			from: message.from,
			messages: []
		}
	} else if (chat && text === '/end_support') {
		chats[id] = chat = undefined;
	}
	if(chat) {
		chat.messages.push({ sender: 0, text });
	}
	syncToBrowser();
});

const server = http.createServer(function(request, response) {});

server.listen(port, function () {
	console.log('Node app is running on port', port);
});

var wsServer = new webSocketServer({
	httpServer: server
});

wsServer.on('request', function(request) {
	console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
	console.log((new Date()) + ' Connection accepted.');

	var connection = request.accept(null, request.origin);
	connections.push(connection);
	connection.sendUTF(JSON.stringify(chats));

	// Browser sent message
	connection.on('message', function(message) {
		const { id, text } = JSON.parse(message.utf8Data);
		const chat = chats[id];
		if (!chat) { return; }

		chat.messages.push({ sender: 1, text });
		telegram.sendMessage(id, text);
	});

});

// sent to admin
telegram.sendMessage(128048813, 'Support Bot restarted', {
	parse_mode: "Markdown"
});
