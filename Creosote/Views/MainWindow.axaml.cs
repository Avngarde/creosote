using Avalonia.Controls;
using Avalonia.Interactivity;

using Creosote.ViewModels;

namespace Creosote.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    protected override void OnLoaded(RoutedEventArgs e)
    {
        var vm = DataContext as MainWindowViewModel;
        if (vm != null)
            vm.SetDefaultWidthAndHeight(Screens);
    }
}