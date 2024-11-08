import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 50000,
  // A string specifying the total duration of the test run.
  duration: '1s',
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {
  const payload = JSON.stringify({
    user_id: 1,
    amount: 1000
  });

  const params = {
    headers: {
      'content-type': 'application/json'
    }
  };

  const response = http.post('http://localhost:3000/api/transactions/credit', payload, params);
  console.log(response);

  sleep(1);
}
