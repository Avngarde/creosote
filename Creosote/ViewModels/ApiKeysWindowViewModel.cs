using CommunityToolkit.Mvvm.ComponentModel;

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


        public void LoadKeys()
        {
            var keys = new List<ApiKey>()
            {
                new ApiKey()
                {
                    Name = "Wallhaven",
                    Key = "abc1234"
                },

                new ApiKey()
                {
                    Name = "WallpaperWebsite",
                    Key = "supersecretdummytoken"
                }
            };

            _apiKeys = new ObservableCollection<ApiKey>(keys);
        }
    }
}
