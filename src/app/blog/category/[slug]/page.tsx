import { client } from "../../../../sanity/lib/client";
import Link from "next/link";

async function getCategoryAndPosts(slug: string) {
  // Fetch the category by slug
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{_id, title}`,
    { slug }
  );
  if (!category) return null;
  // Fetch posts referencing this category's _id
  const posts = await client.fetch(
    `*[_type == 'post' && references($catId)]|order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt
    }`,
    { catId: category._id }
  );
  return { ...category, posts };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryAndPosts(params.slug);
  if (!category) return <div>Category not found</div>;
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Category: {category.title}</h1>
      {category.posts && category.posts.length > 0 ? (
        <ul className="space-y-4">
          {category.posts.map((post: any) => (
            <li key={post._id} className="border rounded p-4">
              <Link href={`/blog/${post.slug.current}`} className="text-xl font-semibold text-blue-600">{post.title}</Link>
              <p className="text-gray-600">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-8">No posts in this category yet.</p>
      )}
      <Link href="/blog" className="text-blue-600 mt-8 inline-block">← Back to Blog</Link>
    </main>
  );
} 