import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import SignIn from '../Auth/components/SignIn';
import { renderAuthConnected, fireEvent, screen, cleanup, waitForElement  } from './testUtils/authUtil'
import { setupServer } from 'msw/node'
import { handlers } from '../../mocks/handler';

let emailInput;
let passwordInput;

let payload = {
  email: "charsbeaty@gmail.com",
  password: 'password',

}

describe("Signin form", () => {

const server = setupServer(...handlers);

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
    server.listen()

  });

  const onFinish = jest.fn()
  .mockReturnValueOnce(payload);

  beforeEach(() => {
    renderAuthConnected(<SignIn login={onFinish} />)
    emailInput = screen.getByTestId('email');
    passwordInput = screen.getByTestId('password');
  })

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  })

  afterAll(() => server.close())


  const loginUser = (email, password) => {
      fireEvent.change(emailInput, {target: { value : email}});
      fireEvent.change(passwordInput, { target: { value: password}});
  }
  
      it('should render the component title', () => {
          const titleEl = screen.getByText(/Projects Supervison tool/i)
        expect(titleEl).toBeInTheDocument();
      });

      it('should render the compoent sub-title', () => {
        const subTittleEl = screen.getByText(/Please Login to your account/i)
        expect(subTittleEl).toBeInTheDocument()
      });

      it('Should render Email element', () => {
          const emailEl = screen.getByPlaceholderText(/Email/);
          expect(emailEl).toBeInTheDocument()
      });


      it('Should render Password element', () => {
        const passwordEl = screen.getByPlaceholderText(/Password/);
        expect(passwordEl).toBeInTheDocument()
    });

    it('should be able to change when type input', () => {
      const emailInput = screen.getByPlaceholderText(/Email/);
      const passwordInput = screen.getByPlaceholderText(/Password/);
      loginUser('charsbeaty@gmail.com', 'password');
      expect(emailInput.value).toBe("charsbeaty@gmail.com");
      expect(passwordInput.value).toBe('password')
  });

  it('should submit the username and password', async () => {
   const signInButton = screen.getByRole('button', {name: /Log In/i})
    loginUser(payload.email, payload.password);
    fireEvent.submit(signInButton);
    waitForElement(() => {
      expect(onFinish).toBeCalled();
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish.mock.calls.length).toBeGreaterThanOrEqual(1)
      expect(onFinish).toHaveBeenNthCalledWith(1, payload);
  });
  })



})