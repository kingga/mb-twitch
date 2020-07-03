import Request from '../http/Request';

export default function checkLogin(next: CallableFunction) {
  return (req: Request) => {
    // Check that they are logged in.
    const token = "some_token";

    // If they are logged in continue.
    return next(req, token);
  };
}
