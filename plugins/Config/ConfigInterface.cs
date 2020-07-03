namespace MusicBeePlugin.Config
{
    interface ConfigInterface
    {
        /// <summary>
        /// Get the path to the websocket.
        /// </summary>
        /// <returns>The websocket path.</returns>
        string GetWebSocketPath();

        /// <summary>
        /// The name of the playlist which should be available to the public.
        /// </summary>
        /// <returns>The name of the playlist.</returns>
        string PlaylistName();
    }
}
