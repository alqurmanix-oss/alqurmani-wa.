const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. إعدادات الإرسال (أرقامك ومفاتيحك جاهزة)
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. إعدادات الوصول لجوجل شيت (كاملة بالمفتاح)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

// 3. الوظيفة اللي هتملا الـ 20 بند
async function startOperation() {
    try {
        console.log("🚀 جاري التنفيذ...");
        
        // إرسال الرسالة لرقمك
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "تم تفعيل نظام القرماني إكس بنجاح يا إمبراطور! 👑"
        });
        
        // تسجيل البيانات في الجدول
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            'الرقم': "201027834695",
            'الحالة': "نشط",
            'التوقيت': new Date().toLocaleString('ar-EG'),
            'المبلغ': "0",
            'الرسالة': "تم التفعيل بنجاح"
        });
        
        console.log("✅ مبروك! العملية تمت والجدول اتملى.");
    } catch (error) {
        console.error("❌ حصلت مشكلة:", error.message);
    }
}

// شغل العملية فوراً
startOperation();
