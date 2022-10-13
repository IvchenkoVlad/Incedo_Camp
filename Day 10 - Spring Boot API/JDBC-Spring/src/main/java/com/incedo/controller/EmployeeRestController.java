package com.incedo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.incedo.dao.EmployeeDao;
import com.incedo.model.Employee;

@RestController
public class EmployeeRestController {
	
	@Autowired
	private EmployeeDao employeeDao;
	
	@GetMapping("/employees")
	public List getCustomers() {
		return employeeDao.getAllEmployees();
	}
	@GetMapping("/employees/{id}")
	public Employee getCustomerById(@PathVariable String id) {
		return employeeDao.getEmployeeById(id);
	}
	
	@PostMapping("/employees/add")
	public void addEmployee(@RequestBody Employee eployee) {
		employeeDao.insertEmployee(eployee);
	}
	
	@DeleteMapping("/employee/delete/{id}")
	public void deleteEmployee(@PathVariable String id) {
		employeeDao.deleteEmployeeById(id);
	}
	
	@PutMapping("/employee/update")
	public void updateEmployee(@RequestBody Employee employee) {
		employeeDao.updateEmployee(employee);
	}
	

}
