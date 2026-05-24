export function getAuthErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.';

  if (error.code === 'ERR_NETWORK' || !error.response) {
    return 'Cannot reach the server. Start the backend (npm run dev in server/) and ensure MongoDB is running.';
  }

  const { status, data } = error.response;
  const message = data?.message || data?.error;

  if (message) return message;

  if (status === 400) return 'Please check your details and try again.';
  if (status === 401) return 'Invalid email or password.';
  if (status === 500) return 'Server error. Check that MongoDB is connected.';
  return 'Request failed. Please try again.';
}
