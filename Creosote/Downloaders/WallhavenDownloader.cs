using Creosote.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Creosote.Downloaders
{
    public class WallhavenDownloader : IDownloader
    {
        public string ApiKey { get; set; }
        public string Url { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Category { get; set; }

        public WallhavenDownloader(string apiKey, string url, int width, int height, string category)
        {
            ApiKey = apiKey;
            Url = url;
            Width = width;
            Height = height;
            Category = category;
            Url = $"https://wallhaven.cc/api/v1/search?apikey={ApiKey}&q={category}&atleast={width}x{height}&sorting=random`";
        }

        List<Wallpaper> IDownloader.Download()
        {
            return new();
        }
    }
}
