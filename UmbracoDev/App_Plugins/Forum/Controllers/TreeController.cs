using System;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using Umbraco.Core;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;
using UmbracoDev.App_Plugins.Forum.Controllers.Tree;

namespace UmbracoDev.App_Plugins.Forum.Controllers
{
    [Tree(ForumConstants.Section, ForumConstants.Alias, TreeTitle = ForumConstants.Title,
        TreeGroup = ForumConstants.Group, SortOrder = 5)]
    [PluginController("Forum")]
    public class TreeController : Umbraco.Web.Trees.TreeController
    {
        protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings)
        {
            if (id != Constants.System.Root.ToInvariantString()) throw new NotSupportedException();

            var menuItems = new List<TreeMenuItem>
            {
                new TreeMenuItem {Title = "Categories", Icon = "icon-categories", ParentId = -1, View = "overview"}
            };

            var nodes = new TreeNodeCollection();
            foreach (var menuItem in menuItems)
            {
                var menuItemId = menuItems.IndexOf(menuItem).ToString();
                var node = CreateTreeNode(menuItemId, menuItem.ParentId.ToString(),
                    queryStrings, menuItem.Title, menuItem.Icon, false);
                node.RoutePath =
                    $"{ForumConstants.Section}/{ForumConstants.Alias}/{menuItem.View}/{menuItem.Title}";
                nodes.Add(node);
            }

            return nodes;
        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings)
        {
            var menu = new MenuItemCollection();

            if (id != Constants.System.Root.ToInvariantString()) return menu;

            menu.Items.Add(new CreateChildEntity(Services.TextService));
            menu.Items.Add(new RefreshNode(Services.TextService, true));

            return menu;
        }

        protected override TreeNode CreateRootNode(FormDataCollection queryStrings)
        {
            var root = base.CreateRootNode(queryStrings);
            root.HasChildren = true;
            root.MenuUrl = null;

            return root;
        }
    }
}