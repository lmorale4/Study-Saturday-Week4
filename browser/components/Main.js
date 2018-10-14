import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchStudents } from '../store';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudent: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  handleClick(e) {
    return this.setState(prevState => ({
      showStudent: !prevState.showStudent,
    }));
  }

  render() {
    const { selectedStudent } = this.props;
    return (
      <div>
        <h1>Students</h1>
        <button type="button" onClick={this.handleClick}>
          Add Student
        </button>
        {this.state.showStudent ? <NewStudentForm /> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList />
        </table>
        {selectedStudent.id ? <SingleStudent /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedStudent }) => ({ selectedStudent });

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
