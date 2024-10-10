import { Schema } from "mongoose";

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "employees proyect",
        version: "1.0.0",
      },
      components: {
        schemas: {
          User: {
            type: "object",
            require: true,
            properties: {
              username: {
                type: String, 
              },
              password: { type: String, 
              },
              email: { type: String, 
              },
              profile: {
                type: "object",
                properties: {
                  bio: { type: String },
                  socialLinks: { type: "array", items: { type: "string" } },
                },
                required: ["bio", "socialLinks"],
              }
            }
          },
          CreateUser: {
            type: "object",
            properties: {
              username: {
                type: "string",
                required: true,
              },
              email: {
                type: "string",
                format: "email",
                required: true,
              },
              password: {
                type: "string",
                minLength: 8,
                required: true,
              },
              profile: {
                type: "object",
                properties: {
                  bio: {
                    type: "string",
                  },
                  socialLinks: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["bio", "socialLinks"],
              },
            },
          },
          Post: {
            type: "object",
            properties: {
              title: {
                type: "string",
                required: true,
              },
              content: {
                type: "string",
                required: true,
              },
              author: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
              comments: {
                type: "array",
                items: { type: "IComment",
                 },
              },
            },
          },
          CreatePost: {
            type: "object",
            properties: {
              title: {
                type: "string",
                required: true,
              },
              content: {
                type: "string",
                required: true,
              },
            },
          },
          CreateComment: {
            type: "object",
            properties: {
              content: {
                type: "string",
                required: true,
              },
              author: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
            },
          }
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    apis: ["./src/routes/*.ts"],
  };

  export default options;
  