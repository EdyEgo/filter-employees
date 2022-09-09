import departments from "./departamentsTable.json" assert { type: "json" };
import employees from "./employeesTable.json" assert { type: "json" };
import RandomNumber from "../generalHelperFunctions/returnRandomNumberInSelectedRange";

function resolveRequestAfterRandomTime(requestData: any) {
  return new Promise((resolve, reject) => {
    // create a delay time
    const RANDOM_DELAY_TIME = RandomNumber(100, 3000);

    setTimeout(() => {
      // return requestData data after a random delay
      resolve(requestData);
    }, RANDOM_DELAY_TIME);
  });
}

export function returnAllEmployees() {
  return resolveRequestAfterRandomTime(employees);
}

export function returnAllDepartments() {
  return resolveRequestAfterRandomTime(departments);
}
