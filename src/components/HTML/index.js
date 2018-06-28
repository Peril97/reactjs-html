import React, { Component } from "react";
import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { deleteAnHTML } from "../../firebase/db";
import { addAnHTML } from "../../firebase/db";
import { updateAnHTML } from "../../firebase/db";
import Popup from "reactjs-popup";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
require('bootstrap/dist/css/bootstrap.css');

class HTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: [],
      description: "",
      body: ""
    };
  }
componentDidMount() {
    db.onceGetHTML().then(snapshot =>
        this.setState({ html: snapshot.val()})
    );
  }

  addContent(description, body) {
   
    this.setState({
      html: [
        ...this.state.html,
        {
          description: this.state.description,
          body: this.state.body
        }
      ]
      
    });
    addAnHTML(this.state.description,this.state.body);
  }

  updateByPropertyName(property, e) {
    this.setState({
      [property]: e.target.value
    });
  }
  render() {
    const { html } = this.state;
    const { description } = this.state;
    const { body } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <input
          value={description}
          onChange={this.updateByPropertyName.bind(this, "description")}
          type="text"
          placeholder="Description..."
        />
        <input
          value={body}
          onChange={this.updateByPropertyName.bind(this, "body")}
          type="text"
          placeholder="Body..."
        />
        <button onClick={this.addContent.bind(this)}>Add Content</button>
        {!!html && <HTMLList html={html} />}
      </div>
    );
  }
}

function submitDelete(key) {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => deleteAnHTML(key)
      },
      {
        label: 'No',
        onClick: () => console.log("clicked no")
      }
    ]
  })
};
function deleteHTML(key) {
  submitDelete(key);
  console.log("delete normal first");
}
function updateHTML(key, description, body) {
  console.log(key);
  console.log(description);
  updateAnHTML(key, description, body);
}
class HTMLList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      BODY: '',
      desc: '',
      html: '',
    };
  }
  updateByPropertyName(property, e) {
    this.setState({
      [property]: e.target.value
    });
  }
  render() {
    const { html } = this.props;
    const { desc } = this.state;
    const { BODY } = this.state;

    return (
      <div>

        <h2>List of HTML available:</h2>
        {Object.keys(html).map((key, index) =>

          <div key={index}>
            {index + 1}.
            {html[key].description}
            <img src="http://www.stilltimecollection.co.uk/images/english/b_delete.gif" onClick={() => deleteHTML(key)} />

            <Popup trigger={<img src="https://www.faktorzehn.org/de/wp-content/uploads/sites/2/2015/03/f10-org-new_3_6_0-edit.gif" />
            } position="right center">
              <div>
                <input value={desc}
                  onChange={this.updateByPropertyName.bind(this, "desc")}
                  type="text"
                  placeholder="Descripton.."
                />
                <input value={BODY}
                  onChange={this.updateByPropertyName.bind(this, "BODY")}
                  type="text"
                  placeholder="Body..."
                />
                <button onClick={() => updateHTML(key, desc, BODY)}>Update Content</button>
              </div>
            </Popup>
            <br></br>
          </div>
        )}
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HTML);
