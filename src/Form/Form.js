import React, { useCallback } from 'react';
import { useStoredState, useAction } from '../redux-hooks'
import { getFormState, update } from './reducers';
import { submit } from './thunks';


export default function Form() {
  const { firstName, lastName, consentFlag, submitted } = useStoredState(getFormState);

  const updateFirstName = useAction(
    ({ target }) => update({ firstName: target.value }),
    [] // no deps
  );

  const updateLastName = useAction(
    ({ target }) => update({ lastName: target.value }),
    [] // no deps
  );

  const updateConsentFlag = useAction(
    ({ target }) => update({ consentFlag: target.checked }),
    [] // no deps
  );
  
  const markSubmitted = useAction(submit);

  const submitForm = useCallback(
    event => {
      event.preventDefault();
      markSubmitted();
    },
    [firstName, lastName]
  )

  return (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          aria-describedby="emailHelp"
          placeholder="First Name"
          value={firstName}
          onChange={updateFirstName}
        />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={updateLastName}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="consentFlag"
          value={consentFlag}
          onChange={updateConsentFlag}
        />
        <label className="form-check-label" htmlFor="consentFlag">Check me out</label>
      </div>
      {submitted 
        ? <span>Submitted.</span>
        : <button type="submit" className="btn btn-primary" disabled={!consentFlag}>Submit</button>
      }
        
    </form>
  );
}