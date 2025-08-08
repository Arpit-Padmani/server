const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');

const generateInvoice = async (paymentData, userData) => {
    try {
        const invoiceData = {
            currency: "INR",
            taxNotation: "gst",
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            sender: {
                company: "RentEasy Pvt. Ltd.",
                address: "123, Main Street",
                zip: "380001",
                city: "Ahmedabad",
                country: "India"
            },
            client: {
                company: userData.name || "Customer",
                address: userData.address || "N/A",
                zip: userData.zip || "",
                city: userData.city || "",
                country: userData.country || "India"
            },
            invoiceNumber: `RE-${Date.now()}`,
            invoiceDate: new Date().toLocaleDateString(),
            products: [
                {
                    quantity: 1,
                    description: `Car Booking - ${paymentData.carId}`,
                    tax: 0,
                    price: paymentData.amount
                }
            ],
            bottomNotice: "Thank you for choosing RentEasy! We look forward to serving you again."
        };

        const result = await easyinvoice.createInvoice(invoiceData);
        const pdfPath = path.join(__dirname, `../invoices/invoice-${paymentData.razorpay_payment_id}.pdf`);
        fs.writeFileSync(pdfPath, result.pdf, 'base64');

        return pdfPath;
    } catch (error) {
        console.log("Error generating invoice:", error);
        throw error;
    }
};

module.exports = generateInvoice;
