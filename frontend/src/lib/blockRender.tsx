import { Block } from "./types";
export const renderBlocks = (block: Block) => {
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
              className=" my-4 w-1/2 rounded-md place-center  bg-gray-300"
              loading="lazy"
              key={block.image.file.url}
              src={block.image.file.url}
            />
          </div>
        </>
      );
  }
};
