import React, { useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { Register, LOGIN } from '../graphql/mutation'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  background: #f2f2f2;
  height: 100vh;
`
const IconContainer = styled.div`
    width: 200px;
    height; 70px;
`
const LoginContainer = styled.div`
  width: 50%;
  min-width: 396px;
  margin-left: auto;
  margin-right: auto;
`
const Card = styled.div`
  width: 396px;
  height: 350px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  border-radius: 8px;
  background: white;
  padding: 10px 24px 24px;
`
const RegisterCard = styled(Card)`
  width: 432px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  position: relative;
`
const Input = styled.input`
  width: 100%;
  height: 52px;
  margin: 6px 0;
  border-radius: 8px;
  border: 1px solid #dddfe2;
  padding: 6px 12px;
  ::placeholder {
    color: #90949c;
  }
`
const Button = styled.button<{ color: String; size: String; width: String; height: number }>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width.toString()};
  border-radius: 8px;
  border: 0;
  color: #fff;
  margin: 6px 0;
  background: ${(props) => props.color};
  font-size: ${(props) => props.size.toString()}px;
  font-weight: bold;
  cursor: pointer;
`
const StyledLink = styled(Link)`
  color: #1877f2;
  text-decoration: none;
  font-size: 14px;
  align-text: center;
`
const Center = styled.div`
  text-align: center;
  margin-top: 12px;
`
const Divide = styled.hr`
  margin: 20px 0;
  border: 1px solid #dadde1;
`
const Mask = styled.div`
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`
const RegisterHeader = styled.div`
  border-bottom: 1px solid #dadde1;
  padding: 10px 16px;
`
const RegisterHeaderTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`
const RegisterHeaderDescription = styled.div`
  font-size: 15px;
  color: #606770;
  padding: 5px 0;
`
const RegisterCloseIcon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`
const RegisterForm = styled.form`
  padding: 16px;
`
const FormInput = styled.input`
  background: #f5f6f7;
  height: 40px;
  padding: 11px;
  border-radius: 5px;
  border: 1px solid #bdc7d8;
  width: ${(props) => props.width};
  margin: 5px 0;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`
const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`

interface ComponentProps {
  setIsRegisterVisible: Dispatch<SetStateAction<boolean>>
}

const LoginComponent = ({ setIsRegisterVisible }: ComponentProps) => {
  const history = useHistory()
  const [error, setError] = useState({ status: false, message: '' })
  const [login] = useMutation(LOGIN, {
    onCompleted: (res) => {
      const data = _.get(res, 'login', {})
      const { user, token } = data
      if (user) {
        toast.success('Login success', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        localStorage.setItem('token', token)
        history.push('/')
      }
    },
    onError: ({ message }) => {
      setError({ status: true, message })
    },
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      login({ variables: { input: values } })
    },
  })
  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Email or Phone Number"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button color="#1877f2" size="20" width="100%" height={48} type="submit">
          Log in
        </Button>
        {error.status && <ErrorMessage>{error.message}</ErrorMessage>}
      </form>
      <Center>
        <StyledLink to="/">Forgot Password?</StyledLink>
        <Divide />
        <Button color="#42b72a" size="17" width="70%" height={48} onClick={() => setIsRegisterVisible(true)}>
          Create New Account
        </Button>
      </Center>
    </Card>
  )
}
const RegisterComponent = ({ setIsRegisterVisible }: ComponentProps) => {
  const [register] = useMutation(Register, {
    onCompleted: () => {
      formik.resetForm()
      setIsRegisterVisible(false)
      toast.success('Create account success', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
  })
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      register({ variables: { input: values } })
    },
  })
  const handleClose = () => {
    setIsRegisterVisible(false)
  }
  return (
    <Mask>
      <RegisterCard>
        <RegisterHeader>
          <RegisterHeaderTitle>Sign Up</RegisterHeaderTitle>
          <RegisterHeaderDescription>It's quick and easy.</RegisterHeaderDescription>
          <RegisterCloseIcon
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/Q0G2UVjVQ4_.png"
            onClick={() => handleClose()}
          />
        </RegisterHeader>
        <RegisterForm onSubmit={formik.handleSubmit}>
          <Flex>
            <FormInput
              name="firstName"
              placeholder="First name"
              width="49%"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <FormInput
              name="lastName"
              placeholder="Last name"
              width="49%"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Flex>
          <FormInput
            name="email"
            placeholder="Mobile number or email"
            width="100%"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="New password"
            width="100%"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Center>
            <Button color="#42b72a" size="17" width="70%" height={36} type="submit">
              Sign Up
            </Button>
          </Center>
        </RegisterForm>
      </RegisterCard>
    </Mask>
  )
}
const Login = () => {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false)
  return (
    <Container>
      <LoginContainer>
        <IconContainer>
          <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="fb-icon" />
        </IconContainer>
        <LoginComponent setIsRegisterVisible={setIsRegisterVisible} />
      </LoginContainer>
      {isRegisterVisible && <RegisterComponent setIsRegisterVisible={setIsRegisterVisible} />}
    </Container>
  )
}
export default Login
