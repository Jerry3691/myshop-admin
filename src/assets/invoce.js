function invoice(data, invoice_number) {
    easyinvoice.createInvoice(data, function(result) {
        easyinvoice.download(`${invoice_number}.pdf`, result.pdf);
    });
}