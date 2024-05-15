using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace crud_app.Data
{
  public class EmployeeRepository
  {
    private readonly AppDbContext _appDbContext;

    public EmployeeRepository(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public async Task AddEmployeeAsync(Employee employee)
    {
      await _appDbContext.Set<Employee>().AddAsync(employee);
      await _appDbContext.SaveChangesAsync();


    }
    public async Task<List<Employee>> GetAllEmployeesAsync() 
    {
      
      return await _appDbContext.Employees.ToListAsync();


    }
    public async Task<Employee> GetEmployeeByIdAsync(int id)
    {
      return await _appDbContext.Employees.FindAsync(id);
    }
    public async Task UpdateEmployeeAsync(int id, Employee model)
    {

      var employeee = await _appDbContext.Employees.FindAsync(id);
      if (employeee == null)
      {
        throw new Exception("Employee not found sorry;)");
      }
      employeee.Email = model.Email;

      employeee.Name = model.Name;

      employeee.Phone = model.Phone;
      employeee.Age = model.Age;
      employeee.Salary = model.Salary;
      await _appDbContext.SaveChangesAsync(); 
    }
    public async Task DeleteEmployeeAsync(int id)
    {
      var employeee = await _appDbContext.Employees.FindAsync(id);
      if (employeee == null)
      {
        throw new Exception("Employee not found");
      }
      _appDbContext.Employees.Remove(employeee);
      await _appDbContext.SaveChangesAsync();
    }
  }

}

