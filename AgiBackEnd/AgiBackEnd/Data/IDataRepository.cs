using AgiBackEnd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgiBackEnd.Data
{
    public interface IDataRepository<T> where T : class, IEntity
    {
        Task<List<T>> GetAll();
        Task<T> Get(int id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> SaveAsync(T entity);
    }
}
