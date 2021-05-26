import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    sample: {
      executor: 'constant-vus',
      exec: 'users',
      vus: 15,
      duration: '15s',
    },
  },
};

export function users() {
  var url = 'https://gorest.co.in/public-api/users';
  http.get(url, { tags: { function: 'echo' } });
}

