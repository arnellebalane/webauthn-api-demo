import { css } from '@emotion/css';
import 'antd/dist/antd.css';

export default function App({ Component, pageProps }) {
  return (
    <div className={wrapperClass}>
      <Component {...pageProps} />
    </div>
  );
}

const wrapperClass = css`
  width: 100vw;
  max-width: 600px;
  padding: 0 30px;
  padding-bottom: 100px;
  margin: 0 auto;
`;
