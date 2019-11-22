using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Web.Composing;
using UmbracoDev.Core.Entities;
using UmbracoDev.Core.Interfaces;

namespace UmbracoDev.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity, new ()
    {
        public virtual T Add(T entity)
        {
            using (var scope = Current.ScopeProvider.CreateScope())
            {
                var database = scope.Database;
                return database.Insert(entity) as T;
            }
        }

        public virtual T Get(int id)
        {
            using (var scope = Current.ScopeProvider.CreateScope())
            {
                var database = scope.Database;
                return database.Fetch<T>().FirstOrDefault(x => x.Id == id);
            }
        }

        public virtual List<T> GetAll()
        {
            using (var scope = Current.ScopeProvider.CreateScope())
            {
                var database = scope.Database;
                return database.Fetch<T>();
            }
        }

        public virtual bool Delete(int id)
        {
            try
            {
                using (var scope = Current.ScopeProvider.CreateScope())
                {
                    var database = scope.Database;
                    database.Delete<T>(id);
                }

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
