import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

export function renderWithProviders(
  children: JSX.Element,
  { route = '/' }: { route?: string } = {}
) {
  window.history.pushState({}, 'Test page', route);
  return render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}
