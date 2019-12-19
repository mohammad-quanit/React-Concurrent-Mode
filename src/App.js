import React, { Suspense } from 'react';

import ProfileDetails from './Components/ProfileDetails';
import ProfilePosts from './Components/ProfilePosts';
import Spinner from './Components/Loader';

function App() {
  return (
    <div className='container my-5'>
      <Suspense fallback={<Spinner />}>
        <ProfileDetails />
        <Suspense fallback={<Spinner />}>
          <ProfilePosts />
        </Suspense>
      </Suspense>
    </div>
  );
}

export default App;
