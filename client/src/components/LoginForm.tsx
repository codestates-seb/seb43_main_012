import { Link } from "react-router-dom";
import {FormContainer} from "../styles/LoginStyle";
import SignupInput from "./SignupInput";
import { SignButton } from "../styles/SignupStyle";

const LoginForm: React.FC = () => {


	return (
		<FormContainer>
			<form>
				<SignupInput
					labelName="ID (email)"
					inputType="email"
				/>
				<SignupInput
					labelName="Password"
					inputType="password"
				/>
                <Link to="/"><SignButton>Log in</SignButton></Link>
				
			</form>
		</FormContainer>
	);
}

export default LoginForm;
