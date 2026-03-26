package com.poc.employee.config;

import com.poc.employee.model.Employee;
import com.poc.employee.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(EmployeeRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Employee(null, "Rahul", "Sharma", "rahul.sharma@company.com", "Engineering", "Senior Developer", "ACTIVE", 1200000L));
                repository.save(new Employee(null, "Priya", "Verma", "priya.verma@company.com", "Design", "UI/UX Designer", "ACTIVE", 900000L));
                repository.save(new Employee(null, "Amit", "Patel", "amit.patel@company.com", "Engineering", "DevOps Engineer", "ACTIVE", 1100000L));
                repository.save(new Employee(null, "Sneha", "Gupta", "sneha.gupta@company.com", "Marketing", "Marketing Manager", "ACTIVE", 850000L));
                repository.save(new Employee(null, "Rohan", "Singh", "rohan.singh@company.com", "Engineering", "Backend Developer", "INACTIVE", 950000L));
                repository.save(new Employee(null, "Neha", "Joshi", "neha.joshi@company.com", "HR", "HR Manager", "ACTIVE", 800000L));
                System.out.println("✅ Seeded 6 demo employees");
            }
        };
    }
}
