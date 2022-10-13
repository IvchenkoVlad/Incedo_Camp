package com.incedo.dao;

import java.util.List;

import com.incedo.model.Employee;

public interface EmployeeDao {
	void insertEmployee(Employee cus);
	List<Employee> getAllEmployees();
	Employee getEmployeeById(String empId);
	void deleteEmployeeById(String id);
	void updateEmployee(Employee empl);
}
