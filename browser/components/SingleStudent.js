import React from 'react';
import { connect } from 'react-redux';

const avgGrade = tests => {
  return Math.round(
    tests.map(test => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

const SingleStudent = props => {
  const { student } = props;
  return (
    <div>
      <h3>{student.fullName}</h3>
      <h3>Average grade: {avgGrade(student.tests)}%</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {student.tests.map(test => {
              return (
                <tr key={test.id}>
                  <td>{test.subject}</td>
                  <td>{test.grade}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ selectedStudent }) => ({ student: selectedStudent });

export default connect(mapStateToProps)(SingleStudent);
