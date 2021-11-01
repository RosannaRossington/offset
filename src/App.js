import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import Notification from './components/Notifcation/Notification';

const App = () => {
  const productUrlRef = useRef(null);

  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState({
    designer: '',
    product: '',
    materials: '',
    location: '',
    madeIn: '',
  });
  const [productUrlError, setProductUrlError] = useState(false);

  useEffect(() => {
    productUrlRef.current.focus();
  }, []);

  const handleUrl = (e) => {
    //https://www.theoutnet.com/en-gb/shop/product/ulla-johnson/dresses/mini-dress/wilona-gathered-acid-wash-denim-mini-dress/27086482324528417
    e.preventDefault();
    if (e?.target.value.includes('theoutnet.com')) {
      const productNumbers = e?.target.value.match(/\d/g).join('');
      setProductId(productNumbers);
      console.log(productId, 'product Id');
      setProductUrlError(false);
    } else {
      setProductUrlError(true);
    }
  };

  const handleProduct = (productId) => {
    // fetchProductDetails()
    //   .then((productDetails)=> {
    //     return fetchMaterials(productDetails.materials)
    //   })
    // const productDetails = await fetchProductDetails(productId)
    // const materials = await fetchMaterials(productDetails.materials)
    // fetchProductsAndMaterials(productId)
    //AJAX request URL -> Promise <- resolved Response object
    return fetch(
      `https://ecomm.ynap.biz/yoox/ton/search/resources/store/theoutnet_GB/productview/${productId}`,
      {
        method: 'GET',
        headers: {
          'x-ibm-client-Id': '705b890d-fdb9-4867-a392-331c2fb86e19',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data');
        const { designerName, name } = data?.products[0];
        const materialsAttribute = data?.products[0].attributes?.find(
          (attribute) => {
            return attribute.identifier === 'Material Leather & Fur (TON_ALL)';
          }
        );

        const productDetails = {
          designer: designerName,
          product: name,
          materials: materialsAttribute?.values[0].label,
          madeIn: '',
        };
        setProductDetails(productDetails);
        console.log(productDetails, 'productDetails');

        // return Promise.all([
        //   fetch(getMaterialInfo(productDetails)).then((response) => response.json()),
        //   fetch(getMaterialInfo2(productDetails)).then((response) => response.json())
        // ])
      })
      .then((result) => {
        //do soemthing with material
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div className='background'>
      <div className='background-blur' />
      <div className='screensizeWarning'>
        <p className='bodyText'>
          This tool is not available on your device. Please visit on a desktop
          or laptop device.
        </p>
      </div>
      <div className='container'>
        <div className='left-overlay'>
          <>
            <div className='intro'>
              <h1 className='title'>THE OFFSET</h1>
              <p className='bodyText'>
                Educate yourself on how to offset the environmental impact of
                adding a new piece to your wardrobe
              </p>
            </div>

            <div className='bodyText'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProduct(productId);
                }}>
                <label htmlFor='productUrl'>
                  Enter the product you want to discover
                </label>
                <br />
                <input
                  ref={productUrlRef}
                  type='text'
                  placeholder='Enter Product Url'
                  // value={productUrl}
                  id='productUrl'
                  onChange={handleUrl}
                />
                {productUrlError && (
                  <Notification
                    messages={'Please enter a product from The Outnet.'}
                  />
                )}
                {/* {productId &&
              !!productUrlError( */}
                <button className={`button discoverButton`} type='submit'>
                  Discover
                </button>
                {/* )} */}
              </form>
            </div>
          </>
        </div>
        <div className='right-overlay'>
          <div className='wrapper'>
            <div className='impact'>
              {productDetails && (
                <>
                  <p className='preTitle'>{productDetails.name}</p>
                  <h1 className='designer'>{productDetails.designer}</h1>
                  <p className='materials'>{productDetails.materials}</p>
                  {/* <p className='materials'>{productDetails.madeIn}</p> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
