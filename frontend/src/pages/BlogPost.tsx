import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogInfo from "../sections/BlogInfo";
import BlogContent from "../sections/BlogContent";
import { Card, CardBody, Spinner } from "@chakra-ui/react";

function BlogPage() {
  const { id } = useParams();

  const [isBlogInfoLoaded, setIsBlogInfoLoaded] = useState(false);
  const [isBlogContentLoaded, setIsBlogContentLoaded] = useState(false);

  useEffect(() => {
    console.log("Hi from Blog");
    setIsBlogInfoLoaded(false);
    setIsBlogContentLoaded(false);
  }, [id]);

  return (
    <>
      <div className="min-h-screen flex w-3/5 justify-center items-center transition-all ">
        <Card className="p-4 blogin w-full min-h-96">
          <CardBody>
            <div className="w-full flex flex-col min-h-full">
              <BlogInfo
                id={id as string}
                onLoad={() => setIsBlogInfoLoaded(true)}
              />
              {isBlogInfoLoaded && (
                <BlogContent
                  id={id as string}
                  onLoad={() => setIsBlogContentLoaded(true)}
                />
              )}
              {!isBlogInfoLoaded || !isBlogContentLoaded ? (
                <div className="flex w-full justify-center items-center min-h-full">
                  <Spinner size="xl" />
                </div>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default BlogPage;
