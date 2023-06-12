import { useEffect, useState } from "react";
import { Center, Loader, Pagination } from "./components";
import axios from "axios";

const getImages = async () => {
  const requests = [];
  for (let i = 0; i < 100; i++) {
    requests.push(axios.get('https://source.unsplash.com/200x200/?nature,water,sky,sun,moon,earth,jupiter,america,pakistan,man,boy', {
      responseType: 'blob'
    }));
  }
  const responses = await Promise.all(requests);
  return responses;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setImgs([]);
        const responses = await getImages();
        for (const response of responses) {
          const { data } = response;
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setImgs(p => [...p, fileReader.result])
          }
          fileReader.readAsDataURL(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Something went wrong. Please try again!');
        setIsLoading(false);
      }
    })();
  }, [pageNo])

  return (
    isLoading ? (
      <Center fullScreen><Loader /></Center>
    ) : (
      <div className={`max-w-[95vw] w-[1200px] mx-auto py-5`}>
        <div className="grid grid-cols-12	gap-2">
          {
            imgs.map((img, i) => (
              <img key={i} src={img} alt="Image not found!" className="w-full rounded-md col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2" />
            ))
          }
        </div>
        <Center>
          <Pagination pageNo={pageNo} setPageNo={setPageNo} count={7} />
        </Center>
      </div>
    )
  )
}

export default App