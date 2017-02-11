window.WebSocket = window.WebSocket || window.MozWebSocket;

class WS {
  init(onMessage) {
    this.connection = new WebSocket('ws://127.0.0.1:5000');
    this.connection.onerror = function () {
      alert('Error connecting to server');
    };
    this.connection.onmessage = function (message) {
      try {
        var json = JSON.parse(message.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      }
      onMessage(json);
    };
  }

  send(obj) {
    this.connection.send(JSON.stringify(obj));
  }
}

export default new WS();
