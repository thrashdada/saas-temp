import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Category } from "../../../lib/types";

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage{asset->{url}, alt},
    author->{name, image},
    publishedAt,
    categories[]->{title, slug},
    body
  }`;
  return await client.fetch(query, { slug });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <Link href="/blog" className="text-blue-600">← Back to Blog</Link>
      <h1 className="text-3xl font-bold mb-2 mt-4">{post.title}</h1>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        {post.author?.image?.asset?.url ? (
          <Image src={post.author.image.asset.url} alt={post.author.name} width={32} height={32} className="rounded-full" />
        ) : null}
        <span>{post.author?.name}</span>
        <span>·</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>
      {post.mainImage?.asset?.url ? (
        <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={800} height={400} className="rounded mb-4" />
      ) : null}
      <div className="mb-4 flex flex-wrap gap-2">
        {post.categories?.map((cat: Category) => (
          <span key={cat.slug.current} className="bg-gray-200 rounded px-2 py-1 text-xs">{cat.title}</span>
        ))}
      </div>
      <article className="prose prose-lg">
        <PortableText value={post.body} />
      </article>
    </main>
  );
} 