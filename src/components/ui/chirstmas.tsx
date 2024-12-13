import Image from 'next/image';
import React from 'react';

const christmas = () => (
    <Image
      src="/image/asset_christmastree/christmastree.png"
      alt="Christmas Tree"
      width={300}
      height={300}
      style={{ margin: "5px auto" }}
    />
);

export default christmas;
