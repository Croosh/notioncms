import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Block, Page } from "../lib/types";
import { Card, CardBody } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { getDate } from "../lib/utils";
function BlogPage() {
  const navigate = useNavigate();
  const [resp, setResp] = useState<Block[]>();
  const [pageProperties, setPageProperties] = useState<Page>();
  const { id } = useParams();
  const fetchPageContent = async (id: string) => {
    fetch(`http://localhost:3000/page/content/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setResp(data.results);
        console.log("Data", data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const fetchPageProperties = async (id: string) => {
    fetch(`http://localhost:3000/page/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPageProperties(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchPageContent(id as string);
    fetchPageProperties(id as string);
  }, [id]);

  const renderBlocks = (block: Block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <>
            <p className="my-2" key={block.type}>
              {block.paragraph?.rich_text.map((text, index) => {
                return <span key={index}>{text.plain_text}</span>;
              })}
            </p>
          </>
        );
      case "heading_1":
        return (
          <>
            {block.heading_1.rich_text.map((item) => (
              <h1
                className="text-start w-full  font-bold text-2xl mt-4"
                key={item.type}
              >
                {item.plain_text}
              </h1>
            ))}
          </>
        );
      case "heading_2":
        return (
          <>
            {block.heading_2.rich_text.map((item) => (
              <h2
                className="text-start w-full font-bold text-xl mt-3"
                key={item.type}
              >
                {item.plain_text}
              </h2>
            ))}
          </>
        );
      case "heading_3":
        return (
          <>
            {block.heading_3.rich_text.map((item) => (
              <h3
                className="text-start w-full font-bold text-xl mt-2"
                key={item.type}
              >
                {item.plain_text}
              </h3>
            ))}
          </>
        );
      case "image":
        return (
          <>
            <div className="flex w-full justify-center items-center">
              <img
                className=" my-4 w-1/2 rounded-md place-center"
                loading="lazy"
                key={block.image.file.url}
                src={block.image.file.url}
              />
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center ">
        {resp ? (
          <>
            <div className="  w-4/6 flex flex-col shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] max-lg:w-4/5 max-md:w-[95vw]">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-circle absolute top-5 left-5  bg-white/40 p-2 rounded-full "
              >
                <ArrowLeft />
              </button>
              <Card className="p-4 blogin">
                <CardBody>
                  {pageProperties?.properties.Cover?.files[0]?.file.url ? (
                    <>
                      <img
                        className=" rounded-lg w-full h-96 object-cover bg-no-repeat mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        src={
                          pageProperties?.properties.Cover?.files[0]?.file.url
                        }
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
                      {getDate(
                        pageProperties?.properties.Date.date.start as string
                      )}
                    </span>
                  </div>
                  <div className="flex mt-4 gap-2 flex-col justify-center items-center "></div>
                  {resp.map((item) => renderBlocks(item))}
                </CardBody>
              </Card>
            </div>
          </>
        ) : (
          <span className=" text-3xl animate-pulse  font-inter font-medium text-white">
            Loading
          </span>
        )}
      </div>
    </>
  );
}

export default BlogPage;
