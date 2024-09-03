'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import Image from 'next/image'
import Callout from './Callout'

export default function MDX({code}: {code: string}) {
  const MDXContent = useMDXComponent(code);
  const components = {
    Image,
    Callout,
  }
  return (
    <div className='prose sm:prose-lg xl:prose-2xl max-w-full'>
      <MDXContent components={components} />
    </div>
  );
}