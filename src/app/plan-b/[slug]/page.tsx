import { ArticleView, articleMetadata } from "@/components/SeriesPages";

export async function generateMetadata({ params }: PageProps<"/plan-b/[slug]">) {
  const { slug } = await params;
  return articleMetadata("plan-b", slug);
}

export default async function Page({ params }: PageProps<"/plan-b/[slug]">) {
  const { slug } = await params;
  return <ArticleView series="plan-b" slug={slug} />;
}
