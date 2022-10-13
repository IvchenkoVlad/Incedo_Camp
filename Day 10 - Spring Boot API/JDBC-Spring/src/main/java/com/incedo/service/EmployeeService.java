package com.incedo.service;

import java.util.List;

import com.incedo.model.Employee;


public interface EmployeeService {
	void insertEmployee(Employee emp);
	void getAllEmployees();
	void getEmployeeById(String empid);
	void deleteById(String id);
	void updateById(Employee empl);
}
