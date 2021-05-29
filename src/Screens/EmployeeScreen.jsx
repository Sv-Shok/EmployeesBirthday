import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBirthdayList } from '../actions/birthdayActions';

const EmployeeScreen = (props) => {
  const {
    employee: { firstName, lastName, active, notActive, id },
    letter,
  } = props;
  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(addToBirthdayList(letter, id));
  };
  return (
    <>
      <div>
        <p style={active ? { color: 'blue' } : { color: 'inherit' }}>
          <span style={{ fontWeight: 'bold' }}>
            {lastName} {firstName}
          </span>
        </p>
        <div>
          <p>
            <span>
              <label>
                not active{' '}
                <input
                  type='radio'
                  name={id}
                  checked={notActive}
                  onChange={handleCheck}
                />
              </label>
            </span>
          </p>
          <p>
            <span>
              <label>
                active{' '}
                <input
                  type='radio'
                  name={id}
                  checked={active}
                  onChange={handleCheck}
                />
              </label>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default EmployeeScreen;
