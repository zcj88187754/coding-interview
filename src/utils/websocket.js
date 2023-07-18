

class MyWebSocket  {
    constructor(url, success){
        this.socket = null;
        this.url = url
        this.init(success)
    }
    
    init(success){
        let weburl = this.url
        if (!this.socket && weburl) {
            this.socket = new WebSocket(weburl)
            this.socket.onclose = function () {
                console.log('websocket关闭');
            }
            this.socket.onopen = success
        }
    }
    sendMsg (data) {
        this.socket.send(JSON.stringify(data))
    }
    onMsg (callback) {
        this.socket.onmessage = function (e) {
            callback(e.data)
        }
    }
    close () {
        this.socket.close()
        this.socket = null 
    }
}

export default MyWebSocket;