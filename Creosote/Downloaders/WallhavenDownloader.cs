using Creosote.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
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

        public WallhavenDownloader(string apiKey, int width, int height, string category)
        {
            ApiKey = apiKey;
            Width = width;
            Height = height;
            Category = category;
            Url = $"https://wallhaven.cc/api/v1/search?apikey={ApiKey}&q={category}&atleast={width}x{height}&sorting=random`";
        }

        public async Task<List<Wallpaper>> Download()
        {
            List<Wallpaper> wallpapers = new();

            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(Url);

            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var urls = JsonSerializer.Deserialize<JsonDocument>(responseBody);
            JsonElement data = urls.RootElement.GetProperty("data");

            foreach (JsonElement wallpaperElement in data.EnumerateArray())
            {
                string path = wallpaperElement.GetProperty("path").ToString();
                wallpapers.Add(new Wallpaper() { Url = path });
            }

            return wallpapers;
        }
    }
}
