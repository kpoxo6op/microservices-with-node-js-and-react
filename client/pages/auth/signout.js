import { useEffect } from 'react';
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
  const { doRequest } = useRequest({
    url: '/appi/users/signout',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    dpRequest();
  }, [])
  return <div>signing you out...</div>
}