"use client"

import React from 'react'
import useSWR from 'swr';
import { RenderField, Model } from '@craftercms/experience-builder/react';
import { getModel } from '@/lib/api';

const Footer = () => {
  const { data: model } = useSWR('/site/components/footer.xml', getModel);
  if (!model) return '';

  return (
    <Model model={model} component={React.Fragment}>
      <RenderField
        model={model}
        fieldId="copy_s"
        component="span"
        render={(copy_s) => copy_s?.replaceAll('$YEAR', new Date().getFullYear())}
      />
    </Model>
  );
}

export default Footer