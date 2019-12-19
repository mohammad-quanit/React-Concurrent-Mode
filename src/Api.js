import axios from 'axios';

export const fetchData = () => {
  const userPromise = fetchUser();
  const postPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postPromise)
  };
};

const wrapPromise = promise => {
  // set initial status
  let status = 'pending';
  // store reuslt
  let result;
  // wait for promise
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if(status === 'error') {
        throw result;
      } else if(status === 'success') {
        return result
      }
    }
  }
}

const fetchUser = () => {
  console.log('Fectching User');
  return axios
    .get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => console.error(err));
};

const fetchPosts = () => {
  console.log('Fectching Posts');
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
    .catch(err => console.error(err));
};
