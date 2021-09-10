import Product from './views/Product/Product'
import { Layout } from 'antd';
const { Header } = Layout;

function App() {
  return (
    <div className="App">
      <Header className="site-layout-background">SHOP </Header>
      
     <Product/>

    </div>
  );
}

export default App;
