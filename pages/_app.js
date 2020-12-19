import { css } from '@emotion/css';
import Header from '@/components/Header';
import { AuthContextProvider } from '@/contexts/AuthContext';
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <div className={wrapperClass}>
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}

const wrapperClass = css`
  width: 100vw;
  max-width: 600px;
  padding: 0 30px;
  padding-bottom: 100px;
  margin: 0 auto;
`;
