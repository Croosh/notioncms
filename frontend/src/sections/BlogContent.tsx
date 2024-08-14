import { renderBlocks } from "../lib/blockRender";

import { useState, useEffect } from "react";
import { Block } from "../lib/types";
function BlogContent({ id, onLoad }: { id: string; onLoad: () => void }) {
  const [resp, setResp] = useState<Block[]>();

  useEffect(() => {
    console.log("Hi from Blog Content");

    const fetchPageContent = async (id: string) => {
      fetch(`http://localhost:3000/page/content/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setResp(data.results);
          console.log("Data", data.results);
        })
        .then(() => onLoad())
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchPageContent(id as string);
  }, [id, onLoad]);
  return (
    <div className=" w-full">
      {resp ? (
        <>
          <div className="flex mt-4 gap-2 flex-col justify-center items-center transition-all "></div>
          {resp.map((item) => renderBlocks(item))}
        </>
      ) : (
        <span className=" text-3xl animate-pulse  font-inter font-medium text-white">
          Loading
        </span>
      )}
    </div>
  );
}

export default BlogContent;
