import GuestHeader from "../../../components/header/GuestHeader";
import AuthLayout from "../Layout";

const Login = () => {
  return (
    <div className="flex flex-col h-screen">
      <GuestHeader />{" "}
      {/* #FIXME: YOU SHOULD USE THIS HEADER IN THE MAIN LAYOUT */}
      <div className='h-full flex flex-row items-center'>
        <AuthLayout>component</AuthLayout>
      </div>
    </div>
  );
};

export default Login;
