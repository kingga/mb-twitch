namespace MusicBeePlugin.Http.Messages
{
    class PlayStateChangedMessage
    {
        private struct PlayStateChanged
        {
            public bool isPlaying;
        }

        public void Send(WebSocketClient client, bool isPlaying)
        {
            PlayStateChanged data;
            data.isPlaying = isPlaying;

            client.Send("track.state", data);
        }
    }
}
