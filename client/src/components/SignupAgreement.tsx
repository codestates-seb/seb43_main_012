import { AgreementBox } from "../styles/SignupStyle";


interface AgreementProps {
    labelName: string;
    inputType: string;
  }

const Agreement: React.FC<AgreementProps> = ({labelName,inputType}) => {
  return (
    <AgreementBox>
      <input
        type={inputType}
      />
      <label>{labelName}</label>
    </AgreementBox>
  );
};

export default Agreement;
