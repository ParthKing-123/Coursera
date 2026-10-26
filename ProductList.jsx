import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
        { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
        { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
        { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity and removes toxins from the air.', cost: '$20' },
        { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at cleaning air.', cost: '$17' },
        { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and soothes skin.', cost: '$14' },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400', description: 'Calming scent, used in aromatherapy.', cost: '$20' },
        { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400', description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
        { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Invigorating scent, also a culinary herb.', cost: '$15' },
        { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma, great for teas and cooking.', cost: '$12' },
        { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent that reduces stress.', cost: '$14' },
        { name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'Beautiful, sweet-smelling spring flower.', cost: '$22' },
      ],
    },
    {
      category: 'Insect Repellent Plants',
      plants: [
        { name: 'Citronella', image: 'https://cdn.pixabay.com/photo/2018/08/30/13/07/lemongrass-3642201_1280.jpg', description: 'Well-known mosquito-repelling scent.', cost: '$16' },
        { name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigolds-7028063_1280.jpg', description: 'Deters pests with its strong scent.', cost: '$10' },
        { name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/06/30/17/28/catnip-826535_1280.jpg', description: 'Repels mosquitoes and attracts cats.', cost: '$13' },
        { name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/basil-1539244_1280.jpg', description: 'Keeps flies and mosquitoes away.', cost: '$9' },
        { name: 'Lemongrass', image: 'https://cdn.pixabay.com/photo/2018/08/30/13/07/lemongrass-3642201_1280.jpg', description: 'Natural insect repellent with a citrus scent.', cost: '$14' },
        { name: 'Chrysanthemum', image: 'https://cdn.pixabay.com/photo/2013/10/05/14/03/chrysanthemums-190497_1280.jpg', description: 'Contains pyrethrum, a natural insecticide.', cost: '$19' },
      ],
    },
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = () => setShowCart(false);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2 className="category-title">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
