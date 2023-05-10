import { useState } from "react";
import { useForm } from 'react-hook-form';
import {FormContainer, ErrorMessage} from "../styles/LoginStyle";
import SignupInput from "./SignupInput";
import { SignButton } from "../styles/SignupStyle";

const LoginForm: React.FC = () => {


	return (
		<FormContainer>
			<form>
				<SignupInput
					labelName="ID"
					inputType="email"
				/>
				<SignupInput
					labelName="Password"
					inputType="password"
				/>
				<SignButton>Log in</SignButton>
			</form>
		</FormContainer>
	);
}

export default LoginForm;
