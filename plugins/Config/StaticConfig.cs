namespace MusicBeePlugin.Config
{
    class StaticConfig : ConfigInterface
    {
        public string GetWebSocketPath()
        {
            return "ws://localhost:13337";
            // return "ws://mb.isaacskelton.com";
        }

        public string PlaylistName()
        {
            return "Main";
        }
    }
}
