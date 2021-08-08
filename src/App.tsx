import React, { ChangeEvent, useState } from 'react';
import './App.css';
interface AppProps {
  username: string | undefined;
  userType: 'admin' | 'moderator' | 'user' | 'guest';
}

interface ProductDetails {
  material: string | undefined;
  location: string;
}

interface ProductImpact {
  water: string | undefined;
  carbon: string;
}

const App: React.FC<AppProps> = ({ userType, username }): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>('')
  const [productId, setProductId] = useState<string>('')
  const [productDetails, setProductDeatils] = useState<ProductDetails>({material: String, location: String})
  const [productImpact, setProductImpact] = useState<ProductImpact>({water: String, carbon: String})
//   setInterval(() => {
//     setTime(new Date(Date.now()));
//   }, 1000);

//   const handleText = (event: ChangeEvent<HTMLInputElement>): void => {
// setMessage(event.target.value)
//   }

// ITPVO - FRIENDS INPUT
const handleUrl = (event: ChangeEvent<HTMLInputElement>): void =>  {
// const productUrl = JSON.stringify(event?.target.value);
    const productNumbers = event?.target.value.match(/\d/g);
    setProductId(productNumbers!.join(""));
}

const getProductDetails = (productId) => {
fetch(`https://ecomm.ynap.biz/yoox/ton/search/resources/store/theoutnet_GB/productview/${productId}`, {method: 'GET', headers: {}})
.then(response => {
response.json()
}).then(response => {
  setProductDetails({
    material: response.data.products.map(p => {
      return [p.productColours[0].sKUs[0].composition];
    }),
    location: '',
    category:
  })
}).catch(err => console.log(err))}

const getProductImpact = (productDetails.material) => {
  fetch(``, {
    method: 'GET'
  }).then(response => response.json).then(response => setImpact(response)).catch(err => {console.log(err)})
}

  return (
    <div className='App'>
      <p>
        Hi, {username ? username : 'Mysterious Entity'}, your user type is{' '}
        {username ? userType : 'irrelevant because I do not know you'}.
      </p>
      <p>
        `Find out how your water your item used{time}`.
      </p>
 
      <input> type="text" placeholder="product" value={productUrl} onchange={handleUrl}</input>
    </div>
  );
};

export default App;
