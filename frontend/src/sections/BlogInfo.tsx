import { useEffect, useState } from "react";
import { Page } from "../lib/types";
import { getDate } from "../lib/utils";
import { Badge } from "@chakra-ui/react";

export default function BlogInfo({
  id,
  onLoad,
}: {
  id: string;
  onLoad: () => void;
}) {
  const [pageProperties, setPageProperties] = useState<Page>();

  useEffect(() => {
    console.log("Hi from Blog Info");
    const fetchPageProperties = async (id: string) => {
      fetch(`http://localhost:3000/page/properties/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPageProperties(data);
        })
        .then(() => onLoad())
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchPageProperties(id as string);
  }, [id, onLoad]);
  return (
    <>
      <div className="w-full">
        {pageProperties ? (
          <>
            {pageProperties?.properties.Cover?.files[0]?.file.url ? (
              <>
                <img
                  className=" rounded-lg w-full h-96 object-cover bg-no-repeat mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gray-300"
                  src={pageProperties?.properties.Cover?.files[0]?.file.url}
                  alt=""
                />
              </>
            ) : null}
            <h1 className=" text-5xl my-4 font-extrabold font-playfair">
              {pageProperties?.properties.title.title[0].text.content}
            </h1>
            <div className="flex justify-between items-start mr-4">
              <div>
                {pageProperties?.properties.category.multi_select.map(
                  (option) => (
                    <Badge colorScheme={option.color} key={option.id}>
                      {option.name}
                    </Badge>
                  )
                )}
              </div>
              <span>
                {getDate(pageProperties?.properties.Date.date.start as string)}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
