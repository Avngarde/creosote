using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

using Creosote.Models;

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Creosote.ViewModels
{
    public partial class ApiKeysWindowViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<ApiKey> _apiKeys;

        private KeysFileHandler keysFileHandler = new();


        public void LoadKeys()
        {
            List<ApiKey> keys = keysFileHandler.ReadKeys();
            ApiKeys = new ObservableCollection<ApiKey>(keys);
        }

        [RelayCommand]
        public void UpdateKeys()
        {
            keysFileHandler.WriteKeys(ApiKeys.ToList());
        }
    }
}
