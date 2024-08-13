interface TextContent {
  content: string;
  link: string | null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Title {
  type: "text";
  text: TextContent;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}

interface DateProperty {
  start: string;
  end: string | null;
  time_zone: string | null;
}

interface MultiSelectOption {
  id: string;
  name: string;
  color: string;
}

interface Properties {
  Date: {
    id: string;
    type: "date";
    date: DateProperty;
  };
  category: {
    id: string;
    type: "multi_select";
    multi_select: MultiSelectOption[];
  };
  title: {
    id: string;
    type: "title";
    title: Title[];
  };
  Cover: {
    id: string;
    type: string;
    files: [
      {
        name: string;
        type: string;
        file: {
          url: string;
          expiry_time: string;
        };
      }
    ];
  };
}

interface User {
  object: "user";
  id: string;
}

interface Parent {
  type: "database_id";
  database_id: string;
}

export interface Page {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  cover: string | null;
  icon: string | null;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: string | null;
}

export interface NotionApi {
  object: "list";
  results: Page[];
  next_cursor: string | null;
  has_more: boolean;
  type: "page_or_database";
  page_or_database: Record<string, unknown>;
  request_id: string;
}

interface NotionText {
  type: "text";
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface ParagraphBlock {
  type: "paragraph";
  paragraph: {
    rich_text: NotionText[];
    color: string;
  };
}

interface Heading1Block {
  type: "heading_1";
  heading_1: {
    rich_text: NotionText[];
    color: string;
  };
}

interface Heading2Block {
  type: "heading_2";
  heading_2: {
    rich_text: NotionText[];
    color: string;
  };
}

interface Heading3Block {
  type: "heading_3";
  heading_3: {
    rich_text: NotionText[];
    color: string;
  };
}

interface BulletedListItemBlock {
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: NotionText[];
    color: string;
  };
}

interface NumberedListItemBlock {
  type: "numbered_list_item";
  numbered_list_item: {
    rich_text: NotionText[];
    color: string;
  };
}

interface ToDoBlock {
  type: "to_do";
  to_do: {
    rich_text: NotionText[];
    color: string;
    checked: boolean;
  };
}

interface ToggleBlock {
  type: "toggle";
  toggle: {
    rich_text: NotionText[];
    color: string;
  };
}

interface CodeBlock {
  type: "code";
  code: {
    rich_text: NotionText[];
    language: string;
  };
}

interface QuoteBlock {
  type: "quote";
  quote: {
    rich_text: NotionText[];
    color: string;
  };
}

interface CalloutBlock {
  type: "callout";
  callout: {
    rich_text: NotionText[];
    icon: {
      type: string;
      emoji: string;
    };
    color: string;
  };
}

interface DividerBlock {
  type: "divider";
  divider: unknown;
}

interface FileBlock {
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
}

interface ImageBlock {
  type: "image";
  image: {
    file: {
      url: string;
      caption: NotionText[];
    };
  };
}

interface VideoBlock {
  type: "video";
  video: {
    url: string;
    caption: NotionText[];
  };
}

interface BookmarkBlock {
  type: "bookmark";
  bookmark: {
    url: string;
  };
}

interface EmbedBlock {
  type: "embed";
  embed: {
    url: string;
  };
}

interface TableBlock {
  type: "table";
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
    rows: TableRowBlock[];
  };
}

interface TableRowBlock {
  type: "table_row";
  table_row: {
    cells: NotionText[][];
  };
}

export type Block =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ToDoBlock
  | ToggleBlock
  | CodeBlock
  | QuoteBlock
  | CalloutBlock
  | DividerBlock
  | FileBlock
  | ImageBlock
  | VideoBlock
  | BookmarkBlock
  | EmbedBlock
  | TableBlock
  | TableRowBlock;

export interface NotionPageContent {
  object: string;
  results: Block[];
  next_cursor: string | null;
  has_more: boolean;
  type: string;
  block: Record<string, unknown>;
  request_id: string;
}

export interface DataContextType {
  cache: Page[];
  setCache: React.Dispatch<React.SetStateAction<Page[]>>;
}
