using Creosote.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Creosote.Downloaders
{
    interface IDownloader
    {
        string ApiKey { get; set; }
        string Url { get; set; }
        int Width { get; set; }
        int Height { get; set; }
        string Category { get; set; }
        Task<List<Wallpaper>> Download();
    }
}
