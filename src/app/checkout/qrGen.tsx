'use client'
import promptpay from 'promptpay-qr';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

type Props = {
    amount: number
}

const QrGen: React.FC<Props> = ({ amount }) => {
    const [qrUrl, setQrUrl] = useState('');

    const phonenumber = '0925898651';

    // สร้าง payload
    const payload = promptpay(phonenumber, {
        amount: amount
    });

    useEffect(() => {
        // แปลง payload เป็น QR code
        QRCode.toDataURL(payload)
            .then(url => setQrUrl(url))
            .catch(err => console.error(err));
    }, [payload]);

    return (
        <div>
            {qrUrl && <img src={qrUrl} alt="PromptPay QR" />}
        </div>
    )
}

export default QrGen;
