const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. مفاتيح Vonage (المحرك)
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. إعدادات جوجل شيت (المخزن الإمبراطوري)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: 'سأرسل لك مفتاح جوجل السري في الخطوة القادمة', 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

// وظيفة تنفيذ العملية وتسجيل الـ 20 بند
async function startOperation(phone, message, amount) {
    try {
        console.log("جاري إرسال الرسالة...");
        await vonage.sms.send({to: phone, from: "AlqurmaniX", text: message});
        
        console.log("جاري تسجيل البيانات في الـ 20 بند...");
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            'Timestamp': new Date().toLocaleString(),
            'Phone_Number': phone,
            'Action_Type': 'SMS',
            'Payment_Amount': amount,
            'Message_Content': message,
            'Subscription_Status': 'Active',
            'Security_Level': 'Green'
        });
        console.log("✅ تمت العملية بنجاح يا إمبراطور!");
    } catch (e) {
        console.error("❌ حدث خطأ:", e);
    }
}

// تجربة التشغيل (حط رقمك هنا للتجربة)
startOperation('رقم_موبايلك_بالكود_الدولي', 'تم تفعيل نظام القرماني إكس بنجاح 🚀', '0');
