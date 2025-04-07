using Creosote.Models;
using System.Collections.Generic;

namespace Creosote.Downloaders
{
    interface IDownloader
    {
        string ApiKey { get; set; }
        string Url { get; set; }
        int Width { get; set; }
        int Height { get; set; }
        string Category { get; set; }
        List<Wallpaper> Download();
    }
}
