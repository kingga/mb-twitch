using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static MusicBeePlugin.Plugin;

namespace MusicBeePlugin.Http.Messages
{
    struct TrackChangedStruct
    {
        public string artist;
        public string album;
        public string track;
    }

    class TrackChangedMessage
    {
        /// <summary>
        /// The musicbee API interface.
        /// </summary>
        private MusicBeeApiInterface api;

        /// <summary>
        /// Create the message.
        /// </summary>
        /// <param name="mbApi">The musicbee API interface.</param>
        public TrackChangedMessage(MusicBeeApiInterface mbApi)
        {
            api = mbApi;
        }

        /// <summary>
        /// Send the current track to the server.
        /// </summary>
        /// <param name="client">The websocket client.</param>
        public void Send(WebSocketClient client)
        {
            TrackChangedStruct data;
            data.artist = api.NowPlaying_GetFileTag(MetaDataType.Artist);
            data.album = api.NowPlaying_GetFileTag(MetaDataType.Album);
            data.track = api.NowPlaying_GetFileTag(MetaDataType.TrackTitle);

            client.Send("track.changed", data);
        }
    }
}
