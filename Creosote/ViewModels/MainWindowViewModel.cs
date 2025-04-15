using Avalonia;
using Avalonia.Controls;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Creosote.Downloaders;
using Creosote.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Creosote.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        [ObservableProperty] private int _width;
        [ObservableProperty] private int _height;
        [ObservableProperty] private List<Wallpaper> _wallpapers;


        public void SetDefaultWidthAndHeight(Screens screens) // Used only in MainWindow.axaml.cs
        {
            var primaryScreen = screens.All.Where(screen => screen.IsPrimary).Single();
            Width = primaryScreen.Bounds.Width;
            Height = primaryScreen.Bounds.Height;
        }

        [RelayCommand]
        public void EditApiKeys(Window currentWindow)
        {
            ApiKeysWindow apiKeysWindow = new ApiKeysWindow();
            var vm = new ApiKeysWindowViewModel();
            vm.LoadKeys();
            apiKeysWindow.DataContext = vm;
            apiKeysWindow.ShowDialog(currentWindow);
        }

        [RelayCommand]
        public async Task GetWallpapers()
        {
            ApiKey wallhavenKey = new KeysFileHandler().GetKey("Wallhaven");
            if (wallhavenKey != null)
            {
                var downloader = new WallhavenDownloader(wallhavenKey.Key, Width, Height, "Landscape"); //Test data for now
                var wallpapers = await downloader.Download();
                Wallpapers = wallpapers;
            }
        }
    }
}
