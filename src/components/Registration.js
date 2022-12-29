import React from 'react';
import AES from 'crypto-js/aes';
import axios from 'axios';
import {
  MongoID,
  createRandomKeyFromId,
  createInductionVector,
} from '../helpers/encryption';

export default class Registraion extends React.Component {
  state = {
    mobile: '98765432',
    firstName: 'rafiq',
    lastName: 'kallan',
    age: '26',
    email: 'rustom@mail.com',
    homeAddress: 'berchha',
    districtId: '6380a03e87eecc2459341907',
    regionId: '63809d1d667ec6a523a72a46',
    wardId: '6380a03e87eecc245934190a',
    streetName: 'tanki choraha, shajapur',
    universityId: '63809d4d31917ed0e8e95122',
    pin: '1234',
    regionValue: [],
    districtValue: [],
    universityValue: [],
    wardValue: [],
    userDetails: {},
  };

  onFormSubmit(event) {
    event.preventDefault();
  }

  submitForm = () => {
    const detail = {
      mobile: this.state.mobile,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      email: this.state.email,
      homeAddress: this.state.homeAddress,
      regionId: this.state.regionId,
      districtId: this.state.districtId,
      wardId: this.state.wardId,
      streetNamw: this.state.streetName,
      universityId: this.state.universityId,
      pin: this.state.pin,
    };

    const newId = MongoID.createMongoID().toString();
    const key = createRandomKeyFromId(newId);
    const iv = createInductionVector(key);

    const cipher = AES.encrypt(JSON.stringify(detail), key, {
      iv,
    });

    axios
      .post('http://192.168.1.134:8002/api/test/encrypt-json', {
        data: cipher.toString(),
        key: key,
      })
      .then((response) => {
        console.log(response.data.decrypted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setDistrict = (e) => {
    this.setState({ districtId: e.target.value });
    fetch(`http://192.168.1.161:8002/api/static/ward/${e.target.value}`)
      .then((res) => res.json())
      .then((wardJson) => {
        this.setState({ wardValue: wardJson.data });
      });
  };

  componentDidMount() {
    fetch('http://192.168.1.161:8002/api/static/region')
      .then((res) => res.json())
      .then((regionJson) => {
        this.setState({ regionValue: regionJson.data });
      });

    fetch('http://192.168.1.161:8002/api/static/district')
      .then((res) => res.json())
      .then((districtJson) => {
        this.setState({ districtValue: districtJson.data });
      });

    fetch('http://192.168.1.161:8002/api/static/university')
      .then((res) => res.json())
      .then((universityJson) => {
        this.setState({ universityValue: universityJson.data });
      });
  }

  render() {
    let regions = this.state.regionValue.map((ele, i) => {
      return (
        <option key={i} value={ele._id}>
          {ele.name}
        </option>
      );
    }, this);

    let districts = this.state.districtValue.map((ele, i) => {
      return (
        <option key={i} value={ele._id}>
          {ele.name}
        </option>
      );
    }, this);

    let universities = this.state.universityValue.map((ele, i) => {
      return (
        <option key={i} value={ele._id}>
          {ele.name}
        </option>
      );
    });

    let wards = this.state.wardValue.map((ele, i) => {
      return (
        <option key={i} value={ele._id}>
          {ele.name}
        </option>
      );
    });

    return (
      <div className='ui segment'>
        <form onSubmit={this.onFormSubmit} className='ui form'>
          <label>mobile no.</label>
          <input
            type='text'
            name='mobile'
            value={this.state.mobile}
            onChange={(e) => this.setState({ mobile: e.target.value })}
          />
          <label>First name</label>
          <input
            type='text'
            name='firstName'
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <label>Last name</label>
          <input
            type='text'
            name='lastName'
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <label>Age</label>
          <input
            type='text'
            name='age'
            value={this.state.age}
            onChange={(e) => this.setState({ age: e.target.value })}
          />
          <label>Email</label>
          <input
            type='text'
            name='email'
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label>Your home address</label>
          <input
            type='text'
            name='homeAdd'
            value={this.state.homeAddress}
            onChange={(e) => this.setState({ homeAddress: e.target.value })}
          />

          <label>Street name</label>
          <input
            type='text'
            name='streetName'
            value={this.state.streetName}
            onChange={(e) => this.setState({ streetName: e.target.value })}
          />

          <label>Region name</label>
          <select onChange={(e) => this.setState({ regionId: e.target.value })}>
            {regions}
          </select>

          <label>District name</label>
          <select
            value={this.state.districtId}
            onChange={(e) => this.setDistrict(e)}
          >
            {districts}
          </select>

          <label>Ward name</label>
          <select
            value={this.state.wardId}
            onChange={(e) => this.setState({ wardId: e.target.value })}
          >
            {wards}
          </select>

          <label>University name</label>
          <select
            value={this.state.universityId}
            onChange={(e) => this.setState({ universityId: e.target.value })}
          >
            {universities}
          </select>

          <label>Enter pin</label>
          <input
            type='text'
            name='pin'
            value={this.state.pin}
            onChange={(e) => this.setState({ pin: e.target.value })}
          />
          <br />
          <br />

          <button onClick={this.submitForm}>Sign up</button>
        </form>
      </div>
    );
  }
}
