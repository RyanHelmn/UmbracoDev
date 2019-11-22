using System;
using System.Web.Configuration;
using UmbracoDev.Core.Enums;

namespace UmbracoDev.Core.Helpers
{
    public static class WebConfigHelper
    {
        private const string APP_SETTING_ERROR_MESSAGE = "Invalid or missing appSetting, ";

        public static string GetStringFromAppSetting(string appSettingName)
        {
            var setting = WebConfigurationManager.AppSettings[appSettingName] as string;
            if (String.IsNullOrEmpty(setting))
            {
                throw new Exception(APP_SETTING_ERROR_MESSAGE + appSettingName);
            }
            return setting;
        }

        public static double GetDoubleFromAppSetting(string appSettingName)
        {
            var setting = GetStringFromAppSetting(appSettingName);
            if (!double.TryParse(setting, out var value))
            {
                throw new Exception(APP_SETTING_ERROR_MESSAGE + appSettingName);
            }
            return value;
        }

        public static int GetIntFromAppSetting(string appSettingName)
        {
            var setting = GetStringFromAppSetting(appSettingName);
            if (!int.TryParse(setting, out var value))
            {
                throw new Exception(APP_SETTING_ERROR_MESSAGE + appSettingName);
            }
            return value;
        }

        /// <summary>
        /// Gets the current environment whethere it be Dev, Staging or Production based off of the web config app setting
        /// </summary>
        /// <returns></returns>
        public static CurrentEnvironment GetCurrentEnvironment()
        {
            switch (GetStringFromAppSetting("Environment"))
            {
                case "Dev":
                    return CurrentEnvironment.Dev;
                case "Staging":
                    return CurrentEnvironment.Staging;
                case "Production":
                    return CurrentEnvironment.Production;
                default:
                    return CurrentEnvironment.Dev;
            }
        }
    }
}
