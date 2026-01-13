import Head from "next/head";
import CakesMenu from "@/components/screens/CakesMenu";

import type { GetStaticProps } from "next";
import { loadCakeBadges, loadCakeSections, loadCakes } from "@/lib/content/loaders";
import type { Cake, CakeBadge, CakeSection } from "@/lib/content/types";

type Props = {
  cakeSections: CakeSection[];
  cakeBadges: CakeBadge[];
  cakes: Cake[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      cakeSections: loadCakeSections(),
      cakeBadges: loadCakeBadges(),
      cakes: loadCakes(),
    },
  };
};

export default function CakesMenuPage({ cakeSections, cakeBadges, cakes }: Props) {
  return (
    <>
      <Head>
        <title>Cakes Menu | Fruits n Fluff</title>
      </Head>
      <CakesMenu cakeSections={cakeSections} cakeBadges={cakeBadges} cakes={cakes} />
    </>
  );
}
