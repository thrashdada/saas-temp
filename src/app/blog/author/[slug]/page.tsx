import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

async function getAuthorAndPosts(slug: string) {
  // Fetch the author by slug
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{_id, name, image{asset->{url}}, bio}`,
    { slug }
  );
  if (!author) return null;
  // Fetch posts referencing this author's _id
  const posts = await client.fetch(
    `*[_type == 'post' && references($authorId)]|order(publishedAt desc){
      _id,
      title,
      slug,
      excerpt
    }`,
    { authorId: author._id }
  );
  return { ...author, posts };
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await getAuthorAndPosts(params.slug);
  if (!author) return <div>Author not found</div>;
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        {author.image?.asset?.url ? (
          <Image src={author.image.asset.url} alt={author.name} width={64} height={64} className="rounded-full" />
        ) : null}
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          {author.bio && (
            <div className="text-gray-600 text-sm">
              <PortableText value={author.bio} />
            </div>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Posts by {author.name}</h2>
      {author.posts && author.posts.length > 0 ? (
        <ul className="space-y-4">
          {author.posts.map((post: any) => (
            <li key={post._id} className="border rounded p-4">
              <Link href={`/blog/${post.slug.current}`} className="text-lg font-semibold text-blue-600">{post.title}</Link>
              <p className="text-gray-600">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-8">No posts by this author yet.</p>
      )}
      <Link href="/blog" className="text-blue-600 mt-8 inline-block">← Back to Blog</Link>
    </main>
  );
} 