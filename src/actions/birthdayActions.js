import {
  EMPLOYEE_ADD,
  EMPLOYEE_REMOVE,
  UPDATE_EMPLOYEES_CHECK_BOX,
} from '../constants/employeesConstants';

const addToBirthdayList = (letter, id) => (dispatch, getState) => {
  const state = getState();
  const [newState, employeeData] = updateEmployees(
    state.employeesList.employees,
    letter,
    id
  );

  dispatch({ type: UPDATE_EMPLOYEES_CHECK_BOX, payload: newState });
  localStorage.setItem('employees', JSON.stringify(newState));

  let month = employeeData.dob.split(' ')[1].slice(0, -1);

  if (employeeData.active) {
    let newState = JSON.parse(
      JSON.stringify(state.birthdayList.employeesBirthday)
    );

    let sortedDataByMonth = sortedByMonth(employeeData, newState, month);

    let sortedEmployeesByName = sortedByLastName(month, sortedDataByMonth);

    dispatch({ type: EMPLOYEE_ADD, payload: sortedEmployeesByName });
    localStorage.setItem(
      'employeesBirthday',
      JSON.stringify(sortedEmployeesByName)
    );
  } else {
    let newStateBirthday = JSON.parse(
      JSON.stringify(state.birthdayList.employeesBirthday)
    );
    newStateBirthday.forEach((item) => {
      if (item[0] === month) {
        if (item[1].length === 1) {
          item[1] = [];
        } else {
          for (let i = 0; i <= item[1].length; i++) {
            if (item[1][i].id === employeeData.id) {
              item[1].splice(i, 1);
              break;
            }
          }
        }
      }
    });
    dispatch({ type: EMPLOYEE_REMOVE, payload: newStateBirthday });
    localStorage.setItem('employeesBirthday', JSON.stringify(newStateBirthday));
  }
};

const updateEmployees = (arrEmployees, letter, id) => {
  let employeeData;
  let newArrEmployees = JSON.parse(JSON.stringify(arrEmployees));
  let arrEmployeesByLetter = newArrEmployees.find((item) => item[0] === letter);
  arrEmployeesByLetter[1].forEach((item) => {
    if (item.id === id) {
      item.active = !item.active;
      item.notActive = !item.notActive;
      employeeData = item;
    }
  });
  return [newArrEmployees, employeeData];
};

const sortedByLastName = (month, data) => {
  for (let item of data) {
    if (item[1].length > 1 && month === item[0]) {
      item[1].sort((a, b) =>
        a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
      );
    }
  }
  return data;
};

const sortedByMonth = (dataEmployee, state, month) => {
  if (state.length) {
    return state.map((item) => {
      if (item[0] === month) {
        item[1].push(dataEmployee);
      }
      return item;
    });
  } else {
    const dataBirthday = {
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
      January: [],
      February: [],
      March: [],
      April: [],
    };

    dataBirthday[month].push(dataEmployee);
    const arrBirthdayEnployees = [];
    let map = new Map(Object.entries(dataBirthday));
    for (let item of map) {
      arrBirthdayEnployees.push(item);
    }
    return arrBirthdayEnployees;
  }
};

export { addToBirthdayList };
