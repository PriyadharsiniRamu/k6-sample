import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
export let options = {
  discardResponseBodies: true,
  scenarios: {
    sample: {
      executor: 'constant-vus',
      exec: 'users',
      vus: 5,
      duration: '5s',
    },
  },
};

export function users() {
  var url = 'https://gorest.co.in/public-api/users';
  http.get(url, { tags: { function: 'echo' } });
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  let resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
    if (resp.status != 200) {
        console.error('Could not send summary, got status ' + resp.status);
    }
  return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true}),
        '/tmp/summary.html': htmlReport(data), 
    }
  }
