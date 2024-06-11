import crypto from 'crypto';

export default function (pass: string): string {
    let hash = crypto.createHash('md5').update(pass).digest('hex');
    return hash;
}