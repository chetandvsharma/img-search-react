import React from 'react';

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '' };
  }

  render() {
    return (
      <div className='ui segment'>
        <form className='ui form'>
          <div className='field'>
            <label>Enter Password</label>
            <input
              type='password'
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ password: e.target.value });
              }}
            ></input>
          </div>
          {this.state.password.length < 4
            ? 'Password must be 4 characters'
            : ''}
        </form>
      </div>
    );
  }
}

export default Validator;
