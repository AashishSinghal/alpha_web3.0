import * as React from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

interface IuseFetch {
  keyword: string;
}

const useFetch = ({ keyword }: IuseFetch) => {
  const [girUrl, setGifUrl] = React.useState("");
  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limil=1`
      );

      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      console.log(error);
      setGifUrl(
        "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif"
      );
    }
  };

  React.useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return girUrl;
};

export default useFetch;
