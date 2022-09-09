import {
  returnAllDepartments,
  returnAllEmployees,
} from "../mockTablesDatabase/mockServer";

export async function getAllEmployees() {
  try {
    const allEmployees = await returnAllEmployees();

    console.log("all of my emplooyes:", allEmployees);

    return { error: false, data: allEmployees };
  } catch (e) {
    return { error: true, message: "Could not get employees" };
  }
}

export async function getAllDepartments() {
  try {
    const allDepatments = await returnAllDepartments();

    console.log("all of my depatments:", allDepatments);

    return { error: false, data: allDepatments };
  } catch (e) {
    return { error: true, message: "Could not get depatments" };
  }
}
