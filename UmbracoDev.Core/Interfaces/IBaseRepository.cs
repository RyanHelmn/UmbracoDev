using System.Collections.Generic;

namespace UmbracoDev.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        T Add(T entity);
        //bool Update(T entity);
        T Get(int id);
        List<T> GetAll();
        bool Delete(int id);
    }
}
