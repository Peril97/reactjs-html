import React, { Component } from "react";
import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { deleteAnRSS } from "../../firebase/db";
import { addAnRSS } from "../../firebase/db";
import { updateAnRSS } from "../../firebase/db";
import Popup from "reactjs-popup";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


require('bootstrap/dist/css/bootstrap.css');

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

class RSS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: [],
      url: [],
      rss: []
    };
  }

  componentDidMount() {
    db.onceGetRSS().then(snapshot =>
      this.setState(() => ({ rss: snapshot.val() }))
    );
  }

  render() {
    const { rss } = this.state;
    const { description } = this.state;
    const { url } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <input value={description}
          onChange={event => this.setState(updateByPropertyName('description', event.target.value))}
          type="text"
          placeholder="Description"
        />
        <input value={url}
          onChange={event => this.setState(updateByPropertyName('url', event.target.value))}
          type="text"
          placeholder="URL"
        />
        <button onClick={() => addRSS(description, url)}>Add Content</button>
        {<RSSList rss={rss} />}
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
        onClick: () => deleteAnRSS(key)
      },
      {
        label: 'No',
        onClick: () => console.log("clicked no")
      }
    ]
  })
};
function addRSS(description, url) {
  addAnRSS(description, url);
}
function deleteRSS(key) {
  submitDelete(key);
  console.log("delete normal first");
}
function updateRSS(key, description, url) {
  console.log(key);
  console.log(description);
  console.log(url);
  updateAnRSS(key, description, url);
}
class RSSList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: '',
      desc: '',
    };

  }

  render() {
    const { rss } = this.props;
    const { desc } = this.state;
    const { URL } = this.state;
    return (
      <div>
        <h2>List of RSS available:</h2>
        {Object.keys(rss).map((key, index) =>

          <div>
            {index + 1}.
        <a href={rss[key].url} key={key}> {rss[key].description}  </a>
            <img src="http://www.stilltimecollection.co.uk/images/english/b_delete.gif" onClick={() => deleteRSS(key)} />

            <Popup trigger={<img src="https://www.faktorzehn.org/de/wp-content/uploads/sites/2/2015/03/f10-org-new_3_6_0-edit.gif" />
            } position="right center">
              <div>
                <input value={desc}
                  onChange={event => this.setState(updateByPropertyName('desc', event.target.value))}
                  type="text"
                  placeholder="Descripton..."
                />
                <input value={URL}
                  onChange={event => this.setState(updateByPropertyName('URL', event.target.value))}
                  type="text"
                  placeholder="URL..."
                />
                <button onClick={() => updateRSS(key, desc, URL)}>Update Content</button>

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

export default withAuthorization(authCondition)(RSS);
