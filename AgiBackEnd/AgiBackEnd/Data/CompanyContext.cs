using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AgiBackEnd.Models
{
    public class CompanyContext : DbContext
    {
        public CompanyContext (DbContextOptions<CompanyContext> options)
            : base(options)
        {
        }

        public DbSet<AgiBackEnd.Models.Company> Company { get; set; }
    }
}
