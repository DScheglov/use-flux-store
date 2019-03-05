import { update } from './reducers';

const delay = timeout => new Promise(
  resolve => setTimeout(resolve, timeout)
);

export const submit = () => async (dispatch, getState) => {
  await delay(0);

  dispatch(
    update({
      firstName: `Submitted: ${getState().form.firstName}`,
      lastName: `Submitted: ${getState().form.lastName}`,
      submitted: true,
    })
  );

  await delay(1000);

  dispatch(
    update({
      firstName: getState().form.firstName.slice('Submitted: '.length),
      lastName: getState().form.lastName.slice('Submitted: '.length),
      submitted: false,
    })
  )
}