// T24_latency testing
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 80,        // 80 concurrent users
  duration: '2m', // รันทดสอบ 2 นาที
  thresholds: {
    http_req_failed: ['rate<0.02'],   // error rate ≤ 2%
    http_req_duration: ['p(95)<5000'], // P95 ≤ 5s
  },
};

export default function () {
  // URL endpoint พร้อมส่ง name=Jane Doe
  const url = 'https://tuteoodwafwotjebawzo.supabase.co/rest/v1/orders?select=name,order_items,pickup_method,shipping_address,contact&name=eq.Jane+Doe';

  // headers
  const params = {
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dGVvb2R3YWZ3b3RqZWJhd3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjI5MTksImV4cCI6MjA3NDUzODkxOX0.fc1CZciDL5DZIsjLiUpUMqdBBZgsSOiRRyCTUCpJ3Nc',  // public key ของ project
      'Content-Type': 'application/json',
    },
  };

  // ส่ง GET request
  const res = http.get(url, params);

  // ตรวจสอบผลลัพธ์
  check(res, {
    'status is 200': (r) => r.status === 200,
    'latency < 5s': (r) => r.timings.duration < 5000,
  });
}
