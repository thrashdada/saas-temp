// "use client";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

async function getPosts() {
  const query = `*[_type == "post"]|order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    mainImage{
      asset->{url},
      alt
    },
    author->{name, image},
    publishedAt
  }`;
  return await client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {posts.map((post: any) => (
          <article key={post._id} className="border rounded-lg p-4 shadow-sm bg-white">
            {post.mainImage?.asset?.url ? (
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                width={800}
                height={400}
                className="rounded mb-4"
              />
            ) : null}
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {post.author?.image?.asset?.url ? (
                <Image src={post.author.image.asset.url} alt={post.author.name} width={32} height={32} className="rounded-full" />
              ) : null}
              <span>{post.author?.name}</span>
              <span>·</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
} 