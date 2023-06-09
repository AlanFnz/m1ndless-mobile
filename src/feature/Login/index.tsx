import React from 'react';
import { Button } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '../../components/InputField';
import { firebaseSignInWithEmailAndPassword } from '../../services/firebase';
import {
  Container,
  FormContainer,
  Label,
  ErrorText,
  BottomText,
  StyledButton
} from './Login.styles';
import { LoginProps, FormData } from './Login.types';
import { emailValidation, passwordValidation } from './Login.validations';

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: FormData) =>
    firebaseSignInWithEmailAndPassword(data.email, data.password);

  return (
    <Container testID="loginScreen">
      <FormContainer>
        <Label>Email</Label>
        <InputField
          control={control}
          name="email"
          rules={emailValidation}
          autoCapitalize="none"
        />
        {errors.email && <ErrorText>Email error</ErrorText>}

        <Label>Password</Label>
        <InputField
          control={control}
          name="password"
          rules={passwordValidation}
          secureTextEntry
        />
        {errors.password && <ErrorText>Password error</ErrorText>}
      </FormContainer>
      <StyledButton>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </StyledButton>

      <BottomText onPress={() => navigation.navigate('Signup')}>
        Create account
      </BottomText>
    </Container>
  );
};

export default Login;
