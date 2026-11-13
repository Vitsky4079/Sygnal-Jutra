import { ArticleView, articleMetadata } from "@/components/SeriesPages";

export async function generateMetadata({ params }: PageProps<"/kontekst/[slug]">) {
  const { slug } = await params;
  return articleMetadata("kontekst", slug);
}

export default async function Page({ params }: PageProps<"/kontekst/[slug]">) {
  const { slug } = await params;
  return <ArticleView series="kontekst" slug={slug} />;
}
