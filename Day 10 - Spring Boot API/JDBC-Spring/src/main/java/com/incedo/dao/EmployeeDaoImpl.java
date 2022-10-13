package com.incedo.dao;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import com.incedo.model.Employee;

@Repository
public class EmployeeDaoImpl extends JdbcDaoSupport implements EmployeeDao {
	@Autowired 
	DataSource dataSource;
	
	@PostConstruct
	private void initialize(){
		setDataSource(dataSource);
	}
	
	@Override
	public void insertEmployee(Employee emp) {
		String sql = "INSERT INTO employee " +
				"(id, firstName, lastName, email, position) VALUES (?, ?, ?, ?, ?)" ;
		getJdbcTemplate().update(sql, new Object[]{
				emp.getId(), emp.getFirstName(), emp.getLastName(), emp.getEmail(), emp.getPosition()
		});
	}
	
//	@Override
//	public void insertEmployees(List<Employee> employees) {
//		String sql = "INSERT INTO employee " + "(empId, empName) VALUES (?, ?)";
//		getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
//			public void setValues(PreparedStatement ps, int i) throws SQLException {
//				Employee employee = employees.get(i);
//				ps.setString(1, employee.getEmpId());
//				ps.setString(2, employee.getEmpName());
//			}
//			
//			public int getBatchSize() {
//				return employees.size();
//			}
//		});
//	}
	@Override
	public List<Employee> getAllEmployees(){
		String sql = "SELECT * FROM employee";
		List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);
		
		List<Employee> result = new ArrayList<Employee>();
		for(Map<String, Object> row:rows){
			Employee emp = new Employee();
			emp.setId((Integer)row.get("id"));
			emp.setFirstName((String)row.get("firstName"));
			emp.setLastName((String)row.get("lastName"));
			emp.setEmail((String)row.get("email"));
			emp.setPosition((String)row.get("position"));
			result.add(emp);
		}
		
		return result;
	}
	@Override
	public Employee getEmployeeById(String empId) {
		String sql = "SELECT * FROM employee WHERE id = ?";
		return (Employee)getJdbcTemplate().queryForObject(sql, new Object[]{empId}, new RowMapper<Employee>(){
			@Override
			public Employee mapRow(ResultSet rs, int rwNumber) throws SQLException {
				Employee emp = new Employee();
				emp.setId(Integer.parseInt(rs.getString("id")));
				emp.setFirstName(rs.getString("firstName"));
				emp.setLastName(rs.getString("lastName"));
				emp.setEmail(rs.getString("email"));
				emp.setPosition(rs.getString("position"));
				return emp;
			}
		});
	}

	@Override
	public void deleteEmployeeById(String id) {
		String sql = "DELETE FROM employee WHERE id = ?";
		getJdbcTemplate().update(sql, new Object[]{id});
		
		
	}

	@Override
	public void updateEmployee(Employee empl) {
		String sql = "UPDATE employee SET ? WHERE id=?" ;
		getJdbcTemplate().update(sql, new Object[]{empl, empl.getId()});
		
	}
}
