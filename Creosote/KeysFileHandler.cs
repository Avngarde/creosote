using System.Collections.Generic;
using System.Text.Json;
using Creosote.Models;
using System.IO;

namespace Creosote
{
    public class KeysFileHandler
    {
        private const string filePath = "./creosotekeys.json";

        public KeysFileHandler()
        {
            InitFileIfDoesNotExist();
        }

        private void InitFileIfDoesNotExist()
        {
            if (!File.Exists(filePath))
            {
                InitKeys();
            }
        }

        private void InitKeys()
        {
            List<ApiKey> defaultKeys = new List<ApiKey>()
            {
                new ApiKey()
                {
                    Name = "Wallhaven",
                    Key = "",
                }
            };

            string keysSerialized = JsonSerializer.Serialize(defaultKeys);
            File.WriteAllText(filePath, keysSerialized);
        }

        public List<ApiKey> ReadKeys()
        {
            string serializedKeys = File.ReadAllText(filePath);
            List<ApiKey>? keys = JsonSerializer.Deserialize<List<ApiKey>>(serializedKeys);
            if (keys != null)
            {
                return keys;
            }
            else
            {
                return new List<ApiKey>();
            }
        }

        public void WriteKeys(List<ApiKey> keys)
        {
            string serializedKeys = JsonSerializer.Serialize(keys);
            File.WriteAllText(filePath, serializedKeys);
        }
    }
}
