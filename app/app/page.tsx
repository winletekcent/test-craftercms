"use client";

import React from 'react';
import { ExperienceBuilder, RenderComponents, RenderField } from '@craftercms/experience-builder/react';
import { useCrafterAppContext } from '@/components/providers/CrafterAppProvider';

import { getModel, getModelByUrl } from '../lib/api';
import { contentTypeMap } from '@/components/ContentMap';

import { Footer } from '@/components/shared';


export default async function Home() {
  const model = await getModel();
  console.log("MODEL >>>>>>>", model);

  const { isAuthoring } = useCrafterAppContext();
  return (
    <ExperienceBuilder model={model} isAuthoring={isAuthoring}>
      <RenderField
        model={model}
        fieldId="title_s"
        component={React.Fragment}
        componentProps={{
          // Component props can simply be sent as props to RenderField, and
          // they would be passed down to Typography, however, because there's
          // a prop name collision (i.e. `component`) we can use componentProps
          // to supply the component prop directly to Typography.
        }}
      />
      <RenderComponents contentTypeMap={contentTypeMap} model={model} fieldId="content_o" />
      <Footer />
    </ExperienceBuilder>
  )
}

// Home.getInitialProps = getInitialProps;
