using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgiBackEnd.Models;
using AgiBackEnd.Data;

namespace AgiBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly CompanyContext _context;
        private readonly IDataRepository<Company> _repo;

        public CompaniesController(CompanyContext context, IDataRepository<Company> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompany()
        {
            return await _context.Company.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _context.Company.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany([FromRoute] int id, [FromBody] Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                _repo.Update(company);
                var save = await _repo.SaveAsync(company);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Companies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany([FromBody] Company company)
        {
            _repo.Add(company);
            var save = await _repo.SaveAsync(company);

            return CreatedAtAction("GetCompany", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Company>> DeleteCompany([FromRoute] int id)
        {
            var company = await _context.Company.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _repo.Delete(company);
            var save = await _repo.SaveAsync(company);

            return company;
        }

        private bool CompanyExists(int id)
        {
            return _context.Company.Any(e => e.Id == id);
        }
    }
}
