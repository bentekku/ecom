import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProductDetails(response.data);
      } catch (err) {
        setError("Error fetching product details, ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Sidebar />
      <div className="ml-[80px]">
        <div className="header flex justify-between items-center p-4 bg-white">
          <h1 className="text-3xl font-bold">Peter Miles</h1>
        </div>
        {productDetails ? (
          <div className="product-details p-4">
            <h2 className="text-2xl font-semibold">{productDetails.name}</h2>
            <img
              src={productDetails.imgURL}
              alt={productDetails.name}
              className="w-full h-auto"
            />
            <p className="mt-2">{productDetails.description}</p>
            <p className="mt-2 text-xl font-bold">${productDetails.price}</p>
          </div>
        ) : (
          <p>No product details available.</p>
        )}
      </div>
    </>
  );
};

export default SingleProductPage;
