import { ArticleView, articleMetadata } from "@/components/SeriesPages";

export async function generateMetadata({ params }: PageProps<"/sygnal/[slug]">) {
  const { slug } = await params;
  return articleMetadata("sygnal", slug);
}

export default async function Page({ params }: PageProps<"/sygnal/[slug]">) {
  const { slug } = await params;
  return <ArticleView series="sygnal" slug={slug} />;
}
