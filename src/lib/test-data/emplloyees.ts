import { faker } from '@faker-js/faker';

export interface Department {
	name: string;
	code: string;
}

export interface Employee {
	employeeId: string;
	firstname: string;
	surname: string;
	date: Date;
	rating: number;
	department: Department;
}

// Pre generating 1000 sample employees
const sampleEmployees: Employee[] = Array.from({ length: 1000 }, (_, i) => ({
	employeeId: i.toString().padStart(5, '0'),
	firstname: faker.person.firstName(),
	surname: faker.person.lastName(),
	date: faker.date.anytime(),
	rating: faker.number.int(5),

	department: {
		name: faker.commerce.department(),
		code: faker.string.alphanumeric(2)
	}
}));

// A sample call to fake the slowness of an API call with a simple timeout
export const getLotsOfEmployeesAsync = async (): Promise<Employee[]> => {
	return new Promise<Employee[]>((resolve, reject) => {
		setTimeout(() => {
			resolve(sampleEmployees);
		}, 500);
	});
};

export const getEmployeeAsync = (employeeId: string): Promise<Employee> => {
	return new Promise<Employee>((resolve, reject) => {
		setTimeout(() => {
			const employee = sampleEmployees.find((e) => e.employeeId == employeeId);

			employee ? resolve(employee) : reject('Employee not found');
		}, 500);
	});
};
