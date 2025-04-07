using Avalonia.Controls;
using CommunityToolkit.Mvvm.ComponentModel;

using System.Linq;

namespace Creosote.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        [ObservableProperty] private int _width;
        [ObservableProperty] private int _height;


        public void SetDefaultWidthAndHeight(Screens screens) // Used only in MainWindow.axaml.cs
        {
            var primaryScreen = screens.All.Where(screen => screen.IsPrimary).Single();
            Width = primaryScreen.Bounds.Width;
            Height = primaryScreen.Bounds.Height;
        }
    }
}
