import gql from "graphql-tag";
export const extendPost = gql`

  enum PostType {
    Post
    Page
    Comment
  }

  enum PostStatus {
    Draft
    Published
    Blocked
    Archive
    Trash
  }


  type PostTaxonomyValue {
    id: ID!
    key: String
    value: String
    parent: PostTaxonomyValue!
  }

  input PostTaxonomyValueInput {
    id: ID!
  }

  type PostTaxonomy {
    postCategories: [PostTaxonomyValue]
    postTags: [PostTaxonomyValue]
  }

  type Post implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime
    publishAt: DateTime 
    expireAt: DateTime
    createdBy: Customer!
    postType: PostType!
    assets: Assets
    status: PostStatus
    title: String!
    slug: String!
    content: String
    taxonomy: [PostTaxonomy]
    relatedPosts: [RelatedPost]
    relatedUsers: [RelatedUser]
    # contentBlocks 
  }

  type RelatedPost {
    post: Post!
    type: String!
    customFields: JSON
  }

  type RelatedUser {
    user: User!
    type: String!
    customFields: JSON
  }


  input PostInput {
    publishAt: DateTime 
    expireAt: DateTime
    type: PostType!
    title: String!
    content: String
    # assets: Assets
    # taxonomy: [PostTaxonomy]
    # relatedPosts: [RelatedPost]
    # relatedUsers: [RelatedUser]
  }

  extend type Mutation {
    createPost(input: PostInput): Post
    updatePost(input: PostInput): Post
    changePostStatus(id: ID!, status:PostStatus!): Post
    changePostSlug(id: ID!, slug:String!): Post
  }

  input PostTypeOperators {
    eq: PostType
    notEq: PostType
    contains: PostType
    notContains: PostType
    in: [PostType!]
    notIn: [PostType!]
    regex: PostType
  }


  input IDOperators {
    eq: ID
    notEq: ID
    contains: ID
    notContains: ID
    in: [ID!]
    notIn: [ID!]
    regex: ID
  }

  input PostTaxonomyValueOperators {
    eq: PostTaxonomyValueInput
    notEq: PostTaxonomyValueInput
    contains: PostTaxonomyValueInput
    notContains: PostTaxonomyValueInput
    in: [PostTaxonomyValueInput!]
    notIn: [PostTaxonomyValueInput!]
    regex: PostTaxonomyValueInput 
  }

  input PostsFilter {
    type: PostTypeOperators
    id: IDOperators
    category: PostTaxonomyValueOperators
    tags: PostTaxonomyValueOperators
  }

  type PostsPaginatedResult {
    list: [Post]!
    totalItems: Int!
  }

  extend type Query {
    getPosts(
      query: String
      limit: Int
      offset: Int
      filter: PostsFilter
    ): PostsPaginatedResult!
    getPostById(id: ID!): Post
  }
`;