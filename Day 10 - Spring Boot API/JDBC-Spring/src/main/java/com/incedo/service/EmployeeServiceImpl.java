package com.incedo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.incedo.dao.EmployeeDao;
import com.incedo.model.Employee;
import com.incedo.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	EmployeeDao employeeDao;
	@Override
	public void insertEmployee(Employee employee) {
		employeeDao.insertEmployee(employee);
	}
	public void getAllEmployees() {
		List<Employee> employees = employeeDao.getAllEmployees();
		for (Employee employee : employees) {
			System.out.println(employee.toString());
		}
	}
	@Override
	public void getEmployeeById(String empId) {
		Employee employee = employeeDao.getEmployeeById(empId);
		System.out.println(employee);
	}
	@Override
	public void deleteById(String id) {
		employeeDao.deleteEmployeeById(id);
		
	}
	@Override
	public void updateById(Employee empl) {
		employeeDao.updateEmployee(empl);
		
	}
}
