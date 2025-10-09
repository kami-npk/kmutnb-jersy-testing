// T25_endurance_test
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    endurance: {
      executor: 'constant-vus',   // ผู้ใช้จำลองคงที่
      vus: 10,                    // จำนวนผู้ใช้จำลอง (ปรับได้)
      duration: '1h',             // ทดสอบนาน 1 ชั่วโมงเต็ม
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% ของ request ต้องใช้เวลา < 1s
    checks: ['rate>0.97'],             // ผ่าน check อย่างน้อย 97%
  },
};

export default function () {
  // วนยิง request ตลอดช่วงทดสอบ
  while (true) {
    // ส่ง request ไปยัง URL ที่ใช้ตอนกด "Add to Cart"
    const res = http.get('https://kmutnb-jersy-testing.vercel.app/addtocart.mp4');

    // ตรวจสอบว่า response ปกติ
    check(res, {
      'status is 200 or 304': (r) => r.status === 200 || r.status === 304,
    });

    // พัก 1 วินาที เพื่อจำลองผู้ใช้พักก่อนคลิกอีกครั้ง
    sleep(1);
  }
}
