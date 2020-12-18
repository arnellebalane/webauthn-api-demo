import 'antd/dist/antd.css';
import style from '@/styles/App.module.css';

function App({ Component, pageProps }) {
  return (
    <div className={style.wrapper}>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
