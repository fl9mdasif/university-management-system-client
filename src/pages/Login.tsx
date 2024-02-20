/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/VerifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PhForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    // userId: "A-0001",
    // password: "admin1234",
  };

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // console.log(data, "error: ", error);

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Loading...");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
