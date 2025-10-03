// Sanity CMS schema definitions for The Ledger blog

export const postSchema = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alignment",
              type: "string",
              title: "Alignment",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Center", value: "center" },
                  { title: "Right", value: "right" },
                  { title: "Full Width", value: "full" },
                ],
              },
              initialValue: "center",
            },
            {
              name: "size",
              type: "string",
              title: "Size",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                ],
              },
              initialValue: "medium",
            },
          ],
        },
        {
          name: "callout",
          type: "object",
          title: "Callout",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Error", value: "error" },
                ],
              },
            },
            {
              name: "content",
              type: "text",
              title: "Content",
            },
          ],
        },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
      description: "Main category for navigation and organization",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      description: "Flexible labels for cross-category filtering and SEO",
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1).max(60),
    },
    {
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Mark as featured to highlight on homepage",
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "SEO Title",
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "SEO Description",
          validation: (Rule: any) => Rule.max(160),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
    },
    prepare(selection: any) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}

export const authorSchema = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        {
          name: "twitter",
          type: "url",
          title: "Twitter URL",
        },
        {
          name: "linkedin",
          type: "url",
          title: "LinkedIn URL",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "avatar",
    },
  },
}

export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Highlight", value: "highlight" },
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Purple", value: "purple" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}

export const tagSchema = {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tag Name",
      type: "string",
      validation: (Rule: any) => Rule.required().max(50),
      description: "Short, descriptive tag name (e.g., 'PPP', 'Student Housing', 'Diaspora Capital')",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Brief description of what this tag represents",
    },
    {
      name: "category",
      title: "Primary Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "The main category this tag is most associated with (optional)",
    },
    {
      name: "usage",
      title: "Usage Count",
      type: "number",
      readOnly: true,
      description: "Automatically tracked usage count",
    },
    {
      name: "featured",
      title: "Featured Tag",
      type: "boolean",
      description: "Show this tag prominently in tag clouds and filters",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      category: "category.title",
    },
    prepare(selection: any) {
      const { title, subtitle, category } = selection
      return {
        title: title,
        subtitle: category ? `${subtitle} (${category})` : subtitle,
      }
    },
  },
}

export const pressReleaseSchema = {
  name: "pressRelease",
  title: "Press Release",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Link to full press release if hosted externally",
    },
    {
      name: "featured",
      title: "Featured Release",
      type: "boolean",
      description: "Mark as featured to highlight prominently",
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "SEO Title",
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "SEO Description",
          validation: (Rule: any) => Rule.max(160),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
    },
    prepare(selection: any) {
      const { publishedAt } = selection
      return Object.assign({}, selection, {
        subtitle: publishedAt && `Published ${new Date(publishedAt).toLocaleDateString()}`,
      })
    },
  },
}

export const mediaKitSchema = {
  name: "mediaKit",
  title: "Media Kit",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      name: "file",
      title: "File",
      type: "file",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fileType",
      title: "File Type",
      type: "string",
      options: {
        list: [
          { title: "PDF", value: "PDF" },
          { title: "ZIP", value: "ZIP" },
          { title: "PNG", value: "PNG" },
          { title: "SVG", value: "SVG" },
          { title: "EPS", value: "EPS" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fileSize",
      title: "File Size (MB)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0.1),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "file",
    },
  },
}

export const companyInfoSchema = {
  name: "companyInfo",
  title: "Company Information",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "founded",
      title: "Founded",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1900).max(2030),
    },
    {
      name: "headquarters",
      title: "Headquarters",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fundingStage",
      title: "Funding Stage",
      type: "string",
      options: {
        list: [
          { title: "Pre-Seed", value: "Pre-Seed" },
          { title: "Seed", value: "Seed" },
          { title: "Series A", value: "Series A" },
          { title: "Series B", value: "Series B" },
          { title: "Series C", value: "Series C" },
          { title: "IPO", value: "IPO" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "employees",
      title: "Employee Count",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mediaContact",
      title: "Media Contact",
      type: "object",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "title",
          type: "string",
          title: "Title",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "email",
          type: "email",
          title: "Email",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "phone",
          type: "string",
          title: "Phone",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "headquarters",
    },
  },
}

// Export all schemas for Sanity Studio
export const schemas = [
  postSchema, 
  authorSchema, 
  categorySchema, 
  tagSchema,
  pressReleaseSchema, 
  mediaKitSchema, 
  companyInfoSchema
]
