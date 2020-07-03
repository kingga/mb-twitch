using MusicBeePlugin.Http;
using System;
using static MusicBeePlugin.Plugin;

namespace MusicBeePlugin.Timer
{
    class TrackTimeTimer
    {
        /// <summary>
        /// The message sent to the websocket.
        /// </summary>
        private struct TrackTimeMessage
        {
            public int time;
        }

        /// <summary>
        /// The musicbee API.
        /// </summary>
        private MusicBeeApiInterface api;

        /// <summary>
        /// The WebSocket client instance.
        /// </summary>
        private WebSocketClient ws;

        /// <summary>
        /// The timer which will fire off the data every second.
        /// </summary>
        private System.Timers.Timer timer;

        /// <summary>
        /// Create the track time timer.
        /// </summary>
        /// <param name="mbApi">The musicbee API.</param>
        public TrackTimeTimer(MusicBeeApiInterface mbApi, WebSocketClient wsClient)
        {
            api = mbApi;
            ws = wsClient;
            timer = new System.Timers.Timer(1000);
            timer.Elapsed += Timer_Elapsed;
            timer.AutoReset = true;
            timer.Enabled = false;
        }

        /// <summary>
        /// Start the timer.
        /// </summary>
        public void Start()
        {
            timer.Start();
        }

        /// <summary>
        /// Stop the timer.
        /// </summary>
        public void Stop()
        {
            timer.Stop();
        }

        /// <summary>
        /// Run every time the timer has fired this off.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Timer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            // Update the track time via the websocket.
            TrackTimeMessage msg;
            msg.time = (int)Math.Round(api.Player_GetPosition() / 1000.0);

            ws.Send("track.time", msg);
        }
    }
}
