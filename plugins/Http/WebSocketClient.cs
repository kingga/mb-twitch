using MusicBeePlugin.Config;
using MusicBeePlugin.Http.Messages;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using WebSocketSharp;

namespace MusicBeePlugin.Http
{
    class WebSocketResponseData
    {
        public string channel { get; set; }
        
        public object data { get; set; }
    }

    class WebSocketClient : IDisposable
    {
        private struct Msg
        {
            public string channel;
            public object data;
        }

        /// <summary>
        /// The websocket instance.
        /// </summary>
        private WebSocket ws;

        /// <summary>
        /// The applications configuration options.
        /// </summary>
        private ConfigInterface config;

        private List<WebSocketSubscriberInterface> subscribers;

        public WebSocketClient(ConfigInterface appConfig)
        {
            subscribers = new List<WebSocketSubscriberInterface>();
            config = appConfig;
            ws = new WebSocket(config.GetWebSocketPath());
            ws.OnMessage += Ws_OnMessage;
            ws.OnError += Ws_OnError;
            ws.OnOpen += Ws_OnOpen;
            ws.Connect();
        }

        private void Ws_OnOpen(object sender, EventArgs e)
        {
            Debug.WriteLine("WebSocket has been opened.");
        }

        private void Ws_OnError(object sender, ErrorEventArgs e)
        {
            Debug.WriteLine("Error has occured on the WebSocket. " + e.Message);
        }

        private void Ws_OnMessage(object sender, MessageEventArgs e)
        {
            if (e.IsText)
            {
                // Decode the JSON.
                try
                {
                    WebSocketResponseData data = JsonConvert.DeserializeObject<WebSocketResponseData>(e.Data);

                    // Loop throught each subscriber and pass in the message data.
                    foreach (WebSocketSubscriberInterface subscriber in subscribers)
                    {
                        if (data.channel == subscriber.Channel())
                        {
                            subscriber.Notify(data.data);
                        }
                    }
                } catch
                {
                    // ...
                }
            }
        }

        public void Send(string channel, object message)
        {
            Msg msg;
            msg.channel = channel;
            msg.data = message;

            ws.Send(JsonConvert.SerializeObject(msg));
        }

        public void Subscribe(WebSocketSubscriberInterface subscriber)
        {
            subscribers.Add(subscriber);
        }

        /// <summary>
        /// Close the websocket connection and cleanup the rest of this class.
        /// </summary>
        public void Dispose()
        {
            ws.Close();
            ws = null;
        }
    }
}
