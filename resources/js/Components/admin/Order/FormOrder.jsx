import React from 'react';
import SidebarOrder from './SidebarOrder';
import DataOrder from './DataOrder';
import { usePage } from '@inertiajs/inertia-react';

const FormOrder = () => {
  const { url } = usePage();
  console.log(url);

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SidebarOrder />
          <DataOrder />
        </div>
      </div>
    </div>
  );
};

export default FormOrder;