const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const vonage = new Vonage({ apiKey: "709289da", apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8" });
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    console.log("🛠️ بدء الفحص الشامل...");
    try {
        const response = await vonage.sms.send({ to: "201027834695", from: "AlqurmaniX", text: "فحص النظام" });
        console.log("✉️ رد شركة الرسائل:", response.messages[0].status === "0" ? "نجاح" : "فشل بسبب: " + response.messages[0]['error-text']);
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow([new Date().toLocaleString('ar-EG'), "فحص", "ناجح"]);
        console.log("✅ الجدول استجاب!");
    } catch (e) {
        console.log("❌ العطل الحقيقي هو: " + e.message);
    }
}
startSystem();
