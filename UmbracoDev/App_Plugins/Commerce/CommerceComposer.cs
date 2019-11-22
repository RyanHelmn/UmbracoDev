using System;
using Umbraco.Core;
using Umbraco.Core.Composing;

namespace UmbracoDev.App_Plugins.Commerce
{
    public class CommerceComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.Components().Append<CommerceServerVariableParserComponent>();
        }
    }
}