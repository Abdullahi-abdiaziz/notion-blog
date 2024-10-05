import { BlogPost, PostPage } from "@/types/schema";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export default class NotionService {
  client: Client;
  n2m: NotionToMarkdown;
  database: string;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
    this.database = process.env.NOTION_BLOG_DB_ID ?? "";
  }

  async getBlogPosts(p0: { revalidate: number }): Promise<BlogPost[]> {
    if (!this.database) {
      throw new Error("No database ID provided.");
    }

    const response = await this.client.databases.query({
      database_id: this.database,
      filter: {
        property: "Status",
        status: {
          equals: "Published", // Ensure this matches the type in your database
        },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return response.results.map((res) => {
      return NotionService.page2PostTransformer(res);
    });
  }

  async getPostBySlug(slug: string): Promise<PostPage> {
    let post, markdown;

    if (!this.database) {
      throw new Error("No database ID provided.");
    }
    // Fetch the page by slug from Notion
    const response = await this.client.databases.query({
      database_id: this.database,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    // Handle case where no post is found
    if (!response.results[0]) {
      throw new Error(`Post not found for slug: ${slug}`);
    }

    const page = response.results[0];

    // Convert page content to markdown
    const mdBlocks = await this.n2m.pageToMarkdown(page.id);

    markdown = this.n2m.toMarkdownString(mdBlocks).parent || "";

    // Transform page data to custom Post object
    post = NotionService.page2PostTransformer(page);

    return { post, markdown };
  }

  private static page2PostTransformer(page: any) {
    let cover = page.cover;

    // Handle cover types correctly
    if (cover) {
      switch (cover.type) {
        case "external":
          cover = page.cover.external.url;
          break;
        case "file":
          cover = page.cover.file.url;
          break;
        default:
          cover = "";
      }
    } else {
      cover = "";
    }

    // Ensure each property exists before accessing its values
    return {
      id: page.id,
      title: page.properties?.Name?.title?.[0]?.plain_text || "Untitled",
      tags: page.properties?.Tags?.multi_select || [],
      description:
        page.properties?.Description?.rich_text?.[0]?.plain_text || "",
      cover,
      slug: page.properties?.Slug?.formula?.string || "",
      date: page.properties?.Updated?.last_edited_time || "",
      author: page.properties?.Author?.[0]?.plain_text || "",
    };
  }
}
