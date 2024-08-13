import { useMemo, useState } from "react";
import { Page, NotionApi } from "../lib/Type";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getDate } from "../lib/utils";

export default function DBTable() {
  const [data, setData] = useState<Page[]>([]);

  const fetchDBData = useMemo(
    () => async () => {
      console.log("SENDING REQUEST");
      axios
        .get("http://localhost:3000/database")
        .then((response) => response.data)
        .then((json: NotionApi) => {
          setData(json.results);
          console.log(json);
        })
        .then(() => console.log(data))
        .catch((error) => console.error("Error fetching data:", error));
    },
    [data]
  );
  return (
    <div className="w-2/3 flex justify-center items-center">
      {data.length > 0 ? (
        <>
          <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] popupanimation">
            <Card className=" ">
              <CardBody>
                <TableContainer>
                  <Table size={"md"} className="w-full">
                    <Thead>
                      <Tr>
                        <Td className=" font-inter font-bold">Title</Td>
                        <Td className=" font-inter font-bold">Category</Td>
                        <Td className=" font-inter font-bold">Publish Date</Td>
                        <Td className=" font-inter font-bold">Cover</Td>
                        <Td className=" font-inter font-bold">Action</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((page) => (
                        <Tr key={page.id}>
                          <Td className=" font-inter capitalize font-medium">
                            {page.properties.title.title[0].plain_text}
                          </Td>
                          <Td>
                            {page.properties.category.multi_select.map(
                              (option) => (
                                <Badge
                                  colorScheme={option.color}
                                  key={option.id}
                                >
                                  {option.name}
                                </Badge>
                              )
                            )}
                          </Td>
                          <Td>{getDate(page.properties.Date.date.start)}</Td>

                          <Td>
                            {page.properties.Cover.files[0]?.file.url ? (
                              <>
                                <p>Yes</p>
                              </>
                            ) : (
                              <>
                                <p>No</p>
                              </>
                            )}
                          </Td>
                          <Td className=" justify-center">
                            <Link to={`/page/${page.id}`}>
                              <Button>Read</Button>
                            </Link>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </div>
        </>
      ) : (
        <>
          <Button
            className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            onClick={fetchDBData}
          >
            Fetch
          </Button>
        </>
      )}
    </div>
  );
}
