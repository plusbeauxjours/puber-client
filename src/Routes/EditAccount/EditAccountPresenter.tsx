import React from "react";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import Header from "../../Components/Header/index";
import { MutationFn } from "react-apollo";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  onInputChange,
  loading,
  onSubmit
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Puber</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={firstName}
        placeholder={"First name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={lastName}
        placeholder={"Last name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={email}
        placeholder={"Email"}
      />
      <Button onClick={null} value={loading ? "Loding" : "Update"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
