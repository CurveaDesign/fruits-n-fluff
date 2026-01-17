import Head from "next/head";
import type { GetStaticProps } from "next";

import CateringMenu from "@/components/screens/CateringMenu";
import {
  loadCateringItems,
  loadCateringSections,
  loadPlatDuJourWeeks,
} from "@/lib/content/loaders";

import type { CateringItem, CateringSection, PlatDuJourWeek } from "@/lib/content/types";

type Props = {
  cateringSections: CateringSection[];
  cateringItems: CateringItem[];
  platWeeks: PlatDuJourWeek[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      cateringSections: loadCateringSections(),
      cateringItems: loadCateringItems(),
      platWeeks: loadPlatDuJourWeeks(),
    },
  };
};

export default function CateringMenuPage({ cateringSections, cateringItems, platWeeks }: Props) {
  return (
    <>
      <Head>
        <title>Catering Menu | Fruits n Fluff</title>
      </Head>

      <CateringMenu cateringSections={cateringSections} cateringItems={cateringItems} platWeeks={platWeeks} />
    </>
  );
}
