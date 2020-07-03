using MusicBeePlugin.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using static MusicBeePlugin.Plugin;

namespace MusicBeePlugin.Http.Subscribers
{
    class TrackRequest
    {
        public string track;
    }

    class TrackRequestWebSocketSubscriber : WebSocketSubscriberInterface
    {
        private MusicBeeApiInterface api;

        private ConfigInterface config;

        private string[] filenames;

        public TrackRequestWebSocketSubscriber(MusicBeeApiInterface apiInterface, ConfigInterface conf)
        {
            api = apiInterface;
            config = conf;
        }

        public string Channel()
        {
            return "track.request";
        }

        public void Notify(object data)
        {
            TrackRequest request = (TrackRequest)data;

            // Library_QueryFilesEx, Playlist_QueryFilesEx, Library_QueryFilesEx, Playlist_QueryFilesEx
            if (filenames == null)
            {
                api.Playlist_QueryFilesEx(config.PlaylistName(), out filenames);
            }

            // TODO: Deal with filenames.
            string requestedTrack = request.track;

            foreach (string filename in filenames)
            {
                MessageBox.Show(filename, requestedTrack);
                break;
            }
        }
    }
}
