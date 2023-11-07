import React from 'react'
import { getInitialProps } from '@/lib/api'
import { ExperienceBuilder, RenderComponents, RenderField } from '@craftercms/experience-builder/react'
import { useCrafterAppContext } from '@/components/providers/CrafterAppProvider'
import { Footer } from '@/components/shared'
import { contentTypeMap } from '@/components/ContentMap'

type TPageContentModel = {
  name: string;
  url: string;
  descriptorUrl: string;
  descriptorDom: {
    page: {
      "content-type": string;
      [wildcard: string]: any;
    },
    [wildcard: string]: any;
  },
  dom: {
    page: {
      "content-type": string;
      [wildcard: string]: any;
    },
    [wildcard: string]: any;
  },
  [wildcard: string]: any;
}

export async function generateStaticParams() {
  const CMS_API = `${process.env.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME}/api/1/services/page.json?path=/site/website&depth=3&crafterSite=${process.env.NEXT_PUBLIC_CRAFTERCMS_SITE_NAME}`;
  console.log("CMS URL >>>>>>>", CMS_API);
  const res = await fetch(CMS_API);
  const data = await res.json();
  const paths = data.childItems
    ?.filter((item: TPageContentModel) => item?.dom?.page?.["content-type"]?.indexOf("/page/") !== -1)
    ?.map((item: TPageContentModel) => {
      const segments = item.url
        ?.split('/')
        ?.filter((segment) => segment !== "site" && segment !== "website");
      console.log("segments >>>>>>>", segments);
      return {
        id: segments,
      }
    });

  // const paths = [
  //   { params: { id: ['test'] } }
  // ];

  return {
    paths,
    fallback: true,
  }
}

const WildCardPage = async ({
  params
}: {
  params: { id: string[] }
}) => {
  const { id } = params;

  const { model } = await getInitialProps({ params: { id } });
  const { isAuthoring } = useCrafterAppContext();

  return (
    <div>
      <ExperienceBuilder model={model} isAuthoring={isAuthoring}>
        <div>
          {JSON.stringify(model)}
        </div>
        <RenderField
          model={model}
          fieldId="title_s"
          component={React.Fragment}
          componentProps={{
            // Component props can simply be sent as props to RenderField, and
            // they would be passed down to Typography, however, because there's
            // a prop name collision (i.e. `component`) we can use componentProps
            // to supply the component prop directly to Typography.
            component: 'h1'
          }}
        />
        <RenderComponents contentTypeMap={contentTypeMap} model={model} fieldId="content_o" />
        <Footer />
      </ExperienceBuilder>
    </div>
  )
}

export default WildCardPage