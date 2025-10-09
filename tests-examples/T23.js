// T23_scalability testing
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // เริ่มที่ 10 users
    { duration: '30s', target: 20 },   // เพิ่มทีละ 10
    { duration: '30s', target: 30 },
    { duration: '30s', target: 40 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 150 },
    { duration: '30s', target: 200 },  // สูงสุด 200
  ],
};

export default function () {
  let res = http.get('https://kmutnb-jersy-testing.vercel.app/checkout');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 5s': (r) => r.timings.duration < 5000,
  });
  sleep(1);
}
