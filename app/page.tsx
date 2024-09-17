import SegmentTable from '@/components/segments/table/SegmentTable';
import React from 'react';

const Page = async () => {
  try {
    return (
      <div>
        <section className='mt-11 m-5'>
          <SegmentTable />
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching segments", error);
  }
};

export default Page;
