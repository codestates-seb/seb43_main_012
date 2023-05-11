import styled from "styled-components";

export const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 620.531px;
	height: 100%;
	width: 100vw;
	background-color: var(--base-color);
`;

export const LoginWrapper = styled.div`
	max-width: 290px;
	display: flex;
	flex-direction: column;
	align-items: center;
	> img {
		width: 50px;
		margin-bottom: 30px;
	}
`;

export const SignupLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	padding: 16px;
	font-size: var(--font-base);
	a {
		color: var(--main-color);
	}
`;
export const FormContainer = styled.div`
	padding: 24px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
	margin-top: 1px;
	display: flex;
	align-items: center;
	font-size: var(--font-small);
	color: var(--error-message-color);
`;