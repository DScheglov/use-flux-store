const UPDATE = 'FORM::UPDATE';

export const update = payload => ({ type: UPDATE, payload });

const initialState = {
  firstName: '',
  lastName: '',
  consentFlag: false,
  submitted: false,
};

const form = (state = initialState, { type, payload }) => (
  type === UPDATE ? { ...state, ...payload } : state
);

export default form;

export const getFormState = state => state.form;
