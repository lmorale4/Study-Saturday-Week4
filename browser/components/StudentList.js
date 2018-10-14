import React from 'react';
import { connect } from 'react-redux';
import { setSelectedStudent } from '../store';

const StudentList = props => {
  const { students, selectStudent } = props;
  return (
    <tbody>
      {students.map(student => (
        <tr key={student.id}>
          <td>{student.fullName}</td>
          <td onClick={() => selectStudent(student)}>Details</td>
        </tr>
      ))}
    </tbody>
  );
};

const mapStateToProps = ({ students }) => ({ students });

const mapDispatchToProps = dispatch => ({
  selectStudent: student => dispatch(setSelectedStudent(student)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList);
