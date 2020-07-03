using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MusicBeePlugin.Http
{
    interface WebSocketSubscriberInterface
    {
        /// <summary>
        /// The channel this is listening on.
        /// </summary>
        /// <returns>The channel ID.</returns>
        string Channel();

        /// <summary>
        /// When a message is received on this channel notify here.
        /// </summary>
        /// <param name="data">The data which was recieved.</param>
        void Notify(object data);
    }
}
