const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    try {
        console.log("🚀 تشغيل إجباري...");
        
        // إرسال SMS (للتأكد إن الكود حي)
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "مبروك يا إمبراطور! النظام كسر حاجز الوقت والآن يملأ الجدول! 👑"
        });
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        // إجبار الكود على الكتابة في أول ٤ أعمدة (A, B, C, D)
        // مهما كانت الأسماء المكتوبة فوق (Timestamp أو غيرها)
        await sheet.addRow([
            new Date().toLocaleString('ar-EG'), 
            "201027834695", 
            "تم التفعيل رغماً عن الأعطال", 
            "جاهز للـ 10,000 خدمة"
        ], { insert: true });

        console.log("✅ مبروك! انظر للجدول الآن.");
    } catch (e) {
        console.error("❌ الخطأ هو:", e.message);
    }
}
startSystem();
